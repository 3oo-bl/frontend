import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authorizeClient } from '@/app/auth';
import { loginUser } from '../api/loginUser';
import { extractPersonalToken } from '../api/shared';

const DEFAULT_LOGIN_ERROR = 'Не удалось авторизоваться';

type LoginFormValues = {
  email: string;
  password: string;
};

const INITIAL_FORM_VALUES: LoginFormValues = {
  email: '',
  password: '',
};

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (
    field: keyof LoginFormValues,
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

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await loginUser({
        email: formValues.email.trim(),
        password: formValues.password,
      });

      authorizeClient(extractPersonalToken(response));
      navigate('/profile', { replace: true });
    } catch (error) {
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : DEFAULT_LOGIN_ERROR,
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
