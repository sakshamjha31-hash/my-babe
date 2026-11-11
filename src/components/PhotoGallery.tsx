import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Heart, Sparkles, X, ChevronLeft, ChevronRight, Edit3, Upload, Image as ImageIcon } from "lucide-react";

interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  date: string;
  likes: number;
}

interface PhotoGalleryProps {
  loverName: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ loverName }) => {
  const initialPhotos: GalleryPhoto[] = [
    {
      id: "photo-1",
      url: "/src/assets/images/gallery_sunset_silhouette_1794425795741.jpg",
      title: "Golden Hour Stroll",
      caption: "Holding your hand with the ocean breeze, wishing this sunset would last forever.",
      date: "A perfect evening",
      likes: 24,
    },
    {
      id: "photo-2",
      url: "/src/assets/images/gallery_coffee_date_1794425797089.jpg",
      title: "Cozy Morning Coffees",
      caption: "Heart latte art and listening to your morning thoughts. The warmest moments of my life.",
      date: "Sunday mornings",
      likes: 19,
    },
    {
      id: "photo-3",
      url: "/src/assets/images/gallery_starlight_walk_1794425797857.jpg",
      title: "Under The Fairy Lights",
      caption: "Walking under thousands of twinkling lights, but my eyes were only on you.",
      date: "Enchanted night",
      likes: 31,
    },
    {
      id: "photo-4",
      url: "/src/assets/images/gallery_blossom_field_1794425796840.jpg",
      title: "Wildflower Whispers",
      caption: "Surrounded by blooming petals, yet none as breathtaking as your gentle smile.",
      date: "Spring adventures",
      likes: 28,
    },
  ];

  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem("love_gallery_photos");
      return saved ? JSON.parse(saved) : initialPhotos;
    } catch {
      return initialPhotos;
    }
  });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [editUrl, setEditUrl] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editCaption, setEditCaption] = useState("");
  const [editDate, setEditDate] = useState("");

  const savePhotos = (updated: GalleryPhoto[]) => {
    setPhotos(updated);
    try {
      localStorage.setItem("love_gallery_photos", JSON.stringify(updated));
    } catch {
      // storage limit handle
    }
  };

  const handleLike = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const updated = [...photos];
    updated[index].likes += 1;
    savePhotos(updated);
  };

  const openEditModal = (e: React.MouseEvent, photo: GalleryPhoto) => {
    e.stopPropagation();
    setEditingPhoto(photo);
    setEditUrl(photo.url);
    setEditTitle(photo.title);
    setEditCaption(photo.caption);
    setEditDate(photo.date);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;
    const updated = photos.map((p) =>
      p.id === editingPhoto.id
        ? {
            ...p,
            url: editUrl.trim() || p.url,
            title: editTitle.trim() || p.title,
            caption: editCaption.trim() || p.caption,
            date: editDate.trim() || p.date,
          }
        : p
    );
    savePhotos(updated);
    setEditingPhoto(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setEditUrl(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const currentPhoto = lightboxIndex !== null ? photos[lightboxIndex] : null;

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 py-12 sm:py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-rose-600 mb-2">
            <Camera className="h-3.5 w-3.5" />
            <span>Section 03 · Our Little Love Gallery</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-rose-950">
            Treasured Memories, {loverName}
          </h2>
          <p className="text-xs sm:text-sm text-rose-800/70 mt-1 font-sans">
            Snapshots of our journey. Click any photo to view in fullscreen or easily replace with your own photos!
          </p>
        </div>
      </div>

      {/* Polaroid Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
        {photos.map((photo, index) => {
          // Subtle organic tilts for authentic polaroid charm
          const tilt = index % 2 === 0 ? "-rotate-1" : "rotate-1";

          return (
            <motion.div
              key={photo.id}
              whileHover={{ scale: 1.03, rotate: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              onClick={() => setLightboxIndex(index)}
              className={`group relative overflow-hidden rounded-2xl bg-white p-3.5 shadow-md hover:shadow-xl border border-rose-100/90 cursor-pointer transition-all ${tilt}`}
            >
              {/* Washi tape accent effect */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-5 bg-rose-200/60 rounded-xs transform -rotate-2 z-10 backdrop-blur-xs pointer-events-none" />

              {/* Edit button */}
              <button
                onClick={(e) => openEditModal(e, photo)}
                title="Replace photo or edit caption"
                className="absolute top-5 right-5 z-20 rounded-full bg-white/80 backdrop-blur-xs p-1.5 text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-xs cursor-pointer"
              >
                <Edit3 className="h-3.5 w-3.5" />
              </button>

              {/* Photo Frame Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-rose-50">
                <img
                  src={photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback container
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>

              {/* Polaroid Caption Area */}
              <div className="pt-3 pb-1 px-1">
                <div className="flex items-center justify-between text-xs text-rose-500 font-medium mb-1">
                  <span>{photo.date}</span>
                  <button
                    onClick={(e) => handleLike(e, index)}
                    className="flex items-center gap-1 hover:text-rose-700 transition-colors"
                  >
                    <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                    <span>{photo.likes}</span>
                  </button>
                </div>
                <h3 className="font-serif-display text-base font-bold text-rose-950 mb-1">
                  {photo.title}
                </h3>
                <p className="font-cursive text-base sm:text-lg text-rose-800 leading-snug line-clamp-2">
                  "{photo.caption}"
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {currentPhoto !== null && lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-3xl w-full rounded-3xl bg-white overflow-hidden shadow-2xl border border-rose-200"
            >
              {/* Close button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-4 right-4 z-20 rounded-full bg-white/80 p-2 text-rose-800 hover:bg-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Navigation arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : photos.length - 1));
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/80 p-2 text-rose-800 hover:bg-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev! < photos.length - 1 ? prev! + 1 : 0));
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/80 p-2 text-rose-800 hover:bg-white transition-colors cursor-pointer"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Large Image */}
              <div className="relative aspect-16/10 w-full bg-rose-950">
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.title}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Caption & Story Details */}
              <div className="p-6 sm:p-8 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 mb-1">
                    <span>{currentPhoto.date}</span>
                    <span>·</span>
                    <span>Memory #{lightboxIndex + 1} of {photos.length}</span>
                  </div>
                  <h3 className="font-serif-display text-2xl font-bold text-rose-950">
                    {currentPhoto.title}
                  </h3>
                  <p className="font-cursive text-xl text-rose-800 mt-2">
                    "{currentPhoto.caption}"
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={(e) => handleLike(e, lightboxIndex)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 text-rose-700 hover:bg-rose-100 font-medium text-sm transition-colors cursor-pointer"
                  >
                    <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                    <span>{currentPhoto.likes} Hearts</span>
                  </button>

                  <button
                    onClick={(e) => openEditModal(e, currentPhoto)}
                    className="p-2 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Change this photo"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Photo / Replace Modal */}
      <AnimatePresence>
        {editingPhoto !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-md w-full rounded-3xl bg-white p-6 shadow-2xl border border-rose-200"
            >
              <button
                onClick={() => setEditingPhoto(null)}
                className="absolute top-4 right-4 p-2 text-rose-400 hover:text-rose-600 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="font-serif-display text-xl font-bold text-rose-950 mb-1">
                Customize Photo &amp; Caption
              </h3>
              <p className="text-xs text-rose-800/70 mb-4">
                Upload your own real photo or paste an image link.
              </p>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                {/* Upload or URL */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-rose-900 mb-1.5">
                    Upload from Device
                  </label>
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-rose-300 bg-rose-50/50 hover:bg-rose-100/50 text-rose-700 text-xs font-semibold cursor-pointer transition-colors">
                    <Upload className="h-4 w-4" />
                    <span>Choose Image File (JPG/PNG)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-rose-900 mb-1">
                    Or Paste Image URL
                  </label>
                  <input
                    type="text"
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-rose-200 bg-rose-50/30 px-3.5 py-2 text-sm text-rose-950 focus:border-rose-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-rose-900 mb-1">
                    Memory Title
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full rounded-xl border border-rose-200 bg-rose-50/30 px-3.5 py-2 text-sm text-rose-950 focus:border-rose-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-rose-900 mb-1">
                    Romantic Caption
                  </label>
                  <input
                    type="text"
                    value={editCaption}
                    onChange={(e) => setEditCaption(e.target.value)}
                    className="w-full rounded-xl border border-rose-200 bg-rose-50/30 px-3.5 py-2 text-sm text-rose-950 focus:border-rose-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-rose-900 mb-1">
                    Date / Tag
                  </label>
                  <input
                    type="text"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="w-full rounded-xl border border-rose-200 bg-rose-50/30 px-3.5 py-2 text-sm text-rose-950 focus:border-rose-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 py-2.5 text-sm font-semibold text-white shadow-md hover:from-rose-700 hover:to-pink-700 transition-colors cursor-pointer"
                >
                  Save Photo
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
