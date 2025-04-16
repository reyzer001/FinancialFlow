import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon, SearchIcon, FilterIcon, BanknoteIcon, ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function BankCash() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Placeholder for demo - in a real app, this would fetch from the API
  const transactionsPlaceholder = (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-neutral-100 rounded-full p-4 mb-4">
        <BanknoteIcon className="h-8 w-8 text-neutral-400" />
      </div>
      <h3 className="text-lg font-medium text-neutral-900 mb-1">No transactions found</h3>
      <p className="text-neutral-500 mb-4 text-center max-w-md">
        Record cash and bank transactions to track your money flow.
      </p>
      <div className="flex gap-3">
        <Button>
          <ArrowDownIcon className="mr-2 h-4 w-4" />
          Money In
        </Button>
        <Button variant="outline">
          <ArrowUpIcon className="mr-2 h-4 w-4" />
          Money Out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Bank & Cash</h1>
          <p className="text-neutral-500">Manage your cash flow and bank accounts</p>
        </div>
        <div className="flex gap-3">
          <Button>
            <ArrowDownIcon className="mr-2 h-4 w-4" />
            Money In
          </Button>
          <Button variant="outline">
            <ArrowUpIcon className="mr-2 h-4 w-4" />
            Money Out
          </Button>
        </div>
      </div>

      {/* Account Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary-50 p-2 rounded-full">
                <BanknoteIcon className="h-5 w-5 text-primary-600" />
              </div>
              <Button variant="ghost" size="sm">View Account</Button>
            </div>
            <h3 className="font-medium text-neutral-500 text-sm">Main Bank Account</h3>
            <p className="text-2xl font-semibold mt-1">$120,450.00</p>
            <div className="mt-2 text-xs text-neutral-500">Last updated: Today, 10:45 AM</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-secondary-50 p-2 rounded-full">
                <BanknoteIcon className="h-5 w-5 text-secondary-600" />
              </div>
              <Button variant="ghost" size="sm">View Account</Button>
            </div>
            <h3 className="font-medium text-neutral-500 text-sm">Savings Account</h3>
            <p className="text-2xl font-semibold mt-1">$45,680.00</p>
            <div className="mt-2 text-xs text-neutral-500">Last updated: Today, 10:45 AM</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-neutral-100 p-2 rounded-full">
                <BanknoteIcon className="h-5 w-5 text-neutral-600" />
              </div>
              <Button variant="ghost" size="sm">View Account</Button>
            </div>
            <h3 className="font-medium text-neutral-500 text-sm">Petty Cash</h3>
            <p className="text-2xl font-semibold mt-1">$1,200.00</p>
            <div className="mt-2 text-xs text-neutral-500">Last updated: Today, 10:45 AM</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="px-5 pt-5 pb-0">
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative w-64">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <FilterIcon className="h-4 w-4" />
              </Button>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
              <TabsList>
                <TabsTrigger value="all">All Transactions</TabsTrigger>
                <TabsTrigger value="income">Money In</TabsTrigger>
                <TabsTrigger value="expense">Money Out</TabsTrigger>
                <TabsTrigger value="transfer">Transfers</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          {transactionsPlaceholder}
        </CardContent>
      </Card>
    </>
  );
}
