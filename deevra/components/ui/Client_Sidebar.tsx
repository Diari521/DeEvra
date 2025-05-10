"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Home,
  FileText,
  Wallet,
  User,
  UserCircle,
  Settings,
  ChevronRight,
  X,
} from "lucide-react";

export default function Client_Sidebar() {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const navigation = [
    { label: "Home", icon: Home, href: "/dashboard" },
    { label: "Post Job", icon: FileText, children: ["New Post", "Manage Posts"] },
    { label: "Contracts", icon: FileText, children: ["Active", "Completed", "Disputed"] },
    {
      label: "Messages",
      icon: User,
      href: session?.user?.id ? `/messages/${session.user.id}` : undefined,
    },
    { label: "Freelancers", icon: FileText, children: ["Search", "Saved"] },
    { label: "Wallet", icon: Wallet, children: ["Overview", "Withdraw", "Transactions"] },
    { label: "Profile", icon: User, children: ["My Profile", "KYC"] },
    { label: "Settings", icon: Settings },
  ];

  const handleNavigation = (item: (typeof navigation)[number]) => {
    if (item.href) {
      router.push(item.href);
    } else {
      toggleMenu(item.label);
    }
  };

  const glassCardMatch =
    "bg-white/80 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700 shadow-md transition-all duration-300";

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-7 left-4 z-[60] lg:hidden"
        onClick={() => setIsMobileOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-800 dark:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsMobileOpen(false)} />
          <div className={`relative z-50 w-64 h-full rounded-r-2xl flex flex-col ${glassCardMatch}`}>
            <button
              className="absolute top-3 right-3 text-gray-800 dark:text-white"
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="mt-12 overflow-y-auto px-4 py-6 space-y-4 flex-1">
              <div className="flex items-center gap-4">
                <UserCircle className="w-10 h-10 text-gray-800 dark:text-white" strokeWidth={1.5} />
                <span className="text-xl font-bold text-gray-800 dark:text-white">
                  {session?.user?.name || "Client"}
                </span>
              </div>
              <div className="h-px w-full bg-gray-300 dark:bg-gray-600" />
              <nav className="space-y-4">
                {navigation.map((item) => {
                  const isOpen = openMenus[item.label];
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => handleNavigation(item)}
                        className="w-full flex items-center justify-between text-left text-gray-800 dark:text-gray-200 font-medium hover:text-blue-600"
                      >
                        <span className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          {item.label}
                        </span>
                        {item.children && (
                          <ChevronRight
                            className={`w-4 h-4 transform transition-transform ${
                              isOpen ? "rotate-90" : ""
                            }`}
                          />
                        )}
                      </button>
                      {item.children && isOpen && (
                        <div className="border-l border-gray-300 dark:border-gray-600 ml-4 pl-4 mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                          {item.children.map((child) => (
                            <div
                              key={child}
                              className="hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md px-2 py-1 cursor-pointer"
                            >
                              {child}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
            <div className="p-4">
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-2 rounded-lg"
              >
                SIGN OUT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed z-40 left-10 top-28 bottom-6">
        <aside className={`rounded-2xl w-64 h-full flex flex-col ${glassCardMatch}`}>
          <div className="overflow-y-auto px-4 py-6 space-y-4 flex-1">
            <div className="flex items-center gap-4">
              <UserCircle className="w-10 h-10 text-gray-800 dark:text-white" strokeWidth={1.5} />
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                {session?.user?.name || "Client"}
              </span>
            </div>
            <div className="h-px w-full bg-gray-300 dark:bg-gray-600" />
            <nav className="space-y-4">
              {navigation.map((item) => {
                const isOpen = openMenus[item.label];
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => handleNavigation(item)}
                      className="w-full flex items-center justify-between text-left text-gray-800 dark:text-gray-200 font-medium hover:text-blue-600"
                    >
                      <span className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </span>
                      {item.children && (
                        <ChevronRight
                          className={`w-4 h-4 transform transition-transform ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        />
                      )}
                    </button>
                    {item.children && isOpen && (
                      <div className="border-l border-gray-300 dark:border-gray-600 ml-4 pl-4 mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        {item.children.map((child) => (
                          <div
                            key={child}
                            className="hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md px-2 py-1 cursor-pointer"
                          >
                            {child}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
          <div className="px-4 pb-6">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-2 rounded-lg"
            >
              SIGN OUT
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
