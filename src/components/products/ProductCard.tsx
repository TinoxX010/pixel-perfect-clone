import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import { type Product } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { discountPercent, formatPrice } from "@/lib/format";

/** Tarjeta de producto compacta con hover glow, quick view y favorito. */
export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite, setQuickViewProduct } = useShop();
  const disc = discountPercent(product.oldPrice, product.price);
  const fav = isFavorite(product.id);

  return (
    <article className="group relative glass rounded-2xl overflow-hidden hover:glow-brand transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isNew && (
          <span className="text-[10px] font-bold tracking-widest px-2 py-1 rounded-full bg-gradient-brand text-primary-foreground">NUEVO</span>
        )}
        {disc && (
          <span className="text-[10px] font-bold tracking-widest px-2 py-1 rounded-full bg-accent text-accent-foreground">-{disc}%</span>
        )}
      </div>

      {/* Fav */}
      <button
        aria-label="Favorito"
        onClick={() => toggleFavorite(product.id)}
        className={`absolute top-3 right-3 z-10 h-9 w-9 grid place-items-center rounded-full glass hover:scale-110 transition-transform ${fav ? "text-accent" : ""}`}
      >
        <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} />
      </button>

      {/* Image */}
      <div className="relative aspect-square bg-gradient-brand-soft grid place-items-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.35)]"
        />
        <button
          onClick={() => setQuickViewProduct(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all glass-strong text-xs font-semibold px-4 py-2 rounded-full inline-flex items-center gap-2"
        >
          <Eye className="h-3.5 w-3.5" /> Vista rápida
        </button>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="text-[10px] tracking-widest text-muted-foreground uppercase">
          {product.brand} · {product.category}
        </div>
        <h3 className="font-semibold text-sm leading-tight line-clamp-2">{product.name}</h3>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3 w-3 ${i < product.rating ? "text-lime-neon fill-current" : "text-muted-foreground/30"}`} />
          ))}
          <span className="ml-1">({product.reviews})</span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            <div className="text-lg font-black text-gradient-brand leading-none">{formatPrice(product.price)}</div>
            {product.oldPrice && (
              <div className="text-xs text-muted-foreground line-through mt-0.5">{formatPrice(product.oldPrice)}</div>
            )}
          </div>
          <button
            aria-label="Agregar al carrito"
            onClick={() => addToCart(product)}
            className="btn-brand h-10 w-10 grid place-items-center rounded-full"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
