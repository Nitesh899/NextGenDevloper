import api from "../api/axios";

import type {
  LoginResponse,
  RegisterResponse,
  RefreshTokenResponse,
  VerifyOTPResponse,
} from "../types/auth";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  phone_number?: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirm: string;
}

interface SendOTPData {
  phone_number: string;
}

interface VerifyOTPData {
  phone_number: string;
  otp_code: string;
}

export const authService = {
  async login(
    data: LoginData
  ): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(
      "/auth/login/",
      data
    );

    return response.data;
  },

  async register(
    data: RegisterData
  ): Promise<RegisterResponse> {
    const response =
      await api.post<RegisterResponse>(
        "/auth/register/",
        data
      );

    return response.data;
  },

  async sendOTP(
    data: SendOTPData
  ) {
    const response = await api.post(
      "/auth/send-otp/",
      data
    );

    return response.data;
  },

  async verifyOTP(
    data: VerifyOTPData
  ): Promise<VerifyOTPResponse> {
    const response =
      await api.post<VerifyOTPResponse>(
        "/auth/verify-otp/",
        data
      );

    return response.data;
  },

  async resendOTP(
    data: SendOTPData
  ) {
    const response = await api.post(
      "/auth/resend-otp/",
      data
    );

    return response.data;
  },

  async refreshToken(
    refresh: string
  ): Promise<RefreshTokenResponse> {
    const response =
      await api.post<RefreshTokenResponse>(
        "/auth/token/refresh/",
        {
          refresh,
        }
      );

    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get(
      "/auth/me/"
    );

    return response.data;
  },

  async logout(
    refresh: string
  ) {
    const response = await api.post(
      "/auth/logout/",
      {
        refresh,
      }
    );

    return response.data;
  },
};