import { cn } from "@/lib/utils";
import { 
  TrendingUpIcon, 
  TrendingDownIcon,
  DollarSignIcon,
  WalletIcon,
  File,
  BuildingIcon
} from "lucide-react";

type MetricIcon = "dollar" | "wallet" | "invoice" | "building";

interface MetricCardProps {
  title: string;
  value: string;
  change: {
    value: number;
    isIncrease: boolean;
  };
  timeframe: string;
  icon: MetricIcon;
  variant?: "primary" | "danger" | "success" | "neutral";
}

export function MetricCard({
  title,
  value,
  change,
  timeframe,
  icon,
  variant = "primary"
}: MetricCardProps) {
  const getIconComponent = () => {
    switch (icon) {
      case "dollar": return <DollarSignIcon className="text-xl" />;
      case "wallet": return <WalletIcon className="text-xl" />;
      case "invoice": return <File className="text-xl" />;
      case "building": return <BuildingIcon className="text-xl" />;
    }
  };
  
  const getIconBackgroundColor = () => {
    switch (variant) {
      case "primary": return "bg-primary-50 text-primary-600";
      case "danger": return "bg-danger-50 text-danger-600";
      case "success": return "bg-secondary-50 text-secondary-600";
      case "neutral": return "bg-neutral-100 text-neutral-700";
    }
  };
  
  const getChangeColor = () => {
    if (change.isIncrease) {
      return change.value > 0 
        ? "text-secondary-600" 
        : "text-neutral-500";
    } else {
      return change.value > 0 
        ? "text-danger-600" 
        : "text-secondary-600";
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-neutral-500 text-sm mb-1">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          <div className="flex items-center mt-2 text-sm">
            <span className={cn("flex items-center", getChangeColor())}>
              {change.isIncrease ? (
                <TrendingUpIcon className="mr-1 h-4 w-4" />
              ) : (
                <TrendingDownIcon className="mr-1 h-4 w-4" />
              )}
              {change.value}%
            </span>
            <span className="text-neutral-500 ml-2">{timeframe}</span>
          </div>
        </div>
        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", getIconBackgroundColor())}>
          {getIconComponent()}
        </div>
      </div>
    </div>
  );
}
