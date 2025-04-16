import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function SalesInvoices() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Sales Invoices</h1>
          <p className="text-neutral-500">Manage your customer invoices</p>
        </div>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Invoice
        </Button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
        <p className="text-center text-neutral-500 py-12">
          Sales Invoices feature is coming soon
        </p>
      </div>
    </>
  );
}
