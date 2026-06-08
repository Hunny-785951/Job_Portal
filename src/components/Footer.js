import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container flex justify-between">
        <div className="footer-brand">
          <h3>Recruit<span className="text-primary">Portal</span></h3>
          <p>Connecting top talent with the best companies.</p>
        </div>
        <div className="footer-links flex gap-6">
          <div className="footer-column flex-col">
            <h4>For Candidates</h4>
            <Link to="/">Browse Jobs</Link>
            <Link to="/register">Create Account</Link>
          </div>
          <div className="footer-column flex-col">
            <h4>For Employers</h4>
            <Link to="/jobs/new">Post a Job</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} RecruitPortal. All rights reserved.</p>
      </div>
    </footer>
  );
}
