<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

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
}
