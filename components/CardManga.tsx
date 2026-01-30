// components/CardManga.tsx
import Link from "next/link";

export default function CardManga({ title, image, chapter, link }: any) {
  // Fungsi pembersihan slug universal
  const getCleanSlug = (rawLink: string) => {
    if (!rawLink) return "";
    
    // Pecah string berdasarkan garis miring dan ambil bagian yang bukan kosong
    const parts = rawLink.split('/').filter(Boolean);
    
    // Jika bagian terakhir adalah "manga", ambil bagian sebelumnya (antisipasi format tertentu)
    // Tapi umumnya, slug adalah bagian paling akhir dari URL API Sanka
    const lastPart = parts[parts.length - 1];
    
    // Cegah "https:" masuk sebagai slug
    if (lastPart === "https:" || lastPart === "http:") {
        return parts[parts.length - 2] || "";
    }
    
    return lastPart;
  };

  const slug = getCleanSlug(link);

  return (
    <Link href={`/manga/${slug}`} className="group relative block">
      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-zinc-900 border border-zinc-800 transition-all group-hover:border-orange-500/50">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute top-3 right-3 z-10 bg-orange-500 text-black text-[9px] font-black px-2 py-1 rounded shadow-lg uppercase">
          {chapter?.replace(/Chapter/gi, "CH") || "N/A"}
        </div>
      </div>
      <h3 className="mt-3 text-[11px] font-bold leading-tight line-clamp-2 text-zinc-300 group-hover:text-orange-500 transition-colors">
        {title}
      </h3>
    </Link>
  );
}