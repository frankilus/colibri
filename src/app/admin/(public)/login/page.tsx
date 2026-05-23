import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-emerald-deep flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Security warning */}
        <div className="bg-amber-400/20 border border-amber-400/40 rounded-xl p-4 mb-6 text-amber-200 text-xs leading-relaxed">
          <strong className="block mb-1">⚠️ Development auth gate</strong>
          This login is protected by an environment variable password only. It is{" "}
          <strong>not</strong> suitable for production. Replace with real authentication
          (Auth.js, Clerk, NextAuth, etc.) before deploying publicly.
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h1 className="text-xl font-bold text-ink mb-6 text-center">
            Colibrí Admin
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
