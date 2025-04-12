<?php

namespace App\Http\Controllers;

use App\Models\Photo;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class PhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $photo = Photo::all();
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
        $photos = Photo::where('user_id', Auth::id())->get();
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
        $photo = Photo::find($id);
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
