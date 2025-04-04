// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page the user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setFormError('Please enter both username and password');
      return;
    }
    
    try {
      setIsLoading(true);
      setFormError('');
      
      await login(formData.username, formData.password);
      
      // Navigate to the page they were trying to access or home
      navigate(from, { replace: true });
    } catch (error) {
      setFormError(error.response?.data?.error || 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Login</h1>
          <p className="page-description">
            Sign in to access your Ford Runners Club account.
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
              <label htmlFor="username" className="form-label">Username or Email</label>
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
            </div>
            
            <div className="form-submit">
              <button 
                type="submit" 
                className="btn btn-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p>
              Don't have an account? <Link to="/register" className="text-ford-blue hover:underline">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;