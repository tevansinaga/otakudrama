"use client";
import { useState } from "react";
import CardManga from "./CardManga";
import { getMangaByGenre } from "../lib/manga";

// Komponen Skeleton Internal untuk tampilan loading yang rapi
function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="relative aspect-square rounded-[2rem] bg-zinc-900 border border-zinc-800" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full bg-zinc-900 rounded-full" />
        <div className="h-3 w-2/3 bg-zinc-900 rounded-full" />
      </div>
    </div>
  );
}

export default function GenreList({ 
  initialData, 
  genre 
}: { 
  initialData: any[], 
  genre: string 
}) {
  const [mangaList, setMangaList] = useState(initialData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const loadMore = async () => {
    if (loading || isEnd) return;
    
    setLoading(true);
    const nextPage = page + 1;
    
    try {
      const newData = await getMangaByGenre(genre, nextPage);
      
      if (newData && newData.length > 0) {
        setMangaList((prevList) => {
          // Gabungkan data lama dan baru
          const combined = [...prevList, ...newData];
          
          // FILTER DUPLIKAT: Memastikan tidak ada judul komik yang sama muncul dua kali
          return combined.filter((item, index, self) =>
            index === self.findIndex((t) => t.title === item.title)
          );
        });
        setPage(nextPage);
      } else {
        // Jika API mengembalikan array kosong, tandai data sudah habis
        setIsEnd(true); 
      }
    } catch (error) {
      console.error("Gagal memuat data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Grid Utama Komik */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {mangaList.map((item, i) => (
          // Menggunakan kombinasi judul dan index untuk key yang aman
          <CardManga key={`${item.title}-${i}`} {...item} />
        ))}

        {/* Tampilkan 6 Skeleton Card saat sedang memuat data baru */}
        {loading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
      </div>

      {/* Kontrol Navigasi Bawah */}
      <div className="flex justify-center pt-10">
        {!isEnd ? (
          <button
            onClick={loadMore}
            disabled={loading}
            className="group flex items-center gap-3 px-10 py-4 bg-zinc-900 hover:bg-orange-500 hover:text-black border border-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="h-3 w-3 border-2 border-orange-500 border-t-transparent rounded-full animate-spin group-hover:border-black group-hover:border-t-transparent" />
                MEMUAT...
              </>
            ) : (
              "TAMPILKAN LEBIH BANYAK"
            )}
          </button>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest bg-zinc-900/50 px-8 py-4 rounded-full border border-zinc-800 shadow-inner">
               SEMUA KOMIK SUDAH DIMUAT
            </p>
          </div>
        )}
      </div>
    </div>
  );
}