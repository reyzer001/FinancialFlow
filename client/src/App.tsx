import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import Layout from "./components/layout/layout";
import Dashboard from "./pages/dashboard";

// Sales
import SalesInvoices from "./pages/sales/invoices";
import SalesQuotations from "./pages/sales/quotations";
import SalesOrders from "./pages/sales/orders";
import Customers from "./pages/sales/customers";

// Purchasing
import Bills from "./pages/purchasing/bills";
import PurchaseOrders from "./pages/purchasing/purchase-orders";
import Vendors from "./pages/purchasing/vendors";

// Accounting
import JournalEntries from "./pages/accounting/journal-entries";
import ChartOfAccounts from "./pages/accounting/chart-of-accounts";
import BankCash from "./pages/accounting/bank-cash";

// Inventory
import Products from "./pages/inventory/products";
import Warehouses from "./pages/inventory/warehouses";
import StockAdjustments from "./pages/inventory/stock-adjustments";

// Reports
import ProfitLoss from "./pages/reports/profit-loss";
import BalanceSheet from "./pages/reports/balance-sheet";
import CashFlow from "./pages/reports/cash-flow";
import TaxReports from "./pages/reports/tax-reports";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      
      {/* Dashboard */}
      <Route path="/">
        {() => (
          <Layout>
            <Dashboard />
          </Layout>
        )}
      </Route>
      
      {/* Sales Routes */}
      <Route path="/sales/invoices">
        {() => (
          <Layout>
            <SalesInvoices />
          </Layout>
        )}
      </Route>
      
      <Route path="/sales/quotations">
        {() => (
          <Layout>
            <SalesQuotations />
          </Layout>
        )}
      </Route>
      
      <Route path="/sales/orders">
        {() => (
          <Layout>
            <SalesOrders />
          </Layout>
        )}
      </Route>
      
      <Route path="/sales/customers">
        {() => (
          <Layout>
            <Customers />
          </Layout>
        )}
      </Route>
      
      {/* Purchasing Routes */}
      <Route path="/purchasing/bills">
        {() => (
          <Layout>
            <Bills />
          </Layout>
        )}
      </Route>
      
      <Route path="/purchasing/purchase-orders">
        {() => (
          <Layout>
            <PurchaseOrders />
          </Layout>
        )}
      </Route>
      
      <Route path="/purchasing/vendors">
        {() => (
          <Layout>
            <Vendors />
          </Layout>
        )}
      </Route>
      
      {/* Accounting Routes */}
      <Route path="/accounting/journal-entries">
        {() => (
          <Layout>
            <JournalEntries />
          </Layout>
        )}
      </Route>
      
      <Route path="/accounting/chart-of-accounts">
        {() => (
          <Layout>
            <ChartOfAccounts />
          </Layout>
        )}
      </Route>
      
      <Route path="/accounting/bank-cash">
        {() => (
          <Layout>
            <BankCash />
          </Layout>
        )}
      </Route>
      
      {/* Inventory Routes */}
      <Route path="/inventory/products">
        {() => (
          <Layout>
            <Products />
          </Layout>
        )}
      </Route>
      
      <Route path="/inventory/warehouses">
        {() => (
          <Layout>
            <Warehouses />
          </Layout>
        )}
      </Route>
      
      <Route path="/inventory/stock-adjustments">
        {() => (
          <Layout>
            <StockAdjustments />
          </Layout>
        )}
      </Route>
      
      {/* Reports Routes */}
      <Route path="/reports/profit-loss">
        {() => (
          <Layout>
            <ProfitLoss />
          </Layout>
        )}
      </Route>
      
      <Route path="/reports/balance-sheet">
        {() => (
          <Layout>
            <BalanceSheet />
          </Layout>
        )}
      </Route>
      
      <Route path="/reports/cash-flow">
        {() => (
          <Layout>
            <CashFlow />
          </Layout>
        )}
      </Route>
      
      <Route path="/reports/tax-reports">
        {() => (
          <Layout>
            <TaxReports />
          </Layout>
        )}
      </Route>
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
