// Since we're removing authentication, we'll define mock types
export type Session = {
  user: User;
  session: {
    id: string;
    expiresAt: Date;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: string | null;
  banned: boolean | null;
  banReason: string | null;
  banExpires: Date | null;
  customerId: string | null;
};