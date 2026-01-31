"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Play, Bookmark, ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroBStation({ animeList }: { animeList: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroes = animeList?.slice(0, 5) || [];

  // Konfigurasi Navigasi
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroes.length);
  }, [heroes.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + heroes.length) % heroes.length);
  };

  // Autoplay
  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  if (heroes.length === 0) return null;

  const currentHero = heroes[currentIndex];

  // Helper untuk ID dan Gambar
  const getId = (hero: any) => {
    const rawId = hero.id || hero.slug || hero.href || "";
    return rawId.toString().replace(/\/$/, "").split("/").pop();
  };

  const animeId = getId(currentHero);
  const bannerImage = currentHero.image || currentHero.thumbnail || currentHero.poster;

  // Logika Favorit (Simpan ke localStorage)
  const handleAddToFavorite = () => {
    try {
      const currentFavs = JSON.parse(localStorage.getItem("otaku_favs") || "[]");
      const isAlreadyFav = currentFavs.some((item: any) => item.id === animeId);

      if (!isAlreadyFav) {
        const newFav = {
          id: animeId,
          title: currentHero.title,
          image: bannerImage,
          type: currentHero.type || "Anime",
          rating: currentHero.rating || "N/A",
        };
        localStorage.setItem("otaku_favs", JSON.stringify([...currentFavs, newFav]));
        alert(`✨ ${currentHero.title} berhasil ditambah ke favorit!`);
      } else {
        alert("Anime ini sudah ada di daftar favoritmu.");
      }
    } catch (error) {
      console.error("Gagal menyimpan favorit:", error);
    }
  };

  // Warna tema dinamis (bisa diganti dengan ColorThief untuk otomatisasi)
  const themeColors = ["#8b0000", "#1a3a5f", "#4a2c5a", "#1e4d2b", "#5a3e1b"];
  const currentTheme = themeColors[currentIndex % themeColors.length];

  return (
    <section className="relative h-[75vh] md:h-[85vh] w-full overflow-hidden bg-black group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Layer Latar Belakang */}
          <div className="absolute inset-0">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8 }}
              src={bannerImage}
              alt={currentHero.title}
              className="h-full w-full object-cover object-[center_20%] md:object-right"
            />
            
            {/* Gradasi Dinamis (BStation Signature) */}
            <div 
              className="absolute inset-0 transition-colors duration-1000 ease-in-out"
              style={{
                background: `linear-gradient(to right, ${currentTheme} 0%, ${currentTheme}CC 40%, transparent 100%)`
              }} 
            />
            
            {/* Gradasi Bawah (Vignette) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          </div>

          {/* Konten Teks */}
          <div className="relative h-full max-w-[1440px] mx-auto px-6 md:px-20 flex flex-col justify-center z-10">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-xl md:max-w-2xl"
            >
              {/* Badge Genre */}
              <div className="flex flex-wrap gap-2 mb-4">
                {currentHero.genres?.slice(0, 3).map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-black/40 backdrop-blur-md rounded text-[10px] md:text-xs text-white border border-white/10 uppercase tracking-widest font-bold">
                    {tag}
                  </span>
                )) || (
                  <span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded text-[10px] md:text-xs text-white border border-white/10 uppercase tracking-widest font-bold">
                    Ongoing
                  </span>
                )}
              </div>

              {/* Judul Stylized */}
              <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[0.95] drop-shadow-2xl uppercase italic">
                {currentHero.title}
              </h1>

              {/* Deskripsi */}
              <p className="text-zinc-100 text-sm md:text-lg mb-10 line-clamp-3 md:line-clamp-4 leading-relaxed max-w-lg font-medium opacity-90 drop-shadow-md">
                {currentHero.description || "Tonton episode terbaru dari serial favoritmu dengan kualitas terbaik dan subtitle Indonesia hanya di sini."}
              </p>

              {/* Tombol Aksi */}
              <div className="flex items-center gap-4">
                {animeId && (
                  <>
                    <Link
                      href={`/anime/${animeId}`}
                      className="flex items-center gap-3 px-8 py-4 bg-white text-black font-black rounded-xl hover:bg-zinc-200 transition-all transform active:scale-95 shadow-xl shadow-black/20 text-sm md:text-base uppercase"
                    >
                      <Play size={20} fill="currentColor" />
                      Putar Sekarang
                    </Link>
                    <button 
                      onClick={handleAddToFavorite}
                      className="flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-xl text-white font-black rounded-xl border border-white/20 hover:bg-white/20 transition-all text-sm md:text-base uppercase"
                    >
                      <Bookmark size={22} />
                      Favorit Saya
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigasi Panah Samping */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button onClick={prevSlide} className="p-3 text-white/70 hover:text-white bg-black/30 hover:bg-black/60 rounded-full transition-all backdrop-blur-md pointer-events-auto">
          <ChevronLeft size={36} />
        </button>
        <button onClick={nextSlide} className="p-3 text-white/70 hover:text-white bg-black/30 hover:bg-black/60 rounded-full transition-all backdrop-blur-md pointer-events-auto">
          <ChevronRight size={36} />
        </button>
      </div>

      {/* Indikator Slide (Garis Horizontal) */}
      <div className="absolute bottom-10 left-6 md:left-20 z-20 flex gap-3">
        {heroes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-700 ${
              currentIndex === index ? "w-16 bg-white shadow-[0_0_10px_white]" : "w-6 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}