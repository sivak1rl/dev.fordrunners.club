// src/pages/Profile.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const { currentUser, logout } = useAuth();
  const [formSuccess, setFormSuccess] = useState('');
  
  // Placeholder for password change functionality
  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Implement password change logic here
    setFormSuccess('Password updated successfully!');
  };

  return (
    <main>
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">My Profile</h1>
          <p className="page-description">
            Manage your Ford Runners Club account information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Info Card */}
          <div className="card p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-ford-blue text-white flex items-center justify-center text-3xl mx-auto">
                {currentUser.username.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-semibold mt-4">{currentUser.username}</h2>
              <p className="text-gray-600">{currentUser.email}</p>
              {currentUser.is_admin && (
                <span className="badge badge-primary mt-2">Admin</span>
              )}
            </div>
            
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600">
                Member since: {new Date(currentUser.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          {/* Account Settings */}
          <div className="md:col-span-2">
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
              
              {formSuccess && (
                <div className="alert alert-success mb-4">
                  <div className="alert-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div className="alert-content">
                    <p className="mb-0">{formSuccess}</p>
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
