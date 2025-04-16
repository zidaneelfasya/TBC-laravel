// import UserDetail from '@/Components/UserDetail';
import UserDetail from '@/Components/UserDetail';
import AdminLayout from '../AdminLayout';



interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
    email_verified_at: string | null;
}

export default function Show({ user }: { user: User }) {
    return (
        <AdminLayout>
            <UserDetail user={user} />
        </AdminLayout>
    );
}