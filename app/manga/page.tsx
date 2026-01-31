import dynamic from "next/dynamic";
import { getMangaHomepage } from "../../lib/manga";
import CardManga from "../../components/CardManga";
import Navbar from "../../components/Navbar";
import Link from "next/link";

// MEMAKSA HistorySection hanya jalan di Browser (Client)
const HistorySection = dynamic(() => import("../../components/HistorySection"), { 
  ssr: false,
  loading: () => <div className="h-[200px] w-full bg-zinc-900/10 animate-pulse rounded-2xl mb-12" />
});

export default async function MangaPage() {
  const mangaData = await getMangaHomepage();
  const genres = ["action", "adventure", "romance", "isekai", "fantasy", "comedy"];

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Section Riwayat (Aman dari Hydration Error) */}
        <HistorySection />

        {/* Genre List */}
        <div className="flex flex-wrap gap-2 mb-10">
          {genres.map((genre) => (
            <Link
              key={genre}
              href={`/manga/genre/${genre}`}
              className="px-4 py-2 bg-zinc-900 hover:bg-orange-500 hover:text-black border border-zinc-800 rounded-full text-[10px] font-black uppercase transition-all tracking-widest"
            >
              {genre}
            </Link>
          ))}
        </div>

        {/* Latest Update */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-6 w-1.5 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.4)]"></div>
          <h1 className="text-xl font-black uppercase italic tracking-tighter">
            LATEST UPDATE KOMIK
          </h1>
        </div>

        {mangaData && mangaData.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {mangaData.map((item: any, i: number) => (
              <CardManga 
                key={`${item.title}-${i}`} 
                title={item.title}
                image={item.image} 
                chapter={item.chapter}
                link={item.link}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-zinc-600 italic uppercase font-black text-[10px] tracking-widest">
              Gagal memuat daftar komik...
            </p>
          </div>
        )}
      </div>
    </main>
  );
}