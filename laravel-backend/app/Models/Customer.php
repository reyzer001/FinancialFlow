<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'contact_name',
        'email',
        'phone',
        'address',
        'tax_id',
        'credit_limit',
        'is_active',
        'notes',
    ];

    protected $casts = [
        'credit_limit' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    /**
     * Get the sales quotations for the customer.
     */
    public function salesQuotations()
    {
        return $this->hasMany(SalesQuotation::class);
    }

    /**
     * Get the sales orders for the customer.
     */
    public function salesOrders()
    {
        return $this->hasMany(SalesOrder::class);
    }

    /**
     * Get the sales invoices for the customer.
     */
    public function salesInvoices()
    {
        return $this->hasMany(SalesInvoice::class);
    }
}