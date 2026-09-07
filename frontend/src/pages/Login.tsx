import {
  type FormEvent,
  useState,
} from "react";


import { Link, useLocation, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setAuthenticatedUser } =
    useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);


  const location = useLocation();

  const from =
    location.state?.from?.pathname ||
    "/profile";

  const successMessage =
    location.state?.message;

  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response =
        await authService.login({
          email,
          password,
        });

      if (response.success) {
        setAuthenticatedUser(
          response.user,
          response.access,
          response.refresh
        );

        navigate(from, {
          replace: true,
        });
      }
    } catch (error: any) {
      const message =
        error.response?.data?.errors
          ?.non_field_errors?.[0] ||
        error.response?.data?.message ||
        "Login failed. Please try again.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex mt-10 min-h-screen items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-400">
            Login to your NextGenDevloper account
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-5 rounded-lg border border-green-800 bg-green-950/40 px-4 py-3 text-sm text-green-400">
            {successMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-950 py-3 pl-10 pr-4 text-white outline-none focus:border-green-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="••••••••"
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-950 py-3 pl-10 pr-4 text-white outline-none focus:border-green-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-green-400 hover:text-green-300"
          >
            Register
          </Link>
        </div>

        <div className="mt-3 text-center text-sm">
          <Link
            to="/phone-login"
            className="text-gray-400 hover:text-white"
          >
            Login with Phone OTP
          </Link>
        </div>
      </div>
    </div>
  );
}