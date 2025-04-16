import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  dashboardApi,
  salesApi,
  purchasingApi,
  inventoryApi,
  accountingApi,
  customersApi,
  vendorsApi,
  reportsApi,
  authApi
} from '../api';

/**
 * Dashboard hooks
 */
export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: ['dashboard', 'metrics'],
    queryFn: () => dashboardApi.getMetrics(),
  });
};

export const useDashboardChartData = () => {
  return useQuery({
    queryKey: ['dashboard', 'chartData'],
    queryFn: () => dashboardApi.getChartData(),
  });
};

export const useRecentTransactions = () => {
  return useQuery({
    queryKey: ['dashboard', 'recentTransactions'],
    queryFn: () => dashboardApi.getRecentTransactions(),
  });
};

export const useDuePayments = () => {
  return useQuery({
    queryKey: ['dashboard', 'duePayments'],
    queryFn: () => dashboardApi.getDuePayments(),
  });
};

/**
 * Auth hooks
 */
export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => authApi.getUser(),
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) => 
      authApi.login(username, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: any) => authApi.register(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.clear();
    },
  });
};

/**
 * Customers hooks
 */
export const useCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: () => customersApi.getCustomers(),
  });
};

export const useCustomer = (id: number | string) => {
  return useQuery({
    queryKey: ['customers', id],
    queryFn: () => customersApi.getCustomer(id),
    enabled: !!id,
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => customersApi.createCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: any }) => 
      customersApi.updateCustomer(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customers', variables.id] });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number | string) => customersApi.deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};

/**
 * Vendors hooks
 */
export const useVendors = () => {
  return useQuery({
    queryKey: ['vendors'],
    queryFn: () => vendorsApi.getVendors(),
  });
};

export const useVendor = (id: number | string) => {
  return useQuery({
    queryKey: ['vendors', id],
    queryFn: () => vendorsApi.getVendor(id),
    enabled: !!id,
  });
};

export const useCreateVendor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => vendorsApi.createVendor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
    },
  });
};

export const useUpdateVendor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: any }) => 
      vendorsApi.updateVendor(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      queryClient.invalidateQueries({ queryKey: ['vendors', variables.id] });
    },
  });
};

export const useDeleteVendor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number | string) => vendorsApi.deleteVendor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
    },
  });
};

/**
 * Products hooks
 */
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => inventoryApi.getProducts(),
  });
};

export const useProduct = (id: number | string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => inventoryApi.getProduct(id),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => inventoryApi.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: any }) => 
      inventoryApi.updateProduct(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['products', variables.id] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number | string) => inventoryApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

/**
 * Sales hooks
 */
// Quotations
export const useSalesQuotations = () => {
  return useQuery({
    queryKey: ['sales', 'quotations'],
    queryFn: () => salesApi.getQuotations(),
  });
};

export const useSalesQuotation = (id: number | string) => {
  return useQuery({
    queryKey: ['sales', 'quotations', id],
    queryFn: () => salesApi.getQuotation(id),
    enabled: !!id,
  });
};

// Orders
export const useSalesOrders = () => {
  return useQuery({
    queryKey: ['sales', 'orders'],
    queryFn: () => salesApi.getOrders(),
  });
};

export const useSalesOrder = (id: number | string) => {
  return useQuery({
    queryKey: ['sales', 'orders', id],
    queryFn: () => salesApi.getOrder(id),
    enabled: !!id,
  });
};

// Invoices
export const useSalesInvoices = () => {
  return useQuery({
    queryKey: ['sales', 'invoices'],
    queryFn: () => salesApi.getInvoices(),
  });
};

export const useSalesInvoice = (id: number | string) => {
  return useQuery({
    queryKey: ['sales', 'invoices', id],
    queryFn: () => salesApi.getInvoice(id),
    enabled: !!id,
  });
};

/**
 * Purchasing hooks
 */
// Orders
export const usePurchaseOrders = () => {
  return useQuery({
    queryKey: ['purchasing', 'orders'],
    queryFn: () => purchasingApi.getOrders(),
  });
};

export const usePurchaseOrder = (id: number | string) => {
  return useQuery({
    queryKey: ['purchasing', 'orders', id],
    queryFn: () => purchasingApi.getOrder(id),
    enabled: !!id,
  });
};

// Invoices
export const usePurchaseInvoices = () => {
  return useQuery({
    queryKey: ['purchasing', 'invoices'],
    queryFn: () => purchasingApi.getInvoices(),
  });
};

export const usePurchaseInvoice = (id: number | string) => {
  return useQuery({
    queryKey: ['purchasing', 'invoices', id],
    queryFn: () => purchasingApi.getInvoice(id),
    enabled: !!id,
  });
};

/**
 * Accounting hooks
 */
// Chart of Accounts
export const useAccountCategories = () => {
  return useQuery({
    queryKey: ['accounting', 'accountCategories'],
    queryFn: () => accountingApi.getAccountCategories(),
  });
};

export const useAccounts = () => {
  return useQuery({
    queryKey: ['accounting', 'accounts'],
    queryFn: () => accountingApi.getAccounts(),
  });
};

export const useAccount = (id: number | string) => {
  return useQuery({
    queryKey: ['accounting', 'accounts', id],
    queryFn: () => accountingApi.getAccount(id),
    enabled: !!id,
  });
};

// Journal Entries
export const useJournals = () => {
  return useQuery({
    queryKey: ['accounting', 'journals'],
    queryFn: () => accountingApi.getJournals(),
  });
};

export const useJournal = (id: number | string) => {
  return useQuery({
    queryKey: ['accounting', 'journals', id],
    queryFn: () => accountingApi.getJournal(id),
    enabled: !!id,
  });
};

/**
 * Reports hooks
 */
export const useFinancialReports = () => {
  return useQuery({
    queryKey: ['reports', 'financial'],
    queryFn: () => reportsApi.getFinancialReports(),
  });
};

export const useSalesReports = () => {
  return useQuery({
    queryKey: ['reports', 'sales'],
    queryFn: () => reportsApi.getSalesReports(),
  });
};

export const useInventoryReports = () => {
  return useQuery({
    queryKey: ['reports', 'inventory'],
    queryFn: () => reportsApi.getInventoryReports(),
  });
};