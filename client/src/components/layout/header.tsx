import { useState } from "react";
// Temporarily commented out for debugging
// import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import {
  MenuIcon,
  SearchIcon,
  BellIcon,
  HelpCircleIcon,
  SettingsIcon,
  LogOutIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  onToggleMobileSidebar: () => void;
}

export function Header({ onToggleMobileSidebar }: HeaderProps) {
  // Using mock data temporarily for debugging
  const user = { fullName: "Admin User", username: "admin", role: "admin" };
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleLogout = () => {
    // Temporary no-op for debugging
    console.log("Logout clicked");
    window.location.href = "/auth";
  };
  
  const initials = "AU";
  
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={onToggleMobileSidebar}
          className="md:hidden text-neutral-500 hover:text-neutral-700"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
        
        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 mx-4">
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 w-full rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              <SearchIcon className="h-4 w-4" />
            </div>
          </div>
        </div>
        
        {/* Right Nav Items */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-1 text-neutral-500 hover:text-neutral-700 rounded-full hover:bg-neutral-100">
            <BellIcon className="h-5 w-5" />
            <Badge className="absolute top-0 right-0 h-4 w-4 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-[10px]">
              3
            </Badge>
          </button>
          
          {/* Help */}
          <button className="p-1 text-neutral-500 hover:text-neutral-700 rounded-full hover:bg-neutral-100">
            <HelpCircleIcon className="h-5 w-5" />
          </button>
          
          {/* Settings */}
          <button className="p-1 text-neutral-500 hover:text-neutral-700 rounded-full hover:bg-neutral-100">
            <SettingsIcon className="h-5 w-5" />
          </button>
          
          {/* Profile (Mobile Only) */}
          <button 
            className="md:hidden relative"
            onClick={handleLogout}
          >
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
              {initials}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
