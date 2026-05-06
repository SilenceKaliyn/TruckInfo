import { apiClient } from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    nombre: string;
  };
}

const MOCK_USER = {
  email: 'oscar.berumen@t-siete.com',
  password: 'Transportes',
  token: 'demo-token-truckinfo-2026',
  user: { id: 1, email: 'oscar.berumen@t-siete.com', nombre: 'Oscar Berumen' },
};

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // Demo mock — bypass backend para entrevistas
    if (credentials.email === MOCK_USER.email && credentials.password === MOCK_USER.password) {
      return { token: MOCK_USER.token, user: MOCK_USER.user };
    }
    // Si no es el demo user, llamar al backend real
    return apiClient.post<LoginResponse>('/auth/login', credentials);
  },
};
