<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Define a relationship with permissions.
     */
    public function permissions()
    {
        return $this->hasMany(Permission::class);
    }

    /**
     * Check if user has access to a specific module.
     *
     * @param string $module
     * @return bool
     */
    public function hasModuleAccess($module)
    {
        return $this->permissions()->where('module', $module)->exists();
    }

    /**
     * Check if user has a specific permission in a module.
     *
     * @param string $module
     * @param string $permission
     * @return bool
     */
    public function hasPermission($module, $permission)
    {
        return $this->permissions()
            ->where('module', $module)
            ->where('permissions->'. $permission, true)
            ->exists();
    }

    /**
     * Check if user is admin.
     *
     * @return bool
     */
    public function isAdmin()
    {
        return $this->role === 'admin';
    }
}