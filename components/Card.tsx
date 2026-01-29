import React from "react";
import Link from "next/link";

type CardProps = {
  id: number; // Pastikan ini ada
  title: string;
  image: string;
};

export default function Card({ id, title, image }: any) {
  return (
    <Link href={`/watch/${id}`}>
      <div className="group space-y-2">
        <div className="relative aspect-[2/3] overflow-hidden rounded-md md:rounded-lg bg-zinc-900 shadow-lg">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <h3 className="text-[13px] md:text-sm font-medium leading-snug line-clamp-2 group-hover:text-red-500 transition">
          {title}
        </h3>
      </div>
    </Link>
  );
}