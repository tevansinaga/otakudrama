"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HistorySection() {
  const [history, setHistory] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const data = localStorage.getItem("manga_history");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        // Urutkan agar yang terakhir dibaca selalu di kiri
        setHistory(parsed.sort((a: any, b: any) => (b.updatedAt || 0) - (a.updatedAt || 0)));
      } catch (e) { console.error(e); }
    }
  }, []);

  // MENCEGAH ERROR HYDRATION: Jangan render apapun jika belum di browser
  if (!isMounted || history.length === 0) {
    return null; 
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-6 w-1.5 bg-orange-500 rounded-full shadow-[0_0_10px_orange]"></div>
          <h2 className="text-xl font-black uppercase italic tracking-tighter">LANJUTKAN MEMBACA</h2>
        </div>
        <button onClick={() => { localStorage.removeItem("manga_history"); setHistory([]); }} 
                className="text-[9px] font-black text-zinc-600 uppercase hover:text-orange-500 transition-colors">
          Hapus History
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {history.map((item) => (
          <Link key={item.id} href={`/manga/read/${item.id}`} className="group relative flex flex-col gap-2">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-800">
              <img src={item.thumb} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
              
              {/* Progress Bar Visual */}
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-zinc-900/90">
                <div 
                  className="h-full bg-orange-500 shadow-[0_0_8px_orange] transition-all duration-300" 
                  style={{ width: `${item.progress || 0}%` }}
                ></div>
              </div>
            </div>
            <h3 className="text-[10px] font-black uppercase truncate italic group-hover:text-orange-500">{item.title}</h3>
            <div className="flex justify-between items-center text-[8px] font-bold text-zinc-500">
               <span>{item.chapter}</span>
               <span className="text-orange-500">{item.progress || 0}%</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}