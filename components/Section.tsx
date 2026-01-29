interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="my-10 w-full">
      {/* Judul dengan aksen garis merah */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1.5 h-8 bg-red-600 rounded-full"></div>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
          {title}
        </h2>
      </div>

      {/* JANGAN letakkan grid di sini jika di page.tsx sudah ada grid */}
      <div className="w-full">
        {children}
      </div>
    </section>
  );
}