import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlusIcon, SearchIcon, FilterIcon, PackageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["/api/products"],
  });

  // Placeholder for when there are no products
  const productsPlaceholder = (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-neutral-100 rounded-full p-4 mb-4">
        <PackageIcon className="h-8 w-8 text-neutral-400" />
      </div>
      <h3 className="text-lg font-medium text-neutral-900 mb-1">No products found</h3>
      <p className="text-neutral-500 mb-4 text-center max-w-md">
        Add your first product to start tracking inventory and sales.
      </p>
      <Button>
        <PlusIcon className="mr-2 h-4 w-4" />
        Add Product
      </Button>
    </div>
  );

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Products</h1>
          <p className="text-neutral-500">Manage your products and services</p>
        </div>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader className="px-5 pt-5 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative w-64">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <Input
                  placeholder="Search products..."
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
              Error loading products. Please try again.
            </div>
          ) : !products || products.length === 0 ? (
            productsPlaceholder
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-neutral-500 text-sm border-b border-neutral-200">
                    <th className="pb-3 font-medium">Code</th>
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium text-right">Sell Price</th>
                    <th className="pb-3 font-medium text-right">Buy Price</th>
                    <th className="pb-3 font-medium text-center">Status</th>
                    <th className="pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {products.map((product) => (
                    <tr key={product.id} className="text-sm">
                      <td className="py-4 text-neutral-600">{product.code}</td>
                      <td className="py-4 font-medium">{product.name}</td>
                      <td className="py-4 text-neutral-600">{product.type}</td>
                      <td className="py-4 text-right">{formatCurrency(product.sellPrice)}</td>
                      <td className="py-4 text-right">{formatCurrency(product.buyPrice)}</td>
                      <td className="py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.isActive 
                            ? "bg-secondary-50 text-secondary-700" 
                            : "bg-neutral-100 text-neutral-700"
                        }`}>
                          {product.isActive ? "Active" : "Inactive"}
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
          )}
        </CardContent>
      </Card>
    </>
  );
}
