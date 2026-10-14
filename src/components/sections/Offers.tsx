import { Tag } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { isOfferProduct } from "@/lib/offers";

/** Sección de ofertas — selección explícita desde el catálogo, sin otra lista. */
export function Offers() {
  const offers = PRODUCTS.filter(isOfferProduct);

  return (
    <section id="ofertas" className="mx-auto max-w-7xl px-4 py-20">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-display text-3xl sm:text-5xl font-black">
            Ofertas <span className="text-gradient-brand">imperdibles</span>
          </h2>
          <p className="mt-2 text-muted-foreground text-sm">
            {offers.length} {offers.length === 1 ? "producto" : "productos"} en oferta
          </p>
        </div>
      </div>

      {offers.length === 0 ? (
        <div className="mt-16 glass rounded-3xl p-12 text-center">
          <Tag className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 font-display text-xl font-bold">No hay ofertas disponibles</h3>
          <p className="mt-1 text-sm text-muted-foreground">Volvé pronto, estamos preparando nuevos descuentos.</p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {offers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  );
}
