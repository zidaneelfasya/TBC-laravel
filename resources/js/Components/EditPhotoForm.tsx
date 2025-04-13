import { router } from '@inertiajs/react';
import { Calendar, Download, FileText, Info, Maximize, Trash, User } from 'lucide-react';
import { useEffect, useState } from 'react';

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

export default function PhotoEditForm({ id }: { id: number }) {
    const [photo, setPhoto] = useState<Photo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Fetch photo data from API
    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const response = await fetch(`/api/photos/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch photo');
                }
                const data = await response.json();
                setPhoto(data.data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'An unknown error occurred',
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPhoto();
    }, [id]);

    // Format file size to readable format
    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i]);
    };

    // Format date to a readable format
    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return '-';

        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '-';

            return new Intl.DateTimeFormat('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }).format(date);
        } catch (e) {
            console.error('Error formatting date:', e);
            return '-';
        }
    };

    // const handleDeleteClick = async (id: number) => {
    //     try {
    //         const response = await fetch(`/api/photos/${id}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 //     'X-CSRF-TOKEN':
    //                 //         document
    //                 //             .querySelector('meta[name="csrf-token"]')
    //                 //             ?.getAttribute('content') || '',
    //             },
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to delete photo');
    //         }

    //         // Remove the deleted photo from the table
    //         setData(data.filter((photo) => photo.id !== id));

    //         // Show success message
    //         alert('Photo deleted successfully');
    //         // Or using toast: toast.success('Photo deleted successfully');
    //     } catch (error) {
    //         console.error('Delete error:', error);
    //         alert('Failed to delete photo');
    //         // Or using toast: toast.error('Failed to delete photo');
    //     }
    // };
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/photos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    //     'X-CSRF-TOKEN':
                    //         document
                    //             .querySelector('meta[name="csrf-token"]')
                    //             ?.getAttribute('content') || '',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete photo');
            }

            // Remove the deleted photo from the table
            

            
            alert('Photo deleted successfully');
            window.location.href = '/admin/images';
            
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete photo');
            // Or using toast: toast.error('Failed to delete photo');
        }
    };

    // Handle download
    const handleDownload = () => {
        if (photo) {
            // Buat elemen anchor (link) secara dinamis
            const link = document.createElement('a');
            link.href = `/storage/${photo.path}`;

            // Atur atribut download dengan nama file asli
            link.download = photo.original_name;

            // Tambahkan ke dokumen
            document.body.appendChild(link);

            // Trigger click
            link.click();

            // Bersihkan
            document.body.removeChild(link);
        }
    };

    const handleFullscreen = () => {
        if (photo) {
            window.open(`/storage/${photo.path}`, '_blank');
        }
    };

    if (loading) {
        return (
            <div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white p-8 text-center shadow-md">
                <div className="animate-pulse">
                    <div className="mx-auto mb-4 h-8 w-3/4 rounded bg-gray-200"></div>
                    <div className="mb-6 h-64 rounded-lg bg-gray-100"></div>
                    <div className="space-y-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center">
                                <div className="mr-3 h-5 w-5 rounded-full bg-gray-200"></div>
                                <div className="flex-1">
                                    <div className="mb-2 h-4 w-1/3 rounded bg-gray-200"></div>
                                    <div className="h-4 w-2/3 rounded bg-gray-200"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white p-8 text-center text-red-500 shadow-md">
                <p>Error: {error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                    Coba Lagi
                </button>
            </div>
        );
    }

    if (!photo) {
        return (
            <div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white p-8 text-center shadow-md">
                <p>Foto tidak ditemukan</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white shadow-md">
            <div className="flex flex-col">
                {/* Image Display Area */}
                <div className="flex items-center justify-center bg-gray-200 p-4">
                    <div className="inline-block max-h-[70vh] max-w-full overflow-hidden rounded-lg shadow-sm">
                        <img
                            src={`/storage/${photo.path}`}
                            alt={photo.description || photo.original_name}
                            className="block max-h-[70vh] max-w-full"
                            style={{
                                width: 'auto',
                                height: 'auto',
                                maxWidth: '100%',
                                maxHeight: '70vh',
                            }}
                        />
                    </div>
                </div>

                {/* Details Area */}
                <div className="p-6 md:w-1/2">
                    <div className="flex items-start justify-between">
                        <h2 className="mb-2 truncate text-2xl font-bold text-gray-800">
                            {photo.original_name}
                        </h2>

                        {/* Action buttons */}
                    <div className="flex space-x-2">
                        <button
                            onClick={handleDownload}
                            className="rounded-full p-2 text-blue-600 transition-colors hover:bg-blue-50"
                            title="Download"
                        >
                            <Download className="h-5 w-5" />
                        </button>
                        <button
                            onClick={handleFullscreen}
                            className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-50"
                            title="Open in fullscreen"
                        >
                            <Maximize className="h-5 w-5" />{' '}
                            {/* Pastikan impor ikon Maximize */}
                        </button>
                        <button
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="rounded-full p-2 text-red-600 transition-colors hover:bg-red-50"
                            title="Delete"
                        >
                            <Trash className="h-5 w-5" />
                        </button>
                    </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6 mt-4">
                        <h3 className="mb-1 text-sm font-medium text-gray-500">
                            Deskripsi
                        </h3>
                        <p className="text-gray-700">
                            {photo.description || (
                                <span className="italic text-gray-400">
                                    Tidak ada deskripsi
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Details list */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <Calendar className="mr-3 h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Diunggah pada
                                </p>
                                <p className="text-gray-700">
                                    {formatDate(photo.created_at)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <FileText className="mr-3 h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Informasi File
                                </p>
                                <p className="text-gray-700">
                                    {formatFileSize(photo.size)} •{' '}
                                    {photo.mime_type}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <User className="mr-3 h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Dimiliki oleh
                                </p>
                                <p className="text-gray-700">
                                    User: {photo.user.name}
                                </p>
                                <p className="text-gray-700">
                                    Email: {photo.user.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Info className="mr-3 h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    ID File
                                </p>
                                <p className="text-gray-700">{photo.id}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete confirmation modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6">
                        <h3 className="mb-2 text-lg font-bold text-gray-900">
                            Konfirmasi Hapus
                        </h3>
                        <p className="mb-6 text-gray-600">
                            Apakah Anda yakin ingin menghapus foto "
                            {photo.original_name}"? Tindakan ini tidak dapat
                            dibatalkan.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="rounded-md px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDelete}
                                className="rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
