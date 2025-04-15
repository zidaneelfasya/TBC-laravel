import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Separator } from '@/Components/ui/separator';
import { Textarea } from '@/Components/ui/textarea';
import { Link, useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import {
    ArrowLeftIcon,
    BadgeIcon,
    CalendarIcon,
    CheckIcon,
    UserIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface UserDetailProps {
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
        created_at: string;
        updated_at: string;
        email_verified_at: string | null;
    };
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function UserDetail({ user: initialUser }: UserDetailProps) {
    const { flash } = usePage().props;
    const [user, setUser] = useState(initialUser);
    const [isDirty, setIsDirty] = useState(false);
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
    });

    // Show flash messages
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    useEffect(() => {
        const dirty =
            user.name !== initialUser.name || user.email !== initialUser.email;
        setIsDirty(dirty);
    }, [user, initialUser]);

    const handleFieldChange = (field: 'name' | 'email', value: string) => {
        setUser((prev) => ({ ...prev, [field]: value }));
        setData(field, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!confirm('Are you sure you want to update this user?')) {
            return;
        }
    
        put(route('api.users.update', { user: user.id }), {
            preserveScroll: true,
            onSuccess: () => {
                // Remove window.location.reload() and let Inertia handle it
                toast.success('Account updated successfully');
                setIsDirty(false);
            },
            onError: () => {
                toast.error('Failed to update user');
            },
        });
    };
    
    // Update your handleDeleteClick function:
    const handleDeleteClick = async () => {
        if (!confirm(`Are you sure you want to delete user "${user.name}"?`)) {
            return;
        }
    
        try {
            const response = await fetch(
                route('api.users.destroy', { user: user.id }),
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN':
                            document
                                .querySelector('meta[name="csrf-token"]')
                                ?.getAttribute('content') || '',
                    },
                },
            );
    
            const result = await response.json();
    
            if (!response.ok) {
                throw new Error(result.message || 'Failed to delete user');
            }
    
            toast.success('Account deleted successfully');
            // Use Inertia's redirect instead of window.location
            window.location.href = '/admin/users'; // Consider using Inertia's router instead
        } catch (error) {
            console.error('Delete error:', error);
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Failed to delete user',
            );
        }
    };

    return (
        <div className="mx-6 space-y-6">
            <div className="flex items-center justify-between">
                <Link href="/admin/users">
                    <Button variant="outline" className="gap-2">
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back to Users
                    </Button>
                </Link>
                <Button
                    onClick={handleSubmit}
                    disabled={!isDirty || processing}
                    className="gap-2"
                >
                    <CheckIcon className="h-4 w-4" />
                    {processing ? 'Updating...' : 'Update User'}
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <UserIcon className="h-6 w-6" />
                        <span>User Details</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit}>
                        {/* Basic Information */}
                        <div>
                            <h3 className="mb-4 text-lg font-medium">
                                Basic Information
                            </h3>
                            <div className="space-y-4">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-32 text-sm font-medium text-muted-foreground">
                                            Name
                                        </div>
                                        <div className="flex-1">
                                            <Textarea
                                                value={user.name}
                                                onChange={(e) =>
                                                    handleFieldChange(
                                                        'name',
                                                        e.target.value,
                                                    )
                                                }
                                                className="min-h-[40px]"
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center gap-4">
                                        <div className="w-32 text-sm font-medium text-muted-foreground">
                                            Email
                                        </div>
                                        <div className="flex-1">
                                            <Textarea
                                                value={user.email}
                                                onChange={(e) =>
                                                    handleFieldChange(
                                                        'email',
                                                        e.target.value,
                                                    )
                                                }
                                                className="min-h-[40px]"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center gap-4">
                                        <div className="w-32 text-sm font-medium text-muted-foreground">
                                            Role
                                        </div>
                                        <div className="flex flex-1 items-center gap-2">
                                            <BadgeIcon className="h-4 w-4 text-muted-foreground" />
                                            <span className="capitalize">
                                                {user.role}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    {/* Rest of the content remains the same */}
                    {/* Account Status */}
                    <div>
                        <h3 className="mb-4 text-lg font-medium">
                            Account Status
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-32 text-sm font-medium text-muted-foreground">
                                    Email Verified
                                </div>
                                <div className="flex-1">
                                    {user.email_verified_at ? (
                                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                            Verified
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                                            Not Verified
                                        </span>
                                    )}
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-center gap-4">
                                <div className="w-32 text-sm font-medium text-muted-foreground">
                                    Account Status
                                </div>
                                <div className="flex-1">
                                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timestamps */}
                    <div>
                        <h3 className="mb-4 text-lg font-medium">Timestamps</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-32 text-sm font-medium text-muted-foreground">
                                    Created At
                                </div>
                                <div className="flex flex-1 items-center gap-2">
                                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                    {format(new Date(user.created_at), 'PPpp')}
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-center gap-4">
                                <div className="w-32 text-sm font-medium text-muted-foreground">
                                    Updated At
                                </div>
                                <div className="flex flex-1 items-center gap-2">
                                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                    {format(new Date(user.updated_at), 'PPpp')}
                                </div>
                            </div>
                            {user.email_verified_at && (
                                <>
                                    <Separator />
                                    <div className="flex items-center gap-4">
                                        <div className="w-32 text-sm font-medium text-muted-foreground">
                                            Verified At
                                        </div>
                                        <div className="flex flex-1 items-center gap-2">
                                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                            {format(
                                                new Date(
                                                    user.email_verified_at,
                                                ),
                                                'PPpp',
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div>
                        <h3 className="mb-4 text-lg font-medium text-red-600">
                            Danger Zone
                        </h3>
                        <div className="rounded-lg border border-red-200 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium">
                                        Delete User Account
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Once deleted, the user account cannot be
                                        recovered.
                                    </p>
                                </div>

                                <Button
                                    variant="destructive"
                                    onClick={handleDeleteClick}
                                >
                                    Delete User
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
