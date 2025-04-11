import { ChartAreaInteractive } from '@/Components/chart-area-interactive';
import { DataTable } from '@/Components/data-table';
import { SectionCards } from '@/Components/section-cards';
import AdminLayout from './AdminLayout';
import data from './data.json';

export default function Page() {
    return (
        <AdminLayout>
            <SectionCards />
            <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
        </AdminLayout>
    );
}
