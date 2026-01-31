"use client";
import { useState, useEffect } from "react";
import { Bookmark, Heart } from "lucide-react";

export default function FavoriteButton({ anime }: { anime: any }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("otaku_favs") || "[]");
    setIsFav(favs.some((item: any) => item.id === anime.id));
  }, [anime.id]);

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem("otaku_favs") || "[]");
    if (isFav) {
      const filtered = favs.filter((item: any) => item.id !== anime.id);
      localStorage.setItem("otaku_favs", JSON.stringify(filtered));
      setIsFav(false);
    } else {
      const newFav = {
        id: anime.id,
        title: anime.title,
        image: anime.poster,
        type: anime.status || "Anime",
        rating: anime.score || "N/A"
      };
      localStorage.setItem("otaku_favs", JSON.stringify([...favs, newFav]));
      setIsFav(true);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all border ${
        isFav 
        ? "bg-red-600 border-red-600 text-white" 
        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white"
      }`}
    >
      <Heart size={20} fill={isFav ? "white" : "none"} />
      {isFav ? "Tersimpan" : "Tambah Favorit"}
    </button>
  );
}