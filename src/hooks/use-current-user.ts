export const useCurrentUser = () => {
  // Since we're removing authentication, we'll return mock user data
  const user = {
    id: 'user-id',
    name: 'User',
    email: 'user@example.com',
    image: null,
    role: 'user',
  };
  
  return user;
};