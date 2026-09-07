import {
  type FormEvent,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Mail,
  Phone,
  Lock,
  User,
} from "lucide-react";

import { authService } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      email: "",
      phone_number: "",
      first_name: "",
      last_name: "",
      password: "",
      password_confirm: "",
    });

  const [error, setError] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const updateField = (
    field: string,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response =
        await authService.register(form);

      if (response.success) {
        navigate("/login", {
          replace: true,
          state: {
            message:
              "Account created successfully. Please login.",
          },
        });
      }
    } catch (error: any) {
      const errors =
        error.response?.data?.errors;

      if (errors) {
        const firstError =
          Object.values(errors)
            .flat()
            .find(Boolean);

        setError(
          String(
            firstError ||
              "Registration failed."
          )
        );
      } else {
        setError(
          error.response?.data?.message ||
            "Registration failed."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-2 text-gray-400">
            Join NextGenDevloper
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
          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                First Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="text"
                  value={form.first_name}
                  onChange={(event) =>
                    updateField(
                      "first_name",
                      event.target.value
                    )
                  }
                  required
                  className="w-full rounded-lg border border-gray-700 bg-gray-950 py-3 pl-10 pr-4 text-white outline-none focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Last Name
              </label>

              <input
                type="text"
                value={form.last_name}
                onChange={(event) =>
                  updateField(
                    "last_name",
                    event.target.value
                  )
                }
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none focus:border-green-500"
              />
            </div>
          </div>

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
                value={form.email}
                onChange={(event) =>
                  updateField(
                    "email",
                    event.target.value
                  )
                }
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-950 py-3 pl-10 pr-4 text-white outline-none focus:border-green-500"
              />
            </div>
          </div>

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
                value={form.phone_number}
                onChange={(event) =>
                  updateField(
                    "phone_number",
                    event.target.value
                  )
                }
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
                value={form.password}
                onChange={(event) =>
                  updateField(
                    "password",
                    event.target.value
                  )
                }
                minLength={8}
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-950 py-3 pl-10 pr-4 text-white outline-none focus:border-green-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Confirm Password
            </label>

            <input
              type="password"
              value={form.password_confirm}
              onChange={(event) =>
                updateField(
                  "password_confirm",
                  event.target.value
                )
              }
              minLength={8}
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-500 disabled:opacity-50"
          >
            {isLoading
              ? "Creating account..."
              : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-400 hover:text-green-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}