"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getOngoingAnime } from "../lib/otakudesu";
import Card from "./Card";

export default function OngoingList({ initialData }: { initialData: any[] }) {
  // Pastikan state langsung diisi initialData agar tidak kosong di awal
  const [anime, setAnime] = useState(initialData || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialData?.length > 0);
  
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '200px', // Mulai load sebelum user benar-benar mentok bawah
  });

  const loadMoreAnime = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    const nextPage = page + 1;
    const newData = await getOngoingAnime(nextPage);
    
    // Sesuaikan dengan struktur API: data.animeList atau data
    const newList = newData?.animeList || (Array.isArray(newData) ? newData : []);

    if (newList.length === 0) {
      setHasMore(false);
    } else {
      setAnime((prev) => [...prev, ...newList]);
      setPage(nextPage);
    }
    setLoading(false);
  };

  // Triger loadMore hanya jika inView dan bukan load pertama kali
  useEffect(() => {
    if (inView && anime.length > 0) {
      loadMoreAnime();
    }
  }, [inView]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {anime.length > 0 ? (
          anime.map((item: any, index: number) => (
            <Card 
              key={`${item.animeId}-${index}`} 
              id={item.animeId} 
              title={item.title} 
              image={item.poster} 
            />
          ))
        ) : null}
      </div>

      <div ref={ref} className="mt-12 flex flex-col items-center justify-center min-h-[100px]">
        {loading && (
          <div className="flex gap-2 mb-4">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          </div>
        )}
        
        {!hasMore && anime.length > 0 && (
          <p className="text-zinc-600 text-xs font-bold uppercase tracking-[0.2em]">
            Sudah mencapai akhir daftar
          </p>
        )}

        {/* Jika benar-benar tidak ada data dari awal */}
        {!loading && anime.length === 0 && (
          <p className="text-zinc-500 italic">Gagal memuat data anime.</p>
        )}
      </div>
    </>
  );
}