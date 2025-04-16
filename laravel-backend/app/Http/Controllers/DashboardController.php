<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Transaction;
use App\Models\Journal;
use App\Models\SalesInvoice;
use App\Models\PurchaseInvoice;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Get dashboard metrics.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMetrics()
    {
        // For initial implementation, return placeholder data
        // Will be replaced with actual DB queries when models are implemented
        return response()->json([
            'totalRevenue' => 98500000,
            'totalExpenses' => 45700000,
            'accountsReceivable' => 25800000,
            'accountsPayable' => 15400000,
            'revenueChange' => 15.8,
            'expensesChange' => 8.2,
            'receivableChange' => -5.3,
            'payableChange' => 12.7,
        ]);
    }

    /**
     * Get chart data for dashboard.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getChartData()
    {
        // Define month names
        $months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        // Generate sample data for revenue and expenses
        $revenue = [
            48000000, 52000000, 61000000, 67000000, 71000000, 76000000,
            83000000, 87000000, 74000000, 93000000, 99000000, 98500000
        ];

        $expenses = [
            23000000, 25000000, 27000000, 29000000, 31000000, 34000000,
            35000000, 38000000, 36000000, 40000000, 44000000, 45700000
        ];

        return response()->json([
            'months' => $months,
            'revenue' => $revenue,
            'expenses' => $expenses,
        ]);
    }

    /**
     * Get cash flow data.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCashFlowData()
    {
        // Generate sample data for weekly cash flow
        $weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        $incoming = [7300000, 8500000, 9200000, 10500000];
        $outgoing = [4200000, 3900000, 4800000, 5100000];

        $totalIncoming = array_sum($incoming);
        $totalOutgoing = array_sum($outgoing);

        return response()->json([
            'weeks' => $weeks,
            'incoming' => $incoming,
            'outgoing' => $outgoing,
            'totalIncoming' => $totalIncoming,
            'totalOutgoing' => $totalOutgoing,
        ]);
    }

    /**
     * Get recent transactions.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getRecentTransactions()
    {
        // Sample transaction data
        $transactions = [
            [
                'id' => 1,
                'date' => '2023-04-15',
                'description' => 'Invoice #INV-2023-0042',
                'type' => 'sales',
                'amount' => 7500000,
            ],
            [
                'id' => 2,
                'date' => '2023-04-14',
                'description' => 'Purchase #PO-2023-0021',
                'type' => 'purchase',
                'amount' => -4200000,
            ],
            [
                'id' => 3,
                'date' => '2023-04-12',
                'description' => 'Invoice #INV-2023-0041',
                'type' => 'sales',
                'amount' => 5350000,
            ],
            [
                'id' => 4,
                'date' => '2023-04-10',
                'description' => 'Payment from PT Maju Jaya',
                'type' => 'payment',
                'amount' => 9800000,
            ],
            [
                'id' => 5,
                'date' => '2023-04-08',
                'description' => 'Electricity Bill Payment',
                'type' => 'expense',
                'amount' => -1750000,
            ],
        ];

        return response()->json($transactions);
    }

    /**
     * Get top accounts data.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopAccounts()
    {
        // Sample top accounts data
        $accounts = [
            [
                'name' => 'Penjualan Produk',
                'balance' => 67500000,
                'percentage' => 68.5,
                'type' => 'revenue',
            ],
            [
                'name' => 'Penjualan Jasa',
                'balance' => 31000000,
                'percentage' => 31.5,
                'type' => 'revenue',
            ],
            [
                'name' => 'Gaji Karyawan',
                'balance' => 21500000,
                'percentage' => 47.0,
                'type' => 'expense',
            ],
            [
                'name' => 'Sewa Kantor',
                'balance' => 8500000,
                'percentage' => 18.6,
                'type' => 'expense',
            ],
            [
                'name' => 'Utilitas',
                'balance' => 5200000,
                'percentage' => 11.4,
                'type' => 'expense',
            ],
            [
                'name' => 'Pemasaran',
                'balance' => 7300000,
                'percentage' => 16.0,
                'type' => 'expense',
            ],
            [
                'name' => 'Operasional',
                'balance' => 3200000,
                'percentage' => 7.0,
                'type' => 'expense',
            ],
        ];

        return response()->json($accounts);
    }
}