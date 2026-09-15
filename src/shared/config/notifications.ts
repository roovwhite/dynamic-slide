import type { CSSProperties } from 'react';

export const NOTIFICATION_AUTO_CLOSE_MS = 5000;

export const notificationProgressStyle: CSSProperties = {
  ['--notification-duration' as string]: `${NOTIFICATION_AUTO_CLOSE_MS}ms`,
};
