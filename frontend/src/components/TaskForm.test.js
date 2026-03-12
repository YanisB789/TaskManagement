import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

const mockOnClose = vi.fn();
const mockUsers = [
  { id: '1', name: 'User 1', email: 'user1@test.com' },
  { id: '2', name: 'User 2', email: 'user2@test.com' }
];

vi.mock('../contexts/TaskContext', () => ({
  useTask: () => ({
    createTask: vi.fn().mockResolvedValue({ success: true }),
    updateTask: vi.fn().mockResolvedValue({ success: true }),
    users: mockUsers
  })
}));

const renderTaskForm = (task = null) => {
  return render(
    <TaskForm task={task} onClose={mockOnClose} />
  );
};

describe('TaskForm Component', () => {
  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders form for new task', () => {
    renderTaskForm();
    expect(screen.getByText('Nouvelle tâche')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Créer/i })).toBeInTheDocument();
  });

  it('renders form for editing task', () => {
    const task = {
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      priority: 'high',
      assignedTo: '1'
    };
    renderTaskForm(task);
    expect(screen.getByText('Modifier la tâche')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Modifier/i })).toBeInTheDocument();
  });

  it('allows typing in title field', () => {
    renderTaskForm();
    const titleInput = screen.getByLabelText(/Titre/i);
    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    expect(titleInput.value).toBe('New Task');
  });

  it('allows selecting priority', () => {
    renderTaskForm();
    const prioritySelect = screen.getByLabelText(/Priorité/i);
    fireEvent.change(prioritySelect, { target: { value: 'high' } });
    expect(prioritySelect.value).toBe('high');
  });

  it('shows close button', () => {
    renderTaskForm();
    expect(screen.getByRole('button', { name: '×' })).toBeInTheDocument();
  });

  it('has all priority options', () => {
    renderTaskForm();
    const prioritySelect = screen.getByLabelText(/Priorité/i);
    const options = prioritySelect.querySelectorAll('option');
    expect(options.length).toBe(3); // low, medium, high
  });
});
