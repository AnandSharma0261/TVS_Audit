'use client';

// Mock user credentials for frontend-only authentication
let MOCK_CREDENTIALS = {
  'sharmaanand5213@gmail.com': 'Anand123',
};

if (typeof window !== 'undefined') {
  // Load any saved credentials from localStorage
  const savedCredentials = localStorage.getItem('mockCredentials');
  if (savedCredentials) {
    MOCK_CREDENTIALS = JSON.parse(savedCredentials);
  }
}

export const authenticate = (email, password) => {
  // Check if the email exists and password matches
  if (MOCK_CREDENTIALS[email] === password) {
    // Store authentication state in localStorage
    localStorage.setItem('isAuthenticated', 'true');
    return true;
  }
  return false;
};

export const resetPassword = (email, newPassword) => {
  // Check if the email exists
  if (email in MOCK_CREDENTIALS) {
    // Update the password
    MOCK_CREDENTIALS[email] = newPassword;
    // Save updated credentials to localStorage
    localStorage.setItem('mockCredentials', JSON.stringify(MOCK_CREDENTIALS));
    return true;
  }
  return false;
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('isAuthenticated') === 'true';
};

export const logout = () => {
  localStorage.removeItem('isAuthenticated');
};
