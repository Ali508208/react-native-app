import { useMemo, useState } from 'react';

import type { User } from '../model/User';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildDisplayName(email: string) {
  const [localPart] = email.split('@');
  return localPart
    .split(/[._-]+/)
    .filter(Boolean)
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

export function useAuthPresenter() {
  const [email, setEmail] = useState('alihamxa300@gmail.com');
  const [password, setPassword] = useState('123456');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState<User | null>(null);

  const isSubmitDisabled = useMemo(() => {
    return email.trim().length === 0 || password.trim().length === 0;
  }, [email, password]);

  const submit = () => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setErrorMessage('Enter a valid work email address.');
      return;
    }

    if (trimmedPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setErrorMessage('');
    setUser({
      email: trimmedEmail,
      displayName: buildDisplayName(trimmedEmail) || 'Team Member',
      lastLoginLabel: new Date().toLocaleString(),
    });
  };

  const logout = () => {
    setUser(null);
    setErrorMessage('');
    setIsPasswordVisible(false);
  };

  return {
    email,
    password,
    isPasswordVisible,
    errorMessage,
    isSubmitDisabled,
    user,
    updateEmail: (value: string) => {
      setEmail(value);
      if (errorMessage) {
        setErrorMessage('');
      }
    },
    updatePassword: (value: string) => {
      setPassword(value);
      if (errorMessage) {
        setErrorMessage('');
      }
    },
    togglePasswordVisibility: () => {
      setIsPasswordVisible(currentValue => !currentValue);
    },
    submit,
    logout,
  };
}