import { ArrowRight } from "lucide-react";

/** Hero principal — degradado, título gigante, CTA con glow y stats. */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:pt-24 pb-20 grid lg:grid-cols-2 gap-10 items-center">
        <div className="relative z-10">
          <span className="inline-block glass rounded-full px-4 py-1.5 text-xs tracking-[0.2em] font-semibold">
            NEW DROP · 2026
          </span>
          <h1 className="mt-6 font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
            La mejor
            <br />
            tecnología
            <br />
            <span className="text-gradient-brand">para tu celular.</span>
          </h1>
          <p className="mt-6 text-muted-foreground max-w-lg text-base sm:text-lg">
            Accesorios premium con estética futurista. Fundas, cargadores,
            auriculares y más — diseñados para brillar.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#productos"
              className="btn-brand inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm"
            >
              Comprar ahora <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#ofertas"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Ver ofertas
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-3 max-w-md gap-6">
            <Stat value="+2K" label="Productos" gradient="from-cyan-neon to-violet-neon" />
            <Stat value="50+" label="Marcas" gradient="from-violet-neon to-magenta-neon" />
            <Stat value="4.9★" label="Rating" gradient="from-magenta-neon to-cyan-neon" />
          </dl>
        </div>

        {/* Decorative robot glow zone (reemplazable por imagen real) */}
        <div className="relative aspect-square max-w-lg mx-auto w-full">
          <div className="absolute inset-0 rounded-full bg-gradient-brand-soft blur-3xl" aria-hidden />
          <div className="relative h-full w-full grid place-items-center">
            <div className="glass rounded-[2rem] w-full h-full grid place-items-center overflow-hidden ring-brand">
              <img
                src="/assets/images/placeholder.svg"
                alt="Accesorio premium"
                className="w-3/4 h-3/4 object-contain drop-shadow-[0_0_40px_rgba(168,85,247,0.5)]"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string; gradient: string }) {
  return (
    <div>
      <div className="text-2xl sm:text-3xl font-black text-gradient-brand">{value}</div>
      <div className="text-xs sm:text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
