export interface User {
  id?: number;
  user_name: string;
  password: string;
  created_at?: string;
  updated_at?: string;
}

export interface LoginResult {
  token: string | null;
}