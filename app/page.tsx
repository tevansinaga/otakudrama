import { getTrending, getKDrama, getAnime } from "../lib/tmdb";
import Navbar from "../components/Navbar";
import Section from "../components/Section";
import Card from "../components/Card";

export default async function Home() {
  // Mengambil data secara paralel agar loading lebih cepat
  const [trending, kdrama, anime] = await Promise.all([
    getTrending(),
    getKDrama(),
    getAnime(),
  ]);

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Navbar tetap di atas */}
      <Navbar />

      <main className="p-4 md:p-10 space-y-12">
        
        {/* Baris 1: Trending - Menggunakan || untuk antisipasi perbedaan nama properti dari API */}
        <Section title="Sedang Trending">
          {trending.results?.map((item: any) => (
            <Card 
              key={item.id} 
              id={item.id} 
              title={item.name || item.title || "Untitled"} 
              image={item.poster_path} 
            />
          ))}
        </Section>

        {/* Baris 2: Koleksi K-Drama */}
        <Section title="Drama Korea Terpopuler">
          {kdrama.results?.map((item: any) => (
            <Card 
              key={item.id} 
              id={item.id} 
              title={item.name || item.title} 
              image={item.poster_path} 
            />
          ))}
        </Section>

        {/* Baris 3: Koleksi Anime */}
        <Section title="Anime Terbaru">
          {anime.results?.map((item: any) => (
            <Card 
              key={item.id} 
              id={item.id} 
              title={item.name || item.title} 
              image={item.poster_path} 
            />
          ))}
        </Section>

      </main>

      {/* Footer Sederhana */}
      <footer className="p-10 text-center text-zinc-500 text-sm border-t border-zinc-900">
        © 2026 OtakuDrama - Nonton Drama & Anime Terlengkap
      </footer>
    </div>
  );
}