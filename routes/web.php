<?php

use App\Http\Controllers\ProfileController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\UserMiddleware;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
    
// })->middleware(['auth', 'verified'])->name('dashboard')->middleware(UserMiddleware::class);

// Route::get('/admin/dashboard', function () {
//     return Inertia::render('admin/dashboard');
// })->middleware(['auth', 'verified'])->name('admin-dashboard')->middleware(AdminMiddleware::class);

Route::middleware(['auth', 'verified'])->middleware(UserMiddleware::class)->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard'); 
});

Route::middleware(['auth', 'verified'])->middleware(AdminMiddleware::class)->group(function () {
    Route::get('/admin/dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('admin-dashboard'); 
    Route::get('/admin/images', function () {
        return Inertia::render('admin/Images');
    })->name('admin-Images'); 
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
