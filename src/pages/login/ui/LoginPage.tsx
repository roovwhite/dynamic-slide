import { Center, Paper, Stack, Text, Title } from '@mantine/core';

import { LoginForm } from '@/features/auth/login-form';

export function LoginPage() {
  return (
    <Center mih="100vh" p="md">
      <Paper withBorder shadow="sm" radius="md" p="xl" w={360}>
        <Stack gap="xs" mb="lg">
          <Title order={2}>Вход</Title>
          <Text size="sm" c="dimmed">
            Введите email и пароль, чтобы продолжить
          </Text>
        </Stack>
        <LoginForm />
      </Paper>
    </Center>
  );
}
