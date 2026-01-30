// components/SkeletonCard.tsx
export default function SkeletonCard() {
  return (
    <div className="animate-pulse">
      {/* Kotak Gambar */}
      <div className="relative aspect-square rounded-[2rem] bg-zinc-900 border border-zinc-800" />
      
      {/* Baris Judul */}
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full bg-zinc-900 rounded-full" />
        <div className="h-3 w-2/3 bg-zinc-900 rounded-full" />
      </div>
    </div>
  );
}