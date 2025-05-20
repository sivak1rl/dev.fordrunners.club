import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios'; // Will be mocked
import { AuthContext } from '../contexts/AuthContext';
import EditableSection from './EditableSection';

// Mock axios
jest.mock('axios');

// Helper function to render with AuthContext
const renderWithAuth = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AuthContext.Provider value={providerProps}>{ui}</AuthContext.Provider>,
    renderOptions
  );
};

describe('EditableSection Component', () => {
  const mockOnSave = jest.fn();
  const pageName = 'testPage';
  const sectionName = 'testSection';
  const initialContent = '<p>Initial Content</p>';
  const newContent = '<p>Updated Content</p>';

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset axios mock for each test
    axios.put.mockReset(); 
  });

  // --- Display Mode (Non-Admin) ---
  test('renders initial content and no edit button for non-admin user', () => {
    const providerProps = { currentUser: { is_admin: false } };
    renderWithAuth(
      <EditableSection
        pageName={pageName}
        sectionName={sectionName}
        initialContent={initialContent}
        onSave={mockOnSave}
      />,
      { providerProps }
    );

    expect(screen.getByText('Initial Content')).toBeInTheDocument(); // RTL queries by text content of p tag
    expect(screen.queryByRole('button', { name: /edit/i })).not.toBeInTheDocument();
  });

  // --- Display Mode (Admin) ---
  test('renders initial content and edit button for admin user', () => {
    const providerProps = { currentUser: { is_admin: true } };
    renderWithAuth(
      <EditableSection
        pageName={pageName}
        sectionName={sectionName}
        initialContent={initialContent}
        onSave={mockOnSave}
      />,
      { providerProps }
    );

    expect(screen.getByText('Initial Content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
  });

  // --- Edit Mode Toggle (Admin) ---
  test('admin can toggle to edit mode, showing textarea and save/cancel buttons', () => {
    const providerProps = { currentUser: { is_admin: true } };
    renderWithAuth(
      <EditableSection
        pageName={pageName}
        sectionName={sectionName}
        initialContent={initialContent}
        onSave={mockOnSave}
      />,
      { providerProps }
    );

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue(initialContent); // Textarea value will be the raw HTML string
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  // --- Cancel Editing (Admin) ---
  test('admin can cancel editing, reverting to original content', () => {
    const providerProps = { currentUser: { is_admin: true } };
    renderWithAuth(
      <EditableSection
        pageName={pageName}
        sectionName={sectionName}
        initialContent={initialContent}
        onSave={mockOnSave}
      />,
      { providerProps }
    );

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: newContent } });
    expect(textarea).toHaveValue(newContent);

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getByText('Initial Content')).toBeInTheDocument(); // Reverted to initial
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  // --- Save Editing (Admin) ---
  test('admin can save edited content successfully', async () => {
    axios.put.mockResolvedValue({ status: 200, data: { section_name: sectionName, content: newContent, last_modified_by: 1 } });
    const providerProps = { currentUser: { is_admin: true, id: 1 } };
    
    renderWithAuth(
      <EditableSection
        pageName={pageName}
        sectionName={sectionName}
        initialContent={initialContent}
        onSave={mockOnSave}
      />,
      { providerProps }
    );

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: newContent } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        `/api/content/${pageName}/${sectionName}`,
        { content: newContent }
      );
    });
    
    expect(mockOnSave).toHaveBeenCalledWith(sectionName, newContent);
    // Component should return to display mode, which means the textarea is gone.
    // The actual content update in the parent is mocked by onSave.
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

   // --- Save Editing Failure (Admin) ---
  test('handles error when saving edited content fails', async () => {
    axios.put.mockRejectedValue({ response: { data: { error: 'Save failed miserably' } } });
    // Mock console.error for this test
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const providerProps = { currentUser: { is_admin: true, id: 1 } };
    renderWithAuth(
      <EditableSection
        pageName={pageName}
        sectionName={sectionName}
        initialContent={initialContent}
        onSave={mockOnSave}
      />,
      { providerProps }
    );

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: newContent } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledTimes(1);
    });
    
    expect(mockOnSave).not.toHaveBeenCalled();
    // Check for error message (as per component's implementation)
    expect(await screen.findByText(/Error: Save failed miserably/i)).toBeInTheDocument(); 
    // Ensure it remains in edit mode
    expect(screen.getByRole('textbox')).toBeInTheDocument(); 
    expect(consoleErrorSpy).toHaveBeenCalled(); // Verify console.error was called

    consoleErrorSpy.mockRestore();
  });

  test('renders plain text content when isHtml is false', () => {
    const plainTextContent = "Just plain text";
    const providerProps = { currentUser: { is_admin: false } };
    renderWithAuth(
      <EditableSection
        pageName={pageName}
        sectionName={sectionName}
        initialContent={plainTextContent}
        onSave={mockOnSave}
        isHtml={false}
        Tag="h1"
      />,
      { providerProps }
    );
    // Check if the content is rendered as plain text within the specified Tag
    const h1Element = screen.getByRole('heading', { level: 1 });
    expect(h1Element).toHaveTextContent(plainTextContent);
    // Ensure no inner HTML interpretation
    expect(h1Element.innerHTML).toBe(plainTextContent);
  });
});
