<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'customer_id',
        'sales_quotation_id',
        'order_date',
        'delivery_date',
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
        'delivery_date' => 'datetime',
        'subtotal' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
    ];

    /**
     * Get the customer that owns the sales order.
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get the user that created the sales order.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the sales quotation that originated this order.
     */
    public function salesQuotation()
    {
        return $this->belongsTo(SalesQuotation::class);
    }

    /**
     * Get the items for the sales order.
     */
    public function items()
    {
        return $this->hasMany(SalesOrderItem::class);
    }

    /**
     * Get the sales invoices associated with this order.
     */
    public function salesInvoices()
    {
        return $this->hasMany(SalesInvoice::class);
    }
    
    /**
     * Get the transaction record associated with this order.
     */
    public function transaction()
    {
        return $this->morphOne(Transaction::class, 'reference');
    }
}