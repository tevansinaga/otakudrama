import { getByGenre } from "../../../lib/tmdb";
import Navbar from "../../../components/Navbar";
import Section from "../../../components/Section";
import Card from "../../../components/Card";

export default async function CategoryPage({ params }: { params: { type: string } }) {
  const data = await getByGenre(params.type);
  const title = params.type.replace("-", " ").toUpperCase();

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <main className="p-10">
        <Section title={`Daftar ${title}`}>
          {data.results.map((item: any) => (
            <Card 
              key={item.id} 
              id={item.id} 
              title={item.name} 
              image={item.poster_path} 
            />
          ))}
        </Section>
      </main>
    </div>
  );
}