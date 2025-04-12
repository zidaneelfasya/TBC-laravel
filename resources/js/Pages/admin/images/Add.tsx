
import { DataTable } from '@/Components/table-images';
import AdminLayout from '../AdminLayout';

import photo from '../photo.json';
import PhotoUploadForm from '@/Components/PhotoUploadForm';


export default function Page() {
    return (
        <AdminLayout>
            <PhotoUploadForm />
        </AdminLayout>
    );
}
