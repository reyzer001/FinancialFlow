import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Sets up /api/register, /api/login, /api/logout, /api/user
  setupAuth(app);

  // Dashboard
  app.get("/api/dashboard/metrics", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const metrics = await storage.getDashboardMetrics();
    res.json(metrics);
  });

  app.get("/api/dashboard/chart-data", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const data = await storage.getChartData();
    res.json(data);
  });

  app.get("/api/dashboard/cash-flow", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const data = await storage.getCashFlowData();
    res.json(data);
  });

  app.get("/api/dashboard/top-accounts", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const accounts = await storage.getTopAccounts();
    res.json(accounts);
  });

  app.get("/api/dashboard/recent-transactions", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const transactions = await storage.getRecentTransactions();
    res.json(transactions);
  });

  // Customers
  app.get("/api/customers", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const customers = await storage.getCustomers();
    res.json(customers);
  });

  app.get("/api/customers/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const customer = await storage.getCustomer(parseInt(req.params.id));
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  });

  app.post("/api/customers", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const customer = await storage.createCustomer(req.body);
    res.status(201).json(customer);
  });

  app.put("/api/customers/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const customer = await storage.updateCustomer(parseInt(req.params.id), req.body);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  });

  app.delete("/api/customers/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const success = await storage.deleteCustomer(parseInt(req.params.id));
    if (!success) return res.status(404).json({ message: "Customer not found" });
    res.sendStatus(204);
  });

  // Vendors
  app.get("/api/vendors", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const vendors = await storage.getVendors();
    res.json(vendors);
  });

  app.get("/api/vendors/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const vendor = await storage.getVendor(parseInt(req.params.id));
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.json(vendor);
  });

  app.post("/api/vendors", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const vendor = await storage.createVendor(req.body);
    res.status(201).json(vendor);
  });

  app.put("/api/vendors/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const vendor = await storage.updateVendor(parseInt(req.params.id), req.body);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.json(vendor);
  });

  app.delete("/api/vendors/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const success = await storage.deleteVendor(parseInt(req.params.id));
    if (!success) return res.status(404).json({ message: "Vendor not found" });
    res.sendStatus(204);
  });

  // Products
  app.get("/api/products", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get("/api/products/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const product = await storage.getProduct(parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  });

  app.post("/api/products", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const product = await storage.createProduct(req.body);
    res.status(201).json(product);
  });

  app.put("/api/products/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const product = await storage.updateProduct(parseInt(req.params.id), req.body);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  });

  app.delete("/api/products/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const success = await storage.deleteProduct(parseInt(req.params.id));
    if (!success) return res.status(404).json({ message: "Product not found" });
    res.sendStatus(204);
  });

  // Warehouses
  app.get("/api/warehouses", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const warehouses = await storage.getWarehouses();
    res.json(warehouses);
  });

  app.get("/api/warehouses/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const warehouse = await storage.getWarehouse(parseInt(req.params.id));
    if (!warehouse) return res.status(404).json({ message: "Warehouse not found" });
    res.json(warehouse);
  });

  app.post("/api/warehouses", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const warehouse = await storage.createWarehouse(req.body);
    res.status(201).json(warehouse);
  });

  app.put("/api/warehouses/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const warehouse = await storage.updateWarehouse(parseInt(req.params.id), req.body);
    if (!warehouse) return res.status(404).json({ message: "Warehouse not found" });
    res.json(warehouse);
  });

  app.delete("/api/warehouses/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const success = await storage.deleteWarehouse(parseInt(req.params.id));
    if (!success) return res.status(404).json({ message: "Warehouse not found" });
    res.sendStatus(204);
  });

  // Chart of Accounts
  app.get("/api/account-categories", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const categories = await storage.getAccountCategories();
    res.json(categories);
  });

  app.get("/api/accounts", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const accounts = await storage.getAccounts();
    res.json(accounts);
  });

  app.get("/api/accounts/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const account = await storage.getAccount(parseInt(req.params.id));
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.json(account);
  });

  app.post("/api/accounts", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const account = await storage.createAccount(req.body);
    res.status(201).json(account);
  });

  app.put("/api/accounts/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const account = await storage.updateAccount(parseInt(req.params.id), req.body);
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.json(account);
  });

  app.delete("/api/accounts/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const success = await storage.deleteAccount(parseInt(req.params.id));
    if (!success) return res.status(404).json({ message: "Account not found" });
    res.sendStatus(204);
  });

  const httpServer = createServer(app);
  return httpServer;
}
