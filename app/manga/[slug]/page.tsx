// app/manga/[slug]/page.tsx
import { getMangaDetail } from "../../../lib/manga"; // Pastikan path benar
import Navbar from "../../../components/Navbar";
import Link from "next/link"; // WAJIB diimpor agar tidak error

export default async function MangaDetailPage({ params }: { params: { slug: string } }) {
  // Mengambil data detail berdasarkan slug dari URL
  const data = await getMangaDetail(params.slug);

  // Jika data belum ada atau slug salah
  if (!data || !data.title) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="font-black uppercase tracking-widest text-zinc-700">Manga tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-6 mt-10">
        {/* Header Section (Info Utama) */}
        <div className="flex flex-col md:flex-row gap-10 mb-16">
          <div className="relative shrink-0 mx-auto md:mx-0">
            <img 
              src={data.image} 
              alt={data.title} 
              className="w-56 rounded-2xl shadow-2xl border border-zinc-800 object-cover aspect-[3/4]"
            />
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-tight mb-6">
              {data.title}
            </h1>
            
            {/* Sinopsis dari API */}
            <p className="text-zinc-400 text-sm leading-relaxed mb-8 line-clamp-6 md:line-clamp-none">
              {data.synopsis || data.summary || "No description available."}
            </p>
            
            {/* Metadata (Status & Type) */}
            <div className="flex flex-wrap gap-3">
              <span className="bg-orange-600 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase italic">
                {data.metadata?.status || "Ongoing"}
              </span>
              <span className="bg-zinc-800 text-zinc-300 text-[10px] font-black px-4 py-1.5 rounded-full uppercase border border-zinc-700">
                {data.metadata?.type || "Manga"}
              </span>
            </div>
          </div>
        </div>

        {/* PERBAIKAN: Section Daftar Chapter */}
        <div className="mt-10 border-t border-zinc-800/50 pt-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="h-5 w-1.5 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.4)]"></div>
              <h2 className="text-white font-black uppercase tracking-widest text-sm">
                CHAPTER LIST
              </h2>
            </div>
            <span className="text-[10px] font-bold text-zinc-600 bg-zinc-900 px-3 py-1 rounded-md uppercase">
              {data.chapters?.length || 0} eps
            </span>
          </div>
          
          <div className="grid gap-3">
            {/* Memeriksa apakah array chapters tersedia */}
            {data.chapters && data.chapters.length > 0 ? (
              data.chapters.map((ch: any, index: number) => {
                // Membersihkan ID chapter dari link API
                const chapterId = ch.link.split('/').filter(Boolean).pop();

                return (
                  <Link 
                    key={index}
                    href={`/manga/read/${chapterId}`}
                    className="group p-5 bg-zinc-900/30 hover:bg-zinc-900 border border-zinc-800/50 hover:border-orange-500/30 rounded-2xl transition-all flex justify-between items-center"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-sm text-zinc-300 group-hover:text-orange-500 transition-colors">
                        {ch.title || `Chapter ${index + 1}`}
                      </span>
                      <span className="text-[9px] text-zinc-600 uppercase font-black tracking-widest">
                        {ch.date || "RELEASED"}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-orange-500 border border-orange-500/20 px-4 py-2 rounded-xl group-hover:bg-orange-500 group-hover:text-black transition-all uppercase">
                        Read →
                      </span>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="text-center py-20 bg-zinc-900/10 border border-dashed border-zinc-800 rounded-3xl">
                <p className="text-zinc-700 italic text-sm font-bold uppercase tracking-widest">
                  Chapter tidak ditemukan atau belum diupdate.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}