"use client"; // Wajib agar input bisa bekerja

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${query}`); // Pindah ke halaman hasil pencarian
    }
  };

  return (
    <nav className="flex items-center justify-between px-10 py-5 bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <Link href="/">
        <h1 className="text-3xl font-extrabold text-red-600 cursor-pointer tracking-tighter hover:scale-105 transition">
          OtakuDrama
        </h1>
      </Link>

      {/* SEARCH BAR BARU */}
      <form onSubmit={handleSearch} className="flex-1 max-w-md mx-10">
        <input
          type="text"
          placeholder="Cari drama atau anime..."
          className="w-full bg-zinc-800 text-white px-4 py-2 rounded-full border border-zinc-700 focus:outline-none focus:border-red-600 transition"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <div className="flex gap-8 text-white font-medium text-sm">
        <Link href="/category/k-drama" className="hover:text-red-500 transition">K-Drama</Link>
        <Link href="/category/anime" className="hover:text-red-500 transition">Anime</Link>
      </div>
    </nav>
  );
}