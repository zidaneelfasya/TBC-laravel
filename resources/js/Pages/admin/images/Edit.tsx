
import { PageProps } from '@/types';
import PhotoEditForm from '../../../Components/EditPhotoForm';
import EditPhotoForm from '../../../Components/EditPhotoForm';
import AdminLayout from '../AdminLayout';
import PhotoFormOnly from '@/Components/PhotoFormOnly';

export default function Edit({ id }: PageProps<{ id: number }>) {
    return (
        <AdminLayout>
            <PhotoFormOnly id={id} />
        </AdminLayout>
    );
}