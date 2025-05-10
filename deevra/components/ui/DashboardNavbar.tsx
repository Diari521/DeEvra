"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";

export default function DashboardNavbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const navbarClasses = `
    backdrop-blur-md
    bg-white/70 dark:bg-gray-800/40
    border-b border-white/20 dark:border-gray-700
    shadow-md
    transition-all
    fixed top-0 left-0 right-0 z-45
    p-4 flex justify-between items-center
  `;

  return (
    <header className={navbarClasses}>
      <div className="pl-4">
        <Image
          src={darkMode ? "/logo/Logo_White.png" : "/logo/logo.png"}
          alt="App Logo"
          width={200}
          height={70}
          className="object-contain"
        />
      </div>

      <div className="flex items-center space-x-4 pr-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
        >
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
}
