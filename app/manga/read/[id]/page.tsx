"use client";
import { useEffect, useState, useRef } from "react";
import { getChapterData } from "../../../../lib/manga";
import Navbar from "../../../../components/Navbar";
import { useRouter } from "next/navigation";

export default function ReadMangaPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const lastScrollY = useRef(0);
  const router = useRouter();

  // 1. Fetch Data
  useEffect(() => {
    setIsMounted(true);
    async function fetchData() {
      if (!params?.id) return;
      setLoading(true);
      try {
        const res = await getChapterData(params.id);
        if (res) setData(res);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0); // Reset scroll ke atas saat ganti chapter
      }
    }
    fetchData();

    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 200) {
        setShowControls(false);
      } else {
        setShowControls(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [params.id]);

  // 2. SIMPAN HISTORY AWAL (Hanya 1 entri per judul komik)
  useEffect(() => {
    if (isMounted && data && params.id) {
      const rawHistory = localStorage.getItem("manga_history");
      let history = rawHistory ? JSON.parse(rawHistory) : [];
      
      // FIX: Cari berdasarkan JUDUL, bukan ID Chapter agar tidak duplikat
      const existingIndex = history.findIndex((item: any) => item.title === data.manga_title);
      
      const newEntry = {
        id: params.id, // ID Chapter terbaru
        title: data.manga_title || "Unknown",
        chapter: data.chapter_title || "Chapter ?",
        thumb: data.images?.[0] || "",
        progress: 0, // Awalnya 0% untuk chapter baru
        updatedAt: Date.now(),
      };

      if (existingIndex !== -1) {
        // Jika komik sudah ada di riwayat, hapus data lamanya
        history.splice(existingIndex, 1);
      }
      
      // Masukkan data terbaru ke urutan paling atas
      history = [newEntry, ...history].slice(0, 10);
      localStorage.setItem("manga_history", JSON.stringify(history));
    }
  }, [data, params.id, isMounted]);

  // 3. FUNGSI NAVIGASI & SIMPAN PROGRESS
  const navigateWithProgress = (targetChapter?: string) => {
    if (typeof window === "undefined") return;

    // Hitung progress saat ini
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollableHeight = docHeight - winHeight;
    const scrolled = scrollableHeight <= 0 ? 0 : Math.max(0, Math.min(100, Math.floor((scrollTop / scrollableHeight) * 100)));

    // Update progress di LocalStorage berdasarkan JUDUL
    const rawHistory = localStorage.getItem("manga_history");
    if (rawHistory && data) {
      let history = JSON.parse(rawHistory);
      const index = history.findIndex((item: any) => item.title === data.manga_title);
      
      if (index !== -1) {
        history[index].progress = scrolled;
        history[index].updatedAt = Date.now();
        localStorage.setItem("manga_history", JSON.stringify(history));
      }
    }

    // Arahkan ke target
    if (targetChapter) {
      router.push(`/manga/read/${targetChapter}`);
    } else {
      router.push("/manga");
    }
  };

  if (!isMounted || loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500"></div>
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Navbar Atas */}
      <div className={`fixed top-0 left-0 right-0 z-[60] transition-transform duration-500 ${showControls ? "translate-y-0" : "-translate-y-full"}`}>
        <Navbar />
        <div className="bg-black/95 border-b border-zinc-800/50 p-3 backdrop-blur-md">
          <div className="max-w-3xl mx-auto flex justify-between items-center px-4">
            <button onClick={() => navigateWithProgress()} className="text-[10px] font-black text-orange-500 uppercase italic flex items-center gap-1">
              <span className="text-lg">←</span> BACK
            </button>
            <div className="text-center overflow-hidden px-4">
              <h1 className="text-[10px] font-black uppercase truncate italic leading-none">{data?.manga_title}</h1>
              <p className="text-[9px] text-zinc-500 font-bold mt-1 uppercase italic tracking-widest">{data?.chapter_title}</p>
            </div>
            <div className="w-10"></div>
          </div>
        </div>
      </div>

      {/* Konten Gambar */}
      <div className="max-w-3xl mx-auto flex flex-col bg-zinc-950 mt-[110px]">
        {data?.images?.map((img: string, i: number) => (
          <img key={i} src={img} alt="" className="w-full h-auto block select-none" loading={i < 3 ? "eager" : "lazy"} />
        ))}

        {/* Navigasi Bawah */}
        <div className="max-w-3xl mx-auto grid grid-cols-2 gap-4 p-10 bg-black w-full border-t border-zinc-900">
          {data.navigation?.previousChapter ? (
            <button 
              onClick={() => navigateWithProgress(data.navigation.previousChapter)} 
              className="bg-zinc-900 p-4 text-center rounded-2xl text-[10px] font-black uppercase border border-zinc-800 hover:bg-zinc-800 transition-all active:scale-95"
            >
              ← Prev
            </button>
          ) : (
            <div className="bg-zinc-950/50 p-4 text-center rounded-2xl text-[10px] font-black uppercase text-zinc-800 border border-zinc-900 cursor-not-allowed">
              First Chapter
            </div>
          )}

          {data.navigation?.nextChapter ? (
            <button 
              onClick={() => navigateWithProgress(data.navigation.nextChapter)} 
              className="bg-orange-600 p-4 text-center rounded-2xl text-[10px] font-black text-black uppercase shadow-lg shadow-orange-600/20 hover:bg-orange-500 transition-all active:scale-95"
            >
              Next →
            </button>
          ) : (
            <button 
              onClick={() => navigateWithProgress()} 
              className="bg-zinc-900 p-4 text-center rounded-2xl text-[10px] font-black uppercase border border-zinc-800"
            >
              End of Chapter
            </button>
          )}
        </div>
      </div>
    </main>
  );
}