import { AppProviders } from './providers/AppProviders';
import { AppRouter } from './router/AppRouter';

import './styles/index.css';

export function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}
