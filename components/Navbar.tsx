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

  return (// Di dalam return Navbar.tsx
<nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-zinc-800">
  <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
    {/* Logo */}
    <Link href="/" className="text-2xl font-black text-red-600 tracking-tighter">
      OTAKUDRAMA
    </Link>

    {/* Search Bar - Melebar di HP, Tengah di Desktop */}
    <form onSubmit={handleSearch} className="order-3 md:order-2 w-full md:w-auto md:flex-1 md:max-w-md">
      <input
        type="text"
        placeholder="Cari drama atau anime..."
        className="w-full bg-zinc-900 text-sm px-5 py-2.5 rounded-full border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>

    
    </div>
</nav>
  );
}