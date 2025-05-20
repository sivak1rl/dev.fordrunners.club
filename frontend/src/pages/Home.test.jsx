import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import Home from './Home';

// Mock axios
jest.mock('axios');

// Mock EditableSection component
jest.mock('../components/EditableSection', () => {
  return jest.fn(({ pageName, sectionName, initialContent, Tag = 'div' }) => (
    <div data-testid={`editable-${sectionName}`}>
      <Tag>{initialContent}</Tag>
      <span>Page: {pageName}</span>
    </div>
  ));
});

// Mock react-router-dom's Link component
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // import and retain default behavior
  Link: jest.fn(({ to, children, ...props }) => <a href={to} {...props}>{children}</a>),
}));


// Helper function to render with AuthContext
const renderWithAuth = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AuthContext.Provider value={providerProps}>{ui}</AuthContext.Provider>,
    renderOptions
  );
};

describe('Home Page', () => {
  const mockHomeContent = [
    { section_name: 'hero_title', content: 'Welcome from API' },
    { section_name: 'hero_paragraph', content: 'Hero paragraph from API.' },
    { section_name: 'features_title', content: 'Features API' },
    // Add more mock sections as needed by the Home page structure
  ];

  beforeEach(() => {
    axios.get.mockReset();
    require('../components/EditableSection').mockClear();
    require('react-router-dom').Link.mockClear();
  });

  test('fetches and displays content for non-admin user', async () => {
    axios.get.mockResolvedValue({ data: mockHomeContent });
    const providerProps = { currentUser: { is_admin: false }, loading: false };

    renderWithAuth(<Home />, { providerProps });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/content/home');
    });

    // Check if EditableSection was called with correct initial content for hero_title
    expect(screen.getByTestId('editable-hero_title')).toBeInTheDocument();
    expect(screen.getByTestId('editable-hero_title').querySelector('h1')).toHaveTextContent('Welcome from API');
    
    // For hero_paragraph
    expect(screen.getByTestId('editable-hero_paragraph')).toBeInTheDocument();
    expect(screen.getByTestId('editable-hero_paragraph').querySelector('p')).toHaveTextContent('Hero paragraph from API.');

    // For features_title (assuming it's inside an h2 then a span)
    const featuresTitleSection = screen.getByTestId('editable-features_title');
    expect(featuresTitleSection).toBeInTheDocument();
    expect(featuresTitleSection.querySelector('span')).toHaveTextContent('Features API');

    const EditableSectionMock = require('../components/EditableSection');
    expect(EditableSectionMock).toHaveBeenCalled();
    expect(EditableSectionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        pageName: "home",
        sectionName: "hero_title",
        initialContent: "Welcome from API",
      }),
      expect.anything()
    );
    
    // Check that Link components are rendered (mocked as <a>)
    expect(screen.getByText('New Runners Start Here').closest('a')).toHaveAttribute('href', '/new');
    expect(screen.getByText('View Upcoming Events').closest('a')).toHaveAttribute('href', '/events');
  });

  test('admin user sees UI elements indicating editability (via EditableSection props)', async () => {
    axios.get.mockResolvedValue({ data: mockHomeContent });
    const providerProps = { currentUser: { is_admin: true, id: 1 }, loading: false };

    renderWithAuth(<Home />, { providerProps });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/content/home');
    });

    expect(screen.getByTestId('editable-hero_title')).toBeInTheDocument();
    
    const EditableSectionMock = require('../components/EditableSection');
    expect(EditableSectionMock).toHaveBeenCalled();
    // The actual "Edit" button visibility is tested in EditableSection.test.js.
  });

  test('displays loading state initially', () => {
    axios.get.mockResolvedValue({ data: mockHomeContent });
    const providerProps = { currentUser: null, loading: false };
    
    renderWithAuth(<Home />, { providerProps });
    expect(screen.getByText(/loading content.../i)).toBeInTheDocument();
  });

  test('handles error during content fetch', async () => {
    axios.get.mockRejectedValue(new Error('API Down'));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const providerProps = { currentUser: null, loading: false };

    renderWithAuth(<Home />, { providerProps });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/content/home');
    });
    
    expect(screen.queryByText(/loading content.../i)).not.toBeInTheDocument();
    const EditableSectionMock = require('../components/EditableSection');
     expect(EditableSectionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          sectionName: "hero_title",
          initialContent: "Welcome to the Ford Runners Club", // Default fallback in Home.jsx
        }),
        expect.anything()
      );

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching home page content:', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });
});
