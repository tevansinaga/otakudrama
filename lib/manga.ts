// lib/manga.ts
const COMIC_URL = "https://www.sankavollerei.com/comic";

// lib/manga.ts

// lib/manga.ts
// lib/manga.ts
export async function getMangaHomepage() {
  try {
    const res = await fetch(`https://www.sankavollerei.com/comic/homepage`, { 
      cache: 'no-store' 
    });
    const json = await res.json();
    
    // Filter item non-komik seperti APK
    return (json.latest || []).filter((item: any) => item.title !== "Komiku Plus APK");
  } catch (error) {
    return [];
  }
}


export async function getLatestManga(page: number = 1) {
  try {
    // Gunakan endpoint /latest untuk infinite scroll
    const res = await fetch(`https://www.sankavollerei.com/comic/latest?page=${page}`, { cache: 'no-store' });
    const json = await res.json();
    return json.data || []; 
  } catch (error) {
    return [];
  }
}

// lib/manga.ts

// lib/manga.ts

// lib/manga.ts
export async function getMangaDetail(slug: string) {
  try {
    // Endpoint sesuai data API di image_abf42c
    const res = await fetch(`https://www.sankavollerei.com/comic/comic/${slug}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) return null;
    return await res.json(); // Mengembalikan objek utama
  } catch (error) {
    return null;
  }
}

// lib/manga.ts
export async function getChapterData(chapterId: string) {
  try {
    const res = await fetch(`https://www.sankavollerei.com/comic/chapter/${chapterId}`, { 
      cache: 'no-store' 
    });
    const json = await res.json();
    return json; // Mengembalikan data dengan properti 'images' dan 'navigation'
  } catch (error) {
    return null;
  }
}


export async function searchManga(query: string) {
  try {
    const res = await fetch(`https://www.sankavollerei.com/comic/search?q=${query}`, { cache: 'no-store' });
    const json = await res.json();
    return json.data || []; // Mengambil array dari properti 'data'
  } catch (error) {
    console.error("Gagal mencari manga:", error);
    return [];
  }
}

// lib/manga.ts


// lib/manga.ts

// lib/manga.ts
export async function getMangaByGenre(genreName: string, page: number = 1) {
  try {
    // Tambahkan query ?page= agar API mengirim data halaman selanjutnya
    const res = await fetch(
      `https://www.sankavollerei.com/comic/genre/${genreName}?page=${page}`, 
      { cache: 'no-store' }
    );
    const json = await res.json();
    
    // Pastikan mengambil data dari properti 'comics'
    return (json.comics || []).filter((item: any) => item.title !== "Komiku Plus APK");
  } catch (error) {
    return [];
  }
}