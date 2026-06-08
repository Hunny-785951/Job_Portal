import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import '../css/JobDetails.css';

export function JobDetails() {
  const { id } = useParams();
  const { getJobById } = useJobs();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const job = getJobById(id);

  if (!job) {
    return (
      <div className="container mt-6 text-center">
        <h2>Job Not Found</h2>
        <Link to="/" className="btn btn-primary mt-4">Back to Home</Link>
      </div>
    );
  }

  const handleApplyClick = () => {
    if (!currentUser) {
      navigate('/login', { state: { from: { pathname: `/jobs/${id}/apply` } } });
    } else if (currentUser.role === 'employer') {
      alert('Employers cannot apply for jobs.');
    } else {
      navigate(`/jobs/${id}/apply`);
    }
  };

  return (
    <div className="job-details-page container animate-fade-in">
      <Link to="/" className="back-link">&larr; Back to Jobs</Link>
      
      <div className="job-details-content glass">
        <div className="job-header-section flex justify-between items-center">
          <div>
            <h1 className="job-title-large">{job.title}</h1>
            <div className="job-company-large text-primary">{job.company}</div>
          </div>
          <Button onClick={handleApplyClick} size="lg">Apply Now</Button>
        </div>

        <div className="job-meta flex gap-6">
          <div className="meta-item">
            <span className="meta-label">Location</span>
            <span className="meta-value">{job.location}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Salary</span>
            <span className="meta-value">{job.salary}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Job Type</span>
            <span className="meta-value">{job.type}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Posted On</span>
            <span className="meta-value">{new Date(job.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="job-description-section">
          <h2>Job Description</h2>
          <div className="description-content">
            {job.description.split('\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
