<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesQuotation extends Model
{
    use HasFactory;

    protected $fillable = [
        'quote_number',
        'customer_id',
        'quote_date',
        'expiry_date',
        'status',
        'subtotal',
        'tax_amount',
        'discount_amount',
        'total_amount',
        'notes',
        'terms_and_conditions',
        'user_id',
    ];

    protected $casts = [
        'quote_date' => 'datetime',
        'expiry_date' => 'datetime',
        'subtotal' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
    ];

    /**
     * Get the customer that owns the sales quotation.
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get the user that created the sales quotation.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the items for the sales quotation.
     */
    public function items()
    {
        return $this->hasMany(SalesQuotationItem::class);
    }

    /**
     * Get the sales orders associated with this quotation.
     */
    public function salesOrders()
    {
        return $this->hasMany(SalesOrder::class);
    }
    
    /**
     * Get the transaction record associated with this quotation.
     */
    public function transaction()
    {
        return $this->morphOne(Transaction::class, 'reference');
    }
}