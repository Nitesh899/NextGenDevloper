import {
  type FormEvent,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { Phone } from "lucide-react";

import { authService } from "../services/authService";

export default function PhoneLogin() {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [error, setError] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response =
        await authService.sendOTP({
          phone_number: phoneNumber,
        });

      if (response.success) {
        navigate("/verify-otp", {
          state: {
            phoneNumber,
            expiresIn:
              response.expires_in,
            resendAfter:
              response.resend_after,
          },
        });
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Unable to send OTP."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Phone Login
          </h1>

          <p className="mt-2 text-gray-400">
            We'll send a verification code
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Phone Number
            </label>

            <div className="relative">
              <Phone
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="tel"
                value={phoneNumber}
                onChange={(event) =>
                  setPhoneNumber(
                    event.target.value
                  )
                }
                placeholder="9876543210"
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-950 py-3 pl-10 pr-4 text-white outline-none focus:border-green-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-500 disabled:opacity-50"
          >
            {isLoading
              ? "Sending OTP..."
              : "Send OTP"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link
            to="/login"
            className="text-gray-400 hover:text-white"
          >
            Back to Email Login
          </Link>
        </div>
      </div>
    </div>
  );
}