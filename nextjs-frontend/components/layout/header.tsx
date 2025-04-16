'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Bell, Search, ChevronDown, User, LogOut } from 'lucide-react';

export default function Header({ onMenuToggle }: { onMenuToggle: () => void }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 h-16">
      <div className="flex h-full px-4 items-center justify-between">
        {/* Left side - Logo and mobile menu button */}
        <div className="flex items-center">
          <button 
            onClick={onMenuToggle}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <Link href="/dashboard" className="ml-2 lg:ml-0">
            <span className="text-xl font-bold text-primary-600">FinLedger</span>
          </Link>
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Right side - Notifications and profile */}
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center text-sm text-gray-700 focus:outline-none"
            >
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
                JD
              </div>
              <span className="hidden md:block ml-2 font-medium">John Doe</span>
              <ChevronDown className="hidden md:block h-4 w-4 ml-1" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                <div className="py-1">
                  <button className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <User className="h-4 w-4 mr-2" />
                    <span>Profile</span>
                  </button>
                  <Link 
                    href="/login"
                    className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}