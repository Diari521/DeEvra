import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import DashboardNavbar from "@/components/ui/DashboardNavbar";
import FreelancerSidebar from "@/components/ui/Freelancer_Sidebar";

export default async function FreelancerDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "freelancer") {
    redirect("/dashboard");
  }

  const cardStyle =
    "rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/30 dark:border-gray-700 p-4 shadow-lg transition-all";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 text-gray-900 dark:text-white">
      {/* ✅ DashboardNavbar handles its own blur and background */}
      <DashboardNavbar />

      <FreelancerSidebar />

      <div className="pt-28 px-4 sm:px-6 lg:px-8 lg:pl-[330px]">
        <main className="space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Welcome back, {session.user?.name || session.user?.email} 👋
            </h1>
            <input
              type="text"
              placeholder="Search for jobs"
              className="w-full sm:w-80 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <h2 className="text-xl font-semibold mb-4">Suggested Jobs for You</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { title: "UI/UX Designer", type: "Full-time", price: "$2,000" },
                  { title: "Web Developer", type: "Hourly", price: "$40/hr" },
                  { title: "Graphic Designer", type: "One-time", price: "$500" },
                ].map((job) => (
                  <div key={job.title} className={cardStyle}>
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{job.type}</p>
                    <p className="text-md font-bold mt-2">{job.price}</p>
                    <button className="mt-3 text-blue-600 hover:underline text-sm">View job</button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Top Clients</h2>
              <div className="space-y-4">
                <div className={cardStyle}>
                  <p className="font-bold">Acme Corp</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Boosted client</p>
                </div>
                <div className={cardStyle}>
                  <p className="font-bold">Stellar Innovations</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Recommended for design gigs
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Messages</h2>
              <div className="space-y-3">
                {[
                  { name: "John Doe", message: "Sure, I'll send the files shortly." },
                  { name: "Jane Smith", message: "Could you provide an update?" },
                ].map((msg) => (
                  <div key={msg.name} className={cardStyle}>
                    <p className="font-semibold">{msg.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Reputation Summary</h2>
              <div className={`${cardStyle} text-center p-6`}>
                <p className="text-4xl font-bold text-blue-600">96</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Reputation Score</p>
                <p className="text-sm">82 jobs completed</p>
                <p className="text-sm">56 reviews</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Contracts</h2>
            <div className="space-y-4">
              {[
                { title: "Milestone Page Redesign", status: "Milestone 2", progress: 70 },
                { title: "Website Development", status: "Completed", progress: 100 },
              ].map((contract) => (
                <div key={contract.title} className={cardStyle}>
                  <p className="font-semibold">{contract.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{contract.status}</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded mt-2">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: `${contract.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
