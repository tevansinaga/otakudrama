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

  // Ambil data detail drama dan data season 1 secara paralel
  const [movie, seasonData] = await Promise.all([
    getMovieDetail(id),
    getSeasonDetail(id, parseInt(currentSeason))
  ]);

  if (!movie) return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <Navbar />
      <div className="p-10 text-center">Drama tidak ditemukan.</div>
    </div>
  );

  // URL Embed dari vidsrc (Pastikan menggunakan ID TMDB yang benar)
  const videoUrl = `https://vidsrcme.su/embed/tv?tmdb=${id}&season=${currentSeason}&episode=${currentEpisode}`;

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      
      {/* Container Video Player */}
      <div className="w-full bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto aspect-video">
          <iframe
            className="w-full h-full"
            src={videoUrl}
            allowFullScreen
            scrolling="no"
            frameBorder="0"
          ></iframe>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sisi Kiri: Informasi Drama */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold text-white">
              {movie.name} <span className="text-red-600 ml-2">S{currentSeason} EP{currentEpisode}</span>
            </h1>
          </div>

          <div className="flex gap-4 mb-6">
            <span className="bg-zinc-800 px-3 py-1 rounded text-sm font-semibold text-yellow-500">⭐ {movie.vote_average.toFixed(1)}</span>
            <span className="bg-zinc-800 px-3 py-1 rounded text-sm font-semibold text-gray-300">📅 {movie.first_air_date}</span>
            <span className="bg-zinc-800 px-3 py-1 rounded text-sm font-semibold text-red-500 uppercase">{movie.status}</span>
          </div>

          <div className="bg-zinc-900/30 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-lg font-bold mb-3 border-l-4 border-red-600 pl-3">Sinopsis</h3>
            <p className="text-gray-400 leading-relaxed">
              {movie.overview || "Belum ada deskripsi untuk episode ini."}
            </p>
          </div>
        </div>

        {/* Sisi Kanan: Daftar Episode */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden h-fit">
          <div className="p-4 bg-zinc-800/50 border-b border-zinc-800">
            <h3 className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              Daftar Episode
            </h3>
          </div>
          
          <div className="flex flex-col max-h-[500px] overflow-y-auto custom-scrollbar">
            {seasonData?.episodes?.map((ep: any) => (
              <Link
                key={ep.id}
                href={`?s=${currentSeason}&ep=${ep.episode_number}`}
                className={`p-4 flex items-center gap-4 border-b border-zinc-800 transition hover:bg-zinc-800 ${
                  currentEpisode === ep.episode_number.toString() 
                  ? "bg-red-600/20 border-r-4 border-r-red-600" 
                  : ""
                }`}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold">
                  {ep.episode_number}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${currentEpisode === ep.episode_number.toString() ? "text-red-500" : "text-gray-200"}`}>
                    Episode {ep.episode_number}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{ep.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}