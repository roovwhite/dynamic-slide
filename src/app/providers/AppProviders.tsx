import type { PropsWithChildren } from 'react';

import { createTheme, InputWrapper, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import { HashRouter } from 'react-router-dom';
import { NOTIFICATION_AUTO_CLOSE_MS } from '@/shared/config/notifications';

const theme = createTheme({
  cursorType: 'pointer',
  components: {
    InputWrapper: InputWrapper.extend({
      styles: { label: { cursor: 'pointer' } },
    }),
  },
});

// HashRouter avoids the GitHub Pages 404-on-refresh problem for a static SPA deploy.
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <MantineProvider defaultColorScheme="light" theme={theme}>
      <Notifications position="top-right" autoClose={NOTIFICATION_AUTO_CLOSE_MS} />
      <ModalsProvider>
        <HashRouter>{children}</HashRouter>
      </ModalsProvider>
    </MantineProvider>
  );
}
