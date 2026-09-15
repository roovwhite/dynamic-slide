import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { ROUTES } from '@/shared/config/routes';
import { RedirectIfAuth, RequireAuth } from './RouteGuards';

export function AppRouter() {
  return (
    <Routes>
      <Route
        path={ROUTES.login}
        element={
          <RedirectIfAuth>
            <LoginPage />
          </RedirectIfAuth>
        }
      />
      <Route
        path={ROUTES.home}
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
    </Routes>
  );
}
