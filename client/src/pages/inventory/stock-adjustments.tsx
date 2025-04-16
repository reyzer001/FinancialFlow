import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlusIcon, SearchIcon, FilterIcon, ArrowUp10 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default function StockAdjustments() {
  const [searchQuery, setSearchQuery] = useState("");

  // Placeholder for demo - in a real app, this would fetch from the API
  const adjustmentsPlaceholder = (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-neutral-100 rounded-full p-4 mb-4">
        <ArrowUp10 className="h-8 w-8 text-neutral-400" />
      </div>
      <h3 className="text-lg font-medium text-neutral-900 mb-1">No stock adjustments found</h3>
      <p className="text-neutral-500 mb-4 text-center max-w-md">
        Create stock adjustments to correct inventory levels or record stock counts.
      </p>
      <Button>
        <PlusIcon className="mr-2 h-4 w-4" />
        New Adjustment
      </Button>
    </div>
  );

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Stock Adjustments</h1>
          <p className="text-neutral-500">Manage inventory level corrections</p>
        </div>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Adjustment
        </Button>
      </div>

      <Card>
        <CardHeader className="px-5 pt-5 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative w-64">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <Input
                  placeholder="Search adjustments..."
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
          {adjustmentsPlaceholder}
        </CardContent>
      </Card>
    </>
  );
}
