// Temporarily commented out for debugging
// import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LandmarkIcon,
  GaugeCircleIcon,
  FileTextIcon,
  ReceiptIcon,
  ShoppingCartIcon,
  UsersIcon,
  File,
  TruckIcon,
  BuildingIcon,
  BookIcon,
  ListTreeIcon,
  BanknoteIcon,
  PackageIcon,
  WarehouseIcon,
  ArrowUp10,
  LineChartIcon,
  ScaleIcon,
  BanknoteIcon as CashFlowIcon,
  FileIcon,
  LogOutIcon
} from "lucide-react";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  currentPath: string;
}

const SidebarLink = ({ href, icon, children, currentPath }: SidebarLinkProps) => {
  const isActive = currentPath === href;
  
  return (
    <li>
      <Link href={href}>
        <div className={cn(
          "flex items-center p-2 rounded-md transition-colors group",
          isActive 
            ? "bg-primary-700 text-white" 
            : "text-neutral-300 hover:bg-neutral-800"
        )}>
          <span className="w-6">{icon}</span>
          <span>{children}</span>
        </div>
      </Link>
    </li>
  );
};

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

const SidebarSection = ({ title, children }: SidebarSectionProps) => (
  <li className="mt-6">
    <span className="px-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
      {title}
    </span>
    <ul className="mt-2 space-y-1">
      {children}
    </ul>
  </li>
);

export function Sidebar() {
  const [location] = useLocation();
  // Using mock data temporarily for debugging
  const user = { fullName: "Admin User", username: "admin", role: "admin" };
  
  const handleLogout = () => {
    // Temporary no-op for debugging
    console.log("Logout clicked");
    window.location.href = "/auth";
  };
  
  const initials = "AU";

  return (
    <aside className="hidden md:flex md:w-64 flex-col fixed inset-y-0 z-50 bg-neutral-900 text-white transition-all duration-300">
      {/* Logo */}
      <div className="p-5 border-b border-neutral-800">
        <h1 className="text-2xl font-bold flex items-center">
          <span className="text-primary-500 mr-2"><LandmarkIcon /></span>
          FinLedger
        </h1>
        <p className="text-neutral-400 text-xs mt-1">Advanced Accounting System</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          <SidebarLink 
            href="/" 
            icon={<GaugeCircleIcon size={18} />} 
            currentPath={location}
          >
            Dashboard
          </SidebarLink>
          
          {/* Sales Section */}
          <SidebarSection title="Sales">
            <SidebarLink 
              href="/sales/invoices" 
              icon={<FileTextIcon size={18} />} 
              currentPath={location}
            >
              Invoices
            </SidebarLink>
            <SidebarLink 
              href="/sales/quotations" 
              icon={<ReceiptIcon size={18} />} 
              currentPath={location}
            >
              Quotations
            </SidebarLink>
            <SidebarLink 
              href="/sales/orders" 
              icon={<ShoppingCartIcon size={18} />} 
              currentPath={location}
            >
              Orders
            </SidebarLink>
            <SidebarLink 
              href="/sales/customers" 
              icon={<UsersIcon size={18} />} 
              currentPath={location}
            >
              Customers
            </SidebarLink>
          </SidebarSection>
          
          {/* Purchasing Section */}
          <SidebarSection title="Purchasing">
            <SidebarLink 
              href="/purchasing/bills" 
              icon={<File size={18} />} 
              currentPath={location}
            >
              Bills
            </SidebarLink>
            <SidebarLink 
              href="/purchasing/purchase-orders" 
              icon={<TruckIcon size={18} />} 
              currentPath={location}
            >
              Purchase Orders
            </SidebarLink>
            <SidebarLink 
              href="/purchasing/vendors" 
              icon={<BuildingIcon size={18} />} 
              currentPath={location}
            >
              Vendors
            </SidebarLink>
          </SidebarSection>
          
          {/* Accounting Section */}
          <SidebarSection title="Accounting">
            <SidebarLink 
              href="/accounting/journal-entries" 
              icon={<BookIcon size={18} />} 
              currentPath={location}
            >
              Journal Entries
            </SidebarLink>
            <SidebarLink 
              href="/accounting/chart-of-accounts" 
              icon={<ListTreeIcon size={18} />} 
              currentPath={location}
            >
              Chart of Accounts
            </SidebarLink>
            <SidebarLink 
              href="/accounting/bank-cash" 
              icon={<BanknoteIcon size={18} />} 
              currentPath={location}
            >
              Bank & Cash
            </SidebarLink>
          </SidebarSection>
          
          {/* Inventory Section */}
          <SidebarSection title="Inventory">
            <SidebarLink 
              href="/inventory/products" 
              icon={<PackageIcon size={18} />} 
              currentPath={location}
            >
              Products
            </SidebarLink>
            <SidebarLink 
              href="/inventory/warehouses" 
              icon={<WarehouseIcon size={18} />} 
              currentPath={location}
            >
              Warehouses
            </SidebarLink>
            <SidebarLink 
              href="/inventory/stock-adjustments" 
              icon={<ArrowUp10 size={18} />} 
              currentPath={location}
            >
              Stock Adjustments
            </SidebarLink>
          </SidebarSection>
          
          {/* Reports Section */}
          <SidebarSection title="Reports">
            <SidebarLink 
              href="/reports/profit-loss" 
              icon={<LineChartIcon size={18} />} 
              currentPath={location}
            >
              Profit & Loss
            </SidebarLink>
            <SidebarLink 
              href="/reports/balance-sheet" 
              icon={<ScaleIcon size={18} />} 
              currentPath={location}
            >
              Balance Sheet
            </SidebarLink>
            <SidebarLink 
              href="/reports/cash-flow" 
              icon={<CashFlowIcon size={18} />} 
              currentPath={location}
            >
              Cash Flow
            </SidebarLink>
            <SidebarLink 
              href="/reports/tax-reports" 
              icon={<FileIcon size={18} />} 
              currentPath={location}
            >
              Tax Reports
            </SidebarLink>
          </SidebarSection>
        </ul>
      </nav>
      
      {/* User Section */}
      <div className="border-t border-neutral-800 p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
            {initials}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{user?.fullName || user?.username}</p>
            <p className="text-xs text-neutral-400">{user?.role || "User"}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="ml-auto text-neutral-400 hover:text-white"
          >
            <LogOutIcon size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
