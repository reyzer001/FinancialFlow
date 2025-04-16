"use client";

import React from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { formatRupiah, formatShortDate, getStatusColor } from "@/lib/utils";
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
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Periode: {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Penjualan
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatRupiah(8120000000)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                +18.2%
              </span>{" "}
              dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pembelian
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatRupiah(4570000000)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                +7.5%
              </span>{" "}
              dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Laba Kotor
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatRupiah(3550000000)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                +12.8%
              </span>{" "}
              dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Jumlah Pelanggan
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
              dari bulan lalu
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-7 mb-6">
        <Card className="md:col-span-5">
          <CardHeader>
            <CardTitle>Penjualan vs Pembelian vs Laba</CardTitle>
            <CardDescription>
              Perbandingan nilai penjualan, pembelian, dan laba yang dihasilkan selama 12 bulan terakhir
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
            <CardTitle>Penjualan per Kategori</CardTitle>
            <CardDescription>
              Distribusi penjualan berdasarkan kategori produk
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
            <CardTitle>Transaksi Terkini</CardTitle>
            <CardDescription>
              Daftar transaksi penjualan terbaru
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
                        {transaction.id} • {formatShortDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {formatRupiah(transaction.amount)}
                    </p>
                    <p 
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(transaction.status)}`}
                    >
                      {transaction.status}
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
              Lihat semua transaksi
            </a>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pembayaran Jatuh Tempo</CardTitle>
            <CardDescription>
              Daftar pembayaran vendor yang akan jatuh tempo
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
                        {payment.id} • Jatuh tempo: {formatShortDate(payment.date)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {formatRupiah(payment.amount)}
                    </p>
                    <p 
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
                    >
                      Menunggu
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
              Lihat semua pembayaran
            </a>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Produk Terlaris</CardTitle>
            <CardDescription>
              Produk dengan penjualan tertinggi bulan ini
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
            <CardTitle>Tren Stok</CardTitle>
            <CardDescription>
              Pergerakan nilai stok dalam 6 bulan terakhir
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