"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/admin/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Incorrect password.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-ink mb-1.5">
          Admin password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-sand focus:outline-none focus:border-emerald-brand focus:ring-1 focus:ring-emerald-brand text-sm bg-cream"
          placeholder="Enter admin password"
          required
        />
        <p className="text-xs text-ink/40 mt-1">Set via ADMIN_PASSWORD environment variable.</p>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-deep text-white font-semibold py-3 rounded-xl hover:bg-emerald-deep/90 transition-colors disabled:opacity-60"
      >
        {loading ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}
