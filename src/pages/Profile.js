import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import '../css/Profile.css';

export function Profile() {
  const { currentUser, updateProfile } = useAuth();
  useScrollReveal();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    portfolio: '',
    bio: '',
    profileImage: ''
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        phone: currentUser.phone || '',
        portfolio: currentUser.portfolio || '',
        bio: currentUser.bio || '',
        profileImage: currentUser.profileImage || ''
      });
    }
  }, [currentUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image is too large. Please choose an image smaller than 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg('');

    // Simulate API delay
    setTimeout(() => {
      updateProfile(formData);
      setIsSaving(false);
      setIsEditing(false);
      setSuccessMsg('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 600);
  };

  const handleCancel = () => {
    // Revert form data to current user data
    setFormData({
      name: currentUser.name || '',
      phone: currentUser.phone || '',
      portfolio: currentUser.portfolio || '',
      bio: currentUser.bio || '',
      profileImage: currentUser.profileImage || ''
    });
    setIsEditing(false);
  };

  if (!currentUser) return null;

  return (
    <div className="profile-page container reveal">
      <div className="profile-card glass reveal-scale delay-100">
        <div className="profile-header flex justify-between items-start">
          <div className="flex gap-6 items-center">
            <div 
              className="avatar-upload-container" 
              onClick={() => isEditing && fileInputRef.current.click()}
              style={{ cursor: isEditing ? 'pointer' : 'default' }}
            >
              <div className="avatar-preview">
                {formData.profileImage ? (
                  <img src={formData.profileImage} alt="Profile" />
                ) : (
                  <div className="avatar-placeholder">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                )}
                {isEditing && (
                  <div className="avatar-overlay">
                    <span>Change</span>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
            </div>
            <div>
              <h2>My Profile</h2>
              <p className="text-secondary">
                {isEditing ? 'Update your personal information and contact details.' : 'View your account details below.'}
              </p>
            </div>
          </div>
        </div>

        {successMsg && (
          <div className="success-alert animate-fade-in">
            {successMsg}
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="profile-form-grid">
              <div className="form-group">
                <label className="text-sm font-semibold text-secondary block mb-1">Email Address</label>
                <input 
                  type="text" 
                  className="input-field bg-gray-50" 
                  value={currentUser.email} 
                  disabled 
                  title="Email cannot be changed"
                />
              </div>

              <div className="form-group">
                <Input 
                  label="Full Name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <Input 
                  label="Phone Number" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="form-group">
                <Input 
                  label="Portfolio / LinkedIn URL" 
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>

              <div className="form-group full-width">
                <label className="text-sm font-semibold text-secondary block mb-2">Professional Summary / Bio</label>
                <textarea 
                  className="input-field" 
                  name="bio"
                  rows="5"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us a little bit about yourself, your experience, and what you're looking for..."
                  style={{ resize: 'vertical' }}
                ></textarea>
              </div>
            </div>

            <div className="profile-actions">
              <Button type="button" variant="ghost" size="lg" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="lg" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        ) : (
          <div className="profile-view-mode">
            <div className="profile-form-grid">
              <div className="form-group">
                <label className="text-sm font-semibold text-secondary block mb-1">Full Name</label>
                <p className="text-lg font-medium">{currentUser.name}</p>
              </div>
              <div className="form-group">
                <label className="text-sm font-semibold text-secondary block mb-1">Email Address</label>
                <p className="text-lg">{currentUser.email}</p>
              </div>
              <div className="form-group">
                <label className="text-sm font-semibold text-secondary block mb-1">Phone Number</label>
                <p className="text-lg">{currentUser.phone || <span className="text-secondary italic">Not provided</span>}</p>
              </div>
              <div className="form-group">
                <label className="text-sm font-semibold text-secondary block mb-1">Portfolio / LinkedIn</label>
                {currentUser.portfolio ? (
                  <a href={currentUser.portfolio.startsWith('http') ? currentUser.portfolio : `https://${currentUser.portfolio}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" style={{wordBreak: 'break-all'}}>
                    {currentUser.portfolio}
                  </a>
                ) : (
                  <p className="text-lg text-secondary italic">Not provided</p>
                )}
              </div>
              <div className="form-group full-width">
                <label className="text-sm font-semibold text-secondary block mb-2">Professional Summary / Bio</label>
                <div className="bg-gray-50 p-4 rounded-md text-secondary" style={{ whiteSpace: 'pre-wrap', minHeight: '100px' }}>
                  {currentUser.bio || <span className="italic">No summary provided yet.</span>}
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <Button type="button" variant="primary" size="lg" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
