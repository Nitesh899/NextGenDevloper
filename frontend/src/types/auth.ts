export interface User {
  id: number;
  email: string;
  phone_number: string | null;
  first_name: string;
  last_name: string;

  is_email_verified: boolean;
  is_phone_verified: boolean;

  account_type: "USER" | "ADMIN";
  date_joined: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;

  access: string;
  refresh: string;

  user: User;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface VerifyOTPResponse {
  success: boolean;
  message: string;
  verified: boolean;

  access: string;
  refresh: string;

  user: User;
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;

  access: string;
  refresh?: string;
}