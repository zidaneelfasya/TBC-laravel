// PhotoFeed.tsx
import React, { useEffect, useState } from 'react';
// import { usePage } from '@inertiajs/inertia-react';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import {
    Bookmark,
    Heart,
    MessageCircle,
    MoreHorizontal,
    Share2,
    User,
} from 'lucide-react';

// Define TypeScript interfaces
interface Photo {
    id: number;
    user_id: number;
    path: string;
    original_name: string;
    description?: string;
    size: number;
    mime_type: string;
    created_at: string;
    updated_at: string;
    user: {
        name: string;
        email: string;
    };
}

interface User {
    id: number;
    name: string;
    email: string;
    profile_photo?: string;
}

interface PhotoFeedProps {
    initialPhotos?: Photo[];
}

const PhotoFeed: React.FC<PhotoFeedProps> = ({ initialPhotos = [] }) => {
    const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const user = usePage().props.auth.user;

    // const { auth } = usePage().props as any;

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/photos/all');
            setPhotos(response.data.data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching photos:', err);
            setError('Failed to load photos. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' bytes';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
        else return (bytes / 1048576).toFixed(2) + ' MB';
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        }).format(date);
    };

    const handleLike = (photoId: number) => {
        // Implement like functionality
        console.log(`Liked photo ${photoId}`);
    };

    if (loading && photos.length === 0) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
            </div>
        );
    }

    if (error && photos.length === 0) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="rounded-lg bg-red-50 p-6 text-center">
                    <p className="text-red-600">{error}</p>
                    <button
                        onClick={fetchPhotos}
                        className="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation Bar */}
            <nav className="fixed z-10 w-full border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-5xl px-4">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/">
                                <div className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                                    TBC ACA
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="hidden sm:ms-6 sm:flex sm:items-center">
                                <div className="relative ms-3">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                                >
                                                    {user.name}

                                                    <svg
                                                        className="-me-0.5 ms-2 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route('profile.edit')}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route('dashboard')}
                                                as="button"
                                            >
                                                panel
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="mx-auto max-w-3xl pb-10 pt-20">
                {photos.length === 0 ? (
                    <div className="py-12 text-center">
                        <p className="text-lg text-gray-500">
                            No photos available yet.
                        </p>
                        <p className="mt-2 text-gray-400">
                            Upload photos to see them here!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {photos.map((photo) => (
                        <div
                                key={photo.id}
                                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow"
                            >
                                {/* Post Header */}
                                <div className="flex items-center justify-between p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                                            {/* {photo.user?.profile_photo ? (
                        <img 
                          src={photo.user.profile_photo} 
                          alt={photo.user?.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : ( */}
                                            <User
                                                size={16}
                                                className="text-gray-500"
                                            />
                                            {/* )} */}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">
                                                {photo.user?.name || 'User'}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {formatDate(photo.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="rounded-full p-2 hover:bg-gray-100">
                                        <MoreHorizontal
                                            size={20}
                                            className="text-gray-600"
                                        />
                                    </button>
                                </div>

                                {/* Post Image */}
                                <div className="relative pb-[100%]">
                                    {photo.mime_type.startsWith('image/') ? (
                                        <img
                                            src={`storage/${photo.path}`}
                                            alt={photo.original_name}
                                            className="absolute h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="absolute flex h-full w-full items-center justify-center bg-gray-100">
                                            <p className="text-gray-400">
                                                {photo.mime_type.split('/')[0]}{' '}
                                                file: {photo.original_name}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Post Actions */}
                                <div className="p-4">
                                    <div className="mb-3 flex justify-between">
                                        <div className="flex space-x-4">
                                            <button
                                                className="rounded-full p-1 hover:bg-gray-100"
                                                onClick={() =>
                                                    handleLike(photo.id)
                                                }
                                            >
                                                <Heart
                                                    size={24}
                                                    className="text-gray-700"
                                                />
                                            </button>
                                            <button className="rounded-full p-1 hover:bg-gray-100">
                                                <MessageCircle
                                                    size={24}
                                                    className="text-gray-700"
                                                />
                                            </button>
                                            <button className="rounded-full p-1 hover:bg-gray-100">
                                                <Share2
                                                    size={24}
                                                    className="text-gray-700"
                                                />
                                            </button>
                                        </div>
                                        <button className="rounded-full p-1 hover:bg-gray-100">
                                            <Bookmark
                                                size={24}
                                                className="text-gray-700"
                                            />
                                        </button>
                                    </div>

                                    {/* Likes count (placeholder) */}
                                    <p className="mb-2 text-sm font-semibold">
                                        42 likes
                                    </p>

                                    {/* Photo Description */}
                                    {photo.description && (
                                        <div className="mb-2">
                                            <span className="mr-2 text-sm font-semibold">
                                                {photo.user?.name || 'User'}
                                            </span>
                                            <span className="text-sm">
                                                {photo.description}
                                            </span>
                                        </div>
                                    )}

                                    {/* File Info */}
                                    <div className="mt-2 text-xs text-gray-500">
                                        <p>File: {photo.original_name}</p>
                                        <p>
                                            Size: {formatFileSize(photo.size)}
                                        </p>
                                    </div>

                                    {/* Comments (placeholder) */}
                                    <p className="mt-2 text-xs text-gray-500">
                                        View all comments
                                    </p>

                                    {/* Add Comment */}
                                    {/* <div className="mt-3 flex items-center border-t pt-3">
                    <input 
                      type="text" 
                      placeholder="Add a comment..." 
                      className="flex-grow bg-transparent text-sm outline-none"
                    />
                    <button className="text-blue-500 font-semibold text-sm">Post</button>
                  </div> */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhotoFeed;
