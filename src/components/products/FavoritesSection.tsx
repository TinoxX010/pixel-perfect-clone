import { Heart, ArrowLeft } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";

/** Independent favorites view; reuses catalog cards and the shared store. */
export function FavoritesSection() {
  const { favorites, setFavoritesOpen } = useShop();
  const products = PRODUCTS.filter((product) => favorites.includes(product.id));
  const returnToProducts = () => {
    setFavoritesOpen(false);
    requestAnimationFrame(() => document.getElementById("productos")?.scrollIntoView());
  };

  return (
    <section aria-labelledby="favorites-title" className="mx-auto max-w-7xl px-4 py-12 sm:py-20">
      <Button variant="ghost" onClick={returnToProducts} className="mb-6">
        <ArrowLeft /> Volver a productos
      </Button>
      <h1 id="favorites-title" className="font-display text-3xl sm:text-5xl font-black">
        Mis <span className="text-gradient-brand">favoritos</span>
      </h1>
      {products.length ? (
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="py-16 text-center">
          <Heart className="mx-auto h-12 w-12 text-accent" />
          <h2 className="mt-4 font-display text-xl font-bold">Todavía no tenés favoritos</h2>
          <Button onClick={returnToProducts} className="btn-brand mt-6 rounded-full">Volver a productos</Button>
        </div>
      )}
    </section>
  );
}