"use client";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Link from "next/link";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Mengambil data yang sudah disimpan otomatis oleh kode sebelumnya
    const data = localStorage.getItem("manga_history");
    if (data) {
      setHistory(JSON.parse(data));
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-black text-orange-500 uppercase italic mb-6">Terakhir Dibaca</h1>
        
        {history.length === 0 ? (
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest py-20 text-center">
            Belum ada riwayat baca.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {history.map((item: any, index: number) => (
              <Link 
                href={`/manga/read/${item.id}`} 
                key={index}
                className="flex gap-4 bg-zinc-900/50 p-3 rounded-2xl border border-zinc-800 hover:border-orange-500 transition-all"
              >
                {/* Thumbnail diambil dari data.images[0] yang kita simpan */}
                <div className="w-20 h-28 bg-zinc-800 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.thumb} alt="cover" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="font-black text-xs uppercase truncate max-w-[200px]">{item.title}</h2>
                  <p className="text-[10px] text-orange-500 font-bold mt-1">{item.chapter}</p>
                  <span className="text-[9px] text-zinc-600 font-bold uppercase mt-3">Klik untuk lanjut baca →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}