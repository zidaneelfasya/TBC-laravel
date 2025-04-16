// import { DataTable } from '@/Components/data-table';
// import { DataTable } from '@/Components/data-table2';
// import { TableDemo } from '@/Components/data-table2';

import { DataTable } from '@/Components/table-user';
import { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
// import { TableDemo } from '@/Components/data-table2';

interface User {
    id: number;
    email: string;
    name: string;
    role: string;
    created_at: string;
    updated_at: string;   
}

export default function Page() {
    const [data, setData] = useState<User[]>([]); // Initialize with empty array
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/user');
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
