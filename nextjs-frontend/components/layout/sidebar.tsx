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
import { useLanguage } from "@/hooks/use-language";
import { t } from "@/lib/translations";

interface SidebarItemProps {
  icon: React.ReactNode;
  titleKey: string;
  href?: string;
  children?: { titleKey: string; href: string }[];
  isOpen: boolean;
}

function SidebarItem({ icon, titleKey, href, children, isOpen }: SidebarItemProps) {
  const [expanded, setExpanded] = useState(false);
  const { language } = useLanguage();
  
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
              <span className="flex-1 text-left">{t(titleKey, language)}</span>
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
                {t(child.titleKey, language)}
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
      {isOpen && <span>{t(titleKey, language)}</span>}
    </Link>
  );
}

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { language } = useLanguage();
  
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
        <SidebarItem icon={<Home className="h-5 w-5" />} titleKey="common.dashboard" href="/dashboard" isOpen={isOpen} />
        
        <SidebarItem 
          icon={<ShoppingCart className="h-5 w-5" />} 
          titleKey="common.sales" 
          isOpen={isOpen}
          children={[
            { titleKey: "sales.quotes", href: "/sales/quotation" },
            { titleKey: "common.order", href: "/sales/order" },
            { titleKey: "sales.invoices", href: "/sales/invoice" },
            { titleKey: "sales.returns", href: "/sales/return" },
            { titleKey: "sales.customers", href: "/sales/customers" },
          ]}
        />
        
        <SidebarItem 
          icon={<CreditCard className="h-5 w-5" />} 
          titleKey="common.purchases" 
          isOpen={isOpen}
          children={[
            { titleKey: "purchases.request", href: "/purchase/request" },
            { titleKey: "common.order", href: "/purchase/order" },
            { titleKey: "purchases.bills", href: "/purchase/invoice" },
            { titleKey: "purchases.returns", href: "/purchase/return" },
            { titleKey: "purchases.vendors", href: "/purchase/vendors" },
          ]}
        />
        
        <SidebarItem 
          icon={<Package2 className="h-5 w-5" />} 
          titleKey="common.inventory" 
          isOpen={isOpen}
          children={[
            { titleKey: "inventory.products", href: "/inventory/products" },
            { titleKey: "inventory.warehouses", href: "/inventory/warehouses" },
            { titleKey: "inventory.adjustments", href: "/inventory/adjustments" },
            { titleKey: "inventory.transfers", href: "/inventory/transfers" },
            { titleKey: "inventory.stocktake", href: "/inventory/stocktake" },
          ]}
        />
        
        <SidebarItem 
          icon={<ArrowDownUp className="h-5 w-5" />} 
          titleKey="common.cash_bank" 
          isOpen={isOpen}
          children={[
            { titleKey: "cash_bank.cash_in", href: "/cash/in" },
            { titleKey: "cash_bank.cash_out", href: "/cash/out" },
            { titleKey: "cash_bank.transfer", href: "/cash/transfer" },
            { titleKey: "cash_bank.reconciliation", href: "/cash/reconciliation" },
          ]}
        />
        
        <SidebarItem 
          icon={<FileText className="h-5 w-5" />} 
          titleKey="common.accounting" 
          isOpen={isOpen}
          children={[
            { titleKey: "accounting.journal_entries", href: "/accounting/journal" },
            { titleKey: "accounting.general_ledger", href: "/accounting/ledger" },
            { titleKey: "accounting.chart_of_accounts", href: "/accounting/coa" },
          ]}
        />
        
        <SidebarItem 
          icon={<BarChart2 className="h-5 w-5" />} 
          titleKey="common.reports" 
          isOpen={isOpen}
          children={[
            { titleKey: "reports.income_statement", href: "/reports/profit-loss" },
            { titleKey: "reports.balance_sheet", href: "/reports/balance-sheet" },
            { titleKey: "reports.cash_flow", href: "/reports/cash-flow" },
            { titleKey: "reports.tax_summary", href: "/reports/tax" },
          ]}
        />
        
        <SidebarItem 
          icon={<Building2 className="h-5 w-5" />} 
          titleKey="common.fixed_assets" 
          isOpen={isOpen}
          children={[
            { titleKey: "fixed_assets.list", href: "/assets/list" },
            { titleKey: "fixed_assets.depreciation", href: "/assets/depreciation" },
          ]}
        />
        
        <SidebarItem 
          icon={<Users className="h-5 w-5" />} 
          titleKey="common.users" 
          isOpen={isOpen}
          children={[
            { titleKey: "users.list", href: "/users" },
            { titleKey: "users.roles", href: "/users/roles" },
          ]}
        />
        
        <SidebarItem icon={<Settings className="h-5 w-5" />} titleKey="common.settings" href="/settings" isOpen={isOpen} />
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
            <span className="text-sm font-medium">US</span>
          </div>
          {isOpen && (
            <div>
              <div className="font-medium text-sm">{t('common.admin_user', language)}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">admin@finledger.com</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}