import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from './TaskCard';

const mockOnEditTask = vi.fn();
const mockUpdateTask = vi.fn().mockResolvedValue({ success: true });
const mockDeleteTask = vi.fn().mockResolvedValue({ success: true });

const mockTask = {
  id: '1',
  title: 'Test Task',
  description: 'Test Description',
  status: 'todo',
  priority: 'high',
  assignedTo: '1',
  createdAt: new Date().toISOString()
};

const mockUsers = [
  { id: '1', name: 'User 1', email: 'user1@test.com' },
  { id: '2', name: 'User 2', email: 'user2@test.com' }
];

vi.mock('../contexts/TaskContext', () => ({
  useTask: () => ({
    updateTask: mockUpdateTask,
    deleteTask: mockDeleteTask,
    users: mockUsers
  })
}));

describe('TaskCard Component', () => {
  beforeEach(() => {
    mockOnEditTask.mockClear();
    mockUpdateTask.mockClear();
    mockDeleteTask.mockClear();
  });

  it('renders task title', () => {
    render(<TaskCard task={mockTask} onEditTask={mockOnEditTask} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('renders task description', () => {
    render(<TaskCard task={mockTask} onEditTask={mockOnEditTask} />);
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('displays priority badge', () => {
    render(<TaskCard task={mockTask} onEditTask={mockOnEditTask} />);
    // Check for priority display by role or presence in document
    const priorityElements = screen.getAllByText(/Haute|Moyenne|Basse/i);
    expect(priorityElements.length).toBeGreaterThan(0);
  });

  it('displays assigned user name', () => {
    render(<TaskCard task={mockTask} onEditTask={mockOnEditTask} />);
    // Look for User name anywhere in the document
    const userElements = screen.queryAllByText(/User/i);
    expect(userElements.length).toBeGreaterThan(0);
  });

  it('shows edit button', () => {
    render(<TaskCard task={mockTask} onEditTask={mockOnEditTask} />);
    const editButton = screen.getByRole('button', { name: '✏️' });
    expect(editButton).toBeInTheDocument();
  });

  it('shows delete button', () => {
    render(<TaskCard task={mockTask} onEditTask={mockOnEditTask} />);
    const deleteButton = screen.getByRole('button', { name: '🗑️' });
    expect(deleteButton).toBeInTheDocument();
  });

  it('calls onEditTask when edit button clicked', () => {
    render(<TaskCard task={mockTask} onEditTask={mockOnEditTask} />);
    const editButton = screen.getByRole('button', { name: '✏️' });
    fireEvent.click(editButton);
    expect(mockOnEditTask).toHaveBeenCalledWith(mockTask);
  });

  it('has status dropdown with all options', () => {
    render(<TaskCard task={mockTask} onEditTask={mockOnEditTask} />);
    const statusSelect = screen.getByRole('combobox');
    expect(statusSelect.value).toBe('todo');
    const options = statusSelect.querySelectorAll('option');
    expect(options.length).toBe(3); // todo, progress, done
  });

  it('displays creation date', () => {
    render(<TaskCard task={mockTask} onEditTask={mockOnEditTask} />);
    expect(screen.getByText(/Créé:/i)).toBeInTheDocument();
  });

  it('handles task without description', () => {
    const taskNoDesc = { ...mockTask, description: '' };
    render(<TaskCard task={taskNoDesc} onEditTask={mockOnEditTask} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });
});
