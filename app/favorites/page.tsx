"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import AnimeList from "../../components/AnimeList";
import { Heart, Trash2 } from "lucide-react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("otaku_favs") || "[]");
    setFavorites(data);
    setIsLoading(false);
  }, []);

  const clearAll = () => {
    if (confirm("Hapus semua daftar favorit?")) {
      localStorage.removeItem("otaku_favs");
      setFavorites([]);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-600 rounded-2xl shadow-[0_0_20px_rgba(220,38,38,0.4)]">
              <Heart size={32} fill="white" />
            </div>
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter italic">
                Koleksi Saya
              </h1>
              <p className="text-zinc-400 text-sm">
                Daftar anime yang kamu simpan untuk ditonton nanti.
              </p>
            </div>
          </div>

          {favorites.length > 0 && (
            <button 
              onClick={clearAll}
              className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-red-950 text-zinc-400 hover:text-red-500 rounded-xl transition-all border border-white/5"
            >
              <Trash2 size={18} />
              <span className="text-sm font-bold">Hapus Semua</span>
            </button>
          )}
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
          </div>
        ) : favorites.length > 0 ? (
          <AnimeList initialData={favorites} type="fav" />
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-zinc-900/30 rounded-3xl border border-dashed border-white/10">
            <div className="mb-6 opacity-20">
              <Heart size={80} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Belum ada favorit</h3>
            <p className="text-zinc-500 max-w-xs mb-8">
              Jelajahi anime menarik dan tekan tombol "Favorit" untuk menyimpannya di sini.
            </p>
            <a 
              href="/"
              className="px-8 py-3 bg-white text-black font-black rounded-full hover:bg-zinc-200 transition-all uppercase text-sm"
            >
              Cari Anime
            </a>
          </div>
        )}
      </div>
    </main>
  );
}