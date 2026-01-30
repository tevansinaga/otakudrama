// components/Card.tsx
import Link from "next/link";

interface CardProps {
  id: string;
  title: string;
  image: string;
  episode?: string | number; // Menambahkan tipe number agar lebih aman
}

export default function Card({ id, title, image, episode }: CardProps) {
  // Memastikan episode dikonversi ke string sebelum dilakukan pembersihan teks
  const displayEpisode = episode 
    ? String(episode).replace(/Episode|Ep|/gi, "").trim() 
    : null;

  return (
    <Link href={`/anime/${id}`} className="group relative block focus:outline-none">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-zinc-900 shadow-lg transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-red-600/30">
        <img 
          src={image} 
          alt={title} 
          loading="lazy"
          className="h-full w-full object-cover transition-all duration-500 group-hover:opacity-75"
        />
        
        {/* LABEL EPISODE TERBARU */}
        {displayEpisode && (
          <div className="absolute top-2 right-2 z-10 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-lg uppercase tracking-tighter">
            EP {displayEpisode}
          </div>
        )}

        {/* Overlay Gradient saat Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="mt-3 px-1">
        <h3 className="text-[13px] font-bold leading-tight line-clamp-2 group-hover:text-red-500 transition-colors duration-300">
          {title}
        </h3>
      </div>
    </Link>
  );
}