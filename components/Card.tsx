import React from "react";
import Link from "next/link";

type CardProps = {
  id: number; // Pastikan ini ada
  title: string;
  image: string;
};

export default function Card({ id, title, image }: CardProps) {
  return (
    // Jika id kosong, link akan menjadi /watch/undefined. Kita harus pastikan id ada.
    <Link href={`/watch/${id}`} className="hover:scale-105 transition block group">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-zinc-800 shadow-lg">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:brightness-110"
        />
      </div>
      <p className="mt-2 text-sm font-medium text-white truncate px-1">{title}</p>
    </Link>
  );
}