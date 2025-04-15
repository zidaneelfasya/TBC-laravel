// import { DataTable } from '@/Components/table-images';
import { ErrorOverlay } from '@/Components/error-overlay';
import { DataTable } from '@/Components/table-images-user';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type Photo = {
    id: number;
    user_id: number;
    path: string;
    size: number;
    mime_type: string;
    original_name: string;
    description: string;
    created_at: string;
    updated_at: string;
    user: {
        name: string;
        email: string;
    }
};

export default function Dashboard() {
    const [data, setData] = useState<Photo[]>([]); // Initialize with empty array
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/photos');
                const result = await response.json();
                setData(result.data); // Make sure to access result.data
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    if (isLoading) {
        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Dashboard
                    </h2>
                }
            >
                <Head title="Dashboard" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div>Loading...</div>
                            </div>
                        </div>
                    </div>
                </div>
                <ErrorOverlay />
            </AuthenticatedLayout>
        );
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Panel
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <DataTable data={data} />
                        </div>
                    </div>
                </div>
            </div>
            <ErrorOverlay />
        </AuthenticatedLayout>
    );
}
