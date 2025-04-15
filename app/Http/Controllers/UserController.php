<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;


class UserController extends Controller
{
    public function index(Request $request)
    {
        $User = User::all();
        return response()->json([
            'success' => true,
            'message' => 'List of photos',
            'data' => $User,
        ], 200);
    }
    public function show(User $user){
        return inertia('admin/user/Detail', [
            'user' => $user->only([
                'id', 
                'name', 
                'email', 
                'role', 
                'created_at', 
                'updated_at',
                'email_verified_at'
            ]),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user',
        ]);

        event(new Registered($user));

        // Auth::login($user);

        return redirect('/admin/users');
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,'.$user->id],
        ]);
    
        $user->update($validated);
    
        // Return an Inertia response for Inertia requests
        if ($request->header('X-Inertia')) {
            return redirect()->back()->with('success', 'User updated successfully');
        }
    
        // Fallback for API requests
        return response()->json([
            'success' => true,
            'message' => 'User updated successfully',
            'data' => $user->fresh(),
        ]);
    }

    public function destroy(User $user)
    {
        // Prevent deleting yourself
        if ($user->id === Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot delete your own account',
            ], 403);
        }

        try {
            // Delete the user
            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete user',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

}
