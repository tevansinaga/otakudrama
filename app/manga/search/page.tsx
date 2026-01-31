"use client";

import { useState, useEffect, useCallback } from "react";
import { searchManga } from "../../../lib/manga";
import CardManga from "../../../components/CardManga";
import Navbar from "../../../components/Navbar";
import SkeletonCard from "../../../components/SkeletonCard";

export default function MangaSearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q;
  const [results, setResults] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchResults = useCallback(async (pageNum: number, isInitial: boolean = false) => {
    try {
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      const data = await searchManga(query, pageNum);

      if (data && data.length > 0) {
        setResults((prev) => {
          if (isInitial) return data;

          // Filter agar tidak ada data duplikat berdasarkan href
          const filteredNewData = data.filter(
            (newItem: any) => !prev.some((oldItem: any) => oldItem.href === newItem.href)
          );

          // Jika tidak ada data baru setelah difilter, tandanya sudah habis
          if (filteredNewData.length === 0) {
            setHasMore(false);
            return prev;
          }

          return [...prev, ...filteredNewData];
        });

        if (data.length < 10) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [query]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchResults(1, true);
  }, [query, fetchResults]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchResults(nextPage, false);
  };

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-8 w-1.5 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">
            SEARCH: <span className="text-orange-500">"{query}"</span>
          </h1>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(12)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : results.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {results.map((manga: any) => (
                <CardManga 
                  key={manga.href} 
                  title={manga.title}
                  image={manga.thumbnail}
                  chapter={manga.type || "Manga"} 
                  link={manga.href}
                />
              ))}
            </div>

            {/* --- AREA TOMBOL / PESAN AKHIR --- */}
            <div className="mt-20 flex flex-col items-center">
              {hasMore ? (
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="group relative px-10 py-4 bg-zinc-900 rounded-2xl border border-zinc-800 transition-all hover:border-orange-500 hover:text-orange-500 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${loadingMore ? 'opacity-0' : 'opacity-100'}`}>
                    Load More Results
                  </span>
                  {loadingMore && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </button>
              ) : (
                // --- PESAN SAAT KOMIK SUDAH HABIS ---
                <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
                  <div className="h-px w-20 bg-zinc-800"></div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] italic text-center">
                    Ga ada lagi bang, coba cari nama lengkapnya
                  </p>
                  <div className="h-px w-20 bg-zinc-800"></div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-32 bg-zinc-900/10 rounded-[32px] border border-dashed border-zinc-800">
            <p className="text-zinc-600 font-bold italic text-sm">Yah, manga "{query}" tidak ketemu...</p>
          </div>
        )}
      </div>
    </main>
  );
}