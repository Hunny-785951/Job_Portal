import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../hooks/useJobs';
import { useApplications } from '../hooks/useApplications';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import '../css/Dashboard.css';

export function EmployerDashboard() {
  const { currentUser } = useAuth();
  const [selectedApp, setSelectedApp] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { jobs, deleteJob } = useJobs();
  const { applications, updateApplicationStatus } = useApplications();
  
  // As Admin, view all jobs and applications
  const employerJobs = jobs;
  const relevantApplications = applications;

  const filteredApplications = relevantApplications.filter(app => {
    if (!searchQuery) return true;
    const job = jobs.find(j => j.id === app.jobId);
    const jobTitle = (job && job.title) ? job.title.toLowerCase() : '';
    const searchLower = searchQuery.toLowerCase();
    
    const applicantId = app.applicantId || '';
    const email = app.email || '';
    
    return applicantId.toLowerCase().includes(searchLower) || 
           jobTitle.includes(searchLower) ||
           email.toLowerCase().includes(searchLower);
  });

  useScrollReveal([employerJobs.length, filteredApplications.length]);

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      deleteJob(jobId);
    }
  };

  const handleReviewApplication = (app, job) => {
    setSelectedApp({ ...app, jobTitle: job.title });
  };

  const closeModal = () => {
    setSelectedApp(null);
  };

  const handleStatusChange = (appId, status) => {
    updateApplicationStatus(appId, status);
  };

  return (
    <div className="dashboard-page container reveal">
      <div className="dashboard-header flex justify-between items-center reveal-left">
        <div>
          <h2>Employer Dashboard</h2>
          <p className="text-secondary">Welcome back, {currentUser.name}</p>
        </div>
        <Link to="/jobs/new" className="btn btn-primary">Post New Job</Link>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card glass reveal delay-100">
          <h3>Your Job Postings</h3>
          {employerJobs.length > 0 ? (
            <div className="list-group">
              {employerJobs.map((job, idx) => (
                <div key={job.id} className={`list-item flex justify-between items-center reveal delay-${(idx % 5) * 100 + 100}`}>
                  <div>
                    <Link to={`/jobs/${job.id}`} className="font-semibold text-lg">{job.title}</Link>
                    <div className="text-sm text-secondary mt-1">
                      Posted on {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteJob(job.id)}>Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary">You haven't posted any jobs yet.</p>
          )}
        </div>

        <div className="dashboard-card glass reveal delay-200">
          <div className="flex justify-between items-center mb-4">
            <h3>Recent Applications</h3>
            <div className="search-bar" style={{ width: '300px' }}>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Search by Job Title, Email, or ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          {filteredApplications.length > 0 ? (
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Applicant ID</th>
                    <th>Job Applied For</th>
                    <th>Date Applied</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app, idx) => {
                    const job = employerJobs.find(j => j.id === app.jobId);
                    return (
                      <tr key={app.id} className={`reveal delay-${(idx % 5) * 100 + 100}`}>
                        <td>
                          <div className="font-semibold">{app.applicantId}</div>
                          <div className="text-sm text-secondary">{app.email}</div>
                        </td>
                        <td>{job ? job.title : 'Unknown Job'}</td>
                        <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                        <td>
                          <span className={`status-badge ${app.status}`}>
                            {app.status}
                          </span>
                        </td>
                        <td>
                          <Button size="sm" variant="outline" onClick={() => handleReviewApplication(app, job)}>
                            Review
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-secondary">No applications received yet.</p>
          )}
        </div>
      </div>

      <Modal 
        isOpen={!!selectedApp} 
        onClose={closeModal} 
        title={`Application for ${selectedApp?.jobTitle}`}
      >
        {selectedApp && (
          <div className="application-details flex-col gap-4">
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md">
              <div>
                <h4 className="text-lg mb-1">Applicant Details</h4>
                <p className="text-secondary mb-1"><strong>ID:</strong> {selectedApp.applicantId}</p>
                <p className="text-secondary"><strong>Email:</strong> {selectedApp.email}</p>
              </div>
              <div className="text-right">
                <span className={`status-badge ${selectedApp.status} mb-2 block`}>
                  {selectedApp.status}
                </span>
                <p className="text-sm text-secondary">
                  Applied: {new Date(selectedApp.appliedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="cover-letter mt-6">
              <h4 className="text-lg mb-2">Cover Letter</h4>
              <div className="bg-gray-50 p-4 rounded-md text-secondary" style={{ whiteSpace: 'pre-wrap' }}>
                {selectedApp.coverLetter}
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t justify-end" style={{borderTop: '1px solid var(--border-color)'}}>
              <Button size="md" variant="ghost" onClick={closeModal}>Cancel</Button>
              <Button size="md" variant="outline" onClick={() => {
                handleStatusChange(selectedApp.id, 'reviewed');
                closeModal();
              }}>
                Mark Reviewed
              </Button>
              <Button size="md" variant="danger" onClick={() => {
                handleStatusChange(selectedApp.id, 'rejected');
                closeModal();
              }}>
                Reject
              </Button>
              <Button size="md" variant="success" onClick={() => {
                handleStatusChange(selectedApp.id, 'accepted');
                closeModal();
              }}>
                Accept
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
