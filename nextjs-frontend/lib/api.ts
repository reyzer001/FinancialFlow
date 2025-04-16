/**
 * API utilities for communicating with the Laravel backend
 */

import { CurrencyCode } from './utils';

const API_BASE_URL = '/api'; // This uses Next.js rewrites defined in next.config.js

interface ApiOptions {
  credentials?: RequestCredentials;
  headers?: HeadersInit;
  method?: string;
  body?: BodyInit | null;
}

interface ApiResponse<T> {
  data: T | null;
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Fetch data from the API with proper error handling
 */
export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<ApiResponse<T>> {
  try {
    const defaultOptions: ApiOptions = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      method: 'GET',
    };

    // Merge options
    const fetchOptions: RequestInit = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    // Format URL properly
    const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    const response = await fetch(url, fetchOptions);
    
    // Parse response body
    let data: any = null;
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    if (!response.ok) {
      return {
        data: null,
        success: false,
        message: data.message || 'An error occurred',
        errors: data.errors || {},
      };
    }
    
    return {
      data: data,
      success: true,
    };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      data: null,
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

/**
 * Authentication API
 */
export const authApi = {
  login: async (username: string, password: string) => {
    return apiRequest<{ user: any; token: string }>('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },
  
  register: async (userData: any) => {
    return apiRequest<{ user: any; token: string }>('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  logout: async () => {
    return apiRequest('/logout', {
      method: 'POST',
    });
  },
  
  getUser: async () => {
    return apiRequest<any>('/user');
  },
};

/**
 * Dashboard API
 */
export const dashboardApi = {
  getMetrics: async () => {
    return apiRequest<{
      totalSales: number;
      totalPurchases: number;
      grossProfit: number;
      customerCount: number;
    }>('/dashboard/metrics');
  },
  
  getChartData: async () => {
    return apiRequest<{
      salesData: { name: string; total: number }[];
      purchaseData: { name: string; total: number }[];
      profitData: { name: string; penjualan: number; pembelian: number; laba: number }[];
      categoryData: { name: string; value: number }[];
    }>('/dashboard/chart-data');
  },
  
  getRecentTransactions: async () => {
    return apiRequest<{
      transactions: {
        id: string;
        customer: string;
        status: string;
        date: string;
        amount: number;
      }[];
    }>('/dashboard/recent-transactions');
  },
  
  getDuePayments: async () => {
    return apiRequest<{
      payments: {
        id: string;
        vendor: string;
        date: string;
        amount: number;
      }[];
    }>('/dashboard/due-payments');
  },
};

/**
 * Sales API
 */
export const salesApi = {
  // Quotations
  getQuotations: async () => {
    return apiRequest<any[]>('/sales/quotations');
  },
  
  getQuotation: async (id: number | string) => {
    return apiRequest<any>(`/sales/quotations/${id}`);
  },
  
  createQuotation: async (data: any) => {
    return apiRequest<any>('/sales/quotations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  updateQuotation: async (id: number | string, data: any) => {
    return apiRequest<any>(`/sales/quotations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  deleteQuotation: async (id: number | string) => {
    return apiRequest(`/sales/quotations/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Orders
  getOrders: async () => {
    return apiRequest<any[]>('/sales/orders');
  },
  
  getOrder: async (id: number | string) => {
    return apiRequest<any>(`/sales/orders/${id}`);
  },
  
  createOrder: async (data: any) => {
    return apiRequest<any>('/sales/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  updateOrder: async (id: number | string, data: any) => {
    return apiRequest<any>(`/sales/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  deleteOrder: async (id: number | string) => {
    return apiRequest(`/sales/orders/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Invoices
  getInvoices: async () => {
    return apiRequest<any[]>('/sales/invoices');
  },
  
  getInvoice: async (id: number | string) => {
    return apiRequest<any>(`/sales/invoices/${id}`);
  },
  
  createInvoice: async (data: any) => {
    return apiRequest<any>('/sales/invoices', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  updateInvoice: async (id: number | string, data: any) => {
    return apiRequest<any>(`/sales/invoices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  deleteInvoice: async (id: number | string) => {
    return apiRequest(`/sales/invoices/${id}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Purchasing API
 */
export const purchasingApi = {
  // Orders
  getOrders: async () => {
    return apiRequest<any[]>('/purchasing/orders');
  },
  
  getOrder: async (id: number | string) => {
    return apiRequest<any>(`/purchasing/orders/${id}`);
  },
  
  createOrder: async (data: any) => {
    return apiRequest<any>('/purchasing/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  updateOrder: async (id: number | string, data: any) => {
    return apiRequest<any>(`/purchasing/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  deleteOrder: async (id: number | string) => {
    return apiRequest(`/purchasing/orders/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Invoices
  getInvoices: async () => {
    return apiRequest<any[]>('/purchasing/invoices');
  },
  
  getInvoice: async (id: number | string) => {
    return apiRequest<any>(`/purchasing/invoices/${id}`);
  },
  
  createInvoice: async (data: any) => {
    return apiRequest<any>('/purchasing/invoices', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  updateInvoice: async (id: number | string, data: any) => {
    return apiRequest<any>(`/purchasing/invoices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  deleteInvoice: async (id: number | string) => {
    return apiRequest(`/purchasing/invoices/${id}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Products and Inventory API
 */
export const inventoryApi = {
  // Products
  getProducts: async () => {
    return apiRequest<any[]>('/products');
  },
  
  getProduct: async (id: number | string) => {
    return apiRequest<any>(`/products/${id}`);
  },
  
  createProduct: async (data: any) => {
    return apiRequest<any>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  updateProduct: async (id: number | string, data: any) => {
    return apiRequest<any>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  deleteProduct: async (id: number | string) => {
    return apiRequest(`/products/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Warehouses
  getWarehouses: async () => {
    return apiRequest<any[]>('/warehouses');
  },
  
  getWarehouse: async (id: number | string) => {
    return apiRequest<any>(`/warehouses/${id}`);
  },
  
  createWarehouse: async (data: any) => {
    return apiRequest<any>('/warehouses', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  updateWarehouse: async (id: number | string, data: any) => {
    return apiRequest<any>(`/warehouses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  deleteWarehouse: async (id: number | string) => {
    return apiRequest(`/warehouses/${id}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Accounting API
 */
export const accountingApi = {
  // Chart of Accounts
  getAccountCategories: async () => {
    return apiRequest<any[]>('/accounting/account-categories');
  },
  
  getAccounts: async () => {
    return apiRequest<any[]>('/accounting/accounts');
  },
  
  getAccount: async (id: number | string) => {
    return apiRequest<any>(`/accounting/accounts/${id}`);
  },
  
  createAccount: async (data: any) => {
    return apiRequest<any>('/accounting/accounts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  updateAccount: async (id: number | string, data: any) => {
    return apiRequest<any>(`/accounting/accounts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  deleteAccount: async (id: number | string) => {
    return apiRequest(`/accounting/accounts/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Journal Entries
  getJournals: async () => {
    return apiRequest<any[]>('/accounting/journals');
  },
  
  getJournal: async (id: number | string) => {
    return apiRequest<any>(`/accounting/journals/${id}`);
  },
  
  createJournal: async (data: any) => {
    return apiRequest<any>('/accounting/journals', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  updateJournal: async (id: number | string, data: any) => {
    return apiRequest<any>(`/accounting/journals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  deleteJournal: async (id: number | string) => {
    return apiRequest(`/accounting/journals/${id}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Customers API
 */
export const customersApi = {
  getCustomers: async () => {
    return apiRequest<any[]>('/customers');
  },
  
  getCustomer: async (id: number | string) => {
    return apiRequest<any>(`/customers/${id}`);
  },
  
  createCustomer: async (data: any) => {
    return apiRequest<any>('/customers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  updateCustomer: async (id: number | string, data: any) => {
    return apiRequest<any>(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  deleteCustomer: async (id: number | string) => {
    return apiRequest(`/customers/${id}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Vendors API
 */
export const vendorsApi = {
  getVendors: async () => {
    return apiRequest<any[]>('/vendors');
  },
  
  getVendor: async (id: number | string) => {
    return apiRequest<any>(`/vendors/${id}`);
  },
  
  createVendor: async (data: any) => {
    return apiRequest<any>('/vendors', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  updateVendor: async (id: number | string, data: any) => {
    return apiRequest<any>(`/vendors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  deleteVendor: async (id: number | string) => {
    return apiRequest(`/vendors/${id}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Reports API
 */
export const reportsApi = {
  getFinancialReports: async () => {
    return apiRequest<any>('/reports/financial');
  },
  
  getSalesReports: async () => {
    return apiRequest<any>('/reports/sales');
  },
  
  getInventoryReports: async () => {
    return apiRequest<any>('/reports/inventory');
  },
};