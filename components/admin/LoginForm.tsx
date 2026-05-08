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
    <div className="flex min-h-screen items-center justify-center bg-[#f8f6f0] px-4">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-soft">
        <div className="bg-[#1A1A1A] p-8 text-center">
          <Image
            src="/images/logo-hbf-01.png"
            alt="HBF Logo"
            width={120}
            height={170}
            className="mx-auto h-20 w-auto brightness-0 invert"
          />
          <h2 className="mt-4 text-xl font-bold text-white tracking-widest">ADMIN PANEL</h2>
        </div>
        
        <form onSubmit={handleLogin} className="p-8">
          {error && (
            <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-bold text-hbf-dark uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border-2 border-black/5 bg-black/5 px-4 py-3 text-hbf-dark outline-none transition-colors focus:border-hbf-green focus:bg-white"
                placeholder="info@hbfhaiti.org"
                required
              />
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-bold text-hbf-dark uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border-2 border-black/5 bg-black/5 px-4 py-3 text-hbf-dark outline-none transition-colors focus:border-hbf-green focus:bg-white"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-xl bg-hbf-green py-4 font-bold text-white transition-colors hover:bg-hbf-green-light disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
