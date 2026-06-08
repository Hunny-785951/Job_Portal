import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export function PostJob() {
  const { addJob } = useJobs();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    type: 'Full-time',
    description: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.title || !formData.company || !formData.location || !formData.description) {
      setError('Please fill in all required fields.');
      return;
    }

    addJob({
      ...formData,
      employerId: currentUser.id
    });

    navigate('/employer/dashboard');
  };

  return (
    <div className="container apply-page flex justify-center items-start">
      <div className="apply-card glass animate-fade-in" style={{maxWidth: '800px'}}>
        <div className="apply-header mb-6">
          <h2>Post a New Job</h2>
          <p className="text-secondary">Fill out the details below to publish a job listing.</p>
        </div>

        {error && <div className="auth-alert error mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="apply-form flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Job Title *" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Senior Frontend Engineer"
            />
            <Input 
              label="Company Name *" 
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your Company"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Location *" 
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Remote, New York, NY"
            />
            <Input 
              label="Salary Range" 
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g. $100k - $120k"
            />
          </div>

          <div className="form-group">
            <label className="input-label">Job Type</label>
            <select 
              name="type" 
              className="input-field"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="form-group">
            <label className="input-label">Job Description *</label>
            <textarea 
              name="description"
              className="input-field textarea-field" 
              rows="8"
              placeholder="Describe the responsibilities, requirements, and benefits..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <Button type="button" variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit">Post Job</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
