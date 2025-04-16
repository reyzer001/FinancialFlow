import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlusIcon, SearchIcon, FilterIcon, UsersIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: customers, isLoading, error } = useQuery({
    queryKey: ["/api/customers"],
  });

  // Placeholder for when there are no customers
  const customersPlaceholder = (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-neutral-100 rounded-full p-4 mb-4">
        <UsersIcon className="h-8 w-8 text-neutral-400" />
      </div>
      <h3 className="text-lg font-medium text-neutral-900 mb-1">No customers found</h3>
      <p className="text-neutral-500 mb-4 text-center max-w-md">
        Add your first customer to start creating quotations and invoices.
      </p>
      <Button>
        <PlusIcon className="mr-2 h-4 w-4" />
        Add Customer
      </Button>
    </div>
  );

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Customers</h1>
          <p className="text-neutral-500">Manage your customer information</p>
        </div>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <Card>
        <CardHeader className="px-5 pt-5 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative w-64">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <Input
                  placeholder="Search customers..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <FilterIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : error ? (
            <div className="text-center p-4 text-destructive">
              Error loading customers. Please try again.
            </div>
          ) : !customers || customers.length === 0 ? (
            customersPlaceholder
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-neutral-500 text-sm border-b border-neutral-200">
                    <th className="pb-3 font-medium">Code</th>
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Contact Person</th>
                    <th className="pb-3 font-medium">Email</th>
                    <th className="pb-3 font-medium">Phone</th>
                    <th className="pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="text-sm">
                      <td className="py-4 text-neutral-600">{customer.code}</td>
                      <td className="py-4 font-medium">{customer.name}</td>
                      <td className="py-4 text-neutral-600">{customer.contactPerson}</td>
                      <td className="py-4 text-neutral-600">{customer.email}</td>
                      <td className="py-4 text-neutral-600">{customer.phone}</td>
                      <td className="py-4 text-right">
                        <Button variant="ghost" size="sm" className="h-8">View</Button>
                        <Button variant="ghost" size="sm" className="h-8">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
