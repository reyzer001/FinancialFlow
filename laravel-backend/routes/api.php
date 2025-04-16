<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Authentication Routes
Route::post('/register', [App\Http\Controllers\Auth\RegisterController::class, 'register']);
Route::post('/login', [App\Http\Controllers\Auth\LoginController::class, 'login']);
Route::post('/logout', [App\Http\Controllers\Auth\LoginController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Dashboard Routes
Route::middleware('auth:sanctum')->prefix('dashboard')->group(function () {
    Route::get('/metrics', [App\Http\Controllers\DashboardController::class, 'getMetrics']);
    Route::get('/chart-data', [App\Http\Controllers\DashboardController::class, 'getChartData']);
    Route::get('/cash-flow', [App\Http\Controllers\DashboardController::class, 'getCashFlowData']);
    Route::get('/recent-transactions', [App\Http\Controllers\DashboardController::class, 'getRecentTransactions']);
    Route::get('/top-accounts', [App\Http\Controllers\DashboardController::class, 'getTopAccounts']);
});

// Customers Routes
Route::middleware('auth:sanctum')->prefix('customers')->group(function () {
    Route::get('/', [App\Http\Controllers\CustomerController::class, 'index']);
    Route::get('/{id}', [App\Http\Controllers\CustomerController::class, 'show']);
    Route::post('/', [App\Http\Controllers\CustomerController::class, 'store']);
    Route::put('/{id}', [App\Http\Controllers\CustomerController::class, 'update']);
    Route::delete('/{id}', [App\Http\Controllers\CustomerController::class, 'destroy']);
});

// Vendors Routes
Route::middleware('auth:sanctum')->prefix('vendors')->group(function () {
    Route::get('/', [App\Http\Controllers\VendorController::class, 'index']);
    Route::get('/{id}', [App\Http\Controllers\VendorController::class, 'show']);
    Route::post('/', [App\Http\Controllers\VendorController::class, 'store']);
    Route::put('/{id}', [App\Http\Controllers\VendorController::class, 'update']);
    Route::delete('/{id}', [App\Http\Controllers\VendorController::class, 'destroy']);
});

// Products Routes
Route::middleware('auth:sanctum')->prefix('products')->group(function () {
    Route::get('/', [App\Http\Controllers\ProductController::class, 'index']);
    Route::get('/{id}', [App\Http\Controllers\ProductController::class, 'show']);
    Route::post('/', [App\Http\Controllers\ProductController::class, 'store']);
    Route::put('/{id}', [App\Http\Controllers\ProductController::class, 'update']);
    Route::delete('/{id}', [App\Http\Controllers\ProductController::class, 'destroy']);
});

// Warehouses Routes
Route::middleware('auth:sanctum')->prefix('warehouses')->group(function () {
    Route::get('/', [App\Http\Controllers\WarehouseController::class, 'index']);
    Route::get('/{id}', [App\Http\Controllers\WarehouseController::class, 'show']);
    Route::post('/', [App\Http\Controllers\WarehouseController::class, 'store']);
    Route::put('/{id}', [App\Http\Controllers\WarehouseController::class, 'update']);
    Route::delete('/{id}', [App\Http\Controllers\WarehouseController::class, 'destroy']);
});

// Accounting Routes
Route::middleware('auth:sanctum')->prefix('accounting')->group(function () {
    // Chart of Accounts
    Route::get('/account-categories', [App\Http\Controllers\AccountingController::class, 'getAccountCategories']);
    Route::get('/accounts', [App\Http\Controllers\AccountingController::class, 'getAccounts']);
    Route::get('/accounts/{id}', [App\Http\Controllers\AccountingController::class, 'getAccount']);
    Route::post('/accounts', [App\Http\Controllers\AccountingController::class, 'createAccount']);
    Route::put('/accounts/{id}', [App\Http\Controllers\AccountingController::class, 'updateAccount']);
    Route::delete('/accounts/{id}', [App\Http\Controllers\AccountingController::class, 'deleteAccount']);
    
    // Journal Entries
    Route::get('/journals', [App\Http\Controllers\JournalController::class, 'index']);
    Route::get('/journals/{id}', [App\Http\Controllers\JournalController::class, 'show']);
    Route::post('/journals', [App\Http\Controllers\JournalController::class, 'store']);
    Route::put('/journals/{id}', [App\Http\Controllers\JournalController::class, 'update']);
    Route::delete('/journals/{id}', [App\Http\Controllers\JournalController::class, 'destroy']);
});

// Sales Routes
Route::middleware('auth:sanctum')->prefix('sales')->group(function () {
    // Quotations
    Route::get('/quotations', [App\Http\Controllers\SalesController::class, 'getQuotations']);
    Route::get('/quotations/{id}', [App\Http\Controllers\SalesController::class, 'getQuotation']);
    Route::post('/quotations', [App\Http\Controllers\SalesController::class, 'createQuotation']);
    Route::put('/quotations/{id}', [App\Http\Controllers\SalesController::class, 'updateQuotation']);
    Route::delete('/quotations/{id}', [App\Http\Controllers\SalesController::class, 'deleteQuotation']);
    
    // Orders
    Route::get('/orders', [App\Http\Controllers\SalesController::class, 'getOrders']);
    Route::get('/orders/{id}', [App\Http\Controllers\SalesController::class, 'getOrder']);
    Route::post('/orders', [App\Http\Controllers\SalesController::class, 'createOrder']);
    Route::put('/orders/{id}', [App\Http\Controllers\SalesController::class, 'updateOrder']);
    Route::delete('/orders/{id}', [App\Http\Controllers\SalesController::class, 'deleteOrder']);
    
    // Invoices
    Route::get('/invoices', [App\Http\Controllers\SalesController::class, 'getInvoices']);
    Route::get('/invoices/{id}', [App\Http\Controllers\SalesController::class, 'getInvoice']);
    Route::post('/invoices', [App\Http\Controllers\SalesController::class, 'createInvoice']);
    Route::put('/invoices/{id}', [App\Http\Controllers\SalesController::class, 'updateInvoice']);
    Route::delete('/invoices/{id}', [App\Http\Controllers\SalesController::class, 'deleteInvoice']);
});

// Purchasing Routes
Route::middleware('auth:sanctum')->prefix('purchasing')->group(function () {
    // Orders
    Route::get('/orders', [App\Http\Controllers\PurchasingController::class, 'getOrders']);
    Route::get('/orders/{id}', [App\Http\Controllers\PurchasingController::class, 'getOrder']);
    Route::post('/orders', [App\Http\Controllers\PurchasingController::class, 'createOrder']);
    Route::put('/orders/{id}', [App\Http\Controllers\PurchasingController::class, 'updateOrder']);
    Route::delete('/orders/{id}', [App\Http\Controllers\PurchasingController::class, 'deleteOrder']);
    
    // Invoices
    Route::get('/invoices', [App\Http\Controllers\PurchasingController::class, 'getInvoices']);
    Route::get('/invoices/{id}', [App\Http\Controllers\PurchasingController::class, 'getInvoice']);
    Route::post('/invoices', [App\Http\Controllers\PurchasingController::class, 'createInvoice']);
    Route::put('/invoices/{id}', [App\Http\Controllers\PurchasingController::class, 'updateInvoice']);
    Route::delete('/invoices/{id}', [App\Http\Controllers\PurchasingController::class, 'deleteInvoice']);
});

// Reports Routes
Route::middleware('auth:sanctum')->prefix('reports')->group(function () {
    Route::get('/financial', [App\Http\Controllers\ReportController::class, 'getFinancialReports']);
    Route::get('/sales', [App\Http\Controllers\ReportController::class, 'getSalesReports']);
    Route::get('/inventory', [App\Http\Controllers\ReportController::class, 'getInventoryReports']);
});