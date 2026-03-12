import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';

const mockLogout = vi.fn();
const mockTasks = [
  {
    id: '1',
    title: 'Task 1',
    status: 'todo',
    priority: 'high',
    assignedTo: '1',
    createdAt: new Date().toISOString()
  }
];

const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@test.com'
};

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: mockUser,
    logout: mockLogout
  })
}));

vi.mock('../contexts/TaskContext', () => ({
  useTask: () => ({
    tasks: mockTasks,
    loading: false,
    createTask: vi.fn(),
    updateTask: vi.fn(),
    deleteTask: vi.fn(),
    users: [{ id: '1', name: 'User 1', email: 'user1@test.com' }]
  })
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    mockLogout.mockClear();
  });

  it('renders dashboard header', () => {
    render(<Dashboard />);
    expect(screen.getByText('Gestionnaire de Tâches')).toBeInTheDocument();
  });

  it('displays user name in header', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Bienvenue, Test User/i)).toBeInTheDocument();
  });

  it('shows logout button', () => {
    render(<Dashboard />);
    const logoutButton = screen.getByRole('button', { name: /Déconnexion/i });
    expect(logoutButton).toBeInTheDocument();
  });

  it('calls logout when logout button clicked', () => {
    render(<Dashboard />);
    const logoutButton = screen.getByRole('button', { name: /Déconnexion/i });
    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
  });

  it('shows "Nouvelle Tâche" button', () => {
    render(<Dashboard />);
    expect(screen.getByRole('button', { name: /Nouvelle Tâche/i })).toBeInTheDocument();
  });

  it('shows "Nouvelle Tâche" button clickable', () => {
    render(<Dashboard />);
    const newTaskButton = screen.getByRole('button', { name: /Nouvelle Tâche/i });
    expect(newTaskButton).not.toBeDisabled();
  });
});
