import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlusIcon, SearchIcon, FilterIcon, ListTreeIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";

export default function ChartOfAccounts() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: accounts, isLoading, error } = useQuery({
    queryKey: ["/api/accounts"],
  });

  // Group accounts by category
  const groupedAccounts = accounts?.reduce((acc, account) => {
    const categoryId = account.categoryId;
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(account);
    return acc;
  }, {});

  // Fetch categories
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ["/api/account-categories"],
  });

  // Placeholder for when there are no accounts
  const accountsPlaceholder = (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-neutral-100 rounded-full p-4 mb-4">
        <ListTreeIcon className="h-8 w-8 text-neutral-400" />
      </div>
      <h3 className="text-lg font-medium text-neutral-900 mb-1">No accounts found</h3>
      <p className="text-neutral-500 mb-4 text-center max-w-md">
        Set up your chart of accounts to start recording financial transactions.
      </p>
      <Button>
        <PlusIcon className="mr-2 h-4 w-4" />
        Add Account
      </Button>
    </div>
  );

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Chart of Accounts</h1>
          <p className="text-neutral-500">Manage your financial account structure</p>
        </div>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Account
        </Button>
      </div>

      <Card>
        <CardHeader className="px-5 pt-5 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative w-64">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <Input
                  placeholder="Search accounts..."
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
          {isLoading || categoriesLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-8 w-full mb-2" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-8 w-full mb-2 mt-6" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : error || categoriesError ? (
            <div className="text-center p-4 text-destructive">
              Error loading accounts. Please try again.
            </div>
          ) : !accounts || accounts.length === 0 ? (
            accountsPlaceholder
          ) : (
            <div className="space-y-8">
              {categories?.map((category) => (
                <div key={category.id}>
                  <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-neutral-500 text-sm border-b border-neutral-200">
                          <th className="pb-3 font-medium">Code</th>
                          <th className="pb-3 font-medium">Name</th>
                          <th className="pb-3 font-medium">Description</th>
                          <th className="pb-3 font-medium text-right">Balance</th>
                          <th className="pb-3 font-medium text-center">Status</th>
                          <th className="pb-3 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200">
                        {(groupedAccounts?.[category.id] || []).map((account) => (
                          <tr key={account.id} className="text-sm">
                            <td className="py-4 text-neutral-600">{account.code}</td>
                            <td className="py-4 font-medium">{account.name}</td>
                            <td className="py-4 text-neutral-600">{account.description || "-"}</td>
                            <td className="py-4 text-right font-medium">
                              {formatCurrency(account.balance)}
                            </td>
                            <td className="py-4 text-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                account.isActive 
                                  ? "bg-secondary-50 text-secondary-700" 
                                  : "bg-neutral-100 text-neutral-700"
                              }`}>
                                {account.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="py-4 text-right">
                              <Button variant="ghost" size="sm" className="h-8">View</Button>
                              <Button variant="ghost" size="sm" className="h-8">Edit</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
