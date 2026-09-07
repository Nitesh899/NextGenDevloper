import {
  type FormEvent,
  useEffect,
  useState,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { ShieldCheck } from "lucide-react";

import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

interface LocationState {
  phoneNumber?: string;
  expiresIn?: number;
  resendAfter?: number;
}

export default function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();

  const { setAuthenticatedUser } =
    useAuth();

  const state =
    (location.state as LocationState) || {};

  const phoneNumber =
    state.phoneNumber || "";

  const [
    otpCode,
    setOtpCode,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  const [
    resendCooldown,
    setResendCooldown,
  ] = useState(
    state.resendAfter || 0
  );

  useEffect(() => {
    if (resendCooldown <= 0) {
      return;
    }

    const timer =
      window.setInterval(() => {
        setResendCooldown(
          (previous) =>
            Math.max(
              0,
              previous - 1
            )
        );
      }, 1000);

    return () =>
      window.clearInterval(timer);
  }, [resendCooldown]);

  useEffect(() => {
    if (!phoneNumber) {
      navigate("/phone-login", {
        replace: true,
      });
    }
  }, [
    phoneNumber,
    navigate,
  ]);

  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    setError("");

    if (otpCode.length !== 6) {
      setError(
        "OTP must be exactly 6 digits."
      );
      return;
    }

    setIsLoading(true);

    try {
      const response =
        await authService.verifyOTP({
          phone_number:
            phoneNumber,
          otp_code: otpCode,
        });

      if (response.success) {
        setAuthenticatedUser(
          response.user,
          response.access,
          response.refresh
        );

        navigate("/", {
          replace: true,
        });
      }
    } catch (error: any) {
      const errors =
        error.response?.data?.errors;

      const message =
        errors?.non_field_errors?.[0] ||
        error.response?.data?.message ||
        "OTP verification failed.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) {
      return;
    }

    setError("");

    try {
      const response =
        await authService.resendOTP({
          phone_number:
            phoneNumber,
        });

      if (response.success) {
        setResendCooldown(
          response.resend_after || 60
        );
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Unable to resend OTP."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-xl">

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-600/10">
            <ShieldCheck
              size={28}
              className="text-green-400"
            />
          </div>

          <h1 className="text-3xl font-bold text-white">
            Verify OTP
          </h1>

          <p className="mt-2 text-gray-400">
            Enter the 6-digit code sent to
          </p>

          <p className="mt-1 font-medium text-white">
            {phoneNumber}
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
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otpCode}
            onChange={(event) =>
              setOtpCode(
                event.target.value.replace(
                  /\D/g,
                  ""
                )
              )
            }
            placeholder="000000"
            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-4 text-center text-2xl tracking-[0.5em] text-white outline-none focus:border-green-500"
          />

          <button
            type="submit"
            disabled={
              isLoading ||
              otpCode.length !== 6
            }
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading
              ? "Verifying..."
              : "Verify OTP"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={handleResend}
            disabled={
              resendCooldown > 0
            }
            className="text-sm text-green-400 disabled:text-gray-600"
          >
            {resendCooldown > 0
              ? `Resend OTP in ${resendCooldown}s`
              : "Resend OTP"}
          </button>
        </div>

        <div className="mt-4 text-center text-sm">
          <Link
            to="/phone-login"
            className="text-gray-400 hover:text-white"
          >
            Change phone number
          </Link>
        </div>
      </div>
    </div>
  );
}