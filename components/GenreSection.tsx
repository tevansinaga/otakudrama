"use client"; // Wajib untuk interaksi tombol

import { useState } from "react";
import Link from "next/link";

export default function GenreSection({ genres }: { genres: any[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-10">
      {/* Tombol Pemicu Utama */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg shadow-red-900/20"
      >
        <span>Explore Genres</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Daftar Genre yang muncul saat isOpen true */}
      {isOpen && (
        <div className="mt-6 p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {genres.map((genre: any) => (
              <Link 
                key={genre.genreId}
                href={`/genres/${genre.genreId}`}
                className="px-4 py-2 bg-zinc-800 hover:bg-red-600 border border-zinc-700 rounded-lg text-[10px] font-bold uppercase transition-all text-center whitespace-nowrap"
              >
                {genre.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}