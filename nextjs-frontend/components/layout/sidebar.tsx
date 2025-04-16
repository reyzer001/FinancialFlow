'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  X, LayoutDashboard, ShoppingCart, Package, 
  ClipboardList, FileText, BarChart3, Settings,
  CreditCard, Users, Truck, Calculator, MoreHorizontal
} from 'lucide-react';

// Navigation items organized by section
const navigationItems = [
  {
    section: 'Main',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard }
    ]
  },
  {
    section: 'Sales',
    items: [
      { name: 'Sales Quotations', href: '/sales/quotations', icon: FileText },
      { name: 'Sales Orders', href: '/sales/orders', icon: ShoppingCart },
      { name: 'Sales Invoices', href: '/sales/invoices', icon: CreditCard },
      { name: 'Customers', href: '/sales/customers', icon: Users }
    ]
  },
  {
    section: 'Purchases',
    items: [
      { name: 'Purchase Orders', href: '/purchasing/orders', icon: ClipboardList },
      { name: 'Purchase Invoices', href: '/purchasing/invoices', icon: CreditCard },
      { name: 'Vendors', href: '/purchasing/vendors', icon: Truck }
    ]
  },
  {
    section: 'Inventory',
    items: [
      { name: 'Products', href: '/inventory/products', icon: Package },
      { name: 'Warehouses', href: '/inventory/warehouses', icon: Package }
    ]
  },
  {
    section: 'Accounting',
    items: [
      { name: 'Chart of Accounts', href: '/accounting/chart-of-accounts', icon: Calculator },
      { name: 'Journal Entries', href: '/accounting/journals', icon: FileText }
    ]
  },
  {
    section: 'Reports',
    items: [
      { name: 'Financial Reports', href: '/reports/financial', icon: BarChart3 },
      { name: 'Sales Reports', href: '/reports/sales', icon: BarChart3 },
      { name: 'Inventory Reports', href: '/reports/inventory', icon: BarChart3 }
    ]
  },
  {
    section: 'System',
    items: [
      { name: 'Settings', href: '/settings', icon: Settings }
    ]
  }
];

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const pathname = usePathname();
  
  // Determine if a menu item is active based on the current pathname
  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Sidebar backdrop - only on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen pt-16 transition-transform lg:translate-x-0 w-64 bg-white border-r border-gray-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close button - only on mobile */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-500 lg:hidden"
        >
          <X className="h-6 w-6" />
        </button>
        
        {/* Sidebar content */}
        <div className="h-full px-3 py-4 overflow-y-auto">
          {navigationItems.map((section) => (
            <div key={section.section} className="mb-6">
              <h3 className="text-xs text-gray-500 font-semibold uppercase tracking-wider px-3 mb-2">
                {section.section}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`flex items-center px-3 py-2 text-sm rounded-md group ${
                          active
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 mr-3 flex-shrink-0 ${
                            active ? 'text-primary-600' : 'text-gray-500'
                          }`}
                        />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}