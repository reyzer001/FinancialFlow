"use client";

import React from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { formatRupiah, formatShortDate, getStatusColor, formatCurrency } from "@/lib/utils";
import { 
  AreaChart, 
  BarChartComponent, 
  DonutChart, 
  LineChart 
} from "@/components/charts";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  ArrowDown, 
  ArrowUp, 
  CreditCard, 
  DollarSign, 
  FileText, 
  Package2, 
  ShoppingCart, 
  Users
} from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useCurrency } from "@/hooks/use-currency";
import { t } from "@/lib/translations";

// Sample data untuk dashboard
// Pada implementasi sebenarnya, data ini akan diambil dari API

const salesData = [
  { name: "Jan", total: 540000000 },
  { name: "Feb", total: 368000000 },
  { name: "Mar", total: 820000000 },
  { name: "Apr", total: 670000000 },
  { name: "Mei", total: 490000000 },
  { name: "Jun", total: 750000000 },
  { name: "Jul", total: 890000000 },
  { name: "Agu", total: 650000000 },
  { name: "Sep", total: 720000000 },
  { name: "Okt", total: 550000000 },
  { name: "Nov", total: 680000000 },
  { name: "Des", total: 920000000 },
];

const purchaseData = [
  { name: "Jan", total: 280000000 },
  { name: "Feb", total: 220000000 },
  { name: "Mar", total: 500000000 },
  { name: "Apr", total: 350000000 },
  { name: "Mei", total: 270000000 },
  { name: "Jun", total: 350000000 },
  { name: "Jul", total: 470000000 },
  { name: "Agu", total: 380000000 },
  { name: "Sep", total: 430000000 },
  { name: "Okt", total: 330000000 },
  { name: "Nov", total: 400000000 },
  { name: "Des", total: 590000000 },
];

const profitData = salesData.map((item, index) => ({
  name: item.name,
  penjualan: item.total,
  pembelian: purchaseData[index].total,
  laba: item.total - purchaseData[index].total,
}));

const categoryData = [
  { name: "Elektronik", value: 420000000 },
  { name: "Furnitur", value: 180000000 },
  { name: "Perlengkapan", value: 150000000 },
  { name: "Pakaian", value: 110000000 },
  { name: "Lainnya", value: 45000000 },
];

const recentTransactions = [
  {
    id: "INV-001",
    customer: "PT ABC Makmur",
    status: "Lunas",
    date: new Date(2024, 1, 15),
    amount: 15000000,
  },
  {
    id: "INV-002",
    customer: "CV XYZ Jaya",
    status: "Menunggu",
    date: new Date(2024, 2, 3),
    amount: 8700000,
  },
  {
    id: "INV-003",
    customer: "PT Sejahtera Utama",
    status: "Lunas",
    date: new Date(2024, 2, 8),
    amount: 12500000,
  },
  {
    id: "INV-004",
    customer: "UD Berkah Abadi",
    status: "Menunggu",
    date: new Date(2024, 2, 10),
    amount: 6300000,
  },
  {
    id: "INV-005",
    customer: "PT Mitra Sentosa",
    status: "Lunas",
    date: new Date(2024, 2, 15),
    amount: 9800000,
  },
];

const duePayments = [
  {
    id: "AP-001",
    vendor: "PT Supplier Utama",
    date: new Date(2024, 2, 20),
    amount: 7500000,
  },
  {
    id: "AP-002",
    vendor: "CV Distributor Jaya",
    date: new Date(2024, 2, 22),
    amount: 4200000,
  },
  {
    id: "AP-003",
    vendor: "UD Material Sejahtera",
    date: new Date(2024, 2, 25),
    amount: 8300000,
  },
];

export default function DashboardPage() {
  const { language } = useLanguage();
  const { currency } = useCurrency();
  
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.title', language)}</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {t('dashboard.period', language)}: {new Date().toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dashboard.total_sales', language)}
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(8120000000, currency)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                +18.2%
              </span>{" "}
              {t('dashboard.from_last_month', language)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dashboard.total_purchases', language)}
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(4570000000, currency)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                +7.5%
              </span>{" "}
              {t('dashboard.from_last_month', language)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dashboard.gross_profit', language)}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(3550000000, currency)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                +12.8%
              </span>{" "}
              {t('dashboard.from_last_month', language)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dashboard.customer_count', language)}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                +4.6%
              </span>{" "}
              {t('dashboard.from_last_month', language)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-7 mb-6">
        <Card className="md:col-span-5">
          <CardHeader>
            <CardTitle>{t('dashboard.sales_purchases_profit_comparison', language)}</CardTitle>
            <CardDescription>
              {t('dashboard.comparison_description', language)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart 
              data={profitData} 
              dataKeys={["penjualan", "pembelian", "laba"]} 
              height={350}
            />
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t('dashboard.sales_by_category', language)}</CardTitle>
            <CardDescription>
              {t('dashboard.category_distribution', language)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChart 
              data={categoryData} 
              height={350}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.recent_transactions', language)}</CardTitle>
            <CardDescription>
              {t('dashboard.recent_sales_list', language)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className="p-2.5 rounded-full bg-blue-100 dark:bg-blue-900"
                    >
                      <FileText className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">
                        {transaction.customer}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.id} • {formatShortDate(transaction.date, language === 'id' ? 'id-ID' : 'en-US')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {formatCurrency(transaction.amount, currency)}
                    </p>
                    <p 
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(transaction.status)}`}
                    >
                      {t(`status.${transaction.status.toLowerCase()}`, language)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <a 
              href="/sales/invoice" 
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              {t('dashboard.view_all_transactions', language)}
            </a>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.due_payments', language)}</CardTitle>
            <CardDescription>
              {t('dashboard.vendor_payments_due', language)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {duePayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className="p-2.5 rounded-full bg-amber-100 dark:bg-amber-900"
                    >
                      <CreditCard className="h-4 w-4 text-amber-700 dark:text-amber-300" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">
                        {payment.vendor}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {payment.id} • {t('dashboard.due_date', language)}: {formatShortDate(payment.date, language === 'id' ? 'id-ID' : 'en-US')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {formatCurrency(payment.amount, currency)}
                    </p>
                    <p 
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
                    >
                      {t('status.pending', language)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <a 
              href="/purchase/invoice" 
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              {t('dashboard.view_all_payments', language)}
            </a>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.top_products', language)}</CardTitle>
            <CardDescription>
              {t('dashboard.top_selling_products', language)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BarChartComponent 
              data={[
                { name: "Laptop X1", total: 156000000 },
                { name: "Monitor 24\"", total: 124000000 },
                { name: "Smartphone A12", total: 98000000 },
                { name: "Printer MX100", total: 86000000 },
                { name: "Kursi Kantor", total: 72000000 },
              ]} 
              dataKey="total" 
              height={300}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.stock_trend', language)}</CardTitle>
            <CardDescription>
              {t('dashboard.stock_value_movement', language)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChart 
              data={[
                { name: "Jul", total: 1850000000 },
                { name: "Agu", total: 1920000000 },
                { name: "Sep", total: 1780000000 },
                { name: "Okt", total: 1950000000 },
                { name: "Nov", total: 2080000000 },
                { name: "Des", total: 2150000000 },
              ]} 
              dataKey="total" 
              height={300}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}