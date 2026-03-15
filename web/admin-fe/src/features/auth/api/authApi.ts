import { axiosInstance } from '@/shared/lib/axios';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export async function login(request: LoginRequest) {
  const { data } = await axiosInstance.post<LoginResponse>('/api/auth/login', request);
  return data;
}
