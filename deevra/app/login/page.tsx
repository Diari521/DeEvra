"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-10 space-y-6 border">
        <div className="flex flex-col items-center">
          <Image src="/logo/logo.png" alt="DeEvra Logo" width={180} height={60} className="mb-3" />
          <h1 className="text-2xl font-bold text-gray-900 text-center">Welcome Back</h1>
          <p className="text-center text-gray-500 text-sm max-w-xs">
            Secure freelance payments. AI-powered. Blockchain protected.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />   
            <button
              type="button"
              className="absolute top-2.5 right-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="text-right text-sm">
            <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <Button type="submit" className="w-full flex justify-center items-center gap-2" disabled={loading}>
            {loading && <Loader2 className="animate-spin w-4 h-4" />} Log In
          </Button>

          <div className="text-center text-sm text-gray-500">or log in with</div>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-3"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            <Image src="/icons/Google.png" alt="Google" width={20} height={20} />
            Continue with Google
          </Button>
        </form>

        <div className="text-center text-sm">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">Sign up here</a>
        </div>
      </div>
    </main>
  );
}