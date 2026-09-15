import { Group, Title } from '@mantine/core';

import { LogoutButton } from '@/features/auth/logout';

export function Header() {
  return (
    <Group justify="space-between" pt="md" pb="xl">
      <Title order={1}>Карусель слайдов</Title>
      <LogoutButton />
    </Group>
  );
}
