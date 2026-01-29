import { getAnimeDetail } from "../../../lib/otakudesu";
import Navbar from "../../../components/Navbar";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const result = await getAnimeDetail(params.id);
  const anime = result?.data;

  if (!anime) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl font-bold">Anime tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      
      {/* Container Utama Detail */}
      <div className="max-w-6xl mx-auto p-6 md:p-10 mt-10">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          
          {/* Sisi Kiri: Poster dan Info Singkat */}
          <div className="w-full md:w-80 shrink-0">
            <img 
              src={anime.poster} 
              className="w-full rounded-2xl shadow-2xl border border-zinc-800" 
              alt={anime.title} 
            />
            <div className="mt-6 space-y-3 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Skor:</span>
                <span className="text-orange-500 font-bold">{anime.score || 'N/A'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Status:</span>
                <span className="font-medium">{anime.status}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Total Episode:</span>
                <span>{anime.episodes}</span>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Judul, Sinopsis, dan Episode */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight uppercase tracking-tighter">
              {anime.title}
            </h1>
            
           {/* Sinopsis: Pengecekan apakah data berupa array atau string langsung */}
<div className="mb-10">
  <h3 className="text-lg font-bold text-red-600 mb-3 uppercase tracking-widest">Sinopsis</h3>
  <div className="text-zinc-400 leading-relaxed text-justify bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800">
    {/* Cek jika sinopsis berupa array paragraph */}
    {anime.synopsis?.paragraphs && anime.synopsis.paragraphs.length > 0 ? (
      anime.synopsis.paragraphs.map((p: string, i: number) => (
        <p key={i} className="mb-4 last:mb-0">{p}</p>
      ))
    ) : anime.synopsis && typeof anime.synopsis === 'string' ? (
      /* Fallback jika API tiba-tiba mengirim string biasa, bukan array */
      <p>{anime.synopsis}</p>
    ) : (
      /* Tampilan jika data benar-benar kosong */
      <p className="italic text-zinc-600">Sinopsis belum tersedia.</p>
    )}
  </div>
</div>

            {/* DAFTAR EPISODE */}
<div>
  <h3 className="text-lg font-bold text-red-600 mb-4 uppercase tracking-widest">Daftar Episode</h3>
  <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
    {anime.episodeList?.map((ep: any, index: number) => {
      // Ambil ID Episode (slug) dari href yang diberikan API
      const episodeSlug = ep.id || ep.href.split('/').pop();
      
      return (
        <Link 
          key={index}
          // UBAH INI: Arahkan ke /episode/, bukan /watch/
          href={`/episode/${episodeSlug}`}
          className="flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-all group"
        >
          <span className="text-sm font-medium group-hover:text-red-500 transition-colors">
            {ep.title}
          </span>
          <span className="text-xs text-zinc-500 bg-black px-2 py-1 rounded">
            EP {ep.eps}
          </span>
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