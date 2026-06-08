import React from 'react';
import { Link } from 'react-router-dom';
import '../css/JobCard.css';

export function JobCard({ job }) {
  return (
    <div className="job-card glass">
      <div className="job-card-header flex justify-between items-center">
        <h3 className="job-title">{job.title}</h3>
        <span className="job-type">{job.type}</span>
      </div>
      <div className="job-company">{job.company}</div>
      <div className="job-details flex gap-4">
        <span>📍 {job.location}</span>
        <span>💰 {job.salary}</span>
      </div>
      <p className="job-description">
        {job.description.length > 100 
          ? `${job.description.substring(0, 100)}...` 
          : job.description}
      </p>
      <div className="job-actions">
        <Link to={`/jobs/${job.id}`} className="btn btn-outline btn-sm">
          View Details
        </Link>
      </div>
    </div>
  );
}
