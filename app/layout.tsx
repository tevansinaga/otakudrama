import "./globals.css"; // Tambahkan baris ini di paling atas!
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OtakuDrama",
  description: "Daftar Drama Trending",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}