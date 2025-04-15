// import UserDetail from '@/Components/UserDetail';
import UserDetail from '@/Components/UserDetail';
import AdminLayout from '../AdminLayout';



interface User {
    // Define the properties of the user object here
    id: number;
    name: string;
    email: string;
}

export default function Show({ user }: { user: User }) {
    return (
        <AdminLayout>
            <UserDetail user={user} />
        </AdminLayout>
    );
}