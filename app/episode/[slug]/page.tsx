import { getEpisodeDetails } from "../../../lib/otakudesu";
import Link from "next/link";
import Navbar from "../../../components/Navbar";

export default async function EpisodePage({ params }: { params: { slug: string } }) {
  const data = await getEpisodeDetails(params.slug);

  if (!data || !data.server?.qualities) {
    return <div className="p-20 text-white text-center">Data tidak ditemukan.</div>;
  }

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 md:p-10">
        <h1 className="text-2xl font-black mb-10 text-center uppercase tracking-tighter">
          {data.title}
        </h1>
        
        <div className="space-y-10">
          {data.server.qualities.map((qGroup: any, idx: number) => (
            <div key={idx} className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800">
              {/* Menggunakan .title sesuai data JSON */}
              <h3 className="text-sm font-bold text-red-600 mb-4 uppercase tracking-[0.3em]">
                KUALITAS: {qGroup.title}
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {qGroup.serverList?.map((srv: any, sIdx: number) => (
                  <Link 
                    key={sIdx}
                    href={`/watch/${srv.serverId}`} 
                    className="p-3 bg-zinc-800 hover:bg-red-600 rounded-xl transition-all text-center font-bold text-[10px] uppercase tracking-tighter"
                  >
                    {srv.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}