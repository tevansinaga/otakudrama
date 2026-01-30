"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  // Deteksi apakah user sedang di halaman manga
  const isMangaPage = pathname.startsWith("/manga");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    if (isMangaPage) {
      // Jika di halaman manga, cari komik
      router.push(`/manga/search?q=${encodeURIComponent(query)}`);
    } else {
      // Jika di halaman utama/anime, arahkan ke pencarian anime
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative group flex items-center">
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={isMangaPage ? "Cari judul komik..." : "Cari drama atau anime..."} 
        className={`bg-zinc-900/50 text-[10px] px-5 py-2 rounded-full w-48 md:w-72 border transition-all text-white placeholder:text-zinc-600 ${
          isMangaPage ? "border-zinc-800 focus:border-orange-500" : "border-zinc-800 focus:border-red-600"
        }`}
      />
      <button type="submit" className="absolute right-4 text-zinc-600 transition-colors">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={isMangaPage ? "group-focus-within:text-orange-500" : "group-focus-within:text-red-600"}
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  );
}