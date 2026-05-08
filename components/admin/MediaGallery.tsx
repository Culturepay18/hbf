"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { X, Upload, Trash2, Check, Image as ImageIcon, Loader2, AlertCircle } from "lucide-react";
import imageCompression from "browser-image-compression";

interface MediaGalleryProps {
  onSelect: (url: string) => void;
  onClose: () => void;
}

export function MediaGallery({ onSelect, onClose }: MediaGalleryProps) {
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const bucketName = "media";

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    setIsLoading(true);
    setError(null);
    try {
      // List all files in the bucket
      const { data, error: listError } = await supabase.storage.from(bucketName).list("", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "desc" },
      });

      if (listError) {
        if (listError.message.includes("bucket not found")) {
          setError(`The folder "${bucketName}" does not exist in Supabase. Please create it in the Supabase Dashboard (Storage > New Bucket).`);
        } else {
          setError(listError.message);
        }
        setImages([]);
      } else if (data) {
        const imageUrls = await Promise.all(
          data.map(async (file) => {
            const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(file.name);
            return { name: file.name, url: publicUrl };
          })
        );
        setImages(imageUrls.filter(img => img.name !== ".emptyFolderPlaceholder"));
      }
    } catch (err) {
      console.error("Failed to fetch images", err);
      setError("An error occurred while loading images.");
    }
    setIsLoading(false);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      // 1. Image compression
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      // 2. Upload to Supabase
      const fileName = `${Date.now()}-${compressedFile.name.replace(/\s+/g, "-")}`;
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, compressedFile);

      if (uploadError) {
        if (uploadError.message.includes("bucket not found")) {
          setError(`Error: The folder "${bucketName}" does not exist. Create it in Supabase Storage.`);
        } else {
          setError("Upload failed: " + uploadError.message);
        }
      } else {
        await fetchImages();
      }
    } catch (err) {
      console.error("Upload error", err);
      setError("Error during compression or upload.");
    }
    setIsUploading(false);
  }

  async function handleDelete(fileName: string) {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const { error: deleteError } = await supabase.storage.from(bucketName).remove([fileName]);
      if (deleteError) {
        alert("Delete failed: " + deleteError.message);
      } else {
        setImages(images.filter((img) => img.name !== fileName));
        if (selectedImage?.includes(fileName)) setSelectedImage(null);
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      {/* Gallery Panel */}
      <div className="relative z-10 w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-10 py-8 border-b border-black/5 flex items-center justify-between bg-white sticky top-0 z-20">
          <div>
            <h2 className="text-3xl font-bold text-hbf-dark">Media Gallery</h2>
            <p className="text-sm text-hbf-muted font-medium">Select or upload optimized images.</p>
          </div>
          <div className="flex items-center gap-4">
            <label className={`flex items-center gap-2 bg-hbf-dark text-white px-6 py-3 rounded-full font-bold text-sm cursor-pointer hover:bg-black transition-all ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}>
              {isUploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
              {isUploading ? "Optimizing & Uploading..." : "Add Image"}
              <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={isUploading} />
            </label>
            <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors text-hbf-muted">
              <X size={32} />
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-10 mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600">
            <AlertCircle className="shrink-0 mt-0.5" size={20} />
            <div className="text-sm font-medium">{error}</div>
          </div>
        )}

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-10">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 text-hbf-muted">
              <Loader2 className="animate-spin mb-4" size={48} />
              <p className="font-bold">Loading gallery...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-black/10 rounded-[3rem]">
              <div className="w-24 h-24 bg-hbf-cream rounded-full flex items-center justify-center mb-6 text-hbf-muted">
                <ImageIcon size={48} />
              </div>
              <h3 className="text-2xl font-bold text-hbf-dark mb-2">Gallery is empty</h3>
              <p className="text-hbf-muted max-w-xs font-medium">Add your first images to use them in your content.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {images.map((img) => (
                <div
                  key={img.name}
                  className={`group relative aspect-square rounded-[2rem] overflow-hidden border-4 transition-all cursor-pointer ${
                    selectedImage === img.url ? "border-hbf-green ring-8 ring-hbf-green/10" : "border-transparent hover:border-black/5"
                  }`}
                  onClick={() => setSelectedImage(img.url)}
                >
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity ${selectedImage === img.url ? "opacity-100" : ""}`}>
                    {selectedImage === img.url && (
                      <div className="bg-hbf-green text-white p-2 rounded-full shadow-xl transform scale-110">
                        <Check size={24} strokeWidth={3} />
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(img.name);
                      }}
                      className="bg-red-500 text-white p-2 rounded-full shadow-xl hover:bg-red-600 transition-colors transform hover:scale-110"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-10 py-8 border-t border-black/5 bg-[#f8f6f0]/30 flex justify-end gap-6 sticky bottom-0 z-20">
          <button onClick={onClose} className="px-8 py-3 font-bold text-hbf-muted hover:text-hbf-dark transition-colors">
            Cancel
          </button>
          <button
            disabled={!selectedImage}
            onClick={() => selectedImage && onSelect(selectedImage)}
            className="bg-hbf-green text-white px-12 py-3 rounded-full font-bold shadow-xl hover:bg-hbf-green-light disabled:opacity-50 disabled:grayscale transition-all transform hover:scale-105 active:scale-95"
          >
            Use this image
          </button>
        </div>
      </div>
    </div>
  );
}
