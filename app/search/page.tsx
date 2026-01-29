import { searchMovies } from "../../lib/tmdb";
import Navbar from "../../components/Navbar";
import Section from "../../components/Section";
import Card from "../../components/Card";

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q;
  const data = await searchMovies(query);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <main className="p-10">
        <Section title={`Hasil Pencarian: ${query}`}>
          {data.results.length > 0 ? (
            data.results.map((item: any) => (
              <Card 
                key={item.id} 
                id={item.id} 
                title={item.name} 
                image={item.poster_path} 
              />
            ))
          ) : (
            <p className="text-gray-500">Tidak ada hasil yang ditemukan.</p>
          )}
        </Section>
      </main>
    </div>
  );
}