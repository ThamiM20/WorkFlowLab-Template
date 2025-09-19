import { useQuery } from '@tanstack/react-query';

// Query keys
export const userAccountsKeys = {
  all: ['userAccounts'] as const,
  list: (userId: string) => [...userAccountsKeys.all, 'list', userId] as const,
};

// Hook to fetch user accounts
export function useUserAccounts(userId: string | undefined) {
  return useQuery({
    queryKey: userAccountsKeys.list(userId || ''),
    queryFn: async () => {
      if (!userId) {
        throw new Error('User ID is required');
      }

      // Since we're removing authentication, we'll return mock data
      return [
        {
          id: 'account-id',
          userId: userId,
          provider: 'credential',
          providerAccountId: 'provider-account-id',
          email: 'user@example.com',
        },
      ];
    },
    enabled: !!userId,
  });
}

// Hook to check if user has credential provider
export function useHasCredentialProvider(userId: string | undefined) {
  const { data: accounts, isLoading, error } = useUserAccounts(userId);

  const hasCredentialProvider =
    accounts?.some((account) => account.provider === 'credential') ?? false;

  return {
    hasCredentialProvider,
    isLoading,
    error,
  };
}