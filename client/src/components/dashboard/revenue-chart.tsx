import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function RevenueChart() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/dashboard/chart-data"],
  });
  
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  
  useEffect(() => {
    if (data) {
      setChartData({
        labels: data.months,
        datasets: [
          {
            label: "Revenue",
            data: data.revenue,
            backgroundColor: "hsl(var(--primary))",
            borderRadius: 4,
            barPercentage: 0.5,
            categoryPercentage: 0.7
          },
          {
            label: "Expenses",
            data: data.expenses,
            backgroundColor: "hsl(var(--destructive))",
            borderRadius: 4,
            barPercentage: 0.5,
            categoryPercentage: 0.7
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
  
  if (error) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Revenue & Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full flex items-center justify-center">
            <p className="text-destructive">Failed to load chart data</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Revenue & Expenses</CardTitle>
        
        <div className="flex space-x-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
            <span className="text-sm text-neutral-600">Revenue</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-destructive mr-2"></div>
            <span className="text-sm text-neutral-600">Expenses</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-[320px] w-full" />
            </div>
          ) : (
            <Bar data={chartData} options={options} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
