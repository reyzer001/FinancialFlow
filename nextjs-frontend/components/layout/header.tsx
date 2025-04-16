"use client";

import { 
  Bell, 
  Menu, 
  Search, 
  Settings, 
  ChevronDown, 
  Moon,
  Sun
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Header({ onMenuToggle }: { onMenuToggle: () => void }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">FinLedger</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center relative max-w-md w-full">
        <Search className="absolute left-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Cari..."
          className="pl-10 pr-4 py-2 w-full text-sm bg-gray-100 dark:bg-gray-800 border-0 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>
        <button
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
            <span className="text-sm font-medium">US</span>
          </div>
          <span className="font-medium text-sm hidden md:block">User Admin</span>
          <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
    </header>
  );
}