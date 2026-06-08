import React from 'react';
import { useJobs } from '../hooks/useJobs';
import { JobCard } from '../components/JobCard';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../css/Home.css';

export function Home() {
  const { jobs } = useJobs();
  useScrollReveal([jobs]);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container hero-content flex flex-col items-center text-center reveal">
          <h1 className="hero-title reveal delay-100">
            Find Your <span className="text-primary">Dream Job</span> Today
          </h1>
          <p className="hero-subtitle reveal delay-200">
            Discover thousands of job opportunities with all the information you need.
          </p>
          <div className="hero-search glass reveal delay-300">
            <input 
              type="text" 
              placeholder="Job title, keywords, or company" 
              className="hero-search-input"
            />
            <button className="btn btn-primary btn-lg">Search</button>
          </div>
        </div>
      </section>

      <section className="jobs-section container reveal">
        <div className="section-header flex justify-between items-center reveal-left">
          <h2>Featured Jobs</h2>
          <span className="text-secondary">{jobs.length} jobs available</span>
        </div>
        
        {jobs.length > 0 ? (
          <div className="jobs-grid">
            {jobs.map((job, idx) => (
              <div key={job.id} className={`reveal-scale delay-${(idx % 5) * 100 + 100}`}>
                <JobCard job={job} />
              </div>
            ))}
          </div>
        ) : (
          <div className="no-jobs glass flex flex-col items-center justify-center text-center">
            <h3>No jobs found</h3>
            <p>Check back later for new opportunities.</p>
          </div>
        )}
      </section>
    </div>
  );
}
