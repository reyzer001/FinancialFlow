<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'reference',
        'transaction_type',
        'description',
        'amount',
        'reference_id',
        'reference_type',
        'user_id',
    ];

    protected $casts = [
        'date' => 'datetime',
        'amount' => 'decimal:2',
    ];

    /**
     * Get the user that created the transaction.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the reference model for the transaction.
     */
    public function reference()
    {
        return $this->morphTo();
    }
}