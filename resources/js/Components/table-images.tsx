import toast from 'react-hot-toast';

import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors,
    type DragEndEvent,
    type UniqueIdentifier,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    SortableContext,
    arrayMove,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    ColumnDef,
    ColumnFiltersState,
    Row,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
    ColumnsIcon,
    GiftIcon,
    GripVerticalIcon,
    ImageIcon,
    MoreVerticalIcon,
    PlusIcon,
} from 'lucide-react';
import * as React from 'react';
import { z } from 'zod';

import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { ChartConfig } from '@/Components/ui/chart';
import { Checkbox } from '@/Components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Label } from '@/Components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import { Tabs, TabsContent } from '@/Components/ui/tabs';
import { Link } from '@inertiajs/react';

export const schema = z.object({
    id: z.number(),
    user_id: z.number(),
    path: z.string(),
    original_name: z.string(),
    description: z.string().optional(),
    size: z.number(),
    mime_type: z.string(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
    user: z.object({
        // Tambahkan ini
        id: z.number(),
        name: z.string(),
        email: z.string(),
    }),
});

type Photo = z.infer<typeof schema>;

// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
    const { attributes, listeners } = useSortable({
        id,
    });

    return (
        <Button
            {...attributes}
            {...listeners}
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground hover:bg-transparent"
        >
            <GripVerticalIcon className="size-3 text-muted-foreground" />
            <span className="sr-only">Drag to reorder</span>
        </Button>
    );
}
const handleDownload = async (photo: Photo) => {
    const toastId = toast.loading('Preparing download...');
    try {
        const response = await fetch(`/storage/${photo.path}`);
        if (!response.ok) {
            throw new Error('File not found');
        }

        // Convert to blob
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        // Create download link
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = photo.original_name;
        document.body.appendChild(link);
        link.click();

        // Clean up
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(link);
        toast.success('Download started', { id: toastId });
    } catch (error) {
        toast.error('Download failed', { id: toastId });
    }
};

// const columns: ColumnDef<Photo>[] = [
//     {
//         id: 'select',
//         header: ({ table }) => (
//             <Checkbox
//                 checked={table.getIsAllPageRowsSelected()}
//                 onCheckedChange={(value) =>
//                     table.toggleAllPageRowsSelected(!!value)
//                 }
//                 aria-label="Select all"
//             />
//         ),
//         cell: ({ row }) => (
//             <Checkbox
//                 checked={row.getIsSelected()}
//                 onCheckedChange={(value) => row.toggleSelected(!!value)}
//                 aria-label="Select row"
//             />
//         ),
//         enableSorting: false,
//         enableHiding: false,
//     },
//     {
//         accessorKey: 'original_name',
//         header: 'File Name',
//         cell: ({ row }) => {
//             return (
//                 <div className="flex items-center gap-2">
//                     <FileIcon type={row.original.mime_type} />
//                     <span>{row.original.original_name}</span>
//                 </div>
//             );
//         },
//     },
//     {
//         accessorKey: 'description',
//         header: 'Description',
//         cell: ({ row }) => (
//             <div className="max-w-[200px] truncate">
//                 {row.original.description || 'No description'}
//             </div>
//         ),
//     },
//     {
//         accessorKey: 'user_id',
//         header: 'Uploaded By',
//         cell: ({ row }) => (
//             <div className="flex items-center gap-2">
//                 <span>{row.original.user.name}</span>
//                 <Badge variant="outline">{row.original.user.email}</Badge>
//             </div>
//         ),
//     },
//     {
//         accessorKey: 'size',
//         header: 'Size',
//         cell: ({ row }) => formatFileSize(row.original.size),
//     },
//     {
//         accessorKey: 'mime_type',
//         header: 'Type',
//         cell: ({ row }) => (
//             <Badge variant="outline">
//                 {row.original.mime_type.split('/')[1].toUpperCase()}
//             </Badge>
//         ),
//     },
//     {
//         accessorKey: 'created_at',
//         header: 'Upload Date',
//         cell: ({ row }) => formatDate(row.original.created_at),
//     },
//     {
//         id: 'actions',
//         cell: ({ row }) => (
//             <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" className="h-8 w-8 p-0">
//                         <MoreVerticalIcon className="h-4 w-4" />
//                     </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                     <Link
//                         href={route('admin-images-details', {
//                             id: row.original.id,
//                         })}
//                     >
//                         <DropdownMenuItem>Detail</DropdownMenuItem>
//                     </Link>
//                     <DropdownMenuItem
//                         onClick={() =>
//                             navigator.clipboard.writeText(row.original.path)
//                         }
//                     >
//                         Copy Path
//                     </DropdownMenuItem>

//                     <DropdownMenuItem
//                         onClick={(e) => {
//                             e.preventDefault();
//                             handleDownload(row.original);
//                         }}
//                     >
//                         Download
//                     </DropdownMenuItem>

//                     <DropdownMenuSeparator />
//                     <DropdownMenuItem
//                         className="text-red-600"
//                         onClick={(e) => {
//                             e.preventDefault();
//                             handleDeleteClick(row.original);
//                         }}
//                     >
//                         Delete
//                     </DropdownMenuItem>
//                 </DropdownMenuContent>
//             </DropdownMenu>
//         ),
//     },
// ];

function FileIcon({ type, className }: { type: string; className?: string }) {
    const iconMap: Record<string, JSX.Element> = {
        'image/jpeg': <ImageIcon className={className} />,
        'image/png': <ImageIcon className={className} />,
        'image/gif': <GiftIcon className={className} />,
        // Add more mime types as needed
    };
    
    // Return the icon if found, otherwise return a default file icon
    return iconMap[type] || <ImageIcon className={className} />;
}

function formatFileSize(bytes: number) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i]);
}

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString();
}

function UserBadge({ userId }: { userId: number }) {
    // You would fetch user data based on userId
    const user = { name: `User ${userId}` }; // Mock data
    return <Badge variant="outline">{user.name}</Badge>;
}

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: row.original.id,
    });

    return (
        <TableRow
            data-state={row.getIsSelected() && 'selected'}
            data-dragging={isDragging}
            ref={setNodeRef}
            className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
            style={{
                transform: CSS.Transform.toString(transform),
                transition: transition,
            }}
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </TableRow>
    );
}

export function DataTable({
    data: initialData,
}: {
    data: z.infer<typeof schema>[];
}) {
    const [data, setData] = React.useState(() => initialData);
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const sortableId = React.useId();
    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {}),
    );
    const handleDeleteClick = async (photo: Photo) => {
        // Show confirmation dialog
        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${photo.original_name}"?`,
        );
        if (!confirmDelete) return;

        const toastId = toast.loading('Deleting photo...');
        try {
            const response = await fetch(`/api/photos/${photo.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN':
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute('content') || '',
                },
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Failed to delete photo');
            }

            // Remove the deleted photo from the state
            setData((prevData) =>
                prevData.filter((item) => item.id !== photo.id),
            );

            toast.success('Photo deleted successfully', { id: toastId });
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Failed to delete photo',
                { id: toastId },
            );
        }
    };
    const dataIds = React.useMemo<UniqueIdentifier[]>(
        () => data?.map(({ id }) => id) || [],
        [data],
    );

    const columns = React.useMemo<ColumnDef<Photo>[]>(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <Checkbox
                        checked={table.getIsAllPageRowsSelected()}
                        onCheckedChange={(value) =>
                            table.toggleAllPageRowsSelected(!!value)
                        }
                        aria-label="Select all"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: 'original_name',
                header: 'File Name',
                cell: ({ row }) => {
                    return (
                        <div className="flex items-center gap-2">
                            <FileIcon type={row.original.mime_type} />
                            <span>{row.original.original_name}</span>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'description',
                header: 'Description',
                cell: ({ row }) => (
                    <div className="max-w-[200px] truncate">
                        {row.original.description || 'No description'}
                    </div>
                ),
            },
            {
                accessorKey: 'user_id',
                header: 'Uploaded By',
                cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <span>{row.original.user.name}</span>
                        <Badge variant="outline">
                            {row.original.user.email}
                        </Badge>
                    </div>
                ),
            },
            {
                accessorKey: 'size',
                header: 'Size',
                cell: ({ row }) => formatFileSize(row.original.size),
            },
            {
                accessorKey: 'mime_type',
                header: 'Type',
                cell: ({ row }) => (
                    <Badge variant="outline">
                        {row.original.mime_type.split('/')[1].toUpperCase()}
                    </Badge>
                ),
            },
            {
                accessorKey: 'created_at',
                header: 'Upload Date',
                cell: ({ row }) => formatDate(row.original.created_at),
            },
            {
                id: 'actions',
                cell: ({ row }) => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVerticalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <Link
                                href={route('admin-images-details', {
                                    id: row.original.id,
                                })}
                            >
                                <DropdownMenuItem>Detail</DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        row.original.path,
                                    )
                                }
                            >
                                Copy Path
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDownload(row.original);
                                }}
                            >
                                Download
                            </DropdownMenuItem>
                            {/* <Link
                                href={route('admin-images.edit', {
                                    id: row.original.id,
                                })}
                            >
                                <DropdownMenuItem>edit</DropdownMenuItem>
                            </Link> */}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-red-600"
                                onClick={(e) => {
                                    e.preventDefault();
                                    console.log(row.original);
                                    handleDeleteClick(row.original);
                                }}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            },
        ],
        [],
    );

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        getRowId: (row) => row.id.toString(),
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            setData((data) => {
                const oldIndex = dataIds.indexOf(active.id);
                const newIndex = dataIds.indexOf(over.id);
                return arrayMove(data, oldIndex, newIndex);
            });
        }
    }

    return (
        <Tabs
            defaultValue="outline"
            className="flex w-full flex-col justify-start gap-6"
        >
            <div className="flex items-center justify-between px-4 lg:px-6">
                <Label htmlFor="view-selector" className="sr-only">
                    View
                </Label>

                <div className="flex w-full items-center justify-between">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <ColumnsIcon />
                                <span className="hidden lg:inline">
                                    Customize Columns
                                </span>
                                <span className="lg:hidden">Columns</span>
                                <ChevronDownIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) =>
                                        typeof column.accessorFn !==
                                            'undefined' && column.getCanHide(),
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link href="/admin/images/create">
                        <Button variant="outline" size="sm">
                            <PlusIcon />
                            <span className="hidden lg:inline">Add photos</span>
                        </Button>
                    </Link>
                </div>
            </div>
            <TabsContent
                value="outline"
                className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
            >
                <div className="overflow-hidden rounded-lg border">
                    <DndContext
                        collisionDetection={closestCenter}
                        modifiers={[restrictToVerticalAxis]}
                        onDragEnd={handleDragEnd}
                        sensors={sensors}
                        id={sortableId}
                    >
                        <Table>
                            <TableHeader className="sticky top-0 z-10 bg-muted">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead
                                                    key={header.id}
                                                    colSpan={header.colSpan}
                                                >
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                              header.column
                                                                  .columnDef
                                                                  .header,
                                                              header.getContext(),
                                                          )}
                                                </TableHead>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody className="**:data-[slot=table-cell]:first:w-8">
                                {table.getRowModel().rows?.length ? (
                                    <SortableContext
                                        items={dataIds}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {table.getRowModel().rows.map((row) => (
                                            <DraggableRow
                                                key={row.id}
                                                row={row}
                                            />
                                        ))}
                                    </SortableContext>
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </DndContext>
                </div>
                <div className="flex items-center justify-between px-4">
                    <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
                        {table.getFilteredSelectedRowModel().rows.length} of{' '}
                        {table.getFilteredRowModel().rows.length} row(s)
                        selected.
                    </div>
                    <div className="flex w-full items-center gap-8 lg:w-fit">
                        <div className="hidden items-center gap-2 lg:flex">
                            <Label
                                htmlFor="rows-per-page"
                                className="text-sm font-medium"
                            >
                                Rows per page
                            </Label>
                            <Select
                                value={`${table.getState().pagination.pageSize}`}
                                onValueChange={(value) => {
                                    table.setPageSize(Number(value));
                                }}
                            >
                                <SelectTrigger
                                    className="w-20"
                                    id="rows-per-page"
                                >
                                    <SelectValue
                                        placeholder={
                                            table.getState().pagination.pageSize
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                        <SelectItem
                                            key={pageSize}
                                            value={`${pageSize}`}
                                        >
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex w-fit items-center justify-center text-sm font-medium">
                            Page {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount()}
                        </div>
                        <div className="ml-auto flex items-center gap-2 lg:ml-0">
                            <Button
                                variant="outline"
                                className="hidden h-8 w-8 p-0 lg:flex"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">
                                    Go to first page
                                </span>
                                <ChevronsLeftIcon />
                            </Button>
                            <Button
                                variant="outline"
                                className="size-8"
                                size="icon"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">
                                    Go to previous page
                                </span>
                                <ChevronLeftIcon />
                            </Button>
                            <Button
                                variant="outline"
                                className="size-8"
                                size="icon"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to next page</span>
                                <ChevronRightIcon />
                            </Button>
                            <Button
                                variant="outline"
                                className="hidden size-8 lg:flex"
                                size="icon"
                                onClick={() =>
                                    table.setPageIndex(table.getPageCount() - 1)
                                }
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to last page</span>
                                <ChevronsRightIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </TabsContent>
            <TabsContent
                value="past-performance"
                className="flex flex-col px-4 lg:px-6"
            >
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
            <TabsContent
                value="key-personnel"
                className="flex flex-col px-4 lg:px-6"
            >
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
            <TabsContent
                value="focus-documents"
                className="flex flex-col px-4 lg:px-6"
            >
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
        </Tabs>
    );
}

const chartData = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'var(--primary)',
    },
    mobile: {
        label: 'Mobile',
        color: 'var(--primary)',
    },
} satisfies ChartConfig;
