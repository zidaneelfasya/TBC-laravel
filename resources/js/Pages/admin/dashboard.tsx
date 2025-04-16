import { DataTable } from '@/Components/data-table';
import AdminLayout from './AdminLayout';
import data from './data.json';

import { Link, usePage } from '@inertiajs/react';
import {
    Activity,
    ArrowRight,
    Award,
    Bell,
    Calendar,
    User,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Page() {
    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState('Admin');
    const [currentTime, setCurrentTime] = useState('');
    const [greeting, setGreeting] = useState('');
    const user = usePage().props.auth.user;

    // Set animation visibility on load
    useEffect(() => {
        setIsVisible(true);

        // Get current username - in a real app, this would come from your auth system
        // setUsername(currentUser.name);
        setUsername(user.name);

        // Set current time
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const updateTime = () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        });
        setCurrentTime(timeStr);

        // Set greeting based on time of day
        const hours = now.getHours();
        let greetText = '';
        if (hours < 12) {
            greetText = 'Selamat Pagi';
        } else if (hours < 15) {
            greetText = 'Selamat Siang';
        } else if (hours < 19) {
            greetText = 'Selamat Sore';
        } else {
            greetText = 'Selamat Malam';
        }
        setGreeting(greetText);
    };

    // Get current date in Indonesian format
    const currentDate = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return (
        <AdminLayout>
            <div className="px-4 lg:px-6">
                <div className="min-h-screen bg-slate-50 p-6">
                    <div
                        className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    >
                        <div className="mx-auto max-w-4xl">
                            {/* Header */}
                            <div className="mb-6 overflow-hidden rounded-lg bg-white shadow-lg">
                                <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
                                    {/* Animated circles in background */}
                                    <div className="absolute right-0 top-0 h-64 w-64 -translate-x-20 -translate-y-20 transform animate-pulse rounded-full bg-white opacity-5"></div>
                                    <div
                                        className="absolute bottom-0 left-0 h-32 w-32 translate-x-10 translate-y-10 transform animate-pulse rounded-full bg-white opacity-5"
                                        style={{ animationDelay: '1s' }}
                                    ></div>

                                    <div className="relative z-10">
                                        <div className="mb-4 flex items-center">
                                            <Award
                                                className="mr-3 h-8 w-8 animate-bounce"
                                                style={{
                                                    animationDuration: '2s',
                                                }}
                                            />
                                            <h1 className="text-3xl font-bold">
                                                {greeting}, {username}!
                                            </h1>
                                        </div>
                                        <p className="mb-2 text-lg opacity-90">
                                            Selamat datang kembali di Dashboard
                                            Admin
                                        </p>
                                        <div className="flex items-center text-sm opacity-80">
                                            <Calendar className="mr-1 h-4 w-4" />
                                            <span>{currentDate}</span>
                                            <span className="mx-2">•</span>
                                            <span>{currentTime}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="p-6">
                                    <h2 className="mb-4 text-lg font-semibold text-gray-700">
                                        Ringkasan Cepat
                                    </h2>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        {[
                                            {
                                                icon: User,
                                                title: 'Pengguna Aktif',
                                                value: '1,248',
                                                change: '+12%',
                                                color: 'text-blue-600',
                                            },
                                            {
                                                icon: Activity,
                                                title: 'Transaksi Hari Ini',
                                                value: '64',
                                                change: '+8%',
                                                color: 'text-green-600',
                                            },
                                            {
                                                icon: Bell,
                                                title: 'Notifikasi Baru',
                                                value: '7',
                                                change: '',
                                                color: 'text-amber-600',
                                            },
                                        ].map((stat, index) => (
                                            <div
                                                key={index}
                                                className={`transform rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                                                style={{
                                                    transitionDelay: `${300 + index * 100}ms`,
                                                }}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <p className="mb-1 text-sm text-gray-500">
                                                            {stat.title}
                                                        </p>
                                                        <p className="text-2xl font-bold">
                                                            {stat.value}
                                                        </p>
                                                        {stat.change && (
                                                            <p
                                                                className={`text-xs ${stat.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}
                                                            >
                                                                {stat.change}{' '}
                                                                dari kemarin
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div
                                                        className={`rounded-full p-3 ${stat.color} bg-opacity-10`}
                                                    >
                                                        <stat.icon
                                                            className={`h-5 w-5 ${stat.color}`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div
                                className={`transform rounded-lg bg-white p-6 shadow-lg transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                style={{ transitionDelay: '600ms' }}
                            >
                                <h2 className="mb-4 text-lg font-semibold text-gray-700">
                                    Aksi Cepat
                                </h2>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                    {[
                                        {
                                            title: 'Kelola Pengguna',
                                            color: 'bg-blue-100 text-blue-700',
                                            link: '/admin/users',
                                        },
                                        {
                                            title: 'Kelola Image',
                                            color: 'bg-purple-100 text-purple-700',
                                            link: '/admin/images',
                                        },
                                        {
                                            title: 'Tambah Pengguna',
                                            color: 'bg-green-100 text-green-700',
                                            link: '/admin/users/create',

                                        },
                                        {
                                            title: 'Tambah Image',
                                            color: 'bg-gray-100 text-gray-700',
                                            link: '/admin/images/create',

                                        },
                                    ].map((action, index) => (
                                        <Link href={action.link || '#'} key={index}>
                                            <button
                                                key={index}
                                                className={`${action.color} animate-fade-in-up group rounded-lg p-4 text-left transition-all duration-300 w-[20vh] hover:shadow-md`}
                                                style={{
                                                    animationDelay: `${800 + index * 100}ms`,
                                                    animationDuration: '500ms',
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium">
                                                        {action.title}
                                                    </span>
                                                    <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </button>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DataTable data={data} />
        </AdminLayout>
    );
}
