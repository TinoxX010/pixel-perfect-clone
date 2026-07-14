import { SlidersHorizontal, PackageOpen } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { ProductCard } from "./ProductCard";

/** Grid principal de productos filtrados. */
export function ProductGrid() {
  const { filteredProducts, setFiltersOpen, resetFilters } = useShop();

  return (
    <section id="productos" className="mx-auto max-w-7xl px-4 py-20">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-display text-3xl sm:text-5xl font-black">
            Nuestros <span className="text-gradient-brand">productos</span>
          </h2>
          <p className="mt-2 text-muted-foreground text-sm">
            {filteredProducts.length} {filteredProducts.length === 1 ? "producto" : "productos"} disponibles
          </p>
        </div>
        <button
          onClick={() => setFiltersOpen(true)}
          className="glass rounded-full px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2 hover:glow-brand transition-all"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filtros
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="mt-16 glass rounded-3xl p-12 text-center">
          <PackageOpen className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 font-display text-xl font-bold">No encontramos productos</h3>
          <p className="mt-1 text-sm text-muted-foreground">Probá con otros filtros o limpiá la búsqueda.</p>
          <button onClick={resetFilters} className="btn-brand mt-6 rounded-full px-5 py-2 text-sm">Limpiar filtros</button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  );
}
