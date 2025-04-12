
import { DataTable } from '@/Components/table-images';
import AdminLayout from '../AdminLayout';

import photo from '../photo.json';
import PhotoUploadForm from '@/Components/PhotoUploadForm';
import DetailPhoto from '@/Components/DetailPhoto';
import { PageProps } from '@/types';


export default function Detail({ id }: PageProps<{ id: number }>) {
  return (
    <AdminLayout>
      {/* <div className="px-4 lg:px-6"> */}
        <DetailPhoto id={id} />
      {/* </div> */}
    </AdminLayout>
  
  );
}