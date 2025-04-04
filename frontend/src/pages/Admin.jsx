// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';



function Admin() {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('events');
  
  const { currentUser } = useAuth();
  const token = localStorage.getItem('accessToken');
  const apiClient = axios.create({
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    timeout: 10000 // 10 seconds
  });
  // Event form state
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    day: '',
    time: '',
    location: ''
  });
  
  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/api/events');
      setEvents(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      // This endpoint may not exist yet - you'll need to implement it in your backend
      const response = await apiClient.get('/api/admin/users');
      setUsers(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching users:', err);
      // In case the endpoint doesn't exist yet, don't show error to user
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    const loadData = async () => {
      if (activeTab === 'events') {
        await fetchEvents();
      } else if (activeTab === 'users') {
        await fetchUsers();
      }
    };
    
    loadData();
  }, [activeTab]);
  
  const handleEventFormChange = (e) => {
    const { name, value } = e.target;
    setEventForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!eventForm.title || !eventForm.description) {
      setError('Title and description are required.');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Create a clean request payload with only valid fields
      const payload = {
        title: eventForm.title,
        description: eventForm.description
      };
      
      // Add optional fields only if they have values
      if (eventForm.date) payload.date = eventForm.date;
      if (eventForm.day) payload.day = eventForm.day; 
      if (eventForm.time) payload.time = eventForm.time;
      if (eventForm.location) payload.location = eventForm.location;
      
      // Make the API request
      const response = await apiClient.post('/api/events', payload);
      
      // Add new event to the list
      setEvents(prev => [...prev, response.data]);
      
      // Reset the form
      setEventForm({
        title: '',
        description: '',
        date: '',
        day: '',
        time: '',
        location: ''
      });
      
      setError('');
      
    } catch (err) {
      console.error('Error creating event:', err);
      setError(err.response?.data?.error || 'Failed to create event. Please check your input and try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteEvent = async (eventId) => {
    if (!eventId) {
      setError('Invalid event ID');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        setIsLoading(true);
        await apiClient.delete(`/api/events/${eventId}`);
        
        // Remove deleted event from the list
        setEvents(prev => prev.filter(event => event.id !== eventId));
        setError('');
        
      } catch (err) {
        console.error('Error deleting event:', err);
        setError(err.response?.data?.error || 'Failed to delete event. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const handleUpdateEvent = async (eventId) => {
    if (!eventId) {
      setError('Invalid event ID');
      return;
    }
    
    // Validate required fields
    if (!eventForm.title || !eventForm.description) {
      setError('Title and description are required.');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Create a clean request payload with only valid fields
      const payload = {
        title: eventForm.title,
        description: eventForm.description
      };
      
      // Add optional fields only if they have values
      if (eventForm.date) payload.date = eventForm.date;
      if (eventForm.day) payload.day = eventForm.day; 
      if (eventForm.time) payload.time = eventForm.time;
      if (eventForm.location) payload.location = eventForm.location;
      
      // Make the API request
      const response = await apiClient.put(`/api/events/${eventId}`, payload);
      
      // Update the event in the list
      setEvents(prev => prev.map(event => 
        event.id === eventId ? response.data : event
      ));
      
      // Reset the form
      setEventForm({
        title: '',
        description: '',
        date: '',
        day: '',
        time: '',
        location: ''
      });
      
      setError('');
      
    } catch (err) {
      console.error('Error updating event:', err);
      setError(err.response?.data?.error || 'Failed to update event. Please check your input and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-description">
            Manage Ford Runners Club content and users.
          </p>
        </div>

        {error && (
          <div className="alert alert-error mb-6">
            <div className="alert-icon">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <div className="alert-content">
              <p className="mb-0">{error}</p>
            </div>
          </div>
        )}
        
        <div className="tabs mb-6">
          <button 
            className={`tab ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Manage Events
          </button>
          <button 
            className={`tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Manage Users
          </button>
        </div>
        
        {isLoading ? (
          <div className="text-center p-8">
            <i className="fas fa-circle-notch fa-spin text-3xl text-ford-blue"></i>
            <p className="mt-2">Loading data...</p>
          </div>
        ) : (
          <>
            {/* Events Tab */}
            {activeTab === 'events' && (
              <div>
                <div className="card p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    {eventForm.id ? 'Update Event' : 'Create New Event'}
                  </h2>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (eventForm.id) {
                      handleUpdateEvent(eventForm.id);
                    } else {
                      handleEventSubmit(e);
                    }
                  }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label htmlFor="title" className="form-label">
                          Event Title <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          className="form-control"
                          value={eventForm.title || ''}
                          onChange={handleEventFormChange}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          className="form-control"
                          value={eventForm.location || ''}
                          onChange={handleEventFormChange}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input
                          type="text"
                          id="date"
                          name="date"
                          className="form-control"
                          value={eventForm.date || ''}
                          onChange={handleEventFormChange}
                          placeholder="e.g., June 2025"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="day" className="form-label">Day</label>
                        <input
                          type="text"
                          id="day"
                          name="day"
                          className="form-control"
                          value={eventForm.day || ''}
                          onChange={handleEventFormChange}
                          placeholder="e.g., Every Tuesday"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="time" className="form-label">Time</label>
                        <input
                          type="text"
                          id="time"
                          name="time"
                          className="form-control"
                          value={eventForm.time || ''}
                          onChange={handleEventFormChange}
                          placeholder="e.g., 6:00 PM"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="description" className="form-label">
                        Description <span className="text-error">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        value={eventForm.description || ''}
                        onChange={handleEventFormChange}
                        rows="4"
                        required
                      ></textarea>
                    </div>
                    
                    <div className="form-submit flex gap-2">
                      <button type="submit" className="btn btn-primary">
                        {eventForm.id ? 'Update Event' : 'Create Event'}
                      </button>
                      
                      {eventForm.id && (
                        <button 
                          type="button" 
                          className="btn btn-secondary"
                          onClick={() => {
                            setEventForm({
                              title: '',
                              description: '',
                              date: '',
                              day: '',
                              time: '',
                              location: ''
                            });
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
                
                <h2 className="text-xl font-semibold mb-4">Current Events</h2>
                {events.length === 0 ? (
                  <div className="p-6 bg-gray-100 rounded-lg text-center">
                    <p>No events found. Create your first event using the form above.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-3 text-left">Title</th>
                          <th className="p-3 text-left">Location</th>
                          <th className="p-3 text-left">Date/Day</th>
                          <th className="p-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map(event => (
                          <tr key={event.id} className="border-b">
                            <td className="p-3">{event.title}</td>
                            <td className="p-3">{event.location}</td>
                            <td className="p-3">{event.date || event.day}</td>
                            <td className="p-3">
                              <div className="flex gap-2">
                                <button 
                                  className="btn btn-sm btn-secondary"
                                  onClick={() => {
                                    // Populate form with event data for editing
                                    setEventForm({
                                      id: event.id,
                                      title: event.title || '',
                                      description: event.description || '',
                                      date: event.date || '',
                                      day: event.day || '',
                                      time: event.time || '',
                                      location: event.location || ''
                                    });
                                    // Scroll to form
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                  }}
                                >
                                  Edit
                                </button>
                                <button 
                                  className="btn btn-sm btn-error"
                                  onClick={() => handleDeleteEvent(event.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            
            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
                {users.length === 0 ? (
                  <div className="p-6 bg-gray-100 rounded-lg text-center">
                    <p>No users found or user management API not available.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-3 text-left">Username</th>
                          <th className="p-3 text-left">Email</th>
                          <th className="p-3 text-left">Joined</th>
                          <th className="p-3 text-left">Role</th>
                          <th className="p-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                          <tr key={user.id} className="border-b">
                            <td className="p-3">{user.username}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">{new Date(user.created_at).toLocaleDateString()}</td>
                            <td className="p-3">
                              {user.is_admin ? (
                                <span className="badge badge-primary">Admin</span>
                              ) : (
                                <span className="badge badge-secondary">User</span>
                              )}
                            </td>
                            <td className="p-3">
                              <div className="flex gap-2">
                                <button 
                                  className="btn btn-sm btn-secondary"
                                  onClick={() => alert('Edit user functionality would go here')}
                                >
                                  Edit
                                </button>
                                {user.id !== currentUser?.id && (
                                  <button 
                                    className="btn btn-sm btn-error"
                                    onClick={() => alert('Delete user functionality would go here')}
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default Admin;