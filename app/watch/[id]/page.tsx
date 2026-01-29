import { getStreamUrl } from "../../../lib/otakudesu";
import Navbar from "../../../components/Navbar";

export default async function WatchPage({ params }: { params: { id: string } }) {
  // id di sini adalah serverId (misal: 187226-0-720p)
  const streamData = await getStreamUrl(params.id);

  if (!streamData) return <div className="text-white p-20 text-center">Gagal memuat player.</div>;

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4 md:p-10">
        <div className="relative aspect-video w-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
          <iframe 
            src={streamData.url} 
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            scrolling="no"
            
          ></iframe>
        </div>
        
        <div className="mt-8">
          <h1 className="text-xl font-bold text-zinc-400">
            Server ID: <span className="text-white">{params.id}</span>
          </h1>
          <p className="mt-4 text-zinc-500 italic text-sm">
            Jika video tidak berputar atau error silahkan pilih server lain.
          </p>
        </div>
      </div>
    </main>
  );
}