import type { User } from 'better-auth';
import type { auth } from './auth';
import { getBaseUrl } from './urls/urls';

/**
 * Mock auth client for a content-only site
 */
export const authClient = {
  useSession: () => ({
    data: null,
    isPending: false,
  }),
  signOut: async () => {
    // No-op since we're removing authentication
    return Promise.resolve();
  },
};