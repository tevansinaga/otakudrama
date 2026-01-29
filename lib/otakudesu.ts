const BASE_URL = "https://www.sankavollerei.com/anime"; // Pastikan path-nya ke otakudesu

export async function getLatestAnime() {
  try {
    const res = await fetch(`${BASE_URL}/home`, { cache: 'no-store' });
    const json = await res.json();
    
    console.log("STATUS API:", json.status);

    // Otakudesu biasanya membungkus list di dalam data.ongoing.animeList
    if (json.status === "success" && json.data?.ongoing?.animeList) {
      return json.data.ongoing.animeList;
    }
    return [];
  } catch (error) {
    console.error("Gagal ambil data Otakudesu:", error);
    return [];
  }
}

export async function getAnimeDetail(id: string) {
  try {
    // Sesuaikan dengan format yang sudah kamu tes dan terbukti berhasil
    const res = await fetch(`https://www.sankavollerei.com/anime/anime/${id}`, { 
      cache: 'no-store' 
    });

    if (!res.ok) throw new Error("Gagal mengambil data dari server");

    const json = await res.json();
    return json; // Mengembalikan objek yang berisi status, message, dan data
  } catch (error) {
    console.error("Error Detail Fetch:", error);
    return null;
  }
}

// Tahap 1: Mendapatkan daftar server dari sebuah episode
export async function getEpisodeDetails(episodeSlug: string) {
  try {
    const res = await fetch(`${BASE_URL}/episode/${episodeSlug}`, { cache: 'no-store' });
    const json = await res.json();
    return json.data; // Ini berisi title episode dan serverList
  } catch (error) {
    return null;
  }
}

// Tahap 2: Mendapatkan URL embed dari serverID yang dipilih
export async function getStreamUrl(serverId: string) {
  try {
    const res = await fetch(`${BASE_URL}/server/${serverId}`, { cache: 'no-store' });
    const json = await res.json();
    return json.data; // Ini berisi link iframe/embed
  } catch (error) {
    return null;
  }
}

export async function searchAnime(keyword: string) { // Mengubah query -> keyword agar sesuai dokumentasi
  try {
    const res = await fetch(`https://www.sankavollerei.com/anime/search/${keyword}`, { 
      cache: 'no-store' 
    });
    const json = await res.json();
    
    // Pastikan mengambil dari data.animeList sesuai struktur JSON kamu
    return json.data?.animeList || [];
  } catch (error) {
    console.error("Search Error:", error);
    return [];
  }
}

// Ambil daftar semua genre
export async function getAllGenres() {
  try {
    const res = await fetch(`${BASE_URL}/genre`, { cache: 'no-store' });
    const json = await res.json();
    return json.data?.genreList || []; // Berisi array objek dengan title dan genreId
  } catch (error) {
    return [];
  }
}

// Ambil anime berdasarkan genreId
export async function getAnimeByGenre(genreId: string, page: number = 1) {
  try {
    // Sesuaikan dengan URL yang kamu berikan
    const res = await fetch(`https://www.sankavollerei.com/anime/genre/${genreId}?page=${page}`, { 
      cache: 'no-store' 
    });
    const json = await res.json();
    
    // API ini biasanya membungkus data dalam properti 'data'
    return json.data; 
  } catch (error) {
    console.error("Gagal load genre:", error);
    return null;
  }
}

export async function getAnimeList() {
  try {
    const res = await fetch(`${BASE_URL}/recent`, { cache: 'no-store' });
    const json = await res.json();
    // Mengambil array data anime dari properti 'data'
    return json.data || []; 
  } catch (error) {
    console.error("Gagal mengambil daftar anime:", error);
    return [];
  }
}

// Ambil Anime Ongoing
export async function getOngoingAnime(page: number = 1) {
  try {
    const res = await fetch(`https://www.sankavollerei.com/anime/ongoing-anime?page=${page}`, { 
      cache: 'no-store' 
    });
    const json = await res.json();
    // Kembalikan objek data agar Page.tsx bisa memilih animeList-nya
    return json.data; 
  } catch (error) {
    return null;
  }
}