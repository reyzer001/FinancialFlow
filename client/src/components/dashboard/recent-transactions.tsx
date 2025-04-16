import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { TransactionData } from "@shared/schema";
import { ArrowDownIcon, ArrowUpIcon, ClockIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function RecentTransactions() {
  const { data, isLoading, error } = useQuery<TransactionData[]>({
    queryKey: ["/api/dashboard/recent-transactions"],
  });
  
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "incoming":
        return (
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3">
            <ArrowDownIcon className="h-4 w-4" />
          </div>
        );
      case "outgoing":
        return (
          <div className="w-8 h-8 rounded-full bg-danger-100 flex items-center justify-center text-danger-600 mr-3">
            <ArrowUpIcon className="h-4 w-4" />
          </div>
        );
      case "pending":
        return (
          <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 mr-3">
            <ClockIcon className="h-4 w-4" />
          </div>
        );
    }
  };
  
  const getAmountColor = (type: string) => {
    switch (type) {
      case "incoming": return "text-secondary-600";
      case "outgoing": return "text-danger-600";
      default: return "";
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-secondary-50 text-secondary-700 hover:bg-secondary-50">
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-neutral-100 text-neutral-700 hover:bg-neutral-100">
            Pending
          </Badge>
        );
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };
  
  if (error) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-full flex items-center justify-center">
            <p className="text-destructive">Failed to load transaction data</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="col-span-2">
      <CardHeader className="flex justify-between items-center pb-2">
        <CardTitle>Recent Transactions</CardTitle>
        <Button variant="link" className="text-primary h-8 p-0">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-[60px] w-full" />
            <Skeleton className="h-[60px] w-full" />
            <Skeleton className="h-[60px] w-full" />
            <Skeleton className="h-[60px] w-full" />
            <Skeleton className="h-[60px] w-full" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-neutral-500 text-sm border-b border-neutral-200">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Reference</th>
                  <th className="pb-3 font-medium text-right">Amount</th>
                  <th className="pb-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {data?.map((transaction) => (
                  <tr key={transaction.id} className="text-sm">
                    <td className="py-4 text-neutral-600">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-neutral-500 text-xs">{transaction.entity}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-neutral-600">{transaction.reference}</td>
                    <td className={`py-4 text-right font-medium ${getAmountColor(transaction.type)}`}>
                      {transaction.type === "incoming" ? "+" : transaction.type === "outgoing" ? "-" : ""}
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="py-4 text-right">
                      {getStatusBadge(transaction.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
