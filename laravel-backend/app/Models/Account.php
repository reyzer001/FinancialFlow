<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_category_id',
        'code',
        'name',
        'description',
        'balance',
        'is_active',
    ];

    protected $casts = [
        'balance' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    /**
     * Get the account category that owns the account.
     */
    public function accountCategory()
    {
        return $this->belongsTo(AccountCategory::class);
    }

    /**
     * Get the journal items for the account.
     */
    public function journalItems()
    {
        return $this->hasMany(JournalItem::class);
    }
}