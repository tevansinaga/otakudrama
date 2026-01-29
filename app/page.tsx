import { getAllGenres, getOngoingAnime } from "../lib/otakudesu";
import Navbar from "../components/Navbar";
import GenreSection from "../components/GenreSection";
import OngoingList from "../components/OngoingList";

export default async function Home() {
  // Ambil data awal dari API
  const [genres, ongoingData] = await Promise.all([
    getAllGenres(),
    getOngoingAnime(1)
  ]);

  // Pastikan kita mengambil array animeList
  const initialAnime = ongoingData?.animeList || [];

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      {/* 1. Kembalikan Navbar ke paling atas */}
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 mt-10">
        {/* 2. Kembalikan Tombol Genre */}
        <div className="mb-12">
           <GenreSection genres={genres} />
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-black mb-8 uppercase border-l-4 border-red-600 pl-4 tracking-tighter">
            Ongoing Anime
          </h2>
          
          {/* 3. Render Daftar Anime dengan Infinite Scroll */}
          <OngoingList initialData={initialAnime} />
        </div>
      </div>
    </main>
  );
}