<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'vendor_id',
        'order_date',
        'expected_delivery_date',
        'status',
        'subtotal',
        'tax_amount',
        'discount_amount',
        'total_amount',
        'notes',
        'payment_terms',
        'shipping_method',
        'shipping_address',
        'user_id',
    ];

    protected $casts = [
        'order_date' => 'datetime',
        'expected_delivery_date' => 'datetime',
        'subtotal' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
    ];

    /**
     * Get the vendor that owns the purchase order.
     */
    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

    /**
     * Get the user that created the purchase order.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the items for the purchase order.
     */
    public function items()
    {
        return $this->hasMany(PurchaseOrderItem::class);
    }

    /**
     * Get the purchase invoices associated with this order.
     */
    public function purchaseInvoices()
    {
        return $this->hasMany(PurchaseInvoice::class);
    }
    
    /**
     * Get the transaction record associated with this order.
     */
    public function transaction()
    {
        return $this->morphOne(Transaction::class, 'reference');
    }
}