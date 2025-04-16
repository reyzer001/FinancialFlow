'use client';

import { useState } from 'react';
import Header from './header';
import Sidebar from './sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-64 pt-16">
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}