import type { PropsWithChildren } from 'react';

import { Navigate } from 'react-router-dom';
import { useSessionStore } from '@/entities/session';
import { ROUTES } from '@/shared/config/routes';

export function RequireAuth({ children }: PropsWithChildren) {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />;
  }
  return children;
}

export function RedirectIfAuth({ children }: PropsWithChildren) {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to={ROUTES.home} replace />;
  }
  return children;
}
