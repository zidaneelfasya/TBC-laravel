// import { DataTable } from '@/Components/data-table';
// import { DataTable } from '@/Components/data-table2';
// import { TableDemo } from '@/Components/data-table2';
import { DataTable } from '@/Components/table-images';
import AdminLayout from '../AdminLayout';
import data from '../data.json';
import photo from '../photo.json';
import { useEffect, useState } from 'react';
// import { TableDemo } from '@/Components/data-table2';


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
}

export default function Page() {
    const [data, setData] = useState<Photo[]>([]); // Initialize with empty array
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/admin/photos');
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
            <AdminLayout>
                <div>Loading...</div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <DataTable data={data} />
        </AdminLayout>
    );
}
