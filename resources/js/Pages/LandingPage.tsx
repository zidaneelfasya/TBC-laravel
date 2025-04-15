import { Link } from '@inertiajs/react';
import {
    Camera,
    Heart,
    Image,
    Lock,
    LogIn,
    Settings,
    User,
    UserPlus,
} from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
            {/* Navigation Bar */}
            <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
                <div className="flex items-center space-x-2">
                    <Camera className="text-pink-600" size={28} />
                    <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                        TBC ACA
                    </span>
                </div>
                <div className="flex items-center space-x-4">
                    {/* <button className="px-4 py-1 text-sm font-medium text-gray-700 hover:text-gray-900">About</button>
          <button className="px-4 py-1 text-sm font-medium text-gray-700 hover:text-gray-900">Features</button>
          <button className="px-4 py-1 bg-gray-100 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200">Login</button>
          <button className="px-4 py-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-md text-sm font-medium text-white hover:opacity-90">Sign Up</button> */}
                </div>
            </nav>

            {/* Hero Section */}
            <div className="container mx-auto flex flex-col items-center px-6 py-16 md:flex-row">
                <div className="flex flex-col items-start md:w-1/2">
                    <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
                        Share Your Moments, Connect with Friends
                    </h1>
                    <p className="mb-8 text-lg text-gray-600">
                        Upload, manage, and share your photos with our simple
                        and beautiful platform. Join our community today.
                    </p>
                    <div className="flex space-x-4">
                        <Link rel="stylesheet" href="/guest">
                            <button className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 font-medium text-white shadow-md hover:opacity-90">
                                Get Started
                            </button>
                        </Link>

                        <button className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                            Learn More
                        </button>
                    </div>
                </div>
                <div className="mt-12 flex justify-center md:mt-0 md:w-1/2">
                    <div className="relative">
                        {/* Phone frame */}
                        <div className="h-96 w-64 rounded-3xl bg-black p-3 shadow-xl">
                            <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100">
                                {/* App mockup */}
                                <div className="flex h-12 items-center justify-center border-b bg-white">
                                    <span className="text-sm font-medium text-gray-800">
                                        PixelShare
                                    </span>
                                </div>
                                <div className="flex h-40 items-center justify-center bg-gray-50">
                                    <Image
                                        className="text-gray-300"
                                        size={48}
                                    />
                                </div>
                                <div className="bg-white p-3">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                                            <User
                                                className="text-gray-400"
                                                size={14}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold">
                                                username
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Just now
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-xs text-gray-700">
                                            Beautiful sunset at the beach today!
                                            #nature #sunset
                                        </p>
                                    </div>
                                    <div className="mt-2 flex items-center space-x-3">
                                        <Heart
                                            className="text-pink-500"
                                            size={16}
                                        />
                                        <span className="text-xs text-gray-500">
                                            42 likes
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-6">
                    <h2 className="mb-12 text-center text-3xl font-bold">
                        Key Features
                    </h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="flex flex-col items-center rounded-lg bg-gray-50 p-6 text-center shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
                                <UserPlus className="text-pink-600" size={20} />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">
                                User Management
                            </h3>
                            <p className="text-gray-600">
                                Create and manage different user types with
                                varying permissions and access levels.
                            </p>
                        </div>
                        <div className="flex flex-col items-center rounded-lg bg-gray-50 p-6 text-center shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                <Image className="text-purple-600" size={20} />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">
                                Photo Sharing
                            </h3>
                            <p className="text-gray-600">
                                Upload, organize, and share your favorite photos
                                with friends and followers.
                            </p>
                        </div>
                        <div className="flex flex-col items-center rounded-lg bg-gray-50 p-6 text-center shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
                                <Settings className="text-pink-600" size={20} />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">
                                Profile Customization
                            </h3>
                            <p className="text-gray-600">
                                Personalize your profile with custom photos,
                                information, and settings.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* User Types Section */}
            <div className="container mx-auto px-6 py-16">
                <h2 className="mb-12 text-center text-3xl font-bold">
                    User Types
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-white shadow-lg">
                        <div className="mb-4 flex items-center">
                            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-white bg-opacity-20">
                                <Lock className="text-white" size={18} />
                            </div>
                            <h3 className="text-xl font-semibold">
                                Admin Users
                            </h3>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-white bg-opacity-20 text-xs">
                                    ✓
                                </div>
                                Add new users to the platform
                            </li>
                            <li className="flex items-center">
                                <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-white bg-opacity-20 text-xs">
                                    ✓
                                </div>
                                Modify information for all users
                            </li>
                            <li className="flex items-center">
                                <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-white bg-opacity-20 text-xs">
                                    ✓
                                </div>
                                Remove users from the platform
                            </li>
                            <li className="flex items-center">
                                <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-white bg-opacity-20 text-xs">
                                    ✓
                                </div>
                                Complete platform management
                            </li>
                        </ul>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
                        <div className="mb-4 flex items-center">
                            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                <User className="text-gray-600" size={18} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">
                                Non-Admin Users
                            </h3>
                        </div>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-center">
                                <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs">
                                    ✓
                                </div>
                                View and edit personal information
                            </li>
                            <li className="flex items-center">
                                <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs">
                                    ✓
                                </div>
                                Update profile photo and details
                            </li>
                            <li className="flex items-center">
                                <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs">
                                    ✓
                                </div>
                                Change password and security settings
                            </li>
                            <li className="flex items-center">
                                <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs">
                                    ✓
                                </div>
                                Upload and manage personal photos
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-white">
                        Ready to Get Started?
                    </h2>
                    <p className="mx-auto mb-8 max-w-lg text-white text-opacity-90">
                        Join our growing community today and start sharing your
                        moments with the world.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link rel="stylesheet" href="/register">
                            <button className="rounded-lg bg-white px-6 py-3 font-medium text-pink-600 shadow-md hover:bg-gray-100">
                                <div className="flex items-center">
                                    <UserPlus
                                        className="mr-2"
                                        size={18}
                                        href="/register"
                                    />
                                    Sign Up Now
                                </div>
                            </button>
                        </Link>
                        <Link rel="stylesheet" href="/login">
                            <button className="rounded-lg border border-white bg-transparent px-6 py-3 font-medium text-white shadow-md hover:bg-white hover:bg-opacity-10">
                                <div className="flex items-center">
                                    <LogIn className="mr-2" size={18} />
                                    Login
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 py-12 text-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col justify-between md:flex-row">
                        <div className="mb-6 md:mb-0">
                            <div className="flex items-center space-x-2">
                                <Camera className="text-pink-400" size={24} />
                                <span className="text-xl font-bold">
                                    TBC ACA
                                </span>
                            </div>
                            <p className="mt-2 max-w-md text-sm text-gray-400">
                                Share your moments, connect with friends, and
                                discover amazing content from creators around
                                the world.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
                            <div>
                                <h3 className="mb-4 text-lg font-semibold">
                                    Company
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li>About Us</li>
                                    <li>Careers</li>
                                    <li>Contact</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-4 text-lg font-semibold">
                                    Features
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li>User Management</li>
                                    <li>Photo Sharing</li>
                                    <li>Account Customization</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-4 text-lg font-semibold">
                                    Support
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li>Help Center</li>
                                    <li>Privacy Policy</li>
                                    <li>Terms of Service</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row">
                        <p className="text-sm text-gray-400">
                            &copy; 2025 PixelShare. All rights reserved.
                        </p>
                        <div className="mt-4 md:mt-0">
                            <div className="flex space-x-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800">
                                    <svg
                                        className="h-4 w-4 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </div>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800">
                                    <svg
                                        className="h-4 w-4 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                    </svg>
                                </div>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800">
                                    <svg
                                        className="h-4 w-4 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
