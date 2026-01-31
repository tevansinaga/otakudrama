import { getAnimeDetail } from "../../../lib/otakudesu";
import Navbar from "../../../components/Navbar";
import Link from "next/link";
import FavoriteButton from "../../../components/FavoriteButton"; // Import komponen baru
import { Play } from "lucide-react";

export default async function Page({ params }: { params: { id: string } }) {
  const result = await getAnimeDetail(params.id);
  const anime = result?.data;

  if (!anime) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-bold">
        Anime tidak ditemukan.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pb-20 overflow-x-hidden">
      <Navbar />
      
      {/* Background Hero Blur (Khas BStation) */}
      <div className="absolute top-0 left-0 w-full h-[50vh] opacity-20 blur-3xl pointer-events-none">
        <img src={anime.poster} className="w-full h-full object-cover" alt="" />
      </div>

      <div className="relative max-w-6xl mx-auto p-6 md:p-10 mt-6 md:mt-16">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          
          {/* SISI KIRI: Poster & Stats */}
          <div className="w-full md:w-80 shrink-0 sticky top-24">
            <img 
              src={anime.poster} 
              className="w-full rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10" 
              alt={anime.title} 
            />
            
            <div className="mt-6 space-y-4 bg-zinc-900/80 backdrop-blur-md p-5 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-zinc-500 text-xs uppercase font-bold tracking-widest">Skor</span>
                <span className="text-orange-500 text-xl font-black italic">{anime.score || '8.0'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Status</span>
                <span className="font-semibold text-green-500">{anime.status}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Total Episode</span>
                <span className="font-semibold text-white">{anime.episodes}</span>
              </div>
            </div>
          </div>

          {/* SISI KANAN: Konten Utama */}
          <div className="flex-1 z-10">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] uppercase tracking-tighter italic drop-shadow-lg">
              {anime.title}
            </h1>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4 mb-10">
              {anime.episodeList?.length > 0 && (
                <Link
                  href={`/episode/${anime.episodeList[0].id || anime.episodeList[0].href.split('/').pop()}`}
                  className="flex items-center gap-2 px-8 py-3 bg-white text-black font-black rounded-xl hover:bg-zinc-200 transition-all uppercase text-sm"
                >
                  <Play size={20} fill="black" />
                  Tonton Sekarang
                </Link>
              )}
              {/* TOMBOL FAVORIT DISINI */}
              <FavoriteButton anime={{...anime, id: params.id}} />
            </div>
            
            {/* SINOPSIS */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-5 w-1 bg-red-600 rounded-full"></div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Sinopsis</h3>
              </div>
              <div className="text-zinc-300 leading-relaxed text-base bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                {anime.synopsis?.paragraphs ? (
                  anime.synopsis.paragraphs.map((p: string, i: number) => (
                    <p key={i} className="mb-4 last:mb-0 opacity-90">{p}</p>
                  ))
                ) : (
                  <p className="opacity-90">{typeof anime.synopsis === 'string' ? anime.synopsis : "Sinopsis belum tersedia."}</p>
                )}
              </div>
            </div>

            {/* DAFTAR EPISODE */}
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-5 w-1 bg-red-600 rounded-full"></div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Episode Terbaru</h3>
              </div>
              <div className="grid grid-cols-1 gap-3 max-h-[500px] overflow-y-auto pr-3 custom-scrollbar">
                {anime.episodeList?.map((ep: any, index: number) => {
                  const episodeSlug = ep.id || ep.href.split('/').pop();
                  return (
                    <Link 
                      key={index}
                      href={`/episode/${episodeSlug}`}
                      className="flex items-center justify-between p-5 bg-zinc-900/50 hover:bg-red-600/10 border border-white/5 rounded-2xl transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-black flex items-center justify-center rounded-lg text-xs font-bold text-zinc-500 group-hover:text-red-500 transition-colors">
                          {index + 1}
                        </div>
                        <span className="text-sm font-bold group-hover:translate-x-1 transition-transform">
                          {ep.title}
                        </span>
                      </div>
                      <Play size={16} className="text-zinc-600 group-hover:text-red-500" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}