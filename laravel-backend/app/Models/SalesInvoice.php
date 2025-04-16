<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesInvoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_number',
        'customer_id',
        'sales_order_id',
        'invoice_date',
        'due_date',
        'status',
        'subtotal',
        'tax_amount',
        'discount_amount',
        'total_amount',
        'amount_paid',
        'amount_due',
        'notes',
        'payment_terms',
        'user_id',
    ];

    protected $casts = [
        'invoice_date' => 'datetime',
        'due_date' => 'datetime',
        'subtotal' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'amount_paid' => 'decimal:2',
        'amount_due' => 'decimal:2',
    ];

    /**
     * Get the customer that owns the sales invoice.
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get the user that created the sales invoice.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the sales order that originated this invoice.
     */
    public function salesOrder()
    {
        return $this->belongsTo(SalesOrder::class);
    }

    /**
     * Get the items for the sales invoice.
     */
    public function items()
    {
        return $this->hasMany(SalesInvoiceItem::class);
    }

    /**
     * Get the payments associated with this invoice.
     */
    public function payments()
    {
        return $this->morphMany(Payment::class, 'payable');
    }
    
    /**
     * Get the transaction record associated with this invoice.
     */
    public function transaction()
    {
        return $this->morphOne(Transaction::class, 'reference');
    }
}