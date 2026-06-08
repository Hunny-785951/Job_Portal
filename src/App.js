import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { JobDetails } from './pages/JobDetails';
import { ApplyJob } from './pages/ApplyJob';
import { PostJob } from './pages/PostJob';
import { Profile } from './pages/Profile';
import { EmployerDashboard } from './pages/EmployerDashboard';
import { UserDashboard } from './pages/UserDashboard';

// Protected Route Components
function RequireAuth({ children, role }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (role && currentUser.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-wrapper flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              
              {/* Profile Route */}
              <Route path="/profile" element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              } />

              {/* Applicant Routes */}
              <Route path="/jobs/:id/apply" element={
                <RequireAuth role="applicant">
                  <ApplyJob />
                </RequireAuth>
              } />
              <Route path="/user/dashboard" element={
                <RequireAuth role="applicant">
                  <UserDashboard />
                </RequireAuth>
              } />

              {/* Employer Routes */}
              <Route path="/jobs/new" element={
                <RequireAuth role="employer">
                  <PostJob />
                </RequireAuth>
              } />
              <Route path="/employer/dashboard" element={
                <RequireAuth role="employer">
                  <EmployerDashboard />
                </RequireAuth>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
