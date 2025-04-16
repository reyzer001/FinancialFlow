import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";

interface AccountItem {
  name: string;
  balance: number;
  percentage: number;
  type: "revenue" | "expense";
}

export function AccountsSummary() {
  const { data, isLoading, error } = useQuery<AccountItem[]>({
    queryKey: ["/api/dashboard/top-accounts"],
  });
  
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-full flex items-center justify-center">
            <p className="text-destructive">Failed to load account data</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="flex justify-between items-center pb-2">
        <CardTitle>Top Accounts</CardTitle>
        <Button variant="link" className="text-primary h-8 p-0">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-6">
            <Skeleton className="h-[30px] w-full" />
            <Skeleton className="h-[30px] w-full" />
            <Skeleton className="h-[30px] w-full" />
            <Skeleton className="h-[30px] w-full" />
            <Skeleton className="h-[30px] w-full" />
          </div>
        ) : (
          <div className="space-y-6">
            {data?.map((account, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{account.name}</span>
                  <span className={`font-semibold ${
                    account.type === "revenue" ? "text-secondary-600" : "text-danger-600"
                  }`}>
                    {formatCurrency(account.balance)}
                  </span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      account.type === "revenue" ? "bg-secondary-600" : "bg-danger-600"
                    }`} 
                    style={{ width: `${account.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
