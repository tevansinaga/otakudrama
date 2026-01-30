"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import CardManga from "./CardManga";

interface MangaBrowseProps {
  initialComics: any[];
}

export default function MangaBrowseClient({ initialComics }: MangaBrowseProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition(); // Memantau proses loading data baru

  const currentType = searchParams.get("type") || "all";
  const currentOrder = searchParams.get("order") || "latest";

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    params.set("page", "1"); // Reset ke halaman 1 setiap ganti filter

    // Gunakan startTransition agar aplikasi tetap responsif saat fetch ulang
    startTransition(() => {
      router.push(`/manga/browse?${params.toString()}`);
    });
  };

  return (
    <div className="space-y-10">
      {/* FILTER UI */}
      <div className={`flex flex-col md:flex-row gap-6 p-6 bg-zinc-900/30 border border-zinc-800 rounded-[32px] transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`}>
        
        {/* Kategori Filter */}
        <div className="space-y-3">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Kategori</p>
          <div className="flex flex-wrap gap-2">
            {["all", "manga", "manhwa", "manhua"].map((t) => (
              <button
                key={t}
                disabled={isPending}
                onClick={() => handleFilter("type", t)}
                className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase transition-all ${
                  currentType === t 
                    ? "bg-orange-500 text-black shadow-lg shadow-orange-500/20" 
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                } disabled:cursor-not-allowed`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px md:h-12 md:w-px bg-zinc-800 mx-2 hidden md:block" />

        {/* Urutan Filter */}
        <div className="space-y-3">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Urutan</p>
          <div className="flex flex-wrap gap-2">
            {["latest", "popular", "trending"].map((o) => (
              <button
                key={o}
                disabled={isPending}
                onClick={() => handleFilter("order", o)}
                className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase transition-all ${
                  currentOrder === o 
                    ? "bg-white text-black" 
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                } disabled:cursor-not-allowed`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GRID COMICS */}
      <div className="relative min-h-[400px]">
        {/* Loading Overlay Sederhana */}
        {isPending && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 backdrop-blur-[2px] rounded-3xl">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div 
          key={`${currentType}-${currentOrder}`} 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {initialComics.length > 0 ? (
            initialComics.map((item: any, i: number) => (
              <CardManga 
                key={`${i}-${item.title}`}
                title={item.title}
                image={item.image} // Properti dari API image_ac767b
                chapter={item.chapter}
                link={item.link}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20 border border-dashed border-zinc-800 rounded-[40px]">
              <p className="text-zinc-600 font-bold italic">Komik tidak ditemukan untuk kategori ini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}