// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setFormError('All fields are required');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 8) {
      setFormError('Password must be at least 8 characters');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsLoading(true);
      setFormError('');
      
      await register(formData.username, formData.email, formData.password);
      
      // Navigate to home page after successful registration
      navigate('/');
    } catch (error) {
      setFormError(error.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Create an Account</h1>
          <p className="page-description">
            Join the Ford Runners Club community today.
          </p>
        </div>

        <div className="card p-8 max-w-md mx-auto">
          {(formError || error) && (
            <div className="alert alert-error mb-6">
              <div className="alert-icon">
                <i className="fas fa-exclamation-circle"></i>
              </div>
              <div className="alert-content">
                <p className="mb-0">{formError || error}</p>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <small className="form-text">Password must be at least 8 characters long</small>
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-submit">
              <button 
                type="submit" 
                className="btn btn-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Register'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p>
              Already have an account? <Link to="/login" className="text-ford-blue hover:underline">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;