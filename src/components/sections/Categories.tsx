import { Battery, BatteryCharging, Cable, Headphones, Magnet, Plug, Shield, Watch, Zap, type LucideIcon } from "lucide-react";
import { CATEGORIES } from "@/data/products";
import { useShop } from "@/context/ShopContext";

const ICONS: Record<string, LucideIcon> = {
  shield: Shield, zap: Zap, headphones: Headphones,
  "battery-charging": BatteryCharging, magnet: Magnet, plug: Plug,
  watch: Watch, cable: Cable, battery: Battery,
};

/** Grid de categorías con hover neón. Al click filtra por esa categoría. */
export function Categories() {
  const { filters, setFilters } = useShop();

  const toggle = (slug: string) => {
    const active = filters.categories.includes(slug);
    setFilters({
      ...filters,
      categories: active ? filters.categories.filter((c) => c !== slug) : [slug],
    });
    document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="categorias" className="mx-auto max-w-7xl px-4 py-20">
      <header className="text-center max-w-2xl mx-auto">
        <h2 className="font-display text-3xl sm:text-5xl font-black">
          Explorá por <span className="text-gradient-brand">categoría</span>
        </h2>
        <p className="mt-3 text-muted-foreground">Todo lo que tu celular necesita, en un solo lugar.</p>
      </header>

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
        {CATEGORIES.map((c) => {
          const Icon = ICONS[c.icon] ?? Zap;
          const active = filters.categories.includes(c.slug);
          return (
            <button
              key={c.slug}
              onClick={() => toggle(c.slug)}
              className={`group glass rounded-2xl p-4 sm:p-5 flex flex-col items-center gap-3 hover:glow-brand transition-all duration-200 hover:-translate-y-1 ${active ? "ring-brand glow-brand" : ""}`}
            >
              <span className="grid place-items-center h-12 w-12 rounded-xl bg-gradient-brand-soft group-hover:bg-gradient-brand transition-colors">
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-sm font-semibold">{c.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
