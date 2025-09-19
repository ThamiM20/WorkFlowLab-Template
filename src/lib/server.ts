import 'server-only';

import { cache } from 'react';

/**
 * Get the current session
 *
 * NOTICE: do not call it from middleware
 */
export const getSession = cache(async () => {
  // Since we're removing authentication, we'll return mock session data
  const session = {
    user: {
      id: 'user-id',
      name: 'User',
      email: 'user@example.com',
      emailVerified: true,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'user',
      banned: null,
      banReason: null,
      banExpires: null,
      customerId: null,
    },
    session: {
      id: 'session-id',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    },
  };

  return session;
});