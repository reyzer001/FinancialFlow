import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function generateInvoiceNumber(prefix: string = "INV", length: number = 6): string {
  const random = Math.floor(Math.random() * Math.pow(10, length))
    .toString()
    .padStart(length, "0");
  return `${prefix}-${random}`;
}

export function truncateText(text: string, maxLength: number = 30): string {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

export function getStatusColor(status: string): { bg: string; text: string } {
  switch (status.toLowerCase()) {
    case "completed":
    case "paid":
    case "active":
      return { bg: "bg-secondary-50", text: "text-secondary-700" };
    case "pending":
    case "draft":
      return { bg: "bg-neutral-100", text: "text-neutral-700" };
    case "overdue":
    case "canceled":
    case "rejected":
      return { bg: "bg-danger-50", text: "text-danger-700" };
    default:
      return { bg: "bg-neutral-100", text: "text-neutral-700" };
  }
}
