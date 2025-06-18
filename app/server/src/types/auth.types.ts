export interface TokenPayload {
  userId: number;
  role?: string;
  iat?: number;
  exp?: number;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    full_name: string;
    email: string;
    role: "customer" | "admin";
  };
}
