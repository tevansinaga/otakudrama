export default function Hero() {
  return (
    <section 
      className="relative h-[60vh] flex items-end bg-cover bg-center" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4')" }}
    >
      <div className="bg-gradient-to-t from-black w-full p-8">
        <h2 className="text-4xl font-bold mb-2 text-white">Asian Drama & Anime Hub</h2>
        <p className="max-w-xl text-gray-300">Nonton trailer dan discover K‑Drama, J‑Drama, dan Anime favoritmu dalam satu platform.</p>
        <button className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold">
          ▶ Play Trailer
        </button>
      </div>
    </section>
  );
}