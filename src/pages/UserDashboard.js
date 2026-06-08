import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApplications } from '../hooks/useApplications';
import { useJobs } from '../hooks/useJobs';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../css/Dashboard.css';

export function UserDashboard() {
  const { currentUser } = useAuth();
  const { getApplicationsByUser } = useApplications();
  const { getJobById } = useJobs();

  const userApplications = getApplicationsByUser(currentUser.id);
  
  useScrollReveal([userApplications.length]);

  return (
    <div className="dashboard-page container reveal">
      <div className="dashboard-header reveal-left">
        <h2>Candidate Dashboard</h2>
        <p className="text-secondary">Welcome back, {currentUser.name}</p>
      </div>

      <div className="dashboard-card glass reveal delay-100">
        <h3>My Applications</h3>
        
        {userApplications.length > 0 ? (
          <div className="list-group">
            {userApplications.map((app, idx) => {
              const job = getJobById(app.jobId);
              return (
                <div key={app.id} className={`list-item flex justify-between items-center reveal delay-${(idx % 5) * 100 + 100}`}>
                  <div>
                    {job ? (
                      <Link to={`/jobs/${job.id}`} className="font-semibold text-lg">{job.title}</Link>
                    ) : (
                      <span className="font-semibold text-lg">Job Unavailable</span>
                    )}
                    <div className="text-sm text-secondary mt-1">
                      Applied on {new Date(app.appliedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <span className={`status-badge status-${app.status}`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-secondary mb-4">You haven't applied to any jobs yet.</p>
            <Link to="/" className="btn btn-primary">Browse Jobs</Link>
          </div>
        )}
      </div>
    </div>
  );
}
