<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
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
        'payment_terms',
        'is_active',
        'notes',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Get the purchase orders for the vendor.
     */
    public function purchaseOrders()
    {
        return $this->hasMany(PurchaseOrder::class);
    }

    /**
     * Get the purchase invoices for the vendor.
     */
    public function purchaseInvoices()
    {
        return $this->hasMany(PurchaseInvoice::class);
    }
}