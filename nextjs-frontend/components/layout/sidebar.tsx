"use client";

import { 
  Home, 
  ShoppingCart, 
  FileText,
  CreditCard,
  Package2, 
  ArrowDownUp, 
  BarChart2, 
  Users,
  Settings,
  Building2,
  X,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  href?: string;
  children?: { title: string; href: string }[];
  isOpen: boolean;
}

function SidebarItem({ icon, title, href, children, isOpen }: SidebarItemProps) {
  const [expanded, setExpanded] = useState(false);
  
  if (children) {
    return (
      <div className="mb-1">
        <button
          className="w-full flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="mr-2">{icon}</span>
          {isOpen && (
            <>
              <span className="flex-1 text-left">{title}</span>
              {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </>
          )}
        </button>
        
        {expanded && isOpen && (
          <div className="ml-8 mt-1 space-y-1">
            {children.map((child, index) => (
              <Link
                key={index}
                href={child.href}
                className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm transition-colors"
              >
                {child.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link href={href || "#"} className="flex items-center p-2 mb-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
      <span className="mr-2">{icon}</span>
      {isOpen && <span>{title}</span>}
    </Link>
  );
}

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-200 ease-in-out flex flex-col`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-bold text-primary">FinLedger</span>
        </div>
        <button
          onClick={onClose}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto space-y-1">
        <SidebarItem icon={<Home className="h-5 w-5" />} title="Dashboard" href="/dashboard" isOpen={isOpen} />
        
        <SidebarItem 
          icon={<ShoppingCart className="h-5 w-5" />} 
          title="Penjualan" 
          isOpen={isOpen}
          children={[
            { title: "Quotation", href: "/sales/quotation" },
            { title: "Order", href: "/sales/order" },
            { title: "Invoice", href: "/sales/invoice" },
            { title: "Retur", href: "/sales/return" },
            { title: "Customers", href: "/sales/customers" },
          ]}
        />
        
        <SidebarItem 
          icon={<CreditCard className="h-5 w-5" />} 
          title="Pembelian" 
          isOpen={isOpen}
          children={[
            { title: "Request", href: "/purchase/request" },
            { title: "Order", href: "/purchase/order" },
            { title: "Invoice", href: "/purchase/invoice" },
            { title: "Retur", href: "/purchase/return" },
            { title: "Vendors", href: "/purchase/vendors" },
          ]}
        />
        
        <SidebarItem 
          icon={<Package2 className="h-5 w-5" />} 
          title="Persediaan" 
          isOpen={isOpen}
          children={[
            { title: "Produk", href: "/inventory/products" },
            { title: "Gudang", href: "/inventory/warehouses" },
            { title: "Penyesuaian", href: "/inventory/adjustments" },
            { title: "Transfer", href: "/inventory/transfers" },
            { title: "Stok Opname", href: "/inventory/stocktake" },
          ]}
        />
        
        <SidebarItem 
          icon={<ArrowDownUp className="h-5 w-5" />} 
          title="Kas & Bank" 
          isOpen={isOpen}
          children={[
            { title: "Kas Masuk", href: "/cash/in" },
            { title: "Kas Keluar", href: "/cash/out" },
            { title: "Transfer", href: "/cash/transfer" },
            { title: "Rekonsiliasi", href: "/cash/reconciliation" },
          ]}
        />
        
        <SidebarItem 
          icon={<FileText className="h-5 w-5" />} 
          title="Akuntansi" 
          isOpen={isOpen}
          children={[
            { title: "Jurnal Umum", href: "/accounting/journal" },
            { title: "Buku Besar", href: "/accounting/ledger" },
            { title: "Daftar Akun", href: "/accounting/coa" },
          ]}
        />
        
        <SidebarItem 
          icon={<BarChart2 className="h-5 w-5" />} 
          title="Laporan" 
          isOpen={isOpen}
          children={[
            { title: "Laba Rugi", href: "/reports/profit-loss" },
            { title: "Neraca", href: "/reports/balance-sheet" },
            { title: "Arus Kas", href: "/reports/cash-flow" },
            { title: "Laporan Pajak", href: "/reports/tax" },
          ]}
        />
        
        <SidebarItem 
          icon={<Building2 className="h-5 w-5" />} 
          title="Aset Tetap" 
          isOpen={isOpen}
          children={[
            { title: "Daftar Aset", href: "/assets/list" },
            { title: "Penyusutan", href: "/assets/depreciation" },
          ]}
        />
        
        <SidebarItem 
          icon={<Users className="h-5 w-5" />} 
          title="Pengguna" 
          isOpen={isOpen}
          children={[
            { title: "Daftar Pengguna", href: "/users" },
            { title: "Hak Akses", href: "/users/roles" },
          ]}
        />
        
        <SidebarItem icon={<Settings className="h-5 w-5" />} title="Pengaturan" href="/settings" isOpen={isOpen} />
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
            <span className="text-sm font-medium">US</span>
          </div>
          {isOpen && (
            <div>
              <div className="font-medium text-sm">User Admin</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">admin@finledger.com</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}