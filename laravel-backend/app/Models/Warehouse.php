<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'address',
        'phone',
        'is_active',
        'notes',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Get the inventory records for the warehouse.
     */
    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }
}