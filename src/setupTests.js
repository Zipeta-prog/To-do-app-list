import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('renders the App component', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    
    expect(getByText('0/0 Complete')).toBeInTheDocument();
    
    expect(getByPlaceholderText('Add a new task...')).toBeInTheDocument();
  });

  it('adds a task when the "Add Task" button is clicked', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const input = getByPlaceholderText('Add a new task...');
    const addButton = getByText('Add Task');

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    expect(getByText('1/1 Complete')).toBeInTheDocument();
    expect(getByText('Keep it going!')).toBeInTheDocument();
    expect(getByText('New Task')).toBeInTheDocument();
  });

  it('removes a task when the "Trash" button is clicked', () => {
    const { getByText, getAllByText } = render(<App />);
    const addButton = getByText('Add Task');

    fireEvent.click(addButton); // Add a task
    fireEvent.click(getByText('Trash')); // Remove the task

    expect(getByText('0/0 Complete')).toBeInTheDocument();
    expect(getByText('Try to do at least one!')).toBeInTheDocument();
    expect(getAllByText('Task').length).toBe(0); // task is removed
  });

  it('marks a task as done when the checkbox is clicked', () => {
    const { getByText, getByTestId } = render(<App />);
    const addButton = getByText('Add Task');

    fireEvent.click(addButton); // Add a task

    const checkbox = getByTestId('task-checkbox');
    fireEvent.click(checkbox); // Mark the task as done

    expect(getByText('1/1 Complete')).toBeInTheDocument();
    expect(getByText('Nice job for today!')).toBeInTheDocument();
  });

  it('renames a task when the "Rename" button is clicked', () => {
    const { getByText, getByTestId } = render(<App />);
    const addButton = getByText('Add Task');

    fireEvent.click(addButton); // Add a task

    const renameButton = getByTestId('rename-button');
    fireEvent.click(renameButton);

    const input = getByTestId('rename-input');
    fireEvent.change(input, { target: { value: 'New Task Name' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' }); // Press Enter to save

    expect(getByText('New Task Name')).toBeInTheDocument();
  });
});
