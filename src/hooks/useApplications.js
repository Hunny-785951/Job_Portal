import { useState, useEffect } from 'react';

export function useApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    const stored = localStorage.getItem('recruit_applications');
    if (stored) {
      setApplications(JSON.parse(stored));
    }
  };

  const getApplicationsByUser = (userId) => {
    return applications.filter(app => app.applicantId === userId);
  };

  const getApplicationsForJob = (jobId) => {
    return applications.filter(app => app.jobId === jobId);
  };

  const applyForJob = (jobId, applicantId, coverLetter, email) => {
    // Check if already applied
    if (applications.find(app => app.jobId === jobId && app.applicantId === applicantId)) {
      return { success: false, message: "Already applied for this job." };
    }

    const newApp = {
      id: Date.now().toString(),
      jobId,
      applicantId,
      email,
      coverLetter,
      status: 'pending', // pending, reviewed, accepted, rejected
      appliedAt: new Date().toISOString()
    };

    const updatedApps = [newApp, ...applications];
    setApplications(updatedApps);
    localStorage.setItem('recruit_applications', JSON.stringify(updatedApps));
    return { success: true };
  };

  const updateApplicationStatus = (appId, newStatus) => {
    const updatedApps = applications.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApps);
    localStorage.setItem('recruit_applications', JSON.stringify(updatedApps));
  };

  return {
    applications,
    getApplicationsByUser,
    getApplicationsForJob,
    applyForJob,
    updateApplicationStatus,
    refreshApplications: loadApplications
  };
}
