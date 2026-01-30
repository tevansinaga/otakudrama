// app/manga/search/page.tsx
import { searchManga } from "../../../lib/manga";
import CardManga from "../../../components/CardManga";
import Navbar from "../../../components/Navbar";

export default async function MangaSearchPage({ searchParams }: { searchParams: { q: string } }) {
  const results = await searchManga(searchParams.q);

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-8 w-1.5 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">
            SEARCH: <span className="text-orange-500">"{searchParams.q}"</span>
          </h1>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {results.map((manga: any, index: number) => (
              <CardManga 
                key={index}
                title={manga.title}
                image={manga.thumbnail} // API Search menggunakan 'thumbnail'
                chapter={manga.type || "Manga"} 
                link={manga.href} // API Search menggunakan 'href'
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-zinc-900/10 rounded-[32px] border border-dashed border-zinc-800">
            <p className="text-zinc-600 font-bold italic text-sm">Yah, manga "{searchParams.q}" tidak ketemu...</p>
          </div>
        )}
      </div>
    </main>
  );
}