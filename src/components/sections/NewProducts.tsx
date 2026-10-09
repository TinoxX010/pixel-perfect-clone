import { Sparkles } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";

/** Sección de productos nuevos — solo los marcados como isNew en los datos. */
export function NewProducts() {
  const news = PRODUCTS.filter((p) => p.isNew);

  return (
    <section id="nuevos" className="mx-auto max-w-7xl px-4 py-20">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-display text-3xl sm:text-5xl font-black">
            Recién <span className="text-gradient-brand">llegados</span>
          </h2>
          <p className="mt-2 text-muted-foreground text-sm">
            {news.length} {news.length === 1 ? "producto nuevo" : "productos nuevos"}
          </p>
        </div>
      </div>

      {news.length === 0 ? (
        <div className="mt-16 glass rounded-3xl p-12 text-center">
          <Sparkles className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 font-display text-xl font-bold">Todavía no hay novedades</h3>
          <p className="mt-1 text-sm text-muted-foreground">Estamos por incorporar nuevos productos.</p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {news.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  );
}
