<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /**
     * Register a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', 'unique:users'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'staff', // Default role for new users
        ]);

        // Create default permissions for new user
        $this->createDefaultPermissions($user);

        // Log the user in directly after registration
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    /**
     * Create default permissions for a newly registered user.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    private function createDefaultPermissions(User $user)
    {
        // For staff role, grant only read access to most modules
        $modules = ['sales', 'purchases', 'inventory', 'accounting', 'reports', 'settings'];
        
        foreach ($modules as $module) {
            $user->permissions()->create([
                'module' => $module,
                'permissions' => [
                    'read' => true,
                    'create' => false,
                    'update' => false,
                    'delete' => false,
                ]
            ]);
        }
    }
}