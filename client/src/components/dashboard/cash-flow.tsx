import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDownIcon, ArrowUpIcon, WalletIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export function CashFlow() {
  const [period, setPeriod] = useState("thisMonth");
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/dashboard/cash-flow", period],
  });
  
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  
  useEffect(() => {
    if (data) {
      setChartData({
        labels: data.weeks,
        datasets: [
          {
            label: "Incoming",
            data: data.incoming,
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderColor: "hsl(var(--primary))",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#FFFFFF",
            pointBorderColor: "hsl(var(--primary))",
            pointBorderWidth: 2
          },
          {
            label: "Outgoing",
            data: data.outgoing,
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            borderColor: "hsl(var(--destructive))",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#FFFFFF",
            pointBorderColor: "hsl(var(--destructive))",
            pointBorderWidth: 2
          }
        ]
      });
    }
  }, [data]);
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          borderDash: [2],
          color: "rgba(226, 232, 240, 0.7)"
        },
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              notation: "compact"
            }).format(value);
          }
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false
        }
      }
    }
  };
  
  const handlePeriodChange = (value: string) => {
    setPeriod(value);
  };
  
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-full flex items-center justify-center">
            <p className="text-destructive">Failed to load cash flow data</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="flex justify-between items-center pb-2">
        <CardTitle>Cash Flow</CardTitle>
        <Select value={period} onValueChange={handlePeriodChange}>
          <SelectTrigger className="w-[140px] h-8 border-none text-sm focus:ring-0">
            <SelectValue placeholder="This Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="thisMonth">This Month</SelectItem>
            <SelectItem value="lastMonth">Last Month</SelectItem>
            <SelectItem value="lastQuarter">Last Quarter</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[40px] w-full" />
            <Skeleton className="h-[40px] w-full" />
            <Skeleton className="h-[40px] w-full" />
          </div>
        ) : (
          <>
            <div className="h-52 w-full mb-6">
              <Line data={chartData} options={options} />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3">
                    <ArrowDownIcon className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Incoming</span>
                </div>
                <span className="font-bold text-secondary-600">
                  {isLoading ? "-" : formatCurrency(data.totalIncoming)}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-danger-100 flex items-center justify-center text-danger-600 mr-3">
                    <ArrowUpIcon className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Outgoing</span>
                </div>
                <span className="font-bold text-danger-600">
                  {isLoading ? "-" : formatCurrency(data.totalOutgoing)}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-primary-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 mr-3">
                    <WalletIcon className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Net Flow</span>
                </div>
                <span className="font-bold text-primary-700">
                  {isLoading ? "-" : `+${formatCurrency(data.totalIncoming - data.totalOutgoing)}`}
                </span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
