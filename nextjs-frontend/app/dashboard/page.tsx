'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';
import { 
  ArrowDownRight, ArrowUpRight, DollarSign, 
  CreditCard, TrendingUp, TrendingDown, Clock 
} from 'lucide-react';

export default function DashboardPage() {
  // Placeholder dashboard data
  const dashboardMetrics = {
    totalRevenue: 98500000,
    totalExpenses: 45700000,
    accountsReceivable: 25800000,
    accountsPayable: 15400000,
    revenueChange: 15.8,
    expensesChange: 8.2,
    receivableChange: -5.3,
    payableChange: 12.7,
  };

  // Format currency in Indonesian Rupiah
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Placeholder recent transactions data
  const recentTransactions = [
    { id: 1, date: '2023-04-15', description: 'Invoice #INV-2023-0042', type: 'sales', amount: 7500000 },
    { id: 2, date: '2023-04-14', description: 'Purchase #PO-2023-0021', type: 'purchase', amount: -4200000 },
    { id: 3, date: '2023-04-12', description: 'Invoice #INV-2023-0041', type: 'sales', amount: 5350000 },
    { id: 4, date: '2023-04-10', description: 'Payment from PT Maju Jaya', type: 'payment', amount: 9800000 },
    { id: 5, date: '2023-04-08', description: 'Electricity Bill Payment', type: 'expense', amount: -1750000 },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Overview of your business performance</p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {formatCurrency(dashboardMetrics.totalRevenue)}
              </h3>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center">
            <div className={`flex items-center ${dashboardMetrics.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {dashboardMetrics.revenueChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              <span className="text-sm font-medium">{Math.abs(dashboardMetrics.revenueChange)}%</span>
            </div>
            <span className="text-sm text-gray-500 ml-2">from last month</span>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Expenses</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {formatCurrency(dashboardMetrics.totalExpenses)}
              </h3>
            </div>
            <div className="p-2 bg-red-100 rounded-full">
              <CreditCard className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="flex items-center">
            <div className={`flex items-center ${dashboardMetrics.expensesChange >= 0 ? 'text-red-600' : 'text-green-600'}`}>
              {dashboardMetrics.expensesChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              <span className="text-sm font-medium">{Math.abs(dashboardMetrics.expensesChange)}%</span>
            </div>
            <span className="text-sm text-gray-500 ml-2">from last month</span>
          </div>
        </div>

        {/* Accounts Receivable */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Accounts Receivable</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {formatCurrency(dashboardMetrics.accountsReceivable)}
              </h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center">
            <div className={`flex items-center ${dashboardMetrics.receivableChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {dashboardMetrics.receivableChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              <span className="text-sm font-medium">{Math.abs(dashboardMetrics.receivableChange)}%</span>
            </div>
            <span className="text-sm text-gray-500 ml-2">from last month</span>
          </div>
        </div>

        {/* Accounts Payable */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Accounts Payable</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {formatCurrency(dashboardMetrics.accountsPayable)}
              </h3>
            </div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <TrendingDown className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="flex items-center">
            <div className={`flex items-center ${dashboardMetrics.payableChange >= 0 ? 'text-red-600' : 'text-green-600'}`}>
              {dashboardMetrics.payableChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              <span className="text-sm font-medium">{Math.abs(dashboardMetrics.payableChange)}%</span>
            </div>
            <span className="text-sm text-gray-500 ml-2">from last month</span>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-semibold text-lg text-gray-900">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      {new Date(transaction.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${transaction.type === 'sales' ? 'bg-green-100 text-green-800' : ''}
                        ${transaction.type === 'purchase' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${transaction.type === 'payment' ? 'bg-blue-100 text-blue-800' : ''}
                        ${transaction.type === 'expense' ? 'bg-red-100 text-red-800' : ''}
                      `}
                    >
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200">
          <a href="/accounting/transactions" className="text-sm font-medium text-primary-600 hover:text-primary-500">
            View all transactions
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
}