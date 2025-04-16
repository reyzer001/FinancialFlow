export type LanguageCode = 'id' | 'en';

/**
 * Interface for the translations object structure
 */
interface Translation {
  [key: string]: {
    [key in LanguageCode]?: string;
  };
}

/**
 * Object containing all application translations
 */
export const translations: Translation = {
  // Common translations
  'common.select_language': {
    id: 'Pilih Bahasa',
    en: 'Select Language',
  },
  'common.select_currency': {
    id: 'Pilih Mata Uang',
    en: 'Select Currency',
  },
  'common.dashboard': {
    id: 'Dasbor',
    en: 'Dashboard',
  },
  'common.sales': {
    id: 'Penjualan',
    en: 'Sales',
  },
  'common.purchases': {
    id: 'Pembelian',
    en: 'Purchases',
  },
  'common.inventory': {
    id: 'Persediaan',
    en: 'Inventory',
  },
  'common.accounting': {
    id: 'Akuntansi',
    en: 'Accounting',
  },
  'common.reports': {
    id: 'Laporan',
    en: 'Reports',
  },
  'common.settings': {
    id: 'Pengaturan',
    en: 'Settings',
  },
  'common.logout': {
    id: 'Keluar',
    en: 'Logout',
  },
  'common.search': {
    id: 'Cari',
    en: 'Search',
  },
  'common.notifications': {
    id: 'Notifikasi',
    en: 'Notifications',
  },
  'common.account': {
    id: 'Akun',
    en: 'Account',
  },
  'common.welcome': {
    id: 'Selamat Datang',
    en: 'Welcome',
  },
  'common.cash_bank': {
    id: 'Kas & Bank',
    en: 'Cash & Bank',
  },
  'common.fixed_assets': {
    id: 'Aset Tetap',
    en: 'Fixed Assets',
  },
  'common.users': {
    id: 'Pengguna',
    en: 'Users',
  },
  'common.order': {
    id: 'Order',
    en: 'Order',
  },
  'common.admin_user': {
    id: 'User Admin',
    en: 'Admin User',
  },

  // Dashboard translations
  'dashboard.title': {
    id: 'Dasbor',
    en: 'Dashboard',
  },
  'dashboard.summary': {
    id: 'Ringkasan',
    en: 'Summary',
  },
  'dashboard.revenue': {
    id: 'Pendapatan',
    en: 'Revenue',
  },
  'dashboard.expenses': {
    id: 'Pengeluaran',
    en: 'Expenses',
  },
  'dashboard.profit': {
    id: 'Laba',
    en: 'Profit',
  },
  'dashboard.sales': {
    id: 'Penjualan',
    en: 'Sales',
  },
  'dashboard.total_sales': {
    id: 'Total Penjualan',
    en: 'Total Sales',
  },
  'dashboard.period': {
    id: 'Periode',
    en: 'Period',
  },
  'dashboard.total_purchases': {
    id: 'Total Pembelian',
    en: 'Total Purchases',
  },
  'dashboard.gross_profit': {
    id: 'Laba Kotor',
    en: 'Gross Profit',
  },
  'dashboard.customer_count': {
    id: 'Jumlah Pelanggan',
    en: 'Customer Count',
  },
  'dashboard.from_last_month': {
    id: 'dari bulan lalu',
    en: 'from last month',
  },
  'dashboard.sales_purchases_profit_comparison': {
    id: 'Penjualan vs Pembelian vs Laba',
    en: 'Sales vs Purchases vs Profit',
  },
  'dashboard.comparison_description': {
    id: 'Perbandingan nilai penjualan, pembelian, dan laba yang dihasilkan selama 12 bulan terakhir',
    en: 'Comparison of sales, purchases, and profit values generated over the last 12 months',
  },
  'dashboard.sales_by_category': {
    id: 'Penjualan per Kategori',
    en: 'Sales by Category',
  },
  'dashboard.category_distribution': {
    id: 'Distribusi penjualan berdasarkan kategori produk',
    en: 'Distribution of sales by product category',
  },
  'dashboard.recent_sales_list': {
    id: 'Daftar transaksi penjualan terbaru',
    en: 'List of recent sales transactions',
  },
  'dashboard.view_all_transactions': {
    id: 'Lihat semua transaksi',
    en: 'View all transactions',
  },
  'dashboard.due_payments': {
    id: 'Pembayaran Jatuh Tempo',
    en: 'Due Payments',
  },
  'dashboard.vendor_payments_due': {
    id: 'Daftar pembayaran vendor yang akan jatuh tempo',
    en: 'List of vendor payments due soon',
  },
  'dashboard.due_date': {
    id: 'Jatuh tempo',
    en: 'Due date',
  },
  'dashboard.view_all_payments': {
    id: 'Lihat semua pembayaran',
    en: 'View all payments',
  },
  'dashboard.top_selling_products': {
    id: 'Produk dengan penjualan tertinggi bulan ini',
    en: 'Products with highest sales this month',
  },
  'dashboard.stock_trend': {
    id: 'Tren Stok',
    en: 'Stock Trend',
  },
  'dashboard.stock_value_movement': {
    id: 'Pergerakan nilai stok dalam 6 bulan terakhir',
    en: 'Stock value movement over the last 6 months',
  },
  'dashboard.invoices': {
    id: 'Faktur',
    en: 'Invoices',
  },
  'dashboard.pending_invoices': {
    id: 'Faktur Tertunda',
    en: 'Pending Invoices',
  },
  'dashboard.paid_invoices': {
    id: 'Faktur Lunas',
    en: 'Paid Invoices',
  },
  'dashboard.overdue_invoices': {
    id: 'Faktur Terlambat',
    en: 'Overdue Invoices',
  },
  'dashboard.top_products': {
    id: 'Produk Terlaris',
    en: 'Top Products',
  },
  'dashboard.top_customers': {
    id: 'Pelanggan Teratas',
    en: 'Top Customers',
  },
  'dashboard.recent_transactions': {
    id: 'Transaksi Terbaru',
    en: 'Recent Transactions',
  },
  'dashboard.sales_overview': {
    id: 'Ringkasan Penjualan',
    en: 'Sales Overview',
  },
  'dashboard.expenses_overview': {
    id: 'Ringkasan Pengeluaran',
    en: 'Expenses Overview',
  },
  'dashboard.today': {
    id: 'Hari ini',
    en: 'Today',
  },
  'dashboard.this_week': {
    id: 'Minggu ini',
    en: 'This Week',
  },
  'dashboard.this_month': {
    id: 'Bulan ini',
    en: 'This Month',
  },
  'dashboard.this_year': {
    id: 'Tahun ini',
    en: 'This Year',
  },
  'dashboard.last_7_days': {
    id: '7 Hari Terakhir',
    en: 'Last 7 Days',
  },
  'dashboard.last_30_days': {
    id: '30 Hari Terakhir',
    en: 'Last 30 Days',
  },
  'dashboard.last_90_days': {
    id: '90 Hari Terakhir',
    en: 'Last 90 Days',
  },
  'dashboard.last_12_months': {
    id: '12 Bulan Terakhir',
    en: 'Last 12 Months',
  },
  'dashboard.custom_range': {
    id: 'Rentang Kustom',
    en: 'Custom Range',
  },

  // Sales translations
  'sales.title': {
    id: 'Penjualan',
    en: 'Sales',
  },
  'sales.invoices': {
    id: 'Faktur',
    en: 'Invoices',
  },
  'sales.customers': {
    id: 'Pelanggan',
    en: 'Customers',
  },
  'sales.quotes': {
    id: 'Penawaran',
    en: 'Quotes',
  },
  'sales.payments': {
    id: 'Pembayaran',
    en: 'Payments',
  },
  'sales.create_invoice': {
    id: 'Buat Faktur',
    en: 'Create Invoice',
  },
  'sales.create_quote': {
    id: 'Buat Penawaran',
    en: 'Create Quote',
  },
  'sales.add_customer': {
    id: 'Tambah Pelanggan',
    en: 'Add Customer',
  },
  'sales.record_payment': {
    id: 'Catat Pembayaran',
    en: 'Record Payment',
  },

  // Purchases translations
  'purchases.title': {
    id: 'Pembelian',
    en: 'Purchases',
  },
  'purchases.bills': {
    id: 'Tagihan',
    en: 'Bills',
  },
  'purchases.vendors': {
    id: 'Pemasok',
    en: 'Vendors',
  },
  'purchases.orders': {
    id: 'Pesanan',
    en: 'Orders',
  },
  'purchases.expenses': {
    id: 'Pengeluaran',
    en: 'Expenses',
  },
  'purchases.create_bill': {
    id: 'Buat Tagihan',
    en: 'Create Bill',
  },
  'purchases.create_order': {
    id: 'Buat Pesanan',
    en: 'Create Order',
  },
  'purchases.add_vendor': {
    id: 'Tambah Pemasok',
    en: 'Add Vendor',
  },
  'purchases.record_expense': {
    id: 'Catat Pengeluaran',
    en: 'Record Expense',
  },

  // Inventory translations
  'inventory.title': {
    id: 'Persediaan',
    en: 'Inventory',
  },
  'inventory.products': {
    id: 'Produk',
    en: 'Products',
  },
  'inventory.categories': {
    id: 'Kategori',
    en: 'Categories',
  },
  'inventory.warehouses': {
    id: 'Gudang',
    en: 'Warehouses',
  },
  'inventory.adjustments': {
    id: 'Penyesuaian',
    en: 'Adjustments',
  },
  'inventory.transfers': {
    id: 'Transfer',
    en: 'Transfers',
  },
  'inventory.add_product': {
    id: 'Tambah Produk',
    en: 'Add Product',
  },
  'inventory.add_category': {
    id: 'Tambah Kategori',
    en: 'Add Category',
  },
  'inventory.add_warehouse': {
    id: 'Tambah Gudang',
    en: 'Add Warehouse',
  },
  'inventory.create_adjustment': {
    id: 'Buat Penyesuaian',
    en: 'Create Adjustment',
  },
  'inventory.create_transfer': {
    id: 'Buat Transfer',
    en: 'Create Transfer',
  },

  // Accounting translations
  'accounting.title': {
    id: 'Akuntansi',
    en: 'Accounting',
  },
  'accounting.chart_of_accounts': {
    id: 'Bagan Akun',
    en: 'Chart of Accounts',
  },
  'accounting.journal_entries': {
    id: 'Entri Jurnal',
    en: 'Journal Entries',
  },
  'accounting.general_ledger': {
    id: 'Buku Besar',
    en: 'General Ledger',
  },
  'accounting.trial_balance': {
    id: 'Neraca Saldo',
    en: 'Trial Balance',
  },
  'accounting.create_account': {
    id: 'Buat Akun',
    en: 'Create Account',
  },
  'accounting.create_journal_entry': {
    id: 'Buat Entri Jurnal',
    en: 'Create Journal Entry',
  },
  'accounting.reconciliations': {
    id: 'Rekonsiliasi',
    en: 'Reconciliations',
  },
  'accounting.tax_rates': {
    id: 'Tarif Pajak',
    en: 'Tax Rates',
  },

  // Reports translations
  'reports.title': {
    id: 'Laporan',
    en: 'Reports',
  },
  'reports.income_statement': {
    id: 'Laporan Laba Rugi',
    en: 'Income Statement',
  },
  'reports.balance_sheet': {
    id: 'Neraca',
    en: 'Balance Sheet',
  },
  'reports.cash_flow': {
    id: 'Arus Kas',
    en: 'Cash Flow',
  },
  'reports.tax_summary': {
    id: 'Ringkasan Pajak',
    en: 'Tax Summary',
  },
  'reports.sales_report': {
    id: 'Laporan Penjualan',
    en: 'Sales Report',
  },
  'reports.purchases_report': {
    id: 'Laporan Pembelian',
    en: 'Purchases Report',
  },
  'reports.inventory_report': {
    id: 'Laporan Persediaan',
    en: 'Inventory Report',
  },
  'reports.customer_statements': {
    id: 'Laporan Pelanggan',
    en: 'Customer Statements',
  },
  'reports.vendor_statements': {
    id: 'Laporan Pemasok',
    en: 'Vendor Statements',
  },
  'reports.custom_reports': {
    id: 'Laporan Kustom',
    en: 'Custom Reports',
  },

  // Settings translations
  'settings.title': {
    id: 'Pengaturan',
    en: 'Settings',
  },
  'settings.company': {
    id: 'Perusahaan',
    en: 'Company',
  },
  'settings.users': {
    id: 'Pengguna',
    en: 'Users',
  },
  'settings.roles': {
    id: 'Peran',
    en: 'Roles',
  },
  'settings.permissions': {
    id: 'Izin',
    en: 'Permissions',
  },
  'settings.currency': {
    id: 'Mata Uang',
    en: 'Currency',
  },
  'settings.tax': {
    id: 'Pajak',
    en: 'Tax',
  },
  'settings.invoice_templates': {
    id: 'Template Faktur',
    en: 'Invoice Templates',
  },
  'settings.email_templates': {
    id: 'Template Email',
    en: 'Email Templates',
  },
  'settings.backup': {
    id: 'Cadangan',
    en: 'Backup',
  },
  'settings.api': {
    id: 'API',
    en: 'API',
  },

  // Status labels
  'status.active': {
    id: 'Aktif',
    en: 'Active',
  },
  'status.inactive': {
    id: 'Tidak Aktif',
    en: 'Inactive',
  },
  'status.pending': {
    id: 'Tertunda',
    en: 'Pending',
  },
  'status.approved': {
    id: 'Disetujui',
    en: 'Approved',
  },
  'status.rejected': {
    id: 'Ditolak',
    en: 'Rejected',
  },
  'status.draft': {
    id: 'Draft',
    en: 'Draft',
  },
  'status.sent': {
    id: 'Terkirim',
    en: 'Sent',
  },
  'status.overdue': {
    id: 'Terlambat',
    en: 'Overdue',
  },
  'status.paid': {
    id: 'Dibayar',
    en: 'Paid',
  },
  'status.partial': {
    id: 'Sebagian',
    en: 'Partial',
  },
  'status.unpaid': {
    id: 'Belum Dibayar',
    en: 'Unpaid',
  },
  'status.voided': {
    id: 'Dibatalkan',
    en: 'Voided',
  },

  // Auth translations
  'auth.login': {
    id: 'Masuk',
    en: 'Login',
  },
  'auth.register': {
    id: 'Daftar',
    en: 'Register',
  },
  'auth.email': {
    id: 'Email',
    en: 'Email',
  },
  'auth.password': {
    id: 'Kata Sandi',
    en: 'Password',
  },
  'auth.confirm_password': {
    id: 'Konfirmasi Kata Sandi',
    en: 'Confirm Password',
  },
  'auth.forgot_password': {
    id: 'Lupa Kata Sandi?',
    en: 'Forgot Password?',
  },
  'auth.reset_password': {
    id: 'Reset Kata Sandi',
    en: 'Reset Password',
  },
  'auth.remember_me': {
    id: 'Ingat Saya',
    en: 'Remember Me',
  },
  'auth.logout': {
    id: 'Keluar',
    en: 'Logout',
  },
  'auth.name': {
    id: 'Nama',
    en: 'Name',
  },
  'auth.username': {
    id: 'Nama Pengguna',
    en: 'Username',
  },
  'auth.2fa': {
    id: 'Autentikasi 2 Faktor',
    en: '2-Factor Authentication',
  },
  
  // Cash & Bank translations
  'cash_bank.cash_in': {
    id: 'Kas Masuk',
    en: 'Cash In',
  },
  'cash_bank.cash_out': {
    id: 'Kas Keluar',
    en: 'Cash Out',
  },
  'cash_bank.transfer': {
    id: 'Transfer',
    en: 'Transfer',
  },
  'cash_bank.reconciliation': {
    id: 'Rekonsiliasi',
    en: 'Reconciliation',
  },
  
  // Fixed Assets translations
  'fixed_assets.list': {
    id: 'Daftar Aset',
    en: 'Asset List',
  },
  'fixed_assets.depreciation': {
    id: 'Penyusutan',
    en: 'Depreciation',
  },
  
  // Users translations
  'users.list': {
    id: 'Daftar Pengguna',
    en: 'User List',
  },
  'users.roles': {
    id: 'Hak Akses',
    en: 'Access Rights',
  },
  
  // Additional Sales translations
  'sales.returns': {
    id: 'Retur',
    en: 'Returns',
  },
  
  // Additional Purchases translations
  'purchases.request': {
    id: 'Permintaan',
    en: 'Request',
  },
  'purchases.returns': {
    id: 'Retur',
    en: 'Returns',
  },
  
  // Additional Inventory translation
  'inventory.stocktake': {
    id: 'Stok Opname',
    en: 'Stock Take',
  },
};

export const DEFAULT_LANGUAGE: LanguageCode = 'id';

/**
 * Function to get a translation string
 * @param key The translation key to look up
 * @param language The language code to use (defaults to id)
 * @returns The translated string, or the key if not found
 */
export function t(key: string, language: LanguageCode = DEFAULT_LANGUAGE): string {
  const translation = translations[key]?.[language] || translations[key]?.[DEFAULT_LANGUAGE];
  
  if (!translation) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  
  return translation;
}