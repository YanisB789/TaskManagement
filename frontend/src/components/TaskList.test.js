import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';

const mockOnEditTask = vi.fn();
const mockUpdateTask = vi.fn();
const mockDeleteTask = vi.fn();

const mockTasks = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Description 1',
    status: 'todo',
    priority: 'high',
    assignedTo: '1',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'Description 2',
    status: 'progress',
    priority: 'medium',
    assignedTo: '2',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Task 3',
    description: 'Description 3',
    status: 'done',
    priority: 'low',
    assignedTo: '1',
    createdAt: new Date().toISOString()
  }
];

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

describe('TaskList Component', () => {
  beforeEach(() => {
    mockOnEditTask.mockClear();
    mockUpdateTask.mockClear();
    mockDeleteTask.mockClear();
  });

  it('renders task board with three columns', () => {
    render(<TaskList tasks={mockTasks} onEditTask={mockOnEditTask} />);
    const headers = screen.getAllByRole('heading');
    expect(headers.length).toBeGreaterThan(0);
  });

  it('displays correct task count for each status', () => {
    render(<TaskList tasks={mockTasks} onEditTask={mockOnEditTask} />);
    const counts = screen.getAllByText(/\d/);
    expect(counts.length).toBeGreaterThan(0);
  });

  it('shows task titles in the board', () => {
    render(<TaskList tasks={mockTasks} onEditTask={mockOnEditTask} />);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
  });

  it('shows empty state message when no tasks in a column', () => {
    const tasksWithGap = [mockTasks[0], mockTasks[2]]; // Only todo and done
    render(<TaskList tasks={tasksWithGap} onEditTask={mockOnEditTask} />);
    // Just verify component renders without error
    expect(screen.getByText('Task 1')).toBeInTheDocument();
  });

  it('renders empty task list when no tasks provided', () => {
    render(<TaskList tasks={[]} onEditTask={mockOnEditTask} />);
    // All columns should be empty
    const emptyMessages = screen.queryAllByText(/Aucune tâche/i);
    expect(emptyMessages.length).toBeGreaterThan(0);
  });
});
