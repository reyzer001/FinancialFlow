import { pgTable, text, serial, integer, boolean, timestamp, json, doublePrecision, uuid, date, primaryKey, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Role and Permission Enums
export const roleEnum = pgEnum('role', ['admin', 'akuntan', 'manager', 'staff']);
export const moduleEnum = pgEnum('module', ['sales', 'purchases', 'inventory', 'accounting', 'reports', 'settings']);

// Users & Authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull().default("staff"), // Admin, Akuntan, Manager, Staff
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

// Permissions
export const permissions = pgTable("permissions", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(),
  module: text("module").notNull(), // Using moduleEnum values
  canView: boolean("can_view").notNull().default(false),
  canCreate: boolean("can_create").notNull().default(false),
  canEdit: boolean("can_edit").notNull().default(false),
  canDelete: boolean("can_delete").notNull().default(false),
});

// Chart of Accounts
export const accountCategories = pgTable("account_categories", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  type: text("type").notNull(), // Asset, Liability, Equity, Revenue, Expense
});

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  categoryId: integer("category_id").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  balance: doublePrecision("balance").notNull().default(0),
});

// Customers
export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  contactPerson: text("contact_person"),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  taxId: text("tax_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Vendors
export const vendors = pgTable("vendors", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  contactPerson: text("contact_person"),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  taxId: text("tax_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Products
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull(), // Inventory, Service
  sellPrice: doublePrecision("sell_price").notNull().default(0),
  buyPrice: doublePrecision("buy_price").notNull().default(0),
  taxRate: doublePrecision("tax_rate").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Warehouses
export const warehouses = pgTable("warehouses", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  address: text("address"),
  isActive: boolean("is_active").notNull().default(true),
});

// Inventory
export const inventory = pgTable("inventory", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  warehouseId: integer("warehouse_id").notNull(),
  quantity: doublePrecision("quantity").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Sales Quotations
export const salesQuotations = pgTable("sales_quotations", {
  id: serial("id").primaryKey(),
  number: text("number").notNull().unique(),
  customerId: integer("customer_id").notNull(),
  date: date("date").notNull(),
  validUntil: date("valid_until"),
  status: text("status").notNull().default("draft"), // draft, sent, approved, rejected, expired
  total: doublePrecision("total").notNull().default(0),
  note: text("note"),
  createdBy: integer("created_by").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const salesQuotationItems = pgTable("sales_quotation_items", {
  id: serial("id").primaryKey(),
  quotationId: integer("quotation_id").notNull(),
  productId: integer("product_id").notNull(),
  description: text("description"),
  quantity: doublePrecision("quantity").notNull(),
  unitPrice: doublePrecision("unit_price").notNull(),
  taxRate: doublePrecision("tax_rate").notNull().default(0),
  subtotal: doublePrecision("subtotal").notNull(),
});

// Sales Orders
export const salesOrders = pgTable("sales_orders", {
  id: serial("id").primaryKey(),
  number: text("number").notNull().unique(),
  customerId: integer("customer_id").notNull(),
  quotationId: integer("quotation_id"),
  date: date("date").notNull(),
  expectedDeliveryDate: date("expected_delivery_date"),
  status: text("status").notNull().default("draft"), // draft, open, fulfilled, canceled
  total: doublePrecision("total").notNull().default(0),
  note: text("note"),
  createdBy: integer("created_by").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const salesOrderItems = pgTable("sales_order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  productId: integer("product_id").notNull(),
  description: text("description"),
  quantity: doublePrecision("quantity").notNull(),
  unitPrice: doublePrecision("unit_price").notNull(),
  taxRate: doublePrecision("tax_rate").notNull().default(0),
  subtotal: doublePrecision("subtotal").notNull(),
});

// Sales Invoices
export const salesInvoices = pgTable("sales_invoices", {
  id: serial("id").primaryKey(),
  number: text("number").notNull().unique(),
  customerId: integer("customer_id").notNull(),
  orderId: integer("order_id"),
  date: date("date").notNull(),
  dueDate: date("due_date").notNull(),
  status: text("status").notNull().default("unpaid"), // unpaid, paid, overdue, canceled
  total: doublePrecision("total").notNull().default(0),
  note: text("note"),
  createdBy: integer("created_by").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const salesInvoiceItems = pgTable("sales_invoice_items", {
  id: serial("id").primaryKey(),
  invoiceId: integer("invoice_id").notNull(),
  productId: integer("product_id").notNull(),
  description: text("description"),
  quantity: doublePrecision("quantity").notNull(),
  unitPrice: doublePrecision("unit_price").notNull(),
  taxRate: doublePrecision("tax_rate").notNull().default(0),
  subtotal: doublePrecision("subtotal").notNull(),
});

// Purchase Orders
export const purchaseOrders = pgTable("purchase_orders", {
  id: serial("id").primaryKey(),
  number: text("number").notNull().unique(),
  vendorId: integer("vendor_id").notNull(),
  date: date("date").notNull(),
  expectedDeliveryDate: date("expected_delivery_date"),
  status: text("status").notNull().default("draft"), // draft, sent, received, canceled
  total: doublePrecision("total").notNull().default(0),
  note: text("note"),
  createdBy: integer("created_by").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const purchaseOrderItems = pgTable("purchase_order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  productId: integer("product_id").notNull(),
  description: text("description"),
  quantity: doublePrecision("quantity").notNull(),
  unitPrice: doublePrecision("unit_price").notNull(),
  taxRate: doublePrecision("tax_rate").notNull().default(0),
  subtotal: doublePrecision("subtotal").notNull(),
});

// Purchase Invoices (Bills)
export const purchaseInvoices = pgTable("purchase_invoices", {
  id: serial("id").primaryKey(),
  number: text("number").notNull().unique(),
  vendorId: integer("vendor_id").notNull(),
  orderId: integer("order_id"),
  date: date("date").notNull(),
  dueDate: date("due_date").notNull(),
  status: text("status").notNull().default("unpaid"), // unpaid, paid, overdue, canceled
  total: doublePrecision("total").notNull().default(0),
  note: text("note"),
  createdBy: integer("created_by").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const purchaseInvoiceItems = pgTable("purchase_invoice_items", {
  id: serial("id").primaryKey(),
  invoiceId: integer("invoice_id").notNull(),
  productId: integer("product_id").notNull(),
  description: text("description"),
  quantity: doublePrecision("quantity").notNull(),
  unitPrice: doublePrecision("unit_price").notNull(),
  taxRate: doublePrecision("tax_rate").notNull().default(0),
  subtotal: doublePrecision("subtotal").notNull(),
});

// Transactions
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  type: text("type").notNull(), // cash_receipt, cash_payment, bank_receipt, bank_payment, journal
  number: text("number").notNull().unique(),
  description: text("description").notNull(),
  amount: doublePrecision("amount").notNull(),
  reference: text("reference"),
  status: text("status").notNull().default("draft"), // draft, posted, canceled
  createdBy: integer("created_by").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Journal Entries
export const journals = pgTable("journals", {
  id: serial("id").primaryKey(),
  number: text("number").notNull().unique(),
  date: date("date").notNull(),
  description: text("description").notNull(),
  reference: text("reference"),
  status: text("status").notNull().default("draft"), // draft, posted, canceled
  transactionId: integer("transaction_id"),
  createdBy: integer("created_by").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const journalItems = pgTable("journal_items", {
  id: serial("id").primaryKey(),
  journalId: integer("journal_id").notNull(),
  accountId: integer("account_id").notNull(),
  description: text("description"),
  debit: doublePrecision("debit").notNull().default(0),
  credit: doublePrecision("credit").notNull().default(0),
});

// Payments & Receipts
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  number: text("number").notNull().unique(),
  date: date("date").notNull(),
  type: text("type").notNull(), // customer, vendor
  accountId: integer("account_id").notNull(),
  entityId: integer("entity_id").notNull(), // customer_id or vendor_id
  amount: doublePrecision("amount").notNull(),
  status: text("status").notNull().default("draft"), // draft, posted, canceled
  note: text("note"),
  journalId: integer("journal_id"),
  createdBy: integer("created_by").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const paymentItems = pgTable("payment_items", {
  id: serial("id").primaryKey(),
  paymentId: integer("payment_id").notNull(),
  invoiceId: integer("invoice_id").notNull(),
  amount: doublePrecision("amount").notNull(),
});

// Export Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Permission = typeof permissions.$inferSelect;
export type AccountCategory = typeof accountCategories.$inferSelect;
export type Account = typeof accounts.$inferSelect;
export type Customer = typeof customers.$inferSelect;
export type Vendor = typeof vendors.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Warehouse = typeof warehouses.$inferSelect;
export type Inventory = typeof inventory.$inferSelect;
export type SalesQuotation = typeof salesQuotations.$inferSelect;
export type SalesQuotationItem = typeof salesQuotationItems.$inferSelect;
export type SalesOrder = typeof salesOrders.$inferSelect;
export type SalesOrderItem = typeof salesOrderItems.$inferSelect;
export type SalesInvoice = typeof salesInvoices.$inferSelect;
export type SalesInvoiceItem = typeof salesInvoiceItems.$inferSelect;
export type PurchaseOrder = typeof purchaseOrders.$inferSelect;
export type PurchaseOrderItem = typeof purchaseOrderItems.$inferSelect;
export type PurchaseInvoice = typeof purchaseInvoices.$inferSelect;
export type PurchaseInvoiceItem = typeof purchaseInvoiceItems.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type Journal = typeof journals.$inferSelect;
export type JournalItem = typeof journalItems.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type PaymentItem = typeof paymentItems.$inferSelect;

// Schema for transactions data shown on dashboard
export const transactionSchema = z.object({
  id: z.number(),
  date: z.string(),
  description: z.string(),
  type: z.enum(["incoming", "outgoing", "pending"]),
  reference: z.string(),
  amount: z.number(),
  status: z.enum(["completed", "pending"]),
  entity: z.string()
});
export type TransactionData = z.infer<typeof transactionSchema>;
