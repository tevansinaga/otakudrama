import { getAllGenres, getOngoingAnime } from "../lib/otakudesu";
import Navbar from "../components/Navbar";
import GenreSection from "../components/GenreSection";
import AnimeList from "../components/AnimeList";
import HeroOngoing from "../components/HeroOngoing";

export default async function Home() {
  const [genres, ongoingData] = await Promise.all([
    getAllGenres(),
    getOngoingAnime(1)
  ]);

  const initialAnime = ongoingData?.animeList || [];
  
  // Ambil 5 anime untuk Hero agar slider lebih variatif seperti BStation
  const heroAnime = initialAnime.slice(0, 5);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      <Navbar />

      {/* Hero Section */}
      {heroAnime.length > 0 && <HeroOngoing animeList={heroAnime} />}
      
      {/* PENGATURAN LAYOUT:
          1. Hapus -mt-20 agar tidak menabrak teks Hero.
          2. Gunakan padding top (pt-12) agar ada nafas antara Hero dan konten.
          3. Pastikan bg-gradient di Hero sudah menutupi transisi ke hitam.
      */}
      <div className="max-w-7xl mx-auto px-6 space-y-20 pt-12 relative z-10">
        
        {/* Genre Section - Sekarang memiliki ruang yang cukup */}
        <section>
           <GenreSection genres={genres} />
        </section>

        {/* Section List Anime */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-8 w-1.5 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
            <h2 className="text-3xl font-black uppercase tracking-tighter italic">
              Sedang Tren
            </h2>
          </div>
          
          <AnimeList 
            initialData={initialAnime} 
            type="ongoing" 
          />
        </section>
      </div>
    </main>
  );
}