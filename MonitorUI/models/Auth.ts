export interface LoginRequest {
  UserName: string;
  Password?: string;
}

export interface AuthResponse {
  id: number;
  email: string;
  role: '1' | '2';
  menu_access: string[];
  token?: string;
  error?: string;
}
