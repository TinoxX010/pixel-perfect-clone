import { X, Search as SearchIcon } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/lib/format";
import { PRODUCTS } from "@/data/products";
import { useMemo } from "react";

/** SearchModal — overlay glass con input grande y resultados en vivo. */
export function SearchModal() {
  const { isSearchOpen, setSearchOpen, searchQuery, setSearchQuery, setQuickViewProduct } = useShop();
  const results = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [] as typeof PRODUCTS;
    return PRODUCTS.filter((p) => `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q)).slice(0, 6);
  }, [searchQuery]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 p-4 sm:p-10 flex items-start justify-center" role="dialog" aria-modal>
      <button className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setSearchOpen(false)} aria-label="Cerrar" />
      <div className="relative w-full max-w-2xl glass-strong rounded-3xl overflow-hidden animate-scale-in">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <SearchIcon className="h-5 w-5 text-muted-foreground" />
          <input
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar productos, marcas..."
            className="flex-1 bg-transparent outline-none text-base"
          />
          <button onClick={() => setSearchOpen(false)} className="h-8 w-8 grid place-items-center rounded-full hover:bg-white/10">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-3">
          {searchQuery.trim() === "" && (
            <div className="p-6 text-center text-sm text-muted-foreground">Escribí para buscar productos.</div>
          )}
          {searchQuery.trim() !== "" && results.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">Sin resultados para "{searchQuery}".</div>
          )}
          {results.map((p) => (
            <button
              key={p.id}
              onClick={() => { setQuickViewProduct(p); setSearchOpen(false); }}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-left"
            >
              <div className="h-12 w-12 rounded-lg bg-gradient-brand-soft grid place-items-center shrink-0">
                <img src={p.image} alt={p.name} className="h-9 w-9 object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.brand} · {p.category}</div>
              </div>
              <div className="text-sm font-black text-gradient-brand shrink-0">{formatPrice(p.price)}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
