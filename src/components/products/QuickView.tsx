import { X, Heart, ShoppingCart, Star, Zap } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { discountPercent, formatPrice } from "@/lib/format";

/**
 * QuickView — modal premium con imagen grande, especificaciones en tarjetas
 * y CTAs (Comprar ahora / Agregar al carrito / Favorito).
 */
export function QuickView() {
  const { quickViewProduct: p, setQuickViewProduct, addToCart, toggleFavorite, isFavorite } = useShop();
  if (!p) return null;

  const disc = discountPercent(p.oldPrice, p.price);
  const fav = isFavorite(p.id);
  const close = () => setQuickViewProduct(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal>
      <button aria-label="Cerrar" className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={close} />
      <div className="relative w-full max-w-5xl glass-strong rounded-3xl overflow-hidden animate-scale-in max-h-[92vh] overflow-y-auto">
        <button
          onClick={close}
          className="absolute top-4 right-4 z-10 h-10 w-10 grid place-items-center rounded-full glass hover:bg-white/10"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
       {/* Image */}
<div className="relative h-[220px] sm:h-[280px] md:h-auto bg-gradient-brand-soft grid place-items-center">
            <div className="absolute inset-6 rounded-2xl bg-gradient-brand-soft blur-2xl opacity-70" aria-hidden />
            <img
              src={p.image}
              alt={p.name}
              className="relative w-3/4 max-w-sm h-auto object-contain drop-shadow-[0_0_60px_rgba(168,85,247,0.5)]"
            />
            {disc && (
              <span className="absolute top-4 left-4 text-xs font-bold tracking-widest px-3 py-1.5 rounded-full bg-accent text-accent-foreground">
                -{disc}%
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col">
            <div className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
              {p.brand} · {p.category}
            </div>
            <h2 className="mt-2 font-display font-black text-2xl sm:text-3xl leading-tight">{p.name}</h2>

            <div className="mt-3 flex items-center gap-1 text-sm">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < p.rating ? "text-lime-neon fill-current" : "text-muted-foreground/30"}`} />
              ))}
              <span className="ml-2 text-muted-foreground text-xs">({p.reviews} reseñas)</span>
            </div>

            <div className="mt-5 flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl sm:text-4xl font-black text-gradient-brand">{formatPrice(p.price)}</span>
              {p.oldPrice && (
                <span className="text-base text-muted-foreground line-through">{formatPrice(p.oldPrice)}</span>
              )}
              {disc && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-accent text-accent-foreground">-{disc}%</span>
              )}
            </div>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{p.description}</p>

            {/* Spec cards */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <SpecCard label="Compatibilidad" value={p.compatibility} />
              <SpecCard label="Material" value={p.material} />
              <SpecCard label="Color">
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border border-white/30" style={{ backgroundColor: p.color }} />
                  <span className="capitalize">{p.color}</span>
                </span>
              </SpecCard>
              <SpecCard label="Stock" value={`${p.stock} u.`} accent={p.stock > 0 ? "ok" : "off"} />
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => { addToCart(p); close(); }}
                className="btn-brand rounded-full px-6 py-3 text-sm inline-flex items-center gap-2 flex-1 justify-center min-w-[180px]"
              >
                <Zap className="h-4 w-4" /> Comprar ahora
              </button>
              <button
                onClick={() => addToCart(p)}
                className="glass rounded-full px-5 py-3 text-sm font-semibold inline-flex items-center gap-2 hover:bg-white/10"
              >
                <ShoppingCart className="h-4 w-4" /> + Carrito
              </button>
              <button
                onClick={() => toggleFavorite(p.id)}
                className={`glass rounded-full px-5 py-3 text-sm font-semibold inline-flex items-center gap-2 hover:bg-white/10 ${fav ? "text-accent" : ""}`}
              >
                <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} /> Favorito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecCard({ label, value, children, accent }: { label: string; value?: string; children?: React.ReactNode; accent?: "ok" | "off" }) {
  return (
    <div className="glass rounded-xl p-3.5">
      <div className="text-[10px] tracking-widest uppercase text-muted-foreground">{label}</div>
      <div className={`mt-1 text-sm font-semibold ${accent === "ok" ? "text-lime-neon" : accent === "off" ? "text-destructive" : ""}`}>
        {children ?? value}
      </div>
    </div>
  );
}
