import { getAllGenres } from "../../lib/otakudesu";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default async function GenresPage() {
  const genres = await getAllGenres();

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <h1 className="text-3xl font-black mb-10 uppercase tracking-tighter border-l-4 border-red-600 pl-4">
          Browse by Genre
        </h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {genres.map((genre: any) => (
            <Link 
              key={genre.genreId}
              href={`/genres/${genre.genreId}`}
              className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-red-600 hover:border-red-500 transition-all text-center group"
            >
              <span className="font-bold text-sm uppercase tracking-widest group-hover:scale-110 transition-transform block">
                {genre.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}