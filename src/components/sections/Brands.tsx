import { BRANDS } from "@/data/products";

/** Franja de marcas — degradado sutil y hover. */
export function Brands() {
  return (
    <section id="marcas" className="mx-auto max-w-7xl px-4 py-14">
      <h3 className="text-center text-[11px] tracking-[0.3em] font-bold text-muted-foreground uppercase">Marcas premium</h3>
      <div className="mt-6 glass rounded-2xl py-6 px-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {BRANDS.map((b) => (
          <span key={b} className="font-display text-lg sm:text-xl font-black text-muted-foreground hover:text-gradient-brand transition-colors">
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}
