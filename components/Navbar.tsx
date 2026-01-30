import Link from "next/link";
import SearchBar from "./MangaSearchBar";

export default function Navbar() {
  return (
    <nav className="grid grid-cols-3 items-center px-4 md:px-6 py-3 bg-black border-b border-zinc-800 sticky top-0 z-50 w-full overflow-hidden">
      
      {/* KIRI: Logo - Tetap di sisi kiri */}
      <div className="flex justify-start">
        <Link 
          href="/" 
          className="text-lg md:text-2xl font-black text-red-600 tracking-tighter hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          OTAKUDRAMA
        </Link>
      </div>

      {/* TENGAH: Search Bar - Dipaksa berada di titik pusat layar */}
      <div className="flex justify-center items-center w-full">
        <div className="w-full max-w-[140px] xs:max-w-[180px] sm:max-w-xs md:max-w-md lg:max-w-lg transition-all duration-300">
          <SearchBar />
        </div>
      </div>

      {/* KANAN: Tombol - Tetap di sisi kanan */}
      <div className="flex justify-end gap-2">
        <Link 
          href="/manga" 
          className="bg-orange-500 hover:bg-orange-600 text-black text-[9px] md:text-[11px] font-black px-3 md:px-5 py-2 rounded-full uppercase transition-all shadow-lg shadow-orange-500/20 whitespace-nowrap flex items-center gap-1"
        >
          BACA <span className="hidden sm:inline">KOMIK</span>
        </Link>
      </div>

    </nav>
  );
}