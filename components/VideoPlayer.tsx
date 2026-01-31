"use client";
import { useState } from "react";
import { getStreamUrl } from "../lib/otakudesu";

export default function VideoPlayer({ ep }: { ep: any }) {
  const [currentVideo, setCurrentVideo] = useState(ep.defaultStreamingUrl);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(0);

  const handleServerChange = async (serverId: string) => {
    if (loading) return;
    setLoading(true);
    
    try {
      const data = await getStreamUrl(serverId);
      if (data && data.url) {
        setCurrentVideo(data.url);
        setKey(prev => prev + 1);
      }
    } catch (err) {
      console.error("Ganti server gagal:", err);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  return (
    <div className="space-y-8">
      {/* Player Area - Memastikan aspek rasio tetap 16:9 */}
      <div className="relative w-full aspect-video bg-black rounded-[2rem] overflow-hidden border border-zinc-800 shadow-2xl">
        {loading && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-10">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-white text-[10px] font-black uppercase tracking-widest">Memuat Server...</p>
          </div>
        )}
        
        {/* Update: Menambahkan class absolute dan inset-0 agar iframe mengisi penuh kontainer */}
        <iframe 
          key={key}
          src={currentVideo} 
          className="absolute inset-0 w-full h-full border-0 object-cover" 
          allowFullScreen 
          allow="autoplay; fullscreen"
        />
      </div>

      {/* Server Selection */}
      <div className="grid gap-4">
        {ep.server?.qualities?.map((quality: any, qIdx: number) => (
          <div key={qIdx} className="bg-zinc-900/50 p-5 rounded-2xl border border-zinc-800">
            <p className="text-zinc-500 text-[10px] font-black mb-4 uppercase tracking-tighter italic">
              Kualitas {quality.title}
            </p>
            <div className="flex flex-wrap gap-2">
              {quality.serverList?.map((srv: any, sIdx: number) => {
                // Logika deteksi server aktif yang lebih akurat
                const isActive = currentVideo === srv.serverId || currentVideo.includes(srv.serverId);
                
                return (
                  <button
                    key={sIdx}
                    onClick={() => handleServerChange(srv.serverId)}
                    disabled={loading}
                    className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all active:scale-95 ${
                      isActive
                        ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                    }`}
                  >
                    {srv.title}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}