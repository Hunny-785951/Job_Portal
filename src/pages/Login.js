import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import '../css/Auth.css';

export function Login() {
  const [email, setEmail] = useState(localStorage.getItem('recruit_last_email') || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  useScrollReveal();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      localStorage.setItem('recruit_last_email', email);
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-page flex justify-center items-center">
      <div className="auth-card glass reveal-scale">
        <div className="auth-header text-center reveal delay-100">
          <h2>Welcome Back</h2>
          <p>Login to manage your jobs and applications</p>
        </div>
        
        {error && <div className="auth-alert error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form flex flex-col reveal delay-200">
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
            Sign In
          </Button>
        </form>
        
        <div className="auth-footer text-center mt-6">
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}
