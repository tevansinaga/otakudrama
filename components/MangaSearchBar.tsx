"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false); //
  const router = useRouter();
  const pathname = usePathname();

  // Pastikan komponen sudah "menempel" di browser sebelum render
  useEffect(() => {
    setMounted(true);
  }, []);

  const isMangaPage = pathname.startsWith("/manga");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    const targetPath = isMangaPage ? "/manga/search" : "/search";
    router.push(`${targetPath}?q=${encodeURIComponent(query)}`);
  };

  // Mencegah Hydration Mismatch dengan merender skeleton/div kosong di server
  if (!mounted) {
    return <div className="h-9 w-full bg-zinc-900/50 rounded-full animate-pulse border border-zinc-800" />;
  }

  return (
    <form 
      onSubmit={handleSearch} 
      className="relative group flex items-center w-full"
    >
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={isMangaPage ? "Cari komik..." : "Cari anime..."} 
        className={`bg-zinc-900/50 text-[10px] md:text-xs px-4 md:px-5 py-2 rounded-full w-full border transition-all text-white placeholder:text-zinc-600 outline-none ${
          isMangaPage 
            ? "border-zinc-800 focus:border-orange-500 focus:bg-zinc-900" 
            : "border-zinc-800 focus:border-red-600 focus:bg-zinc-900"
        }`}
      />
      <button 
        type="submit" 
        className="absolute right-3 md:right-4 text-zinc-600 transition-colors hover:text-white"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="14" 
          height="14" 
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