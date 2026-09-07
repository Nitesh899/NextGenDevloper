import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { authService } from "../services/authService";
import { authStorage } from "../services/authStorage";

import {
  AUTH_LOGOUT_EVENT,
} from "../services/authEvents";

import type { User } from "../types/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setAuthenticatedUser: (
    user: User,
    access: string,
    refresh: string
  ) => void;

  logout: () => Promise<void>;
}

const AuthContext =
  createContext<
    AuthContextType | undefined
  >(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<User | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const isAuthenticated =
    user !== null;

  /*
   * Restore authentication
   * after page refresh.
   */
  useEffect(() => {
    const loadAuthenticatedUser =
      async () => {
        const accessToken =
          authStorage.getAccessToken();

        const refreshToken =
          authStorage.getRefreshToken();

        if (!accessToken || !refreshToken) {
          setIsLoading(false);
          return;
        }

        try {
          const response =
            await authService.getCurrentUser();

          if (response.success) {
            setUser(response.user);
          } else {
            authStorage.clearTokens();
          }

        } catch {
          authStorage.clearTokens();
          setUser(null);

        } finally {
          setIsLoading(false);
        }
      };

    loadAuthenticatedUser();
  }, []);

  /*
   * Listen for automatic logout
   * triggered by Axios.
   */
  useEffect(() => {
    const handleLogout =
      () => {
        authStorage.clearTokens();
        setUser(null);
      };

    window.addEventListener(
      AUTH_LOGOUT_EVENT,
      handleLogout
    );

    return () => {
      window.removeEventListener(
        AUTH_LOGOUT_EVENT,
        handleLogout
      );
    };
  }, []);

  const setAuthenticatedUser = (
    authenticatedUser: User,
    access: string,
    refresh: string
  ) => {
    authStorage.setTokens(
      access,
      refresh
    );

    setUser(authenticatedUser);
  };

  const logout = async () => {
    const refreshToken =
      authStorage.getRefreshToken();

    try {
      if (refreshToken) {
        await authService.logout(
          refreshToken
        );
      }
    } catch {
      /*
       * Even if backend logout fails,
       * local session must be removed.
       */
    } finally {
      authStorage.clearTokens();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        setAuthenticatedUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}