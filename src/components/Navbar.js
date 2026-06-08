import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/Navbar.css';

export function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar glass animate-fade-in">
      <div className="container navbar-container flex justify-between items-center">
        <Link to="/" className="navbar-brand">
          Recruit<span className="text-primary">Portal</span>
        </Link>
        <div className="navbar-links flex items-center gap-6">
          <Link to="/" className="nav-link">Jobs</Link>
          
          {currentUser ? (
            <>
              {currentUser.role === 'employer' ? (
                <>
                  <Link to="/employer/dashboard" className="nav-link">Dashboard</Link>
                  <Link to="/jobs/new" className="btn btn-primary btn-sm">Post Job</Link>
                </>
              ) : (
                <>
                  <Link to="/user/dashboard" className="nav-link">My Applications</Link>
                </>
              )}
              <Link to="/profile" className="nav-link">Profile</Link>
              <div className="user-profile flex items-center gap-4 ml-2">
                <div 
                  className="nav-avatar flex items-center justify-center font-bold text-white bg-primary"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-color)',
                    backgroundImage: currentUser.profileImage ? `url(${currentUser.profileImage})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    flexShrink: 0
                  }}
                >
                  {!currentUser.profileImage && currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">Hi, {currentUser.name}</span>
                <button onClick={handleLogout} className="btn btn-outline btn-sm">Logout</button>
              </div>
            </>
          ) : (
            <div className="auth-buttons flex gap-4">
              <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
