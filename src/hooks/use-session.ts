export const useSession = () => {
  // Since we're removing authentication, we'll return mock session data
  const session = {
    user: {
      id: 'user-id',
      name: 'User',
      email: 'user@example.com',
      image: null,
      role: 'user',
    },
    session: {
      id: 'session-id',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    },
  };
  
  return session;
};