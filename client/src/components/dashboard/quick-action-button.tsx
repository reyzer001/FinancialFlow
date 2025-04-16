import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface QuickActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: "primary" | "success" | "neutral";
}

export function QuickActionButton({
  icon: Icon,
  label,
  onClick,
  variant = "primary"
}: QuickActionButtonProps) {
  const getIconBackgroundColor = () => {
    switch (variant) {
      case "primary": return "bg-primary-50 text-primary-600";
      case "success": return "bg-secondary-50 text-secondary-600";
      case "neutral": return "bg-neutral-100 text-neutral-700";
    }
  };
  
  return (
    <button 
      className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200 hover:border-primary-500 transition-colors flex flex-col items-center"
      onClick={onClick}
    >
      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-2", getIconBackgroundColor())}>
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
