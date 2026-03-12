import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { AuthProvider } from '../contexts/AuthContext';

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  it('renders login form', () => {
    renderLogin();
    expect(screen.getByText('Connexion')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Se connecter/i })).toBeInTheDocument();
  });

  it('handles email and password input change', () => {
    renderLogin();
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@test.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('shows register link', () => {
    renderLogin();
    const registerLink = screen.getByRole('link', { name: /S'inscrire/i });
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  it('button is enabled initially', () => {
    renderLogin();
    const button = screen.getByRole('button', { name: /Se connecter/i });
    expect(button).not.toBeDisabled();
  });
});
