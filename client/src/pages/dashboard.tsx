import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  FileTextIcon, 
  PlusIcon, 
  BookIcon, 
  Download 
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { QuickActionButton } from "@/components/dashboard/quick-action-button";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { AccountsSummary } from "@/components/dashboard/accounts-summary";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { CashFlow } from "@/components/dashboard/cash-flow";
import { formatCurrency } from "@/lib/utils";
import { useLocation } from "wouter";

export default function Dashboard() {
  const [, navigate] = useLocation();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/dashboard/metrics"],
  });
  
  const quickActions = [
    {
      icon: FileTextIcon,
      label: "New Invoice",
      variant: "primary" as const,
      onClick: () => navigate("/sales/invoices")
    },
    {
      icon: PlusIcon,
      label: "Add Expense",
      variant: "success" as const,
      onClick: () => navigate("/purchasing/bills")
    },
    {
      icon: BookIcon,
      label: "Journal Entry",
      variant: "neutral" as const,
      onClick: () => navigate("/accounting/journal-entries")
    },
    {
      icon: Download,
      label: "Export Report",
      variant: "neutral" as const,
      onClick: () => navigate("/reports/profit-loss")
    }
  ];
  
  return (
    <>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-500">Financial overview and key metrics</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {quickActions.map((action, index) => (
          <QuickActionButton
            key={index}
            icon={action.icon}
            label={action.label}
            onClick={action.onClick}
            variant={action.variant}
          />
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {isLoading ? (
          <>
            <Skeleton className="h-[146px] rounded-lg" />
            <Skeleton className="h-[146px] rounded-lg" />
            <Skeleton className="h-[146px] rounded-lg" />
            <Skeleton className="h-[146px] rounded-lg" />
          </>
        ) : error ? (
          <div className="col-span-4">
            <p className="text-destructive text-center">Failed to load metrics</p>
          </div>
        ) : (
          <>
            <MetricCard
              title="Total Revenue"
              value={formatCurrency(data.totalRevenue)}
              change={{ value: data.revenueChange, isIncrease: true }}
              timeframe="from last month"
              icon="dollar"
              variant="primary"
            />
            
            <MetricCard
              title="Total Expenses"
              value={formatCurrency(data.totalExpenses)}
              change={{ value: data.expensesChange, isIncrease: true }}
              timeframe="from last month"
              icon="wallet"
              variant="danger"
            />
            
            <MetricCard
              title="Accounts Receivable"
              value={formatCurrency(data.accountsReceivable)}
              change={{ value: data.receivableChange, isIncrease: false }}
              timeframe="from last month"
              icon="invoice"
              variant="success"
            />
            
            <MetricCard
              title="Accounts Payable"
              value={formatCurrency(data.accountsPayable)}
              change={{ value: data.payableChange, isIncrease: false }}
              timeframe="from last month"
              icon="building"
              variant="neutral"
            />
          </>
        )}
      </div>

      {/* Revenue & Expense Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <AccountsSummary />
      </div>

      {/* Recent Transactions & Cash Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentTransactions />
        <CashFlow />
      </div>
    </>
  );
}
