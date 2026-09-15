import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';

import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '@/entities/session';
import { ROUTES } from '@/shared/config/routes';

interface FormValues {
  email: string;
  password: string;
}

export function LoginForm() {
  const navigate = useNavigate();
  const login = useSessionStore((state) => state.login);

  const form = useForm<FormValues>({
    initialValues: { email: '', password: '' },
    validate: {
      email: isEmail('Введите корректный email'),
      password: (value) =>
        value.length < 3 ? 'Пароль должен содержать не менее 3 символов' : null,
    },
  });

  const handleSubmit = form.onSubmit(() => {
    login(crypto.randomUUID());
    navigate(ROUTES.home, { replace: true });
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput
          type="email"
          label="Email"
          placeholder="email@example.com"
          required
          autoComplete="username"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label="Пароль"
          placeholder="Не менее 3 символов"
          required
          autoComplete="current-password"
          {...form.getInputProps('password')}
        />
        <Button type="submit" fullWidth>
          Войти
        </Button>
      </Stack>
    </form>
  );
}
