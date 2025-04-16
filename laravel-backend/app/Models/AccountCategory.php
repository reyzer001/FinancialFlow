<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'description',
    ];

    /**
     * Get the accounts for the account category.
     */
    public function accounts()
    {
        return $this->hasMany(Account::class);
    }
}