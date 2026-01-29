import React from "react";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="py-8 w-full">
      {/* Judul Section dengan aksen garis merah di samping */}
      <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-red-600 pl-4">
        {title}
      </h2>

      {/* GRID SYSTEM:
          - grid-cols-2: Di HP tampil 2 kolom
          - md:grid-cols-4: Di tablet tampil 4 kolom
          - lg:grid-cols-5: Di laptop tampil 5 kolom
          - gap-6: Jarak antar kartu film
      */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {children}
      </div>
    </section>
  );
}