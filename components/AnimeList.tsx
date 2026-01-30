"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getOngoingAnime, getAnimeByGenre } from "../lib/otakudesu";
import Card from "./Card";

interface Props {
  initialData: any[];
  type: "ongoing" | "genre";
  genreId?: string;
}

export default function AnimeList({ initialData, type, genreId }: Props) {
  const [anime, setAnime] = useState(initialData || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const { ref, inView } = useInView({ 
    rootMargin: '200px',
    threshold: 0 
  });

  // Reset state saat user berpindah genre atau halaman
  useEffect(() => {
    setAnime(initialData || []);
    setPage(1);
    setHasMore(true);
    setLoading(false);
  }, [initialData, type, genreId]);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    const nextPage = page + 1;
    
    const res = type === "ongoing" 
      ? await getOngoingAnime(nextPage) 
      : await getAnimeByGenre(genreId!, nextPage);

    // Ambil array data dari response API Sanka
    const newList = res?.animeList || res?.anime || (Array.isArray(res) ? res : []);

    if (newList.length === 0) {
      setHasMore(false);
    } else {
      setAnime((prev) => [...prev, ...newList]);
      setPage(nextPage);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (inView && !loading && hasMore) {
      loadMore();
    }
  }, [inView, loading, hasMore]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {anime.length > 0 ? (
          anime.map((item: any, index: number) => (
            <Card 
              key={`${item.animeId || item.id || index}-${index}`}
              id={item.animeId || item.id} 
              title={item.title} 
              image={item.poster || item.image}
              /** * Perbaikan Utama: Menggunakan properti 'episodes' sesuai data API di image_b8b9b6.png
               * Fallback ditambahkan jika properti berbeda di endpoint genre
               */
              episode={item.episodes || item.currentEpisode || item.episode} 
            />
          ))
        ) : !loading && (
          <div className="col-span-full py-20 text-center">
              <p className="text-zinc-500 italic">Tidak ada anime yang ditemukan.</p>
          </div>
        )}
      </div>

      {/* Sensor Infinite Scroll */}
      <div ref={ref} className="h-20 flex items-center justify-center mt-10">
        {loading && (
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          </div>
        )}
        {!hasMore && anime.length > 0 && (
          <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest">
            Semua konten telah dimuat
          </p>
        )}
      </div>
    </>
  );
}