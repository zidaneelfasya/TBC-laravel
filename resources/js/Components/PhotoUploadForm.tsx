import { Camera, Check, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';

interface FormState {
    description: string;
    file: File | null;
    preview: string | null;
    originalName: string;
    size: number;
    mimeType: string;
    userId: number;
}

export default function PhotoUploadForm() {
    const [form, setForm] = useState<FormState>({
        description: '',
        file: null,
        preview: null,
        originalName: '',
        size: 0,
        mimeType: '',
        userId: 1,
    });

    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (file: File) => {
        if (!file) return;

        // Create a preview URL
        const previewUrl = URL.createObjectURL(file);

        setForm({
            ...form,
            file: file,
            preview: previewUrl,
            originalName: file.name,
            size: file.size,
            mimeType: file.type,
        });
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
    };

    const handleRemoveFile = () => {
        if (form.preview) {
            URL.revokeObjectURL(form.preview);
        }

        setForm({
            ...form,
            file: null,
            preview: null,
            originalName: '',
            size: 0,
            mimeType: '',
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.file) {
            alert('Silakan pilih gambar terlebih dahulu');
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', form.file);
            formData.append('description', form.description);

            const response = await fetch('/api/photos', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    // 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: formData,
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();

            setUploadSuccess(true);
            setTimeout(() => setUploadSuccess(false), 3000);

            // Reset form setelah upload sukses
            handleRemoveFile();
            setForm({ ...form, description: '' });
        } catch (error) {
            console.error('Upload error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            alert('Terjadi kesalahan saat mengunggah gambar: ' + errorMessage);
        } finally {
            setIsUploading(false);
            window.location.href = '/admin/images';
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-[40vh] rounded-lg bg-gray-100 p-6 shadow-md">
                <h2 className="mb-6 text-2xl font-semibold text-gray-800">
                    Upload Photo
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* File Upload Area */}
                    <div
                        className={`relative mb-6 rounded-lg border-2 border-dashed p-6 text-center transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'} ${form.preview ? 'bg-gray-50' : 'bg-white'}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {!form.preview ? (
                            <div className="space-y-3">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                                    <Camera className="h-6 w-6 text-blue-500" />
                                </div>
                                <div>
                                    <p className="mb-1 text-gray-700">
                                        Drag & drop atau{' '}
                                        <button
                                            type="button"
                                            className="font-medium text-blue-500 hover:text-blue-700"
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                        >
                                            pilih file
                                        </button>
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        JPG, PNG, atau GIF (Maks. 10MB)
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="relative mx-auto h-48 w-48">
                                    <img
                                        src={form.preview}
                                        alt="Preview"
                                        className="h-full w-full rounded-lg object-cover shadow-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveFile}
                                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow-md transition-colors hover:bg-red-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="text-sm text-gray-600">
                                    <p className="truncate font-medium">
                                        {form.originalName}
                                    </p>
                                    <p>{formatFileSize(form.size)}</p>
                                </div>
                            </div>
                        )}

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileInputChange}
                        />
                    </div>

                    {/* Description Field */}
                    <div className="mb-6">
                        <label
                            className="mb-1 block text-sm font-medium text-gray-700"
                            htmlFor="description"
                        >
                            Deskripsi
                        </label>
                        <textarea
                            id="description"
                            className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            placeholder="Tambahkan deskripsi gambar (opsional)"
                            value={form.description}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description: e.target.value,
                                })
                            }
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isUploading || !form.file}
                            className={`flex items-center justify-center rounded-md px-4 py-2 font-medium text-white transition-colors ${!form.file || isUploading ? 'cursor-not-allowed bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} `}
                        >
                            {isUploading ? (
                                <>
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    <span>Uploading...</span>
                                </>
                            ) : uploadSuccess ? (
                                <>
                                    <Check className="mr-2 h-4 w-4" />
                                    <span>Uploaded!</span>
                                </>
                            ) : (
                                <>
                                    <Upload className="mr-2 h-4 w-4" />
                                    <span>Upload</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}