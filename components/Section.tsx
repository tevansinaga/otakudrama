interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="my-8 md:my-12">
      <h2 className="text-xl md:text-2xl font-bold mb-5 border-l-4 border-red-600 pl-3 md:pl-4">
        {title}
      </h2>
      {/* Grid Responsif: 
          - 2 kolom di HP (Default)
          - 3 kolom di Tablet (sm)
          - 4 kolom di Laptop Kecil (md)
          - 5 kolom di Laptop Besar (lg)
          - 6 kolom di Layar UltraWide (xl)
      */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
        {children}
      </div>
    </section>
  );
}