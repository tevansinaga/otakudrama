"use client";
import Link from "next/link";

const listGenre = [
  { title: "Action", id: "action" },
  { title: "Comedy", id: "comedy" },
  { title: "Drama", id: "drama" },
  { title: "Fantasy", id: "fantasy" },
];

export default function GenreList() {
  return (
    <div className="flex flex-wrap gap-2 py-4">
      {listGenre.map((g) => (
        <Link 
          key={g.id} 
          href={`/genre/${g.id}`} // Sesuai folder 'genre' di VS Code Anda
          className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs hover:bg-red-600 transition-all"
        >
          {g.title}
        </Link>
      ))}
    </div>
  );
}