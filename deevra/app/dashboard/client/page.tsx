import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import DashboardNavbar from "@/components/ui/DashboardNavbar";
import ClientSidebar from "@/components/ui/Client_Sidebar";

export default async function ClientDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (session.user.role !== "client") redirect("/dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 text-gray-900 dark:text-white">
      {/* ✅ Let DashboardNavbar render its own blur/background */}
      <DashboardNavbar />

      {/* Sidebar */}
      <ClientSidebar />

      {/* Main Content */}
      <div className="pt-28 px-4 sm:px-6 lg:px-8 lg:pl-[330px]">
        <main className="space-y-10">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome, {session.user.name || session.user.email}
          </h1>

          {/* Dashboard Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl bg-white/80 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700 p-6 shadow-lg transition-all">
              <h2 className="text-2xl font-semibold">Your Job Posts</h2>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                Track and manage open job listings.
              </p>
            </div>

            <div className="rounded-2xl bg-white/80 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700 p-6 shadow-lg transition-all">
              <h2 className="text-2xl font-semibold">Top Talent</h2>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                Freelancers matched by AI.
              </p>
            </div>
          </section>

          {/* Messages */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Messages</h2>
            <div className="space-y-4">
              {[
                { name: "Jane Doe", message: "Ready to start the job?" },
                { name: "John Smith", message: "I've submitted the first milestone." },
              ].map((msg) => (
                <div
                  key={msg.name}
                  className="rounded-xl bg-white/80 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700 p-4 shadow-md transition-all"
                >
                  <p className="font-medium text-lg">{msg.name}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-400">{msg.message}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
