const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

// Helper untuk memproses hasil mapping poster agar tidak duplikasi kode
const mapResults = (results: any[]) => {
  return results.map((item: any) => ({
    ...item,
    poster_path: item.poster_path 
      ? `${IMAGE_BASE_URL}${item.poster_path}` 
      : "https://via.placeholder.com/500x750?text=No+Image",
  }));
};

// 1. Ambil Trending TV Shows per Minggu
export async function getTrending() {
  if (!API_KEY) return { results: [] };
  try {
    const res = await fetch(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return { ...data, results: mapResults(data.results || []) };
  } catch (error) {
    return { results: [] };
  }
}

// 2. Ambil Khusus K-Drama (Korea Selatan)
export async function getKDrama() {
  if (!API_KEY) return { results: [] };
  try {
    const res = await fetch(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_original_language=ko&with_genres=18&sort_by=popularity.desc`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return { results: mapResults(data.results || []) };
  } catch (error) {
    return { results: [] };
  }
}

// 3. Ambil Khusus Anime (Animation + Japan)
export async function getAnime() {
  if (!API_KEY) return { results: [] };
  try {
    const res = await fetch(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_original_language=ja&with_genres=16&sort_by=popularity.desc`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return { results: mapResults(data.results || []) };
  } catch (error) {
    return { results: [] };
  }
}

// 4. Detail Drama & Trailer
export async function getMovieDetail(id: string) {
  if (!API_KEY || !id || id === "undefined") return null;
  try {
    const res = await fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      ...data,
      poster_path: data.poster_path ? `${IMAGE_BASE_URL}${data.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image",
      backdrop_path: data.backdrop_path ? `${BACKDROP_BASE_URL}${data.backdrop_path}` : null,
    };
  } catch (error) {
    return null;
  }
}

// 5. Pencarian Global
export async function searchMovies(query: string) {
  if (!API_KEY || !query) return { results: [] };
  try {
    const res = await fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return { results: mapResults(data.results || []) };
  } catch (error) {
    return { results: [] };
  }
}

// 6. Detail Season (Untuk daftar Episode)
export async function getSeasonDetail(tvId: string, seasonNumber: number = 1) {
  if (!API_KEY) return null;
  try {
    const res = await fetch(
      `${BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`,
      { next: { revalidate: 3600 } }
    );
    return res.ok ? res.json() : null;
  } catch (error) {
    return null;
  }
}

// Fungsi dinamis untuk halaman kategori (K-Drama, J-Drama, Anime)
export async function getByGenre(type: string) {
  if (!API_KEY) return { results: [] };

  let params = "";
  if (type === "k-drama") {
    params = "&with_original_language=ko&with_genres=18"; // Korea + Drama
  } else if (type === "j-drama") {
    params = "&with_original_language=ja&with_genres=18"; // Jepang + Drama
  } else if (type === "anime") {
    params = "&with_original_language=ja&with_genres=16"; // Jepang + Animation
  }

  try {
    const res = await fetch(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc${params}`,
      { next: { revalidate: 3600 } }
    );
    
    if (!res.ok) return { results: [] };
    
    const data = await res.json();
    return { 
      results: mapResults(data.results || []) 
    };
  } catch (error) {
    console.error("Error in getByGenre:", error);
    return { results: [] };
  }
}