<?php

use App\Models\User;
use Inertia\Inertia;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Middleware\UserMiddleware;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\RegisteredUserController;


Route::get('/', function () {
    return Inertia::render('LandingPage', [
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
Route::post('/api/register', [RegisteredUserController::class, 'store']);


Route::middleware(['auth', 'verified'])->group(function () {
    // Common routes for both user and admin

    // User-specific routes
    Route::middleware(UserMiddleware::class)->group(function () {
        Route::get('/guest/panel', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');
        Route::get('/guest', function () {
            return Inertia::render('Guest');
        })->name('guest');
        Route::get('/images/create', function () {
            return Inertia::render('Add');
        })->name('Images-add');
        Route::get('/images/{id}', function ($id) {
            return Inertia::render('Detail', [
                'id' => $id
            ]);
        })->name('images-details');
        Route::get('/images/edit/{id}', function ($id) {
            return Inertia::render('Edit', [
                'id' => $id
            ]);
        })->name('images.edit');
    });

    // Admin-specific routes
    Route::middleware(AdminMiddleware::class)->group(function () {
        Route::get('/admin', function () {
            return Inertia::render('admin/dashboard');
        })->name('admin');
        Route::get('/admin/dashboard', function () {
            return Inertia::render('admin/dashboard');
        })->name('admin-dashboard');
        Route::get('/admin/images', function () {
            return Inertia::render('admin/images/Images');
        })->name('admin-Images');
        Route::get('/admin/users', function () {
            return Inertia::render('admin/user/User');
        })->name('admin-users');
        Route::get('/admin/users/create', function () {
            return Inertia::render('admin/user/Add');
        })->name('admin-users.create');
        Route::get('/admin/images/create', function () {
            return Inertia::render('admin/images/Add');
        })->name('admin-Images-add');
        Route::get('/admin/images/{id}', function ($id) {
            return Inertia::render('admin/images/Detail', [
                'id' => $id
            ]);
        })->name('admin-images-details');
        Route::get('/admin/images/edit/{id}', function ($id) {
            return Inertia::render('admin/images/Edit', [
                'id' => $id
            ]);
        })->name('admin-images.edit');

        // Route::get('/admin/images/{id}/edit', function ($id) {
        //     return Inertia::render('admin/images/Edit', ['id' => $id]);
        // })->name('admin-images.edit');
        // Route::get('/api/images/edit/{photos}', [PhotoController::class, 'edit'])->name('admin-image.edit');
        Route::get('/api/user', [UserController::class, 'index'])->name('user.index');
        Route::get('admin/users/{user}', [UserController::class, 'show'])->name('admin.users.show');
        Route::post('admin/users/store', [UserController::class, 'store'])->name('admin.users.store');

        Route::put('/api/users/update/{user}', [UserController::class, 'update'])->name('api.users.update');
        Route::delete('/api/users/delete/{user}', [UserController::class, 'destroy'])->name('api.users.destroy');
    });
    Route::get('/api/photos/all', [PhotoController::class, 'index'])->name('photos.all');

    // API routes that both can access
    Route::get('/api/photos', [PhotoController::class, 'indexUser'])->name('photos.index');
    Route::post('/api/photos', [PhotoController::class, 'store'])->name('photos.store');
    Route::get('/api/photos/{id}', [PhotoController::class, 'show'])->name('photos.show');
    Route::put('/api/photos/desc/{id}', [PhotoController::class, 'updateDesc'])->name('photos-desc.update');
    Route::post('/api/photos/photo/{id}', [PhotoController::class, 'updatePhoto'])->name('photos-photo.update');

    Route::delete('/api/photos/{id}', [PhotoController::class, 'destroy'])->name('photos.destroy');
});

// Route::middleware(['auth', 'verified'])->middleware(UserMiddleware::class)->group(function () {
//     // Route::get('/', function () {
//     //     return Inertia::render('Dashboard');
//     // })->name('dashboard'); 
//     Route::get('/dashboard', function () {
//         return Inertia::render('Dashboard');
//     })->name('dashboard'); 
//     Route::get('/images/create', function () {
//         return Inertia::render('Add');
//     })->name('Images-add'); 
//     Route::get('/images/{id}', function ($id) {
//         return Inertia::render('Detail', [
//             'id' => $id
//         ]);
//     })->name('images-details'); 
//     Route::get('/api/photos', [PhotoController::class, 'indexUser'])->name('photos.index');
//     Route::post('/api/photos', [PhotoController::class, 'store'])->name('photos.store');
//     Route::get('/api/photos/{id}', [PhotoController::class, 'show'])->name('photos.show');
//     // Route::get('/api/admin/photos/{id}', [PhotoController::class, 'show'])->name('admin-photos.show');
//     Route::put('/api/photos/{id}', [PhotoController::class, 'update'])->name('photos.update');

//     Route::delete('/api/photos/{id}', [PhotoController::class, 'destroy'])->name('photos.destroy');
//     // Route::delete('/api/photos/{id}', [PhotoController::class, 'destroy'])->name('photos.destroy');



// });

// Route::middleware(['auth', 'verified'])->middleware(AdminMiddleware::class)->group(function () {
//     Route::get('/admin', function () {
//         return Inertia::render('admin/dashboard');
//     })->name('admin'); 
//     Route::get('/admin/dashboard', function () {
//         return Inertia::render('admin/dashboard');
//     })->name('admin-dashboard'); 
//     Route::get('/admin/images', function () {
//         return Inertia::render('admin/images/Images');
//     })->name('admin-Images'); 
//     Route::get('/admin/images/create', function () {
//         return Inertia::render('admin/images/Add');
//     })->name('admin-Images-add'); 
//     Route::get('/admin/images/{id}', function ($id) {
//         return Inertia::render('admin/images/Detail', [
//             'id' => $id
//         ]);
//     })->name('admin-images-details');
//     Route::post('/api/admin/photos', [PhotoController::class, 'store'])->name('admin-photos.store');
//     Route::get('/api/admin/photos', [PhotoController::class, 'index'])->name('admin-photos.index');
//     Route::get('/api/admin/photos/{id}', [PhotoController::class, 'show'])->name('admin-photos.show');
//     Route::put('/api/admin/photos/{id}', [PhotoController::class, 'update'])->name('admin-photos.update');
//     Route::delete('/api/admin/photos/{id}', [PhotoController::class, 'destroy'])->name('admin-photos.destroy');


// });

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
