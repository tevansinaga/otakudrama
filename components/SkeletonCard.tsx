export default function SkeletonCard() {
  return (
    <div className="relative flex flex-col group">
      {/* Container Gambar dengan Efek Shimmer */}
      <div className="relative aspect-[3/4] rounded-[2rem] bg-zinc-900 border border-zinc-800 overflow-hidden">
        {/* Lapisan Shimmer Animasi */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
      
      {/* Detail Teks */}
      <div className="mt-4 px-2 space-y-3">
        {/* Baris Judul */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-zinc-900 rounded-full animate-pulse" />
          <div className="h-3 w-3/4 bg-zinc-900 rounded-full animate-pulse" />
        </div>
        
        {/* Info Chapter/Type */}
        <div className="h-2 w-1/3 bg-zinc-800 rounded-full animate-pulse" />
      </div>
    </div>
  );
}