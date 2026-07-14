/**
 * ShopContext — estado global de la tienda (cliente).
 *
 * Centraliza: carrito, favoritos, filtros, quick view, búsqueda,
 * apertura de menús y drawers. Persiste carrito + favoritos en localStorage.
 *
 * Preparado para migrar a Supabase / Firebase: reemplazar los helpers
 * `readStorage` / `writeStorage` por llamados al backend.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "@/data/products";

export interface CartItem { product: Product; qty: number }

export interface FiltersState {
  categories: string[];
  brands: string[];
  compatibility: string[];
  colors: string[];
  priceMax: number;
  inStock: boolean;
  onlyOffers: boolean;
  onlyNew: boolean;
}

const DEFAULT_FILTERS: FiltersState = {
  categories: [],
  brands: [],
  compatibility: [],
  colors: [],
  priceMax: 200000,
  inStock: false,
  onlyOffers: false,
  onlyNew: false,
};

interface ShopState {
  // Cart
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (p: Product, qty?: number) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
  // Favorites
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  // Filters
  filters: FiltersState;
  setFilters: (f: FiltersState) => void;
  resetFilters: () => void;
  filteredProducts: Product[];
  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  // UI state
  isCartOpen: boolean; setCartOpen: (b: boolean) => void;
  isFiltersOpen: boolean; setFiltersOpen: (b: boolean) => void;
  isSearchOpen: boolean; setSearchOpen: (b: boolean) => void;
  isMenuOpen: boolean; setMenuOpen: (b: boolean) => void;
  quickViewProduct: Product | null; setQuickViewProduct: (p: Product | null) => void;
}

const ShopContext = createContext<ShopState | null>(null);

// ---------- Storage helpers (client-only, safe SSR) ----------
function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { const raw = localStorage.getItem(key); return raw ? (JSON.parse(raw) as T) : fallback; }
  catch { return fallback; }
}
function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* noop */ }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  // Hydrate on client after mount to avoid SSR mismatch
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  useEffect(() => {
    setCart(readStorage<CartItem[]>("ibite:cart", []));
    setFavorites(readStorage<number[]>("ibite:favs", []));
  }, []);
  useEffect(() => { writeStorage("ibite:cart", cart); }, [cart]);
  useEffect(() => { writeStorage("ibite:favs", favorites); }, [favorites]);

  const [filters, setFiltersState] = useState<FiltersState>(DEFAULT_FILTERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setCartOpen] = useState(false);
  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // ---------- Cart ----------
  const addToCart = useCallback((product: Product, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((i) => i.product.id === product.id);
      if (found) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { product, qty }];
    });
    setCartOpen(true);
  }, []);
  const removeFromCart = useCallback((id: number) => setCart((p) => p.filter((i) => i.product.id !== id)), []);
  const updateQty = useCallback((id: number, qty: number) => {
    setCart((p) => qty <= 0 ? p.filter((i) => i.product.id !== id) : p.map((i) => i.product.id === id ? { ...i, qty } : i));
  }, []);
  const clearCart = useCallback(() => setCart([]), []);
  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((s, i) => s + i.qty * i.product.price, 0), [cart]);

  // ---------- Favorites ----------
  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }, []);
  const isFavorite = useCallback((id: number) => favorites.includes(id), [favorites]);

  // ---------- Filters ----------
  const setFilters = useCallback((f: FiltersState) => setFiltersState(f), []);
  const resetFilters = useCallback(() => setFiltersState(DEFAULT_FILTERS), []);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
      if (filters.compatibility.length && !filters.compatibility.includes(p.compatibility)) return false;
      if (filters.colors.length && !filters.colors.includes(p.color)) return false;
      if (p.price > filters.priceMax) return false;
      if (filters.inStock && p.stock <= 0) return false;
      if (filters.onlyOffers && !p.isOffer) return false;
      if (filters.onlyNew && !p.isNew) return false;
      if (q && !(`${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [filters, searchQuery]);

  const value: ShopState = {
    cart, cartCount, cartTotal, addToCart, removeFromCart, updateQty, clearCart,
    favorites, toggleFavorite, isFavorite,
    filters, setFilters, resetFilters, filteredProducts,
    searchQuery, setSearchQuery,
    isCartOpen, setCartOpen,
    isFiltersOpen, setFiltersOpen,
    isSearchOpen, setSearchOpen,
    isMenuOpen, setMenuOpen,
    quickViewProduct, setQuickViewProduct,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside <ShopProvider>");
  return ctx;
}
