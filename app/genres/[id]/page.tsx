import { getAnimeByGenre } from "../../../lib/otakudesu";
import Navbar from "../../../components/Navbar";
import AnimeList from "../../../components/AnimeList";

export default async function GenrePage({ params }: { params: { id: string } }) {
  // 1. Ambil data genre dari API dengan parameter halaman pertama
  const data = await getAnimeByGenre(params.id, 1);
  
  // 2. Pastikan kita mengambil array animeList atau memberikan fallback array kosong
  const initialAnime = data?.animeList || (Array.isArray(data) ? data : []);

  // 3. Format teks genre agar lebih rapi (misal: "action-anime" jadi "ACTION ANIME")
  const genreTitle = params.id.replace(/-/g, ' ');

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 mt-10">
        {/* Header Judul Genre dengan aksen garis merah */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black uppercase border-l-4 border-red-600 pl-4 tracking-tighter">
            Genre: <span className="text-red-600">{genreTitle}</span>
          </h2>
        </div>
        
        {/* Komponen Infinite Scroll 
          - initialData: Data 20-an anime pertama dari server
          - type: Penanda bahwa ini halaman genre
          - genreId: ID unik untuk fetch halaman berikutnya
        */}
        {initialAnime.length > 0 ? (
          <AnimeList 
            initialData={initialAnime} 
            type="genre" 
            genreId={params.id} 
          />
        ) : (
          <div className="py-20 text-center border border-dashed border-zinc-800 rounded-2xl">
            <p className="text-zinc-500 italic">Tidak ada anime ditemukan untuk genre ini.</p>
          </div>
        )}
      </div>
    </main>
  );
}