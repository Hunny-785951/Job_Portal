import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';
import { useApplications } from '../hooks/useApplications';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import '../css/ApplyJob.css';

export function ApplyJob() {
  const { id } = useParams();
  const { getJobById } = useJobs();
  const { applyForJob } = useApplications();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [coverLetter, setCoverLetter] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const job = getJobById(id);

  if (!job) {
    return <div className="container mt-6">Job not found.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!coverLetter.trim()) {
      setError('Please provide a cover letter or application message.');
      return;
    }

    const result = applyForJob(job.id, currentUser.id, coverLetter, currentUser.email);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/user/dashboard');
      }, 2000);
    } else {
      setError(result.message);
    }
  };

  if (success) {
    return (
      <div className="container apply-page flex justify-center items-center">
        <div className="apply-card glass text-center animate-fade-in">
          <div className="success-icon text-primary mb-4">✓</div>
          <h2>Application Submitted!</h2>
          <p>You have successfully applied for {job.title} at {job.company}.</p>
          <p className="text-secondary mt-4">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container apply-page flex justify-center items-start">
      <div className="apply-card glass animate-fade-in">
        <Link to={`/jobs/${job.id}`} className="back-link">&larr; Back to Job</Link>
        
        <div className="apply-header mt-4 mb-6">
          <h2>Apply for {job.title}</h2>
          <p className="text-secondary">{job.company} • {job.location}</p>
        </div>

        {error && <div className="auth-alert error mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="apply-form flex flex-col gap-4">
          <div className="form-group">
            <label className="input-label">Applicant Name</label>
            <input className="input-field" type="text" value={currentUser.name} disabled />
          </div>
          
          <div className="form-group">
            <label className="input-label">Applicant Email</label>
            <input className="input-field" type="email" value={currentUser.email} disabled />
          </div>

          <div className="form-group">
            <label className="input-label">Cover Letter / Message</label>
            <textarea 
              className="input-field textarea-field" 
              rows="6"
              placeholder="Why are you a great fit for this role?"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            ></textarea>
          </div>

          <Button type="submit" size="lg" className="mt-4">Submit Application</Button>
        </form>
      </div>
    </div>
  );
}
