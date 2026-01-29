import { getMovieDetail, getSeasonDetail } from "../../../lib/tmdb";
import Navbar from "../../../components/Navbar";
import Link from "next/link";

export default async function WatchPage({ 
  params, 
  searchParams 
}: { 
  params: { id: string }, 
  searchParams: { ep?: string, s?: string } 
}) {
  const { id } = params;
  const currentEpisode = searchParams.ep || "1";
  const currentSeason = searchParams.s || "1";

  // Ambil data detail drama dan data season secara paralel
  const [movie, seasonData] = await Promise.all([
    getMovieDetail(id),
    getSeasonDetail(id, parseInt(currentSeason))
  ]);

  // Jika data movie tidak ditemukan
  if (!movie) return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <Navbar />
      <div className="p-10 text-center">Drama tidak ditemukan.</div>
    </div>
  );

  // URL Video Player - Menggunakan vidsrc.to yang dikenal lebih stabil untuk subtitle
const videoUrl = `https://vidsrc.to/embed/tv/${id}/${currentSeason}/${currentEpisode}`;

  return (
    <div className="bg-black min-h-screen text-white pb-20">
      <Navbar />
      
      {/* 1. AREA VIDEO PLAYER */}
      <div className="w-full bg-zinc-950 border-b border-zinc-900 shadow-2xl">
        <div className="max-w-6xl mx-auto aspect-video">
          <iframe
            src={videoUrl}
            className="w-full h-full border-0"
            allowFullScreen
            allow="autoplay; fullscreen"
          ></iframe>
        </div>
      </div>

      {/* 2. AREA INFORMASI & DAFTAR EPISODE */}
      <div className="max-w-7xl mx-auto p-4 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sisi Kiri: Detail Drama */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
              {movie.name} 
              <span className="text-red-600 ml-3">S{currentSeason} EP{currentEpisode}</span>
            </h1>
            <div className="flex flex-wrap gap-3 mt-2">
              <span className="bg-zinc-800 px-3 py-1 rounded text-sm font-semibold text-yellow-500">⭐ {movie.vote_average?.toFixed(1)}</span>
              <span className="bg-zinc-800 px-3 py-1 rounded text-sm font-semibold text-gray-300">📅 {movie.first_air_date?.split('-')[0]}</span>
              <span className="bg-zinc-800 px-3 py-1 rounded text-sm font-semibold text-red-500 uppercase tracking-wider">{movie.status}</span>
            </div>
          </div>

          <div className="bg-zinc-900/40 p-5 md:p-8 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
            <h3 className="text-lg font-bold mb-4 border-l-4 border-red-600 pl-4">Sinopsis</h3>
            <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
              {movie.overview || "Belum ada deskripsi tersedia untuk drama ini."}
            </p>
            
            {/* Alert Subtitle */}
            <div className="mt-6 p-4 bg-red-900/10 border border-red-900/20 rounded-lg">
              <p className="text-xs md:text-sm text-zinc-400">
                <strong className="text-red-500">Tips Subtitle:</strong> Jika Bahasa Indonesia tidak muncul, klik ikon <strong className="text-white">"CC"</strong> atau <strong className="text-white">"Settings"</strong> di dalam player dan pilih <strong className="text-white">Indonesian</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Sisi Kanan: Daftar Episode */}
        <div className="space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden h-fit sticky top-24">
            <div className="p-4 bg-zinc-800/50 border-b border-zinc-800 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                Daftar Episode
              </h3>
              <span className="text-xs text-zinc-500 font-medium">Season {currentSeason}</span>
            </div>
            
            <div className="flex flex-col max-h-[500px] overflow-y-auto custom-scrollbar">
              {seasonData?.episodes?.length > 0 ? (
                seasonData.episodes.map((ep: any) => (
                  <Link
                    key={ep.id}
                    href={`?s=${currentSeason}&ep=${ep.episode_number}`}
                    className={`p-4 flex items-center gap-4 border-b border-zinc-800 transition hover:bg-zinc-800/50 ${
                      currentEpisode === ep.episode_number.toString() 
                      ? "bg-red-600/10 border-r-4 border-r-red-600" 
                      : ""
                    }`}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      currentEpisode === ep.episode_number.toString() ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-400"
                    }`}>
                      {ep.episode_number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold truncate ${currentEpisode === ep.episode_number.toString() ? "text-red-500" : "text-zinc-200"}`}>
                        Episode {ep.episode_number}
                      </p>
                      <p className="text-xs text-zinc-500 truncate">{ep.name || `Episode ${ep.episode_number}`}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-10 text-center text-zinc-600 text-sm italic">
                  Episode tidak tersedia.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}