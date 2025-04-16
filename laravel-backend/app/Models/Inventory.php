<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'warehouse_id',
        'quantity',
        'avg_cost',
    ];

    protected $casts = [
        'quantity' => 'decimal:2',
        'avg_cost' => 'decimal:2',
    ];

    /**
     * Get the product that owns the inventory.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the warehouse that owns the inventory.
     */
    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }
}