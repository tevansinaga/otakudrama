import { getMangaByGenre } from "../../../../lib/manga";
import Navbar from "../../../../components/Navbar";
import GenreList from "../../../../components/GenreList";

export default async function GenrePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  // Ambil data halaman 1 di server side untuk kecepatan loading awal
  const initialData = await getMangaByGenre(slug, 1);

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-6 w-1.5 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.4)]"></div>
          <h1 className="text-xl font-black uppercase italic tracking-tighter">
            GENRE: <span className="text-orange-500">{slug.toUpperCase()}</span>
          </h1>
        </div>

        {/* Kirim data awal ke komponen Client untuk di-manage lebih lanjut */}
        <GenreList initialData={initialData} genre={slug} />
      </div>
    </main>
  );
}