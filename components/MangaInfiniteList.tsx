"use client";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getLatestManga } from "../lib/manga";
import CardManga from "./CardManga";

export default function MangaInfiniteList({ initialData = [] }: { initialData: any[] }) {
  const [manga, setManga] = useState(initialData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  // Perbaikan: Tambahkan rootMargin agar sensor lebih sensitif
  const { ref, inView } = useInView({
    rootMargin: "400px", 
  });

  useEffect(() => {
    // Pemicu load data selanjutnya
    if (inView && hasMore && !loading && manga.length > 0) {
      loadMoreManga();
    }
  }, [inView, hasMore, loading, manga.length]);

  const loadMoreManga = async () => {
    setLoading(true);
    const nextPage = page + 1;
    
    try {
      const newData = await getLatestManga(nextPage);

      if (newData && newData.length > 0) {
        // Gabungkan data lama dengan data baru dari page selanjutnya
        setManga((prev) => [...prev, ...newData]);
        setPage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {manga.map((item: any, index: number) => (
          <CardManga 
            key={`${index}-${item.title}`}
            title={item.title}
            image={item.image} // Sesuai API homepage
            chapter={item.chapter}
            link={item.link}
          />
        ))}
      </div>

      {/* Area Sensor Scroll */}
      <div ref={ref} className="mt-20 flex flex-col items-center justify-center min-h-[150px] pb-20">
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-bounce"></div>
              <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.5s]"></div>
            </div>
            <p className="text-[10px] font-black text-orange-500 uppercase tracking-tighter">Memuat Komik Lainnya...</p>
          </div>
        ) : (
          !hasMore && (
            <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
              SUDAH SAMPAI UJUNG DUNIA...
            </p>
          )
        )}
      </div>
    </>
  );
}