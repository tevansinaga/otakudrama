"use client";
import Link from "next/link";
import SearchBar from "./MangaSearchBar";
import { Heart, BookOpen } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 md:px-10 py-4 bg-black/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-[100] gap-4">
      
      {/* KIRI: Logo */}
      <div className="flex-shrink-0">
        <Link 
          href="/" 
          className="text-xl md:text-2xl font-black text-red-600 tracking-tighter hover:scale-105 transition-transform inline-block italic"
        >
          OTAKUDRAMA
        </Link>
      </div>

      {/* TENGAH: Search Bar (Dibuat Fleksibel) */}
      <div className="flex-grow max-w-md hidden sm:block">
        <SearchBar />
      </div>

      {/* KANAN: Navigasi & Favorit */}
      <div className="flex items-center gap-2 md:gap-5">
        
        {/* Mobile Search Icon Link (Jika di Mobile SearchBar Tengah disembunyikan) */}
        <div className="sm:hidden text-zinc-400">
           {/* Kamu bisa menambahkan ikon search di sini jika perlu untuk mobile */}
        </div>

        {/* Tombol Favorit */}
        <Link 
          href="/favorites" 
          className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors group"
          title="Koleksi Saya"
        >
          <div className="relative p-2 group-hover:bg-white/10 rounded-full transition-all">
            <Heart size={22} className="group-hover:fill-red-600 group-hover:text-red-600 transition-all" />
          </div>
          <span className="text-xs md:text-sm font-bold hidden md:block">Koleksi</span>
        </Link>

        {/* Tombol Baca Komik (BStation Style) */}
        <Link 
          href="/manga" 
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-black text-[10px] md:text-xs font-black px-4 md:px-6 py-2.5 rounded-full uppercase transition-all shadow-lg shadow-orange-500/20 whitespace-nowrap active:scale-95"
        >
          <BookOpen size={16} className="hidden md:block" />
          BACA KOMIK
        </Link>
      </div>

      {/* Mobile Only: Search Bar muncul di bawah logo jika di layar sangat kecil (Opsional) */}
    </nav>
  );
}