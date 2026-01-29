/** @type {import('next').NextConfig} */
const nextConfig = {
  // Memaksa Next.js untuk memproses package undici agar tidak error di Webpack
  transpilePackages: ['undici'],
  // Jika kamu menggunakan App Router (folder app/), pastikan ini aktif
  experimental: {
    serverComponentsExternalPackages: ['cheerio'],
  },
}

module.exports = nextConfig