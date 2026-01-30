// app/manga/read/[id]/page.tsx
import { getChapterData } from "../../../../lib/manga";
import Navbar from "../../../../components/Navbar";
import Link from "next/link";

export default async function ReadMangaPage({ params }: { params: { id: string } }) {
  const data = await getChapterData(params.id);

  // Validasi: Cek array 'images' sesuai API image_b7553b.png
  if (!data || !data.images || data.images.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex items-center justify-center py-40">
           <p className="font-black text-zinc-500">DATA CHAPTER KOSONG / GAGAL MEMUAT</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Header Info */}
      <div className="sticky top-0 z-50 bg-black/90 border-b border-zinc-800 p-4 backdrop-blur-md">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <Link href={`/manga`} className="text-[10px] font-black text-orange-500 uppercase">← Detail</Link>
          <div className="text-center">
            <h1 className="text-[11px] font-bold uppercase truncate max-w-[200px]">{data.manga_title}</h1>
            <p className="text-[9px] text-zinc-500 font-bold">{data.chapter_title}</p>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Reader: Melakukan loop pada data.images */}
      <div className="max-w-3xl mx-auto flex flex-col bg-zinc-950">
        {data.images.map((imgUrl: string, index: number) => (
          <img 
            key={index}
            src={imgUrl} // Di API terbaru, ini langsung string URL
            alt={`Halaman ${index + 1}`}
            className="w-full h-auto block border-none"
            loading={index < 3 ? "eager" : "lazy"}
          />
        ))}
      </div>

      {/* Navigasi Bawah menggunakan data.navigation */}
      <div className="max-w-3xl mx-auto grid grid-cols-2 gap-4 p-10">
        {data.navigation?.previousChapter ? (
          <Link 
            href={`/manga/read/${data.navigation.previousChapter}`} 
            className="bg-zinc-900 p-4 text-center rounded-xl text-[10px] font-black uppercase border border-zinc-800"
          >
            ← Prev Chapter
          </Link>
        ) : <div />}

        {data.navigation?.nextChapter ? (
          <Link 
            href={`/manga/read/${data.navigation.nextChapter}`} 
            className="bg-orange-600 p-4 text-center rounded-xl text-[10px] font-black text-black uppercase"
          >
            Next Chapter →
          </Link>
        ) : <div />}
      </div>
    </main>
  );
}