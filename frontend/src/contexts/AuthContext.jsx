// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configure axios to use the token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('accessToken', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('accessToken');
    }
  }, [token]);

  // Store refresh token
  useEffect(() => {
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      localStorage.removeItem('refreshToken');
    }
  }, [refreshToken]);

  // Verify token on load
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get('/api/auth/verify');
        if (response.data.valid) {
          // Get user data
          const userResponse = await axios.get('/api/auth/me');
          setCurrentUser(userResponse.data);
        } else {
          // Try to refresh the token
          await refreshAccessToken();
        }
      } catch (error) {
        // Try to refresh the token if original token was invalid
        try {
          await refreshAccessToken();
        } catch (refreshError) {
          setToken(null);
          setRefreshToken(null);
          setCurrentUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  // Function to refresh access token
  const refreshAccessToken = async () => {
    if (!refreshToken) throw new Error('No refresh token available');

    try {
      const response = await axios.post('/api/auth/refresh', {
        refresh_token: refreshToken
      });
      
      const newToken = response.data.access_token;
      setToken(newToken);
      
      // Get updated user data
      const userResponse = await axios.get('/api/auth/me');
      setCurrentUser(userResponse.data);
      
      return newToken;
    } catch (error) {
      setToken(null);
      setRefreshToken(null);
      setCurrentUser(null);
      throw error;
    }
  };

  // Login function
  const login = async (username, password) => {
    try {
      setError(null);
      const response = await axios.post('/api/auth/login', { username, password });
      setToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
      setCurrentUser(response.data.user);
      return response.data.user;
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
      throw error;
    }
  };

  // Register function
  const register = async (username, email, password) => {
    try {
      setError(null);
      const response = await axios.post('/api/auth/register', {
        username,
        email,
        password
      });
      setToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
      setCurrentUser(response.data.user);
      return response.data.user;
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setRefreshToken(null);
    setCurrentUser(null);
    setError(null);
  };

  const value = {
    currentUser,
    token,
    loading,
    error,
    login,
    register,
    logout,
    refreshToken: refreshAccessToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};