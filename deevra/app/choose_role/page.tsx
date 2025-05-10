"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ChooseRolePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role) {
      router.push(
        session.user.role === "client" ? "/dashboard/client" : "/dashboard/freelancer"
      );
    }
  }, [status, session, router]);

  const selectRole = async (role: "freelancer" | "client") => {
    try {
      const response = await fetch("/api/user/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) throw new Error("Failed to set role");

      router.push(role === "client" ? "/dashboard/client" : "/dashboard/freelancer");
    } catch (error) {
      console.error("Role selection failed:", error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f5f5f7] p-6">
      <div className="bg-white rounded-2xl shadow-md p-10 space-y-6 text-center max-w-md w-full">
        <Image
          src="/logo/logo.png"
          alt="Company Logo"
          width={72}
          height={72}
          className="mx-auto mb-4"
        />
        <h1 className="text-2xl font-semibold text-black tracking-tight">Choose Your Role</h1>
        <p className="text-gray-500 text-sm">How would you like to use our platform?</p>
        <div className="space-y-4">
          <button
            onClick={() => selectRole("freelancer")}
            className="w-full py-2.5 text-black bg-[#e5e5ea] rounded-full hover:bg-[#d1d1d6] transition-colors text-sm font-medium"
          >
            I'm a Freelancer
          </button>
          <button
            onClick={() => selectRole("client")}
            className="w-full py-2.5 text-white bg-black rounded-full hover:bg-[#1c1c1e] transition-colors text-sm font-medium"
          >
            I'm a Client
          </button>
        </div>
      </div>
    </main>
  );
}
