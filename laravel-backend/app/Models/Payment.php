<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'payment_number',
        'payment_date',
        'payable_id',
        'payable_type',
        'amount',
        'payment_method',
        'reference_number',
        'account_id',
        'notes',
        'user_id',
    ];

    protected $casts = [
        'payment_date' => 'datetime',
        'amount' => 'decimal:2',
    ];

    /**
     * Get the payable model (invoice or bill).
     */
    public function payable()
    {
        return $this->morphTo();
    }

    /**
     * Get the user that recorded the payment.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the account used for the payment.
     */
    public function account()
    {
        return $this->belongsTo(Account::class);
    }
    
    /**
     * Get the items for the payment.
     */
    public function items()
    {
        return $this->hasMany(PaymentItem::class);
    }
    
    /**
     * Get the transaction record associated with this payment.
     */
    public function transaction()
    {
        return $this->morphOne(Transaction::class, 'reference');
    }
}