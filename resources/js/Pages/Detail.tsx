// import AdminLayout from '../AdminLayout';

// import photo from '../photo.json';
// import DetailPhoto from '@/Components/DetailPhoto';
import DetailPhoto from '@/Components/DetailPhotoUser';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

export default function Detail({ id }: PageProps<{ id: number }>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <div className='py-12'>
                <DetailPhoto id={id} />
            </div>
        </AuthenticatedLayout>
    );
}
