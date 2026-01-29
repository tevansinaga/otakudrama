import Link from "next/link";

export default function Card({ id, title, image }: { id: string, title: string, image: string }) {
  return (
    <Link href={`/anime/${id}`} className="group block">
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-zinc-800 group-hover:border-red-600 transition-all">
        <img 
          src={image} 
          alt={title} 
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
        />
      </div>
      <h3 className="mt-3 text-sm font-bold line-clamp-2 group-hover:text-red-500 transition-colors">
        {title}
      </h3>
    </Link>
  );
}