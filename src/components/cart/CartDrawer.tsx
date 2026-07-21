import { useState } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/lib/format";
import { CheckoutModal } from "@/components/CheckoutModal";

/** CartDrawer — drawer lateral con items, controles de cantidad y total. */
export function CartDrawer() {
  const { isCartOpen, setCartOpen, cart, cartTotal, updateQty, removeFromCart, clearCart } = useShop();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal>
      <button aria-label="Cerrar" className="flex-1 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setCartOpen(false)} />
      <aside className="w-full sm:w-[420px] max-w-full glass-strong border-l border-border flex flex-col animate-slide-in-right">
        <header className="border-b border-border px-6 py-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-black inline-flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" /> Tu carrito
          </h3>
          <button onClick={() => setCartOpen(false)} className="h-9 w-9 grid place-items-center rounded-full hover:bg-white/5">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 && (
            <div className="text-center py-16 text-sm text-muted-foreground">
              Tu carrito está vacío.
            </div>
          )}
          {cart.map(({ product, qty }) => (
            <div key={product.id} className="glass rounded-2xl p-3 flex gap-3">
              <div className="h-20 w-20 rounded-xl bg-gradient-brand-soft grid place-items-center shrink-0 overflow-hidden">
                <img src={product.image} alt={product.name} className="h-14 w-14 object-contain" loading="lazy" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] tracking-widest uppercase text-muted-foreground">{product.brand}</div>
                <div className="text-sm font-semibold truncate">{product.name}</div>
                <div className="mt-1 text-sm font-black text-gradient-brand">{formatPrice(product.price * qty)}</div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center gap-1 glass rounded-full px-1">
                    <button aria-label="Menos" onClick={() => updateQty(product.id, qty - 1)} className="h-7 w-7 grid place-items-center rounded-full hover:bg-white/10"><Minus className="h-3.5 w-3.5" /></button>
                    <span className="text-xs font-bold w-6 text-center">{qty}</span>
                    <button aria-label="Más" onClick={() => updateQty(product.id, qty + 1)} className="h-7 w-7 grid place-items-center rounded-full hover:bg-white/10"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <button aria-label="Quitar" onClick={() => removeFromCart(product.id)} className="ml-auto h-8 w-8 grid place-items-center rounded-full hover:bg-white/10 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <footer className="border-t border-border p-4 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-2xl font-black text-gradient-brand">{formatPrice(cartTotal)}</span>
            </div>
            <button onClick={() => setCheckoutOpen(true)}
  className="btn-brand w-full rounded-full py-3 text-sm">
  Finalizar compra
</button>
          </footer>
        )}
      </aside>
    </div>
  );
}
