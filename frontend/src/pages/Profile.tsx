import {
  Mail,
  Phone,
  User,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const {
    user,
    logout,
  } = useAuth();

  return (
    <section className="min-h-screen mt-10 bg-gray-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wider text-green-400">
            Account
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            My Profile
          </h1>

          <p className="mt-2 text-gray-400">
            Manage and view your account information.
          </p>
        </div>


        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-800 bg-gray-900">

          {/* Profile Header */}
          <div className="border-b border-gray-800 px-6 py-8 sm:px-8">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

              {/* Avatar */}
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10">
                <User
                  size={42}
                  className="text-green-400"
                />
              </div>

              {/* User Name */}
              <div>
                <h2 className="text-2xl font-bold">
                  {user?.first_name ||  "User"}{" "}
                  {user?.last_name || ""}
                </h2>

                <p className="mt-1 text-gray-400">
                  {user?.email}
                </p>

                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-sm text-green-400">
                  <ShieldCheck size={15} />
                  {user?.account_type === "ADMIN"
                    ? "Administrator"
                    : "User"}
                </div>
              </div>

            </div>

          </div>


          {/* Account Information */}
          <div className="px-6 py-8 sm:px-8">

            <h3 className="text-xl font-semibold">
              Account Information
            </h3>

            <div className="mt-6 grid gap-4 md:grid-cols-2">

              {/* Email */}
              <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-blue-500/10 p-3">
                    <Mail
                      size={20}
                      className="text-blue-400"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Email Address
                    </p>

                    <p className="mt-1 font-medium text-gray-200">
                      {user?.email || "Not available"}
                    </p>
                  </div>

                </div>

              </div>


              {/* Phone */}
              <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-purple-500/10 p-3">
                    <Phone
                      size={20}
                      className="text-purple-400"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Phone Number
                    </p>

                    <p className="mt-1 font-medium text-gray-200">
                      {user?.phone_number || "Not provided"}
                    </p>
                  </div>

                </div>

              </div>


              {/* First Name */}
              <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-orange-500/10 p-3">
                    <User
                      size={20}
                      className="text-orange-400"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      First Name
                    </p>

                    <p className="mt-1 font-medium text-gray-200">
                      {user?.first_name || "Not provided"}
                    </p>
                  </div>

                </div>

              </div>


              {/* Account Type */}
              <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-green-500/10 p-3">
                    <ShieldCheck
                      size={20}
                      className="text-green-400"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Account Type
                    </p>

                    <p className="mt-1 font-medium text-gray-200">
                      {user?.account_type === "ADMIN"
                        ? "Administrator"
                        : "User"}
                    </p>
                  </div>

                </div>

              </div>

            </div>


            {/* Verification Status */}
            <div className="mt-8">

              <h3 className="text-xl font-semibold">
                Verification Status
              </h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">

                  <div className="flex items-center justify-between">

                    <span className="text-gray-400">
                      Email Verification
                    </span>

                    <span
                      className={
                        user?.is_email_verified
                          ? "rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400"
                          : "rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400"
                      }
                    >
                      {user?.is_email_verified
                        ? "Verified"
                        : "Not Verified"}
                    </span>

                  </div>

                </div>


                <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">

                  <div className="flex items-center justify-between">

                    <span className="text-gray-400">
                      Phone Verification
                    </span>

                    <span
                      className={
                        user?.is_phone_verified
                          ? "rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400"
                          : "rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400"
                      }
                    >
                      {user?.is_phone_verified
                        ? "Verified"
                        : "Not Verified"}
                    </span>

                  </div>

                </div>

              </div>

            </div>


            {/* Logout */}
            <div className="mt-8 border-t border-gray-800 pt-8">

              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-500"
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}