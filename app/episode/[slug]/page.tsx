// app/episode/[slug]/page.tsx
import { getEpisodeDetails } from "../../../lib/otakudesu";
import Navbar from "../../../components/Navbar";
import VideoPlayer from "../../../components/VideoPlayer";
import Link from "next/link";

export default async function EpisodePage({ params }: { params: { slug: string } }) {
  const data = await getEpisodeDetails(params.slug);

  if (!data) return <div className="text-white text-center py-20">Episode tidak ditemukan.</div>;

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 mt-10">
        <h1 className="text-lg md:text-xl font-black text-center mb-8 uppercase leading-relaxed">
          {data.title}
        </h1>

        {/* Player & Server Selector */}
        <VideoPlayer ep={data} />

        {/* NAVIGASI EPISODE */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-zinc-800">
          
          {/* Tombol Episode Sebelumnya */}
          {data.hasPrevEpisode ? (
            <Link 
              href={`/episode/${data.prevEpisode.episodeId}`}
              className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-2xl border border-zinc-800 text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              ← Prev Episode
            </Link>
          ) : (
            <div className="hidden sm:block opacity-0">Placeholder</div>
          )}

          {/* Tombol Daftar Episode (Kembali ke Anime) */}
          <Link 
            href={`/anime/${data.animeId}`}
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-red-600 text-zinc-400 hover:text-white rounded-2xl border border-zinc-800 hover:border-red-500 text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center"
          >
            All Episodes
          </Link>

          {/* Tombol Episode Selanjutnya */}
          {data.hasNextEpisode ? (
            <Link 
              href={`/episode/${data.nextEpisode.episodeId}`}
              className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl shadow-lg shadow-red-600/20 text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              Next Episode →
            </Link>
          ) : (
            <div className="hidden sm:block opacity-0">Placeholder</div>
          )}
          
        </div>
      </div>
    </main>
  );
}