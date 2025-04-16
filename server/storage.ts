import { 
  User, InsertUser, 
  Customer, Vendor, Product, Warehouse, 
  Account, AccountCategory, 
  SalesQuotation, SalesQuotationItem, 
  SalesOrder, SalesOrderItem, 
  SalesInvoice, SalesInvoiceItem,
  PurchaseOrder, PurchaseOrderItem,
  PurchaseInvoice, PurchaseInvoiceItem,
  Journal, JournalItem,
  Payment, PaymentItem,
  Transaction, TransactionData,
  users, accounts, accountCategories,
  customers, vendors, products,
  warehouses, inventory,
  permissions
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectPg from "connect-pg-simple";
import { db, pool } from "./db";
import { eq, desc, and, asc } from "drizzle-orm";

const PostgresSessionStore = connectPg(session);
const MemoryStore = createMemoryStore(session);

// Interface for the storage system
export interface IStorage {
  // Authentication
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  sessionStore: any; // Using 'any' type to avoid type conflicts
  
  // Customers
  getCustomers(): Promise<Customer[]>;
  getCustomer(id: number): Promise<Customer | undefined>;
  createCustomer(customer: Omit<Customer, "id" | "createdAt">): Promise<Customer>;
  updateCustomer(id: number, customer: Partial<Customer>): Promise<Customer | undefined>;
  deleteCustomer(id: number): Promise<boolean>;
  
  // Vendors
  getVendors(): Promise<Vendor[]>;
  getVendor(id: number): Promise<Vendor | undefined>;
  createVendor(vendor: Omit<Vendor, "id" | "createdAt">): Promise<Vendor>;
  updateVendor(id: number, vendor: Partial<Vendor>): Promise<Vendor | undefined>;
  deleteVendor(id: number): Promise<boolean>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: Omit<Product, "id" | "createdAt">): Promise<Product>;
  updateProduct(id: number, product: Partial<Product>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Warehouses
  getWarehouses(): Promise<Warehouse[]>;
  getWarehouse(id: number): Promise<Warehouse | undefined>;
  createWarehouse(warehouse: Omit<Warehouse, "id">): Promise<Warehouse>;
  updateWarehouse(id: number, warehouse: Partial<Warehouse>): Promise<Warehouse | undefined>;
  deleteWarehouse(id: number): Promise<boolean>;
  
  // Chart of Accounts
  getAccountCategories(): Promise<AccountCategory[]>;
  getAccounts(): Promise<Account[]>;
  getAccount(id: number): Promise<Account | undefined>;
  createAccount(account: Omit<Account, "id">): Promise<Account>;
  updateAccount(id: number, account: Partial<Account>): Promise<Account | undefined>;
  deleteAccount(id: number): Promise<boolean>;
  
  // Transactions
  getRecentTransactions(): Promise<TransactionData[]>;
  
  // Dashboard Data
  getDashboardMetrics(): Promise<{
    totalRevenue: number;
    totalExpenses: number;
    accountsReceivable: number;
    accountsPayable: number;
    revenueChange: number;
    expensesChange: number;
    receivableChange: number;
    payableChange: number;
  }>;
  
  getChartData(): Promise<{
    revenue: number[];
    expenses: number[];
    months: string[];
  }>;
  
  getCashFlowData(): Promise<{
    incoming: number[];
    outgoing: number[];
    weeks: string[];
    totalIncoming: number;
    totalOutgoing: number;
  }>;
  
  getTopAccounts(): Promise<{
    name: string;
    balance: number;
    percentage: number;
    type: "revenue" | "expense";
  }[]>;
}

// In-memory implementation of the storage interface
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private customers: Map<number, Customer>;
  private vendors: Map<number, Vendor>;
  private products: Map<number, Product>;
  private warehouses: Map<number, Warehouse>;
  private accounts: Map<number, Account>;
  private accountCategories: Map<number, AccountCategory>;
  private salesQuotations: Map<number, SalesQuotation>;
  private salesOrders: Map<number, SalesOrder>;
  private salesInvoices: Map<number, SalesInvoice>;
  private purchaseOrders: Map<number, PurchaseOrder>;
  private purchaseInvoices: Map<number, PurchaseInvoice>;
  private journals: Map<number, Journal>;
  private transactions: Map<number, Transaction>;
  
  // Counters for ID generation
  private userId: number = 1;
  private customerId: number = 1;
  private vendorId: number = 1;
  private productId: number = 1;
  private warehouseId: number = 1;
  private accountId: number = 1;
  private categoryId: number = 1;
  private transactionId: number = 1;
  
  sessionStore: any;
  
  constructor() {
    this.users = new Map();
    this.customers = new Map();
    this.vendors = new Map();
    this.products = new Map();
    this.warehouses = new Map();
    this.accounts = new Map();
    this.accountCategories = new Map();
    this.salesQuotations = new Map();
    this.salesOrders = new Map();
    this.salesInvoices = new Map();
    this.purchaseOrders = new Map();
    this.purchaseInvoices = new Map();
    this.journals = new Map();
    this.transactions = new Map();
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // 1 day in ms
    });
    
    // Initialize with seed data for testing
    this.seedData();
  }
  
  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const now = new Date();
    // Ensure default values are set for required fields
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role || "staff",
      active: insertUser.active !== undefined ? insertUser.active : true,
      createdAt: now 
    };
    this.users.set(id, user);
    return user;
  }
  
  // Customers
  async getCustomers(): Promise<Customer[]> {
    return Array.from(this.customers.values());
  }
  
  async getCustomer(id: number): Promise<Customer | undefined> {
    return this.customers.get(id);
  }
  
  async createCustomer(customer: Omit<Customer, "id" | "createdAt">): Promise<Customer> {
    const id = this.customerId++;
    const now = new Date();
    const newCustomer: Customer = { ...customer, id, createdAt: now };
    this.customers.set(id, newCustomer);
    return newCustomer;
  }
  
  async updateCustomer(id: number, customer: Partial<Customer>): Promise<Customer | undefined> {
    const existing = this.customers.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...customer };
    this.customers.set(id, updated);
    return updated;
  }
  
  async deleteCustomer(id: number): Promise<boolean> {
    return this.customers.delete(id);
  }
  
  // Vendors
  async getVendors(): Promise<Vendor[]> {
    return Array.from(this.vendors.values());
  }
  
  async getVendor(id: number): Promise<Vendor | undefined> {
    return this.vendors.get(id);
  }
  
  async createVendor(vendor: Omit<Vendor, "id" | "createdAt">): Promise<Vendor> {
    const id = this.vendorId++;
    const now = new Date();
    const newVendor: Vendor = { ...vendor, id, createdAt: now };
    this.vendors.set(id, newVendor);
    return newVendor;
  }
  
  async updateVendor(id: number, vendor: Partial<Vendor>): Promise<Vendor | undefined> {
    const existing = this.vendors.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...vendor };
    this.vendors.set(id, updated);
    return updated;
  }
  
  async deleteVendor(id: number): Promise<boolean> {
    return this.vendors.delete(id);
  }
  
  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async createProduct(product: Omit<Product, "id" | "createdAt">): Promise<Product> {
    const id = this.productId++;
    const now = new Date();
    const newProduct: Product = { ...product, id, createdAt: now };
    this.products.set(id, newProduct);
    return newProduct;
  }
  
  async updateProduct(id: number, product: Partial<Product>): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...product };
    this.products.set(id, updated);
    return updated;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }
  
  // Warehouses
  async getWarehouses(): Promise<Warehouse[]> {
    return Array.from(this.warehouses.values());
  }
  
  async getWarehouse(id: number): Promise<Warehouse | undefined> {
    return this.warehouses.get(id);
  }
  
  async createWarehouse(warehouse: Omit<Warehouse, "id">): Promise<Warehouse> {
    const id = this.warehouseId++;
    const newWarehouse: Warehouse = { ...warehouse, id };
    this.warehouses.set(id, newWarehouse);
    return newWarehouse;
  }
  
  async updateWarehouse(id: number, warehouse: Partial<Warehouse>): Promise<Warehouse | undefined> {
    const existing = this.warehouses.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...warehouse };
    this.warehouses.set(id, updated);
    return updated;
  }
  
  async deleteWarehouse(id: number): Promise<boolean> {
    return this.warehouses.delete(id);
  }
  
  // Chart of Accounts
  async getAccountCategories(): Promise<AccountCategory[]> {
    return Array.from(this.accountCategories.values());
  }
  
  async getAccounts(): Promise<Account[]> {
    return Array.from(this.accounts.values());
  }
  
  async getAccount(id: number): Promise<Account | undefined> {
    return this.accounts.get(id);
  }
  
  async createAccount(account: Omit<Account, "id">): Promise<Account> {
    const id = this.accountId++;
    const newAccount: Account = { ...account, id };
    this.accounts.set(id, newAccount);
    return newAccount;
  }
  
  async updateAccount(id: number, account: Partial<Account>): Promise<Account | undefined> {
    const existing = this.accounts.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...account };
    this.accounts.set(id, updated);
    return updated;
  }
  
  async deleteAccount(id: number): Promise<boolean> {
    return this.accounts.delete(id);
  }
  
  // Dashboard data
  async getRecentTransactions(): Promise<TransactionData[]> {
    // Return mock recent transactions data
    return [
      {
        id: 1,
        date: "2023-08-15",
        description: "Invoice Payment",
        type: "incoming",
        reference: "INV-2023-056",
        amount: 4250.00,
        status: "completed",
        entity: "Tech Solutions Inc."
      },
      {
        id: 2,
        date: "2023-08-14",
        description: "Office Supplies",
        type: "outgoing",
        reference: "EXP-2023-112",
        amount: 358.75,
        status: "completed",
        entity: "Office Depot"
      },
      {
        id: 3,
        date: "2023-08-12",
        description: "Utility Payment",
        type: "outgoing",
        reference: "EXP-2023-111",
        amount: 245.30,
        status: "completed",
        entity: "City Power & Water"
      },
      {
        id: 4,
        date: "2023-08-10",
        description: "Invoice Payment",
        type: "incoming",
        reference: "INV-2023-055",
        amount: 2750.00,
        status: "completed",
        entity: "Global Media Ltd."
      },
      {
        id: 5,
        date: "2023-08-08",
        description: "Invoice Sent",
        type: "pending",
        reference: "INV-2023-057",
        amount: 5800.00,
        status: "pending",
        entity: "Acme Corporation"
      }
    ];
  }
  
  async getDashboardMetrics(): Promise<{
    totalRevenue: number;
    totalExpenses: number;
    accountsReceivable: number;
    accountsPayable: number;
    revenueChange: number;
    expensesChange: number;
    receivableChange: number;
    payableChange: number;
  }> {
    return {
      totalRevenue: 78450.00,
      totalExpenses: 23870.00,
      accountsReceivable: 12430.00,
      accountsPayable: 8752.00,
      revenueChange: 12.5,
      expensesChange: 8.2,
      receivableChange: -3.8,
      payableChange: -5.2
    };
  }
  
  async getChartData(): Promise<{
    revenue: number[];
    expenses: number[];
    months: string[];
  }> {
    return {
      revenue: [65000, 59000, 80000, 81000, 56000, 75000, 84000, 78000],
      expenses: [45000, 38000, 50000, 48000, 36000, 45000, 55000, 48000],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
    };
  }
  
  async getCashFlowData(): Promise<{
    incoming: number[];
    outgoing: number[];
    weeks: string[];
    totalIncoming: number;
    totalOutgoing: number;
  }> {
    return {
      incoming: [9500, 7800, 8300, 9000],
      outgoing: [6500, 5800, 6200, 5400],
      weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      totalIncoming: 34580.00,
      totalOutgoing: 23870.00
    };
  }
  
  async getTopAccounts(): Promise<{
    name: string;
    balance: number;
    percentage: number;
    type: "revenue" | "expense";
  }[]> {
    return [
      { name: "Sales Revenue", balance: 45260.00, percentage: 75, type: "revenue" },
      { name: "Service Revenue", balance: 23750.00, percentage: 40, type: "revenue" },
      { name: "Operating Expenses", balance: 15340.00, percentage: 30, type: "expense" },
      { name: "Rent Expense", balance: 5280.00, percentage: 15, type: "expense" },
      { name: "Salary Expense", balance: 18560.00, percentage: 35, type: "expense" }
    ];
  }
  
  private seedData() {
    // Seed basic account categories
    const assetCategory: AccountCategory = {
      id: this.categoryId++,
      code: "1000",
      name: "Assets",
      type: "Asset"
    };
    this.accountCategories.set(assetCategory.id, assetCategory);
    
    const liabilityCategory: AccountCategory = {
      id: this.categoryId++,
      code: "2000",
      name: "Liabilities",
      type: "Liability"
    };
    this.accountCategories.set(liabilityCategory.id, liabilityCategory);
    
    const equityCategory: AccountCategory = {
      id: this.categoryId++,
      code: "3000",
      name: "Equity",
      type: "Equity"
    };
    this.accountCategories.set(equityCategory.id, equityCategory);
    
    const revenueCategory: AccountCategory = {
      id: this.categoryId++,
      code: "4000",
      name: "Revenue",
      type: "Revenue"
    };
    this.accountCategories.set(revenueCategory.id, revenueCategory);
    
    const expenseCategory: AccountCategory = {
      id: this.categoryId++,
      code: "5000",
      name: "Expenses",
      type: "Expense"
    };
    this.accountCategories.set(expenseCategory.id, expenseCategory);
    
    // Seed basic accounts
    const bankAccount: Account = {
      id: this.accountId++,
      code: "1001",
      name: "Bank Account",
      description: "Main company bank account",
      categoryId: assetCategory.id,
      isActive: true,
      balance: 150000.00
    };
    this.accounts.set(bankAccount.id, bankAccount);
    
    const accountsReceivable: Account = {
      id: this.accountId++,
      code: "1002",
      name: "Accounts Receivable",
      description: "Money owed by customers",
      categoryId: assetCategory.id,
      isActive: true,
      balance: 12430.00
    };
    this.accounts.set(accountsReceivable.id, accountsReceivable);
    
    const accountsPayable: Account = {
      id: this.accountId++,
      code: "2001",
      name: "Accounts Payable",
      description: "Money owed to vendors",
      categoryId: liabilityCategory.id,
      isActive: true,
      balance: 8752.00
    };
    this.accounts.set(accountsPayable.id, accountsPayable);
    
    const salesRevenue: Account = {
      id: this.accountId++,
      code: "4001",
      name: "Sales Revenue",
      description: "Revenue from sales",
      categoryId: revenueCategory.id,
      isActive: true,
      balance: 45260.00
    };
    this.accounts.set(salesRevenue.id, salesRevenue);
    
    const serviceRevenue: Account = {
      id: this.accountId++,
      code: "4002",
      name: "Service Revenue",
      description: "Revenue from services",
      categoryId: revenueCategory.id,
      isActive: true,
      balance: 23750.00
    };
    this.accounts.set(serviceRevenue.id, serviceRevenue);
    
    const operatingExpenses: Account = {
      id: this.accountId++,
      code: "5001",
      name: "Operating Expenses",
      description: "Day-to-day operational expenses",
      categoryId: expenseCategory.id,
      isActive: true,
      balance: 15340.00
    };
    this.accounts.set(operatingExpenses.id, operatingExpenses);
    
    const rentExpense: Account = {
      id: this.accountId++,
      code: "5002",
      name: "Rent Expense",
      description: "Office rent expenses",
      categoryId: expenseCategory.id,
      isActive: true,
      balance: 5280.00
    };
    this.accounts.set(rentExpense.id, rentExpense);
    
    const salaryExpense: Account = {
      id: this.accountId++,
      code: "5003",
      name: "Salary Expense",
      description: "Employee salaries",
      categoryId: expenseCategory.id,
      isActive: true,
      balance: 18560.00
    };
    this.accounts.set(salaryExpense.id, salaryExpense);
  }
}

// Database implementation of the storage interface
export class DatabaseStorage implements IStorage {
  sessionStore: any;
  
  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true
    });
  }
  
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Customers
  async getCustomers(): Promise<Customer[]> {
    return await db.select().from(customers).orderBy(asc(customers.name));
  }
  
  async getCustomer(id: number): Promise<Customer | undefined> {
    const [customer] = await db.select().from(customers).where(eq(customers.id, id));
    return customer;
  }
  
  async createCustomer(customer: Omit<Customer, "id" | "createdAt">): Promise<Customer> {
    const [newCustomer] = await db.insert(customers).values(customer).returning();
    return newCustomer;
  }
  
  async updateCustomer(id: number, customer: Partial<Customer>): Promise<Customer | undefined> {
    const [updated] = await db.update(customers)
      .set(customer)
      .where(eq(customers.id, id))
      .returning();
    return updated;
  }
  
  async deleteCustomer(id: number): Promise<boolean> {
    const result = await db.delete(customers).where(eq(customers.id, id));
    return true; // Drizzle doesn't return deletion count, so we assume success
  }
  
  // Vendors
  async getVendors(): Promise<Vendor[]> {
    return await db.select().from(vendors).orderBy(asc(vendors.name));
  }
  
  async getVendor(id: number): Promise<Vendor | undefined> {
    const [vendor] = await db.select().from(vendors).where(eq(vendors.id, id));
    return vendor;
  }
  
  async createVendor(vendor: Omit<Vendor, "id" | "createdAt">): Promise<Vendor> {
    const [newVendor] = await db.insert(vendors).values(vendor).returning();
    return newVendor;
  }
  
  async updateVendor(id: number, vendor: Partial<Vendor>): Promise<Vendor | undefined> {
    const [updated] = await db.update(vendors)
      .set(vendor)
      .where(eq(vendors.id, id))
      .returning();
    return updated;
  }
  
  async deleteVendor(id: number): Promise<boolean> {
    const result = await db.delete(vendors).where(eq(vendors.id, id));
    return true;
  }
  
  // Products
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products).orderBy(asc(products.name));
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }
  
  async createProduct(product: Omit<Product, "id" | "createdAt">): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }
  
  async updateProduct(id: number, product: Partial<Product>): Promise<Product | undefined> {
    const [updated] = await db.update(products)
      .set(product)
      .where(eq(products.id, id))
      .returning();
    return updated;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return true;
  }
  
  // Warehouses
  async getWarehouses(): Promise<Warehouse[]> {
    return await db.select().from(warehouses).orderBy(asc(warehouses.name));
  }
  
  async getWarehouse(id: number): Promise<Warehouse | undefined> {
    const [warehouse] = await db.select().from(warehouses).where(eq(warehouses.id, id));
    return warehouse;
  }
  
  async createWarehouse(warehouse: Omit<Warehouse, "id">): Promise<Warehouse> {
    const [newWarehouse] = await db.insert(warehouses).values(warehouse).returning();
    return newWarehouse;
  }
  
  async updateWarehouse(id: number, warehouse: Partial<Warehouse>): Promise<Warehouse | undefined> {
    const [updated] = await db.update(warehouses)
      .set(warehouse)
      .where(eq(warehouses.id, id))
      .returning();
    return updated;
  }
  
  async deleteWarehouse(id: number): Promise<boolean> {
    const result = await db.delete(warehouses).where(eq(warehouses.id, id));
    return true;
  }
  
  // Chart of Accounts
  async getAccountCategories(): Promise<AccountCategory[]> {
    return await db.select().from(accountCategories).orderBy(asc(accountCategories.code));
  }
  
  async getAccounts(): Promise<Account[]> {
    return await db.select().from(accounts).orderBy(asc(accounts.code));
  }
  
  async getAccount(id: number): Promise<Account | undefined> {
    const [account] = await db.select().from(accounts).where(eq(accounts.id, id));
    return account;
  }
  
  async createAccount(account: Omit<Account, "id">): Promise<Account> {
    const [newAccount] = await db.insert(accounts).values(account).returning();
    return newAccount;
  }
  
  async updateAccount(id: number, account: Partial<Account>): Promise<Account | undefined> {
    const [updated] = await db.update(accounts)
      .set(account)
      .where(eq(accounts.id, id))
      .returning();
    return updated;
  }
  
  async deleteAccount(id: number): Promise<boolean> {
    const result = await db.delete(accounts).where(eq(accounts.id, id));
    return true;
  }
  
  // For now, keep the mock implementations for dashboard data
  async getRecentTransactions(): Promise<TransactionData[]> {
    // Return mock recent transactions data
    return [
      {
        id: 1,
        date: "2023-08-15",
        description: "Pembayaran Faktur",
        type: "incoming",
        reference: "INV-2023-056",
        amount: 4250000.00,
        status: "completed",
        entity: "PT Maju Teknologi"
      },
      {
        id: 2,
        date: "2023-08-14",
        description: "Pembelian Alat Tulis",
        type: "outgoing",
        reference: "EXP-2023-112",
        amount: 358750.00,
        status: "completed",
        entity: "Toko Stationery Jaya"
      },
      {
        id: 3,
        date: "2023-08-12",
        description: "Pembayaran Utilitas",
        type: "outgoing",
        reference: "EXP-2023-111",
        amount: 2453000.00,
        status: "completed",
        entity: "PLN"
      },
      {
        id: 4,
        date: "2023-08-10",
        description: "Pembayaran Faktur",
        type: "incoming",
        reference: "INV-2023-055",
        amount: 27500000.00,
        status: "completed",
        entity: "PT Media Global"
      },
      {
        id: 5,
        date: "2023-08-08",
        description: "Faktur Terkirim",
        type: "pending",
        reference: "INV-2023-057",
        amount: 58000000.00,
        status: "pending",
        entity: "PT Sejahtera Abadi"
      }
    ];
  }
  
  async getDashboardMetrics(): Promise<{
    totalRevenue: number;
    totalExpenses: number;
    accountsReceivable: number;
    accountsPayable: number;
    revenueChange: number;
    expensesChange: number;
    receivableChange: number;
    payableChange: number;
  }> {
    return {
      totalRevenue: 78450000.00,
      totalExpenses: 23870000.00,
      accountsReceivable: 12430000.00,
      accountsPayable: 8752000.00,
      revenueChange: 12.5,
      expensesChange: 8.2,
      receivableChange: -3.8,
      payableChange: -5.2
    };
  }
  
  async getChartData(): Promise<{
    revenue: number[];
    expenses: number[];
    months: string[];
  }> {
    return {
      revenue: [65000000, 59000000, 80000000, 81000000, 56000000, 75000000, 84000000, 78000000],
      expenses: [45000000, 38000000, 50000000, 48000000, 36000000, 45000000, 55000000, 48000000],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags']
    };
  }
  
  async getCashFlowData(): Promise<{
    incoming: number[];
    outgoing: number[];
    weeks: string[];
    totalIncoming: number;
    totalOutgoing: number;
  }> {
    return {
      incoming: [9500000, 7800000, 8300000, 9000000],
      outgoing: [6500000, 5800000, 6200000, 5400000],
      weeks: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
      totalIncoming: 34580000.00,
      totalOutgoing: 23870000.00
    };
  }
  
  async getTopAccounts(): Promise<{
    name: string;
    balance: number;
    percentage: number;
    type: "revenue" | "expense";
  }[]> {
    return [
      { name: "Pendapatan Penjualan", balance: 45260000.00, percentage: 75, type: "revenue" },
      { name: "Pendapatan Jasa", balance: 23750000.00, percentage: 40, type: "revenue" },
      { name: "Biaya Operasional", balance: 15340000.00, percentage: 30, type: "expense" },
      { name: "Biaya Sewa", balance: 5280000.00, percentage: 15, type: "expense" },
      { name: "Biaya Gaji", balance: 18560000.00, percentage: 35, type: "expense" }
    ];
  }
}

// Use DatabaseStorage instead of MemStorage
export const storage = new DatabaseStorage();
