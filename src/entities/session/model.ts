import { create } from 'zustand';

const TOKEN_KEY = 'auth_token';

interface SessionState {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  token: localStorage.getItem(TOKEN_KEY),
  isAuthenticated: Boolean(localStorage.getItem(TOKEN_KEY)),
  login: (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    set({ token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({ token: null, isAuthenticated: false });
  },
}));

window.addEventListener('storage', (event) => {
  if (event.key !== TOKEN_KEY) return;
  useSessionStore.setState({ token: event.newValue, isAuthenticated: Boolean(event.newValue) });
});
