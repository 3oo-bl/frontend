import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authorizeClient } from '@/app/auth';
import { registerUser } from '../api/registerUser';

const DEFAULT_PREFERENCES = {
  price: 0,
  delivery: 0,
  sellerRating: 0,
} as const;

const DEFAULT_ERROR_MESSAGE = 'Не удалось зарегистрироваться';

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const INITIAL_FORM_VALUES: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (
    field: keyof RegisterFormValues,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.currentTarget;

    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (formValues.password !== formValues.confirmPassword) {
      setErrorMessage('Пароли не совпадают');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await registerUser({
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        password: formValues.password,
        preferences: DEFAULT_PREFERENCES,
      });

      authorizeClient();
      navigate('/profile', { replace: true });
    } catch (error) {
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : DEFAULT_ERROR_MESSAGE,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    errorMessage,
    formValues,
    handleFieldChange,
    handleSubmit,
    isSubmitting,
  };
};
