export interface User {
  id: string | null;
  email: string;
  name: string | null;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}
