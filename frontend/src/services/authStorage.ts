const ACCESS_TOKEN_KEY = "nextgen_access_token";
const REFRESH_TOKEN_KEY = "nextgen_refresh_token";

export const authStorage = {
  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setTokens(
    access: string,
    refresh: string
  ) {
    localStorage.setItem(
      ACCESS_TOKEN_KEY,
      access
    );

    localStorage.setItem(
      REFRESH_TOKEN_KEY,
      refresh
    );
  },

  updateAccessToken(
    access: string
  ) {
    localStorage.setItem(
      ACCESS_TOKEN_KEY,
      access
    );
  },

  clearTokens() {
    localStorage.removeItem(
      ACCESS_TOKEN_KEY
    );

    localStorage.removeItem(
      REFRESH_TOKEN_KEY
    );
  },

  hasTokens(): boolean {
    return Boolean(
      localStorage.getItem(
        ACCESS_TOKEN_KEY
      ) &&
      localStorage.getItem(
        REFRESH_TOKEN_KEY
      )
    );
  },
};