import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import '../css/Auth.css';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('applicant');
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  useScrollReveal();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = register(name, email, password, role);
    if (result.success) {
      localStorage.setItem('recruit_last_email', email);
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-page flex justify-center items-center">
      <div className="auth-card glass reveal-scale">
        <div className="auth-header text-center reveal delay-100">
          <h2>Create an Account</h2>
          <p>Join RecruitPortal today</p>
        </div>
        
        {error && <div className="auth-alert error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form flex flex-col reveal delay-200">
          <div className="role-selector flex gap-4 mb-4">
            <label className={`role-option ${role === 'applicant' ? 'active' : ''}`}>
              <input 
                type="radio" 
                name="role" 
                value="applicant" 
                checked={role === 'applicant'} 
                onChange={() => setRole('applicant')} 
                className="hidden"
              />
              Candidate
            </label>
            <label className={`role-option ${role === 'employer' ? 'active' : ''}`}>
              <input 
                type="radio" 
                name="role" 
                value="employer" 
                checked={role === 'employer'} 
                onChange={() => setRole('employer')} 
                className="hidden"
              />
              Employer
            </label>
          </div>

          <Input 
            label="Full Name" 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
          />
          <Input 
            label="Email Address" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <Input 
            label="Password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          <Button type="submit" size="lg" className="mt-4">
            Sign Up
          </Button>
        </form>
        
        <div className="auth-footer text-center mt-6">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
