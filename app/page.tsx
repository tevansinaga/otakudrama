import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Section from "../components/Section";
import Card from "../components/Card";
import { getTrending } from "../lib/tmdb";

export default async function HomePage() {
  const data = await getTrending();

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      
      <main className="px-6 pb-20">
        <Section title="Trending Drama Minggu Ini">
          {data.results?.map((item: any) => (
            <Card
              key={item.id}
              id={item.id} // TAMBAHKAN BARIS INI
              title={item.name || item.title}
              image={item.poster_path}
            />
          ))}
        </Section>
      </main>

      <footer className="text-center text-gray-500 text-sm py-10 border-t border-zinc-800">
        © 2026 OtakuDrama · Asian Entertainment Discovery Platform
      </footer>
    </div>
  );
}