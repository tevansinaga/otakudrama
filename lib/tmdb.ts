const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

// 1. Fungsi untuk daftar trending di halaman utama
export async function getTrending() {
  if (!API_KEY) {
    console.error("API Key missing in .env.local");
    return { results: [] };
  }

  try {
    const res = await fetch(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`,
      { next: { revalidate: 3600 } } 
    );

    if (!res.ok) return { results: [] };

    const data = await res.json();

    return {
      ...data,
      results: data.results.map((item: any) => ({
        ...item,
        // Mapping poster_path agar menjadi URL lengkap
        poster_path: item.poster_path 
          ? `${IMAGE_BASE_URL}${item.poster_path}` 
          : "https://via.placeholder.com/500x750?text=No+Image",
      })),
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return { results: [] };
  }
}

// 2. Fungsi Detail dengan Trailer (Penting untuk halaman menonton)
export async function getMovieDetail(id: string) {
  if (!API_KEY || !id || id === "undefined") return null;

  try {
    // Menambahkan append_to_response=videos untuk mendapatkan link YouTube Trailer
    const res = await fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return null;

    const data = await res.json();
    
    return {
      ...data,
      // Memastikan URL gambar lengkap untuk background dan poster
      poster_path: data.poster_path ? `${IMAGE_BASE_URL}${data.poster_path}` : null,
      backdrop_path: data.backdrop_path ? `${BACKDROP_BASE_URL}${data.backdrop_path}` : null,
    };
  } catch (error) {
    console.error("Error fetching detail:", error);
    return null;
  }
}

// Fungsi untuk mengambil film berdasarkan kategori/genre
export async function getByGenre(type: string) {
  if (!API_KEY) return { results: [] };

  // ID Genre TMDB: 16 (Anime), Origin Country: KR (K-Drama), JP (J-Drama)
  let params = "";
  if (type === "k-drama") params = "&with_origin_country=KR";
  if (type === "j-drama") params = "&with_origin_country=JP";
  if (type === "anime") params = "&with_genres=16";

  try {
    const res = await fetch(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US${params}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return {
      results: data.results.map((item: any) => ({
        ...item,
        poster_path: item.poster_path 
          ? `${IMAGE_BASE_URL}${item.poster_path}` 
          : "https://via.placeholder.com/500x750?text=No+Image",
      })),
    };
  } catch (error) {
    return { results: [] };
  }
}

// Fungsi untuk mengambil daftar episode dari Season tertentu
export async function getSeasonDetail(tvId: string, seasonNumber: number = 1) {
  if (!API_KEY) return null;
  try {
    const res = await fetch(
      `${BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function searchMovies(query: string) {
  if (!API_KEY) return { results: [] };
  try {
    const res = await fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return {
      results: data.results.map((item: any) => ({
        ...item,
        poster_path: item.poster_path 
          ? `${IMAGE_BASE_URL}${item.poster_path}` 
          : "https://via.placeholder.com/500x750?text=No+Image",
      })),
    };
  } catch (error) {
    return { results: [] };
  }
}