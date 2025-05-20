import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Using the configured axios from axiosConfig.js
import { useAuth } from '../contexts/AuthContext';

const EditableSection = ({ pageName, sectionName, initialContent, onSave, isHtml = true, Tag = 'div' }) => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [currentContent, setCurrentContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update currentContent if initialContent changes from parent (e.g., after first fetch)
  useEffect(() => {
    setCurrentContent(initialContent);
  }, [initialContent]);

  const handleEdit = () => {
    setIsEditing(true);
    // currentContent is already up-to-date via useEffect or initial state
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentContent(initialContent); // Reset to original if any changes were made
    setError(null);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(`/api/content/${pageName}/${sectionName}`, {
        content: currentContent,
      });
      if (response.status === 200 || response.status === 201) {
        onSave(sectionName, currentContent); // Update parent state
        setIsEditing(false);
      } else {
        setError('Failed to save content. Please try again.');
      }
    } catch (err) {
      console.error('Error saving content:', err);
      setError(err.response?.data?.error || 'An error occurred while saving.');
    } finally {
      setIsLoading(false);
    }
  };

  const EditControls = () => (
    <div style={{ marginTop: '10px', border: '1px dashed #ccc', padding: '10px' }}>
      <textarea
        value={currentContent}
        onChange={(e) => setCurrentContent(e.target.value)}
        rows={isHtml ? 10 : 3}
        style={{ width: '100%', marginBottom: '10px', padding: '5px', border: '1px solid #ddd' }}
        placeholder={`Enter content for ${sectionName}`}
      />
      <button onClick={handleSave} disabled={isLoading} style={{ marginRight: '10px', padding: '8px 15px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
        {isLoading ? 'Saving...' : 'Save'}
      </button>
      <button onClick={handleCancel} disabled={isLoading} style={{ padding: '8px 15px', background: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}>
        Cancel
      </button>
      {error && <p style={{ color: 'red', marginTop: '5px' }}>Error: {error}</p>}
    </div>
  );

  return (
    <div className={`editable-section-container ${sectionName}-container`}>
      {currentUser?.is_admin && !isEditing && (
        <button 
          onClick={handleEdit} 
          style={{ 
            marginLeft: '10px', 
            padding: '5px 10px', 
            fontSize: '0.8em', 
            cursor: 'pointer',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            float: 'right', // Position edit button
          }}
        >
          Edit
        </button>
      )}
      {isEditing && currentUser?.is_admin ? (
        <EditControls />
      ) : (
        isHtml ? (
          <Tag dangerouslySetInnerHTML={{ __html: initialContent || '' }} />
        ) : (
          <Tag>{initialContent || ''}</Tag>
        )
      )}
      {/* Clear float if edit button was floated */}
      {currentUser?.is_admin && !isEditing && <div style={{clear: 'both'}}></div>}
    </div>
  );
};

export default EditableSection;
