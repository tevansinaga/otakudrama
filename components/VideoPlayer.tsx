"use client";
import { useState } from "react";

export default function VideoPlayer({ ep }: { ep: any }) {
  // Gunakan defaultStreamingUrl sebagai video awal
  const [currentVideo, setCurrentVideo] = useState(ep.defaultStreamingUrl);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(0); // Penambah key untuk memaksa iframe refresh

  const handleServerChange = async (serverId: string) => {
    if (loading) return;
    setLoading(true);
    
    try {
      const res = await fetch(`/api/video?serverId=${serverId}`);
      const json = await res.json();
      
      if (json.ok && json.data?.url) {
        // Cek apakah URL baru berbeda dengan yang lama
        if (json.data.url !== currentVideo) {
          setCurrentVideo(json.data.url);
          setKey(prev => prev + 1); // Memaksa React merender ulang elemen iframe
        }
      }
    } catch (err) {
      console.error("Gagal ganti server:", err);
    } finally {
      // Berikan sedikit delay agar transisi tidak terasa "glitchy"
      setTimeout(() => setLoading(false), 500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
        {loading && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-white text-xs font-bold">Mengganti Server...</p>
          </div>
        )}
        
        {/* Gunakan 'key' agar browser dipaksa memuat ulang iframe */}
        <iframe 
          key={key}
          src={currentVideo} 
          className="absolute inset-0 w-full h-full" 
          allowFullScreen 
          allow="autoplay; fullscreen"
        />
      </div>

      <div className="grid gap-4">
        {ep.server?.qualities?.map((quality: any, qIdx: number) => (
          <div key={qIdx} className="bg-zinc-900/50 p-5 rounded-2xl border border-zinc-800">
            <p className="text-zinc-500 text-[10px] font-black mb-4 uppercase tracking-tighter">
              Kualitas {quality.title}
            </p>
            <div className="flex flex-wrap gap-2">
              {quality.serverList?.map((srv: any, sIdx: number) => (
                <button
                  key={sIdx}
                  onClick={() => handleServerChange(srv.serverId)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all border ${
                    currentVideo.includes(srv.serverId) || loading
                      ? "bg-red-600 border-red-500 text-white"
                      : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700"
                  }`}
                >
                  {srv.title}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}