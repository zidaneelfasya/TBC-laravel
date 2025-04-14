<?php

namespace App\Http\Controllers;

use App\Models\Photo;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $photo = Photo::with('user:id,name,email')->get();
        return response()->json([
            'success' => true,
            'message' => 'List of photos',
            'data' => $photo,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function indexUser()
    {
        $photos = Photo::with('user:id,name,email')
            ->where('user_id', Auth::id())
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'List of user photos',
            'data' => $photos,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi request
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240', // Maksimal 10MB
            'description' => 'nullable|string|max:500',
        ]);

        try {
            // Dapatkan file dari request
            $file = $request->file('file');

            // Generate nama file yang unik
            $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();

            // Simpan file ke storage

            $path = $file->storeAs('photos', $fileName, 'public');

            // Buat record photo di database
            $photo = Photo::create([
                'user_id' => Auth::id(),
                'path' => $path,
                'original_name' => $file->getClientOriginalName(),
                'description' => $request->description,
                'size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
            ]);

            // Return response sukses
            return response()->json([
                'success' => true,
                'message' => 'Photo uploaded successfully',
                'data' => $photo,
            ], 201);
        } catch (\Exception $e) {
            // Jika terjadi error, kembalikan response error
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload photo',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // $photo = Photo::with($id);
        $photo = Photo::with('user:id,name,email')
            ->find($id);
        if (Auth::user()->role !== 'admin' && Auth::user()->id !== $photo->user_id) {
            abort(403, 'Unauthorized action.');
            
        }
        if (!$photo) {
            return response()->json([
                'success' => false,
                'message' => 'Photo not found',
            ], 404);
        }
        return response()->json([
            'success' => true,
            'message' => 'Photo details',
            'data' => $photo,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Photo $photo)
    {
        // Check if user owns this photo
        // $this->authorize('update', $photo);

        return Inertia::render('Photos/Edit', [
            'photo' => $photo
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateDesc(Request $request, $id)
    {
        // Find the photo
        $photo = Photo::findOrFail($id);

        // Validate request
        $request->validate([
            'file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240', // Maksimal 10MB
            'description' => 'nullable|string|max:500',
        ]);

        try {
            if (($request->description !== '') || ($request->description !== null)) {
                $updateData = [
                    'description' => $request->description,
                ];
            }


            if ($request->hasFile('file')) {
                // Delete old file
                Storage::delete($photo->path);

                // Upload new file
                $file = $request->file('file');
                $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('photos', $fileName, 'public');

                $updateData = array_merge($updateData, [
                    'path' => $path,
                    'original_name' => $file->getClientOriginalName(),
                    'size' => $file->getSize(),
                    'mime_type' => $file->getMimeType(),
                ]);
            }

            // Update the photo
            $photo->update($updateData);

            // Return response
            return response()->json([
                'success' => true,
                'message' => 'Photo updated successfully',
                'data' => $photo,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update photo',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function updatePhoto(Request $request, $id)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        $photo = Photo::findOrFail($id);

        try {
            // Delete old file if exists
            if (Storage::exists($photo->path)) {
                Storage::delete($photo->path);
            }

            // Store new file
            $file = $request->file('file');
            $file = $request->file('file');
            $path = $file->store('photos', 'public');

            $photo->update([
                'path' => $path,
                'original_name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Photo updated successfully',
                'data' => $photo,
            ]);
        } catch (\Exception $e) {
            \Log::error('Photo update error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update photo',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $photo = Photo::findOrFail($id);
            Storage::delete($photo->path);
            $photo->delete();

            return response()->json([
                'success' => true,
                'message' => 'Photo deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete photo: ' . $e->getMessage()
            ], 500);
        }
    }
}
