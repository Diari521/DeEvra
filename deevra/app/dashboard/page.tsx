import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardRedirectPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const role = session.user?.role;

  if (role === "freelancer") {
    redirect("/dashboard/freelancer");
  } else if (role === "client") {
    redirect("/dashboard/client");
  } else {
    redirect("/choose-role");
  }
}
