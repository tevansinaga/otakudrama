import Link from "next/link";
import SearchBar from "./MangaSearchBar"; // Sekarang namanya lebih umum karena bisa anime & manga

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black border-b border-zinc-800 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-black text-red-600 tracking-tighter">
          OTAKUDRAMA
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Search bar pintar yang ganti fungsi otomatis */}
        <div className="hidden md:block">
          <SearchBar />
        </div>

        {/* TOMBOL BACA KOMIK */}
        <Link 
          href="/manga" 
          className="bg-orange-500 hover:bg-orange-600 text-black text-[10px] font-black px-4 py-2 rounded-full uppercase transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2 group"
        >
          <span></span>BACA KOMIK
        </Link>
      </div>
    </nav>
  );
}