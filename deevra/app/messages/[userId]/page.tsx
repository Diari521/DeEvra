"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import DashboardNavbar from "@/components/ui/DashboardNavbar";
import ClientSidebar from "@/components/ui/Client_Sidebar";
import FreelancerSidebar from "@/components/ui/Freelancer_Sidebar";
import MessageUI from "@/components/messages/MessageUI";
import { useEffect } from "react";

export default function MessagesPage() {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();
  const role = session?.user?.role;
  const userId = params.userId as string;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (status === "authenticated" && !role) {
      router.push("/choose-role");
    }
  }, [status, role, router]);

  if (!userId || status !== "authenticated") return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="fixed top-0 left-0 right-0 z-50">
        <DashboardNavbar />
      </div>

      {role === "client" ? <ClientSidebar /> : <FreelancerSidebar />}

      <div className="pt-24 px-4 sm:px-6 lg:px-8 lg:pl-[330px]">
        <MessageUI targetUserId={userId} />
      </div>
    </div>
  );
}
