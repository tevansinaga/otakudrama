"use client";
import { useEffect, useState, useRef } from "react";
import { getChapterData } from "../../../../lib/manga";
import Navbar from "../../../../components/Navbar";
import Link from "next/link";

export default function ReadMangaPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false); // State baru untuk cek status FS
  const containerRef = useRef<HTMLDivElement>(null);
  let lastScrollY = 0;

  useEffect(() => {
    async function fetchData() {
      const res = await getChapterData(params.id);
      setData(res);
      setLoading(false);
    }
    fetchData();

    // Sinkronisasi state lokal dengan status Fullscreen browser
    const handleFsChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShowControls(false);
      } else {
        setShowControls(true);
      }
      lastScrollY = window.scrollY;
    };

    document.addEventListener("fullscreenchange", handleFsChange);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [params.id]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500"></div>
    </div>
  );

  if (!data || !data.images || data.images.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex items-center justify-center py-40">
           <p className="font-black text-zinc-500 uppercase tracking-widest text-xs">Data Chapter Kosong</p>
        </div>
      </main>
    );
  }

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white overflow-x-hidden">
      
      {/* UI ATAS: Hanya dirender JIKA TIDAK sedang Full Screen
          Ini akan menghilangkan Navbar dan Header Info total saat tombol ditekan.
      */}
      {!isFullScreen && (
        <>
          <div className={`fixed top-0 left-0 right-0 z-[60] transition-transform duration-500 ${showControls ? "translate-y-0" : "-translate-y-full"}`}>
            <Navbar />
          </div>

          <div className={`fixed top-[60px] md:top-[70px] left-0 right-0 z-50 bg-black/95 border-b border-zinc-800/50 p-3 backdrop-blur-md transition-transform duration-500 ${showControls ? "translate-y-0" : "-translate-y-full"}`}>
            <div className="max-w-3xl mx-auto flex justify-between items-center px-4">
              <Link href={`/manga`} className="text-[10px] font-black text-orange-500 uppercase">← Back</Link>
              <div className="text-center overflow-hidden px-4">
                <h1 className="text-[10px] md:text-[11px] font-black uppercase truncate italic tracking-tighter">{data.manga_title}</h1>
                <p className="text-[9px] text-zinc-500 font-bold truncate">Chapter {data.chapter_title?.replace(/Chapter/gi, "")}</p>
              </div>
              <button onClick={toggleFullScreen} className="text-orange-500 hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}

      {/* READER: 
          Jika FS: margin-top 0 agar gambar mentok ke atas
          Jika Biasa: beri margin agar tidak tertutup Navbar
      */}
      <div className={`max-w-3xl mx-auto flex flex-col bg-zinc-950 transition-all ${isFullScreen ? "mt-0" : "mt-[110px] md:mt-[130px]"}`}>
        {data.images.map((imgUrl: string, index: number) => (
          <img 
            key={index}
            src={imgUrl}
            alt={`Page ${index + 1}`}
            className="w-full h-auto block select-none"
            loading={index < 2 ? "eager" : "lazy"}
            // Klik gambar juga bisa toggle Fullscreen (Shortcut)
            onClick={toggleFullScreen}
          />
        ))}
      </div>

      {/* Navigasi Bawah */}
      <div className="max-w-3xl mx-auto grid grid-cols-2 gap-4 p-10 bg-black">
        {data.navigation?.previousChapter ? (
          <Link 
            href={`/manga/read/${data.navigation.previousChapter}`} 
            className="bg-zinc-900 p-4 text-center rounded-2xl text-[10px] font-black uppercase border border-zinc-800"
          >
            ← Prev
          </Link>
        ) : <div />}

        {data.navigation?.nextChapter ? (
          <Link 
            href={`/manga/read/${data.navigation.nextChapter}`} 
            className="bg-orange-600 p-4 text-center rounded-2xl text-[10px] font-black text-black uppercase shadow-lg shadow-orange-600/20"
          >
            Next →
          </Link>
        ) : <div />}
      </div>
    </main>
  );
}