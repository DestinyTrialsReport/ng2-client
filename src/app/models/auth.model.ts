export interface AuthToken {
  value: string;
  readyin: number;
  expires: number;
}

export interface AuthResponse {
  accessToken: AuthToken;
  refreshToken: AuthToken;
}
