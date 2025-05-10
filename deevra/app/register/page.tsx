"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
    role: "freelancer"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<string | null>(null);

  function evaluatePasswordStrength(password: string): string {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!password) return "";
    if (strongRegex.test(password)) return "Strong";
    if (mediumRegex.test(password)) return "Medium";
    return "Weak";
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          username: form.username,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });

      let data = null;

      try {
        const text = await res.text();
        data = text ? JSON.parse(text) : {};
      } catch (err) {
        console.error("⚠️ Failed to parse JSON:", err);
        data = { message: "Internal Server Error" };
      }

      if (!res.ok) {
        setError(data?.message || "Registration failed");
        return;
      }

      // ✅ FIX: sign in manually and redirect only on success
      const signInResponse = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      console.log("🔍 signIn response:", signInResponse);

      if (signInResponse?.ok) {
        router.push("/choose_role"); // ✅ make sure this page exists
      } else {
        setError("Sign in failed after registration. Please try logging in.");
      }

    } catch (err) {
      console.error("❌ Registration error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-10 space-y-6 border">
        <div className="flex flex-col items-center">
          <Image src="/logo/logo.png" alt="DeEvra Logo" width={180} height={60} className="mb-3" />
          <h1 className="text-2xl font-bold text-gray-900 text-center">Join DeEvra</h1>
          <p className="text-center text-gray-500 text-sm max-w-xs">
            Smart contracts. AI-powered security. Freelancing redefined.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border px-4 py-2 rounded-lg"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Username"
            className="w-full border px-4 py-2 rounded-lg"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border px-4 py-2 rounded-lg"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <select
            className="w-full border px-4 py-2 rounded-lg"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
          >
            <option value="freelancer">Freelancer</option>
            <option value="client">Client</option>
          </select>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border px-4 py-2 pr-10 rounded-lg"
              value={form.password}
              onChange={(e) => {
                const value = e.target.value;
                setForm({ ...form, password: value });
                setPasswordStrength(evaluatePasswordStrength(value));
              }}
              required
            />
            <button
              type="button"
              className="absolute top-2.5 right-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {form.password && passwordStrength && (
              <p
                className={`mt-1 text-xs ${
                  passwordStrength === "Strong"
                    ? "text-green-600"
                    : passwordStrength === "Medium"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                Password Strength: {passwordStrength}
              </p>
            )}
          </div>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full border px-4 py-2 rounded-lg"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            required
          />

          <Button type="submit" className="w-full flex justify-center items-center gap-2" disabled={loading}>
            {loading && <Loader2 className="animate-spin w-4 h-4" />} Sign Up
          </Button>

          <div className="text-center text-sm text-gray-500">or sign up with</div>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-3"
            onClick={() => signIn("google", { callbackUrl: "/choose_role" })}
          >
            <Image src="/icons/Google.png" alt="Google" width={20} height={20} />
            Continue with Google
          </Button>
        </form>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">Log in here</a>
        </div>
      </div>
    </main>
  );
}
