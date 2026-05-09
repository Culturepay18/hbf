"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("Email not confirmed")) {
        setError("Please confirm your email address via the link sent.");
      } else {
        setError("Invalid email or password.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-[#f8f6f0] px-3 py-6 sm:px-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-soft sm:rounded-3xl">
        <div className="bg-[#1A1A1A] p-6 text-center sm:p-8">
          <Image
            src="/images/logo-hbf-01.png"
            alt="HBF Logo"
            width={120}
            height={170}
            className="mx-auto h-16 w-auto brightness-0 invert sm:h-20"
          />
        </div>

        <form onSubmit={handleLogin} className="p-6 sm:p-8">
          {error && (
            <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-5 sm:space-y-6">
            <div>
              <label className="mb-2 block text-[13px] font-bold uppercase tracking-wider text-hbf-dark sm:text-sm">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border-2 border-black/5 bg-black/5 px-5 py-3 text-base text-hbf-dark outline-none transition-colors focus:border-hbf-green focus:bg-white sm:px-6 sm:py-3.5"
                placeholder="exemple@mail.com"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-[13px] font-bold uppercase tracking-wider text-hbf-dark sm:text-sm">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-full border-2 border-black/5 bg-black/5 px-5 py-3 text-base text-hbf-dark outline-none transition-colors focus:border-hbf-green focus:bg-white sm:px-6 sm:py-3.5"
                placeholder="********"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-full bg-hbf-green py-3.5 text-lg font-bold text-white transition-colors hover:bg-hbf-green-light disabled:cursor-not-allowed disabled:opacity-50 sm:mt-4 sm:py-4"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
