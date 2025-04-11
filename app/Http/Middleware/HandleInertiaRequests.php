<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
{
    return [
        ...parent::share($request),
        'auth' => [
            'user' => $request->user() ? [
                ...$request->user()->toArray(),
                'role' => $request->user()->role,
            ] : null,
        ],
        'errors' => fn () => $request->session()->get('errors')
            ? $request->session()->get('errors')->getBag('default')->getMessages()
            : (object) [],
        'flash' => [
            'error' => fn () => $request->session()->get('error'),
        ],
    ];
}
}
