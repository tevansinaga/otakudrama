import { getAnimeByGenre } from "../../../lib/otakudesu";
import Navbar from "../../../components/Navbar";
import Link from "next/link";

export default async function GenreDetailPage({ params }: { params: { id: string } }) {
  const animeList = await getAnimeByGenre(params.id);

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <h1 className="text-2xl font-black mb-8 uppercase">
          Genre: <span className="text-red-600">{params.id.replace(/-/g, ' ')}</span>
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {animeList.map((anime: any) => (
            <Link 
              key={anime.animeId} 
              href={`/anime/${anime.animeId}`}
              className="group bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-red-600 transition-all"
            >
              <div className="relative aspect-[3/4] w-full">
                <img src={anime.poster} className="object-cover w-full h-full" alt={anime.title} />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-bold line-clamp-2">{anime.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}