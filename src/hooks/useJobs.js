import { useState, useEffect } from 'react';

const DUMMY_JOBS = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechFlow',
    location: 'Remote',
    salary: '$120,000 - $150,000',
    type: 'Full-time',
    description: 'We are looking for an experienced React developer to lead our frontend architecture...',
    employerId: 'dummy-emp-1',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'DesignWorks',
    location: 'New York, NY',
    salary: '$90,000 - $110,000',
    type: 'Full-time',
    description: 'Join our design team to create beautiful and intuitive user experiences.',
    employerId: 'dummy-emp-2',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Frontend Engineer',
    company: 'Startup Inc',
    location: 'San Francisco, CA',
    salary: '$100,000 - $130,000',
    type: 'Contract',
    description: 'Help us build our MVP using React and Vanilla CSS.',
    employerId: 'dummy-emp-1',
    createdAt: new Date().toISOString()
  }
];

export function useJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = () => {
    const stored = localStorage.getItem('recruit_jobs');
    if (stored) {
      setJobs(JSON.parse(stored));
    } else {
      localStorage.setItem('recruit_jobs', JSON.stringify(DUMMY_JOBS));
      setJobs(DUMMY_JOBS);
    }
  };

  const getJobById = (id) => {
    return jobs.find(job => job.id === id);
  };

  const getJobsByEmployer = (employerId) => {
    return jobs.filter(job => job.employerId === employerId);
  };

  const addJob = (jobData) => {
    const newJob = {
      ...jobData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    const updatedJobs = [newJob, ...jobs];
    setJobs(updatedJobs);
    localStorage.setItem('recruit_jobs', JSON.stringify(updatedJobs));
    return newJob;
  };

  const deleteJob = (id) => {
    const updatedJobs = jobs.filter(job => job.id !== id);
    setJobs(updatedJobs);
    localStorage.setItem('recruit_jobs', JSON.stringify(updatedJobs));
  };

  return {
    jobs,
    getJobById,
    getJobsByEmployer,
    addJob,
    deleteJob,
    refreshJobs: loadJobs
  };
}
