export default function Hero() {
  return (
    <section 
      className="relative h-[50vh] md:h-[65vh] flex items-end overflow-hidden"
    >
      {/* Background Image dengan Overlay Gelap agar Teks Terbaca */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4')",
        }}
      />
      
      {/* Overlay Gradient: Membuat teks putih kontras dengan background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Konten Hero */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-10 lg:px-20 pb-12">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-white uppercase bg-red-600 rounded">
            Trending Now
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-white leading-tight">
            Asian Drama & <br /> 
            <span className="text-red-600">Anime Hub</span>
          </h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
            Nonton trailer dan discover K‑Drama, J‑Drama, dan Anime favoritmu dalam satu platform. 
            Update tercepat setiap hari langsung dari sumber terpercaya.
          </p>
          
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 transition-all rounded-full text-white font-bold shadow-lg shadow-red-600/20">
              <span className="text-xl">▶</span> Play Trailer
            </button>
            <button className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all rounded-full text-white font-bold border border-white/20">
              More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}