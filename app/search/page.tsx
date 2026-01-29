import { searchAnime } from "../../lib/otakudesu";
import Navbar from "../../components/Navbar";
import Link from "next/link"; // Tambahkan baris ini!

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q;
  const results = await searchAnime(query);

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <h1 className="text-xl md:text-2xl font-black mb-8 uppercase tracking-tighter">
          Hasil Pencarian: <span className="text-red-600">"{query}"</span>
        </h1>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {results.map((anime: any) => (
              <Link 
                key={anime.animeId} 
                href={`/anime/${anime.animeId}`}
                className="group bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-red-600 transition-all"
              >
                {/* Perbaikan aspek rasio poster */}
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <img 
                    src={anime.poster} 
                    alt={anime.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-red-600 text-[10px] font-bold px-2 py-1 rounded shadow-lg">
                    {anime.score || "N/A"}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-bold line-clamp-2 group-hover:text-red-500 transition-colors">
                    {anime.title}
                  </h3>
                  <p className="text-[10px] text-zinc-500 mt-1 uppercase font-medium">
                    {anime.status}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40">
            <p className="text-zinc-600 italic">Anime "{query}" tidak ditemukan...</p>
            <Link href="/" className="mt-4 text-red-600 font-bold hover:underline">Kembali ke Beranda</Link>
          </div>
        )}
      </div>
    </main>
  );
}