export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

import { User } from '@/types';

declare module '@inertiajs/core' {
  interface PageProps {
    auth: {
      user: User & {
        role: string;
      };
    };
    errors: {
      error?: string;
    };
  }
}