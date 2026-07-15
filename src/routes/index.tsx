import { createFileRoute } from "@tanstack/react-router";
import { FAQ } from "@/components/sections/FAQ";
import { ShopProvider } from "@/context/ShopContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { Hero } from "@/components/sections/Hero";
import { Categories } from "@/components/sections/Categories";
import { Brands } from "@/components/sections/Brands";
import { ProductGrid } from "@/components/products/ProductGrid";
import { QuickView } from "@/components/products/QuickView";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FiltersPanel } from "@/components/filters/FiltersPanel";
import { SearchModal } from "@/components/search/SearchModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "iBITE — Accesorios premium para tu celular" },
      { name: "description", content: "Fundas, cargadores, auriculares, power banks y más. envíos a todo el país." },
      { property: "og:title", content: "iBITE — Accesorios premium para tu celular" },
      { property: "og:description", content: "Fundas, cargadores, auriculares y más. envíos a todo el país." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <Categories />
          <ProductGrid />
          <Brands />
        </main>
        <Footer />

        {/* Overlays */}
        <QuickView />
        <CartDrawer />
        <FiltersPanel />
        <SearchModal />
        <FloatingButtons />
      </div>
    </ShopProvider>
  );
}
