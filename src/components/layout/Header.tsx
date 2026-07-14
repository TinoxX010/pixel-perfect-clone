import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingCart, Heart } from "lucide-react";
import { useShop } from "@/context/ShopContext";

/** Barra promocional superior con degradado marca. */
function TopBar() {
  return (
    <div className="bg-gradient-brand text-primary-foreground text-xs sm:text-sm font-medium">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
        <span>🚚 Envíos a todo el país</span>
        <span className="opacity-60">•</span>
        <span>💳 2, 3 y 6 cuotas sin interés</span>
        <span className="opacity-60 hidden sm:inline">•</span>
        <span className="hidden sm:inline">💬 Atención por WhatsApp</span>
      </div>
    </div>
  );
}

const NAV = [
  { label: "Inicio", to: "/" as const },
  { label: "Productos", hash: "#productos" },
  { label: "Ofertas", hash: "#ofertas" },
  { label: "Marcas", hash: "#marcas" },
  { label: "Preguntas Frecuentes", hash: "#faq" },
  { label: "Contacto", hash: "#contacto" },
];

export function Header() {
  const { cartCount, favorites, setCartOpen, setSearchOpen, setMenuOpen, isMenuOpen } = useShop();

  return (
    <header className="sticky top-0 z-40">
      <TopBar />
      <div className="glass-strong border-b border-border">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-1 font-display text-2xl font-black tracking-tight">
            <span className="text-foreground">i</span>
            <span className="text-gradient-brand">BITE</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {NAV.map((n) => (
              <a key={n.label} href={n.hash ?? "/"} className="text-muted-foreground hover:text-foreground transition-colors">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              aria-label="Buscar"
              onClick={() => setSearchOpen(true)}
              className="h-10 w-10 grid place-items-center rounded-full hover:bg-white/5 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              aria-label="Favoritos"
              className="relative h-10 w-10 grid place-items-center rounded-full hover:bg-white/5 transition-colors"
            >
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold grid place-items-center">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              aria-label="Carrito"
              onClick={() => setCartOpen(true)}
              className="relative h-10 w-10 grid place-items-center rounded-full glass hover:glow-brand transition-all"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-gradient-brand text-primary-foreground text-[11px] font-bold grid place-items-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              aria-label="Menú"
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="lg:hidden h-10 w-10 grid place-items-center rounded-full hover:bg-white/5"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-border animate-fade-in">
            <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
              {NAV.map((n) => (
                <a
                  key={n.label}
                  href={n.hash ?? "/"}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5"
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
