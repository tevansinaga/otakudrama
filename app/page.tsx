import { getAllGenres, getOngoingAnime } from "../lib/otakudesu";
import Navbar from "../components/Navbar";
import GenreSection from "../components/GenreSection";
import AnimeList from "../components/AnimeList"; // BARIS INI YANG KURANG

// ... import lainnya

export default async function Home() {
  const [genres, ongoingData] = await Promise.all([
    getAllGenres(),
    getOngoingAnime(1)
  ]);

  const initialAnime = ongoingData?.animeList || [];

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <GenreSection genres={genres} />

        <div className="mb-16">
          <h2 className="text-2xl font-black mb-8 uppercase border-l-4 border-red-600 pl-4">
            Ongoing Anime
          </h2>
          
          {/* TAMBAHKAN PROPERTI TYPE DI SINI */}
          <AnimeList 
            initialData={initialAnime} 
            type="ongoing" 
          />
        </div>
      </div>
    </main>
  );
}