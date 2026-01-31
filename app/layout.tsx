import "./globals.css"; // Tambahkan baris ini di paling atas!
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
export const metadata: Metadata = {
  title: "OtakuDrama",
  description: "Daftar Drama Trending",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Warna orange agar senada dengan tema Manga kamu */}
        <NextTopLoader 
          color="#f71a1a" 
          showSpinner={false} 
          shadow="0 0 10px #f97316,0 0 5px #f97316"
        />
        {children}
      </body>
    </html>
  );
}