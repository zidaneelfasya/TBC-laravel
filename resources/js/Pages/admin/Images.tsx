// import { DataTable } from '@/Components/data-table';
// import { DataTable } from '@/Components/data-table2';
// import { TableDemo } from '@/Components/data-table2';
import { DataTable } from '@/Components/data-table2';
import AdminLayout from './AdminLayout';
import data from './data.json';
import photo from './photo.json';
// import { TableDemo } from '@/Components/data-table2';

export default function Page() {
    return (
        <AdminLayout>
            <DataTable data={photo} />
        </AdminLayout>
    );
}
