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

// lib/otakudesu.ts

export async function getAnimeDetail(id: string) {
  try {
    // Membersihkan ID jika yang dikirim adalah URL lengkap (misal: /anime/judul/)
    // Kita hanya ambil "judul" nya saja.
    const cleanId = id.replace(/\/$/, "").split("/").pop();

    const res = await fetch(`https://www.sankavollerei.com/anime/anime/${cleanId}`, { 
      cache: 'no-store' 
    });

    if (!res.ok) throw new Error(`Gagal mengambil data: ${res.status}`);

    const json = await res.json();
    return json; 
  } catch (error) {
    console.error("Error Detail Fetch:", error);
    return null;
  }
}

// Tahap 1: Mendapatkan daftar server dari sebuah episode
// Tahap 1: Mendapatkan detail episode (judul, daftar server, prev/next)
export async function getEpisodeDetails(episodeSlug: string) {
  try {
    const res = await fetch(`${BASE_URL}/episode/${episodeSlug}`, { 
      cache: 'no-store' 
    });
    const json = await res.json();
    return json.data; // Mengambil objek 'data'
  } catch (error) {
    console.error("Gagal mengambil detail episode:", error);
    return null;
  }
}

// Tahap 2: Mendapatkan URL embed asli dari serverID yang dipilih
export async function getStreamUrl(serverId: string) {
  try {
    // Endpoint ini akan mengembalikan URL iframe seperti desustream, dsb
    const res = await fetch(`${BASE_URL}/server/${serverId}`, { 
      cache: 'no-store' 
    });
    const json = await res.json();
    return json.data; // Biasanya berisi { url: "https://..." }
  } catch (error) {
    console.error("Gagal mengambil stream URL:", error);
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
    const res = await fetch(
      `https://www.sankavollerei.com/anime/ongoing-anime?page=${page}`, 
      { 
        cache: 'no-store',
        // Menambahkan timeout sederhana agar fetch tidak menggantung
        signal: AbortSignal.timeout(5000) 
      }
    );

    if (!res.ok) throw new Error("Gagal mengambil data dari API");

    const json = await res.json();

    // Pastikan mengembalikan struktur yang diharapkan oleh Page.tsx
    // Kita pastikan ada properti 'animeList' agar .slice() tidak error
    return {
      animeList: json.data?.animeList || json.data || [],
      totalPage: json.data?.totalPage || 1
    };
  } catch (error) {
    console.error("Error getOngoingAnime:", error);
    // Mengembalikan struktur default agar aplikasi tidak break
    return {
      animeList: [],
      totalPage: 1
    };
  }
}