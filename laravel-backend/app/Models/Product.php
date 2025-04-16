<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'description',
        'category',
        'unit',
        'purchase_price',
        'sale_price',
        'tax_rate',
        'is_service',
        'is_active',
        'minimum_stock',
        'image_url',
    ];

    protected $casts = [
        'purchase_price' => 'decimal:2',
        'sale_price' => 'decimal:2',
        'tax_rate' => 'decimal:2',
        'is_service' => 'boolean',
        'is_active' => 'boolean',
        'minimum_stock' => 'integer',
    ];

    /**
     * Get the inventory records for the product.
     */
    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }

    /**
     * Get the sales order items for the product.
     */
    public function salesOrderItems()
    {
        return $this->hasMany(SalesOrderItem::class);
    }

    /**
     * Get the sales invoice items for the product.
     */
    public function salesInvoiceItems()
    {
        return $this->hasMany(SalesInvoiceItem::class);
    }

    /**
     * Get the purchase order items for the product.
     */
    public function purchaseOrderItems()
    {
        return $this->hasMany(PurchaseOrderItem::class);
    }

    /**
     * Get the purchase invoice items for the product.
     */
    public function purchaseInvoiceItems()
    {
        return $this->hasMany(PurchaseInvoiceItem::class);
    }
}