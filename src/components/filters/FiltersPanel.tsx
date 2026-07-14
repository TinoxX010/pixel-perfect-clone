import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { BRANDS, CATEGORIES, COLOR_SWATCHES, COMPATIBILITY } from "@/data/products";
import { useShop, type FiltersState } from "@/context/ShopContext";
import { formatPrice } from "@/lib/format";

/**
 * FiltersPanel — drawer glassmorphism con:
 * Categorías, Marcas, Compatibilidad, Slider de precio, Colores circulares,
 * y checkboxes (En stock / Ofertas / Nuevos).
 */
export function FiltersPanel() {
  const { isFiltersOpen, setFiltersOpen, filters, setFilters, resetFilters } = useShop();
  const [draft, setDraft] = useState<FiltersState>(filters);

  useEffect(() => { setDraft(filters); }, [filters, isFiltersOpen]);

  const toggle = <K extends "categories" | "brands" | "compatibility" | "colors">(key: K, val: string) => {
    setDraft((d) => ({ ...d, [key]: d[key].includes(val) ? d[key].filter((x) => x !== val) : [...d[key], val] }));
  };

  const apply = () => { setFilters(draft); setFiltersOpen(false); };
  const clear = () => { resetFilters(); setDraft({ ...draft, categories: [], brands: [], compatibility: [], colors: [], priceMax: 200000, inStock: false, onlyOffers: false, onlyNew: false }); };

  if (!isFiltersOpen) return null;

  const pricePct = Math.round((draft.priceMax / 200000) * 100);

  return (
    <div className="fixed inset-0 z-50 flex" aria-modal role="dialog">
      <button aria-label="Cerrar" className="flex-1 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setFiltersOpen(false)} />
      <aside className="w-full sm:w-[420px] max-w-full glass-strong border-l border-border overflow-y-auto animate-slide-in-right">
        <header className="sticky top-0 z-10 glass-strong border-b border-border px-6 py-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-black">Filtros</h3>
          <button onClick={() => setFiltersOpen(false)} className="h-9 w-9 grid place-items-center rounded-full hover:bg-white/5">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="p-6 space-y-8">
          <Group title="Categoría">
            <ChipRow items={CATEGORIES.map((c) => ({ value: c.slug, label: c.label }))} active={draft.categories} onToggle={(v) => toggle("categories", v)} />
          </Group>

          <Group title="Marca">
            <ChipRow items={BRANDS.map((b) => ({ value: b, label: b }))} active={draft.brands} onToggle={(v) => toggle("brands", v)} />
          </Group>

          <Group title="Compatibilidad">
            <ChipRow items={COMPATIBILITY.map((c) => ({ value: c, label: c }))} active={draft.compatibility} onToggle={(v) => toggle("compatibility", v)} />
          </Group>

          <Group title="Precio">
            <input
              type="range"
              min={0}
              max={200000}
              step={1000}
              value={draft.priceMax}
              onChange={(e) => setDraft({ ...draft, priceMax: Number(e.target.value) })}
              className="range-brand w-full"
              style={{ "--val": `${pricePct}%` } as React.CSSProperties}
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>{formatPrice(0)}</span>
              <span>{formatPrice(draft.priceMax)}</span>
            </div>
          </Group>

          <Group title="Color">
            <div className="flex flex-wrap gap-3">
              {COLOR_SWATCHES.map((c) => {
                const active = draft.colors.includes(c.value);
                return (
                  <button
                    key={c.value}
                    aria-label={c.label}
                    onClick={() => toggle("colors", c.value)}
                    className={`h-9 w-9 rounded-full border-2 transition-all ${active ? "border-foreground scale-110 glow-brand" : "border-white/20 hover:scale-105"}`}
                    style={{ backgroundColor: c.value }}
                  />
                );
              })}
            </div>
          </Group>

          <Group title="Extras">
            <div className="space-y-3">
              <CheckRow label="En stock" checked={draft.inStock} onChange={(v) => setDraft({ ...draft, inStock: v })} />
              <CheckRow label="Ofertas" checked={draft.onlyOffers} onChange={(v) => setDraft({ ...draft, onlyOffers: v })} />
              <CheckRow label="Nuevos" checked={draft.onlyNew} onChange={(v) => setDraft({ ...draft, onlyNew: v })} />
            </div>
          </Group>
        </div>

        <footer className="sticky bottom-0 glass-strong border-t border-border p-4 flex gap-3">
          <button onClick={clear} className="flex-1 rounded-full py-3 text-sm font-semibold border border-border hover:bg-white/5">
            Limpiar filtros
          </button>
          <button onClick={apply} className="btn-brand flex-1 rounded-full py-3 text-sm">
            Aplicar filtros
          </button>
        </footer>
      </aside>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[11px] tracking-[0.25em] font-bold text-muted-foreground uppercase mb-3">{title}</h4>
      {children}
    </div>
  );
}

function ChipRow({ items, active, onToggle }: { items: { value: string; label: string }[]; active: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => {
        const on = active.includes(i.value);
        return (
          <button
            key={i.value}
            onClick={() => onToggle(i.value)}
            className={`text-xs font-semibold rounded-full px-3.5 py-2 border transition-all ${on ? "bg-gradient-brand text-primary-foreground border-transparent glow-brand" : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"}`}
          >
            {i.label}
          </button>
        );
      })}
    </div>
  );
}

function CheckRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <span className={`h-5 w-5 rounded-md border-2 grid place-items-center transition-all ${checked ? "bg-gradient-brand border-transparent" : "border-white/25"}`}>
        {checked && (
          <svg viewBox="0 0 12 12" className="h-3 w-3 text-primary-foreground"><path fill="none" stroke="currentColor" strokeWidth="2" d="M2 6l3 3 5-6"/></svg>
        )}
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="text-sm">{label}</span>
    </label>
  );
}
