import { Button } from '@mantine/core';

import { IconLogout } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '@/entities/session';
import { ROUTES } from '@/shared/config/routes';

export function LogoutButton() {
  const navigate = useNavigate();
  const logout = useSessionStore((state) => state.logout);

  const handleClick = () => {
    logout();
    navigate(ROUTES.login, { replace: true });
  };

  return (
    <Button variant="default" leftSection={<IconLogout size={18} />} onClick={handleClick}>
      Выйти
    </Button>
  );
}
