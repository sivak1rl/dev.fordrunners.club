import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import About from './About';

// Mock axios
jest.mock('axios');

// Mock EditableSection component
jest.mock('../components/EditableSection', () => {
  // The mock component will just display its props for easier assertion
  return jest.fn(({ pageName, sectionName, initialContent, Tag = 'div' }) => (
    <div data-testid={`editable-${sectionName}`}>
      <Tag>{initialContent}</Tag>
      <span>Page: {pageName}</span>
    </div>
  ));
});

// Helper function to render with AuthContext
const renderWithAuth = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AuthContext.Provider value={providerProps}>{ui}</AuthContext.Provider>,
    renderOptions
  );
};

describe('About Page', () => {
  const mockAboutContent = [
    { section_name: 'header_title', content: 'About Us Title from API' },
    { section_name: 'intro_text', content: 'Intro text from API.' },
    { section_name: 'mission_title', content: 'Our Mission API' },
    // Add more mock sections as needed by the About page structure
  ];

  beforeEach(() => {
    axios.get.mockReset();
    // Clear mock calls for EditableSection if needed, though jest.fn() does this somewhat
    require('../components/EditableSection').mockClear(); 
  });

  test('fetches and displays content for non-admin user', async () => {
    axios.get.mockResolvedValue({ data: mockAboutContent });
    const providerProps = { currentUser: { is_admin: false }, loading: false };

    renderWithAuth(<About />, { providerProps });

    // Wait for content to be fetched and rendered
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/content/about');
    });

    // Check if EditableSection was called with correct initial content
    // For header_title
    expect(screen.getByTestId('editable-header_title')).toBeInTheDocument();
    expect(screen.getByTestId('editable-header_title').querySelector('h1')).toHaveTextContent('About Us Title from API');
    
    // For intro_text
    expect(screen.getByTestId('editable-intro_text')).toBeInTheDocument();
    expect(screen.getByTestId('editable-intro_text').querySelector('p')).toHaveTextContent('Intro text from API.');

    // For mission_title (assuming it's inside an h2 then a span as per current About.jsx structure)
    // The mock EditableSection renders initialContent inside the Tag, so we look for the content.
    const missionTitleSection = screen.getByTestId('editable-mission_title');
    expect(missionTitleSection).toBeInTheDocument();
    // The mock renders initialContent in a span if Tag is span.
    // About.jsx structure: <h2 ...><EditableSection Tag="span" ... /></h2>
    // So we check the content of the span within the h2.
    expect(missionTitleSection.querySelector('span')).toHaveTextContent('Our Mission API');


    // Verify EditableSection was used (mock implementation checks this implicitly by rendering)
    const EditableSectionMock = require('../components/EditableSection');
    expect(EditableSectionMock).toHaveBeenCalled();
    // Check props of one of the EditableSection calls (e.g., header_title)
    expect(EditableSectionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        pageName: "about",
        sectionName: "header_title",
        initialContent: "About Us Title from API",
      }),
      expect.anything() // Second argument to functional component calls (context)
    );
  });

  test('admin user sees UI elements indicating editability (via EditableSection props)', async () => {
    axios.get.mockResolvedValue({ data: mockAboutContent });
    // currentUser being an admin is handled by EditableSection itself, 
    // About page just passes data. EditableSection's own tests verify its behavior.
    // Here, we just ensure About page renders EditableSection correctly.
    const providerProps = { currentUser: { is_admin: true, id: 1 }, loading: false };

    renderWithAuth(<About />, { providerProps });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/content/about');
    });

    expect(screen.getByTestId('editable-header_title')).toBeInTheDocument();
    expect(screen.getByTestId('editable-intro_text')).toBeInTheDocument();
    
    const EditableSectionMock = require('../components/EditableSection');
    expect(EditableSectionMock).toHaveBeenCalled();
    // Example: Check one call to ensure it's getting the right props
    expect(EditableSectionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          pageName: "about",
          sectionName: "header_title",
          initialContent: "About Us Title from API",
        }),
        expect.anything()
      );
    // The actual "Edit" button visibility is tested in EditableSection.test.js.
    // Here, we confirm that EditableSection is used, and it will internally handle showing the button.
  });

  test('displays loading state initially', () => {
    axios.get.mockResolvedValue({ data: mockAboutContent }); // Will resolve after loading state check
    const providerProps = { currentUser: null, loading: false }; // Auth loading is false, page loading is internal
    
    renderWithAuth(<About />, { providerProps });
    // About.jsx has its own loading state, independent of AuthContext loading.
    // It sets loading to true initially.
    expect(screen.getByText(/loading content.../i)).toBeInTheDocument();
  });

  test('handles error during content fetch', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const providerProps = { currentUser: null, loading: false };

    renderWithAuth(<About />, { providerProps });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/content/about');
    });
    
    // After error, loading should be false, and content might be fallbacks or empty
    // Check that the loading text is gone
    expect(screen.queryByText(/loading content.../i)).not.toBeInTheDocument();
    // Check that fallback content is shown (or whatever the error state renders)
    // For example, if header_title uses a fallback:
    const EditableSectionMock = require('../components/EditableSection');
    // Check that EditableSection was called with its fallback content
     expect(EditableSectionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          sectionName: "header_title",
          initialContent: "About Ford Runners Club", // Default fallback in About.jsx
        }),
        expect.anything()
      );

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching about page content:', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });
});
