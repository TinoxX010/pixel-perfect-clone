/**
 * ShippingSection — "¿Hacemos envíos a tu zona?"
 * Búsqueda de dirección / geolocalización → detección de zona → costo.
 */
import { lazy, Suspense, useState, type FormEvent } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { MapPin, Search, LocateFixed, CheckCircle2, AlertTriangle, MessageCircle } from "lucide-react";
import { SHIPPING_ZONES, OUT_OF_ZONE_MESSAGE } from "@/data/shippingZones";
import { findZone } from "@/lib/geo";
import { searchAddress, reverseGeocode, type GeoResult } from "@/lib/geocoding";
import { formatPrice } from "@/lib/format";
import { whatsappLink } from "@/lib/contact";
import { useShop } from "@/context/ShopContext";

const ShippingMap = lazy(() => import("./ShippingMap").then((m) => ({ default: m.ShippingMap })));

const inputCls = "glass rounded-xl px-3 py-2.5 text-sm bg-transparent outline-none focus:ring-brand w-full";

export function ShippingSection() {
  const { shipping, setShipping } = useShop();
  const [form, setForm] = useState({ street: "", number: "", locality: "La Plata", zip: "" });
  const [results, setResults] = useState<GeoResult[]>([]);
  const [point, setPoint] = useState<[number, number] | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const select = (r: GeoResult) => {
    const zone = findZone([r.lat, r.lng]);
    setPoint([r.lat, r.lng]);
    setResults([]);
    setStatus(null);
    setShipping({
      address: r.label, locality: r.locality,
      zoneId: zone?.id ?? null, zoneName: zone?.name ?? null, cost: zone?.price ?? null,
    });
  };

  const onSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.street.trim()) return setStatus("Ingresá al menos la calle.");
    setLoading(true); setStatus(null);
    try {
      const q = [`${form.street} ${form.number}`.trim(), form.locality, form.zip, "Buenos Aires"].filter(Boolean).join(", ");
      const found = await searchAddress(q);
      if (!found.length) setStatus("No encontramos esa dirección. Revisá los datos o marcá el punto en el mapa.");
      else if (found.length === 1) select(found[0]);
      else setResults(found);
    } catch { setStatus("No pudimos buscar la dirección. Probá de nuevo en unos segundos."); }
    finally { setLoading(false); }
  };

  const pickPoint = async (p: [number, number]) => select(await reverseGeocode(p[0], p[1]));

  const onLocate = () => {
    if (!navigator.geolocation) return setStatus("Tu navegador no permite geolocalización. Usá la búsqueda manual.");
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => { await pickPoint([pos.coords.latitude, pos.coords.longitude]); setLoading(false); },
      () => { setStatus("No pudimos acceder a tu ubicación. Podés buscar tu dirección manualmente."); setLoading(false); },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <section id="envios" className="py-20 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">¿Hacemos envíos a tu <span className="text-gradient-brand">zona</span>?</h2>
        <p className="mt-3 text-center text-muted-foreground">Buscá tu dirección en el mapa y conocé el costo de envío antes de comprar.</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[360px_1fr]">
          <div className="space-y-4">
            <form onSubmit={onSearch} className="glass rounded-2xl p-4 space-y-3">
              <div className="grid grid-cols-[1fr_90px] gap-2">
                <input className={inputCls} placeholder="Calle (ej. 7)" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} />
                <input className={inputCls} placeholder="Altura" value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} />
              </div>
              <div className="grid grid-cols-[1fr_90px] gap-2">
                <input className={inputCls} placeholder="Localidad" value={form.locality} onChange={(e) => setForm({ ...form, locality: e.target.value })} />
                <input className={inputCls} placeholder="CP" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} />
              </div>
              <div className="flex gap-2">
                <button disabled={loading} className="btn-brand flex-1 rounded-full py-2.5 text-sm inline-flex items-center justify-center gap-2 disabled:opacity-60">
                  <Search className="h-4 w-4" /> Buscar
                </button>
                <button type="button" onClick={onLocate} disabled={loading} className="glass rounded-full px-4 text-sm inline-flex items-center gap-2 hover:glow-brand disabled:opacity-60">
                  <LocateFixed className="h-4 w-4" /> Mi ubicación
                </button>
              </div>
              {results.length > 0 && (
                <ul className="space-y-1">
                  {results.map((r) => (
                    <li key={`${r.lat},${r.lng}`}>
                      <button type="button" onClick={() => select(r)} className="w-full text-left text-xs p-2 rounded-lg hover:bg-white/5 flex gap-2">
                        <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" /> {r.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {status && <p className="text-xs text-muted-foreground">{status}</p>}
              <p className="text-[11px] text-muted-foreground">También podés tocar el mapa para marcar tu ubicación.</p>
            </form>

            {shipping && <ShippingResult />}

            <div className="glass rounded-2xl p-4 space-y-2">
              <h3 className="text-sm font-bold">Zonas de envío</h3>
              {SHIPPING_ZONES.map((z) => (
                <div key={z.id} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 h-3 w-3 rounded-full shrink-0" style={{ background: z.color }} />
                  <div className="flex-1">
                    <div className="flex justify-between gap-2 font-semibold">
                      <span>{z.name}</span>
                      <span>{z.price === null ? "A confirmar" : formatPrice(z.price)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{z.info}</p>
                  </div>
                </div>
              ))}
              <p className="text-[11px] text-muted-foreground pt-1">Fuera de estas zonas: envío por mensajería a cargo del cliente.</p>
            </div>
          </div>

          <div className="glass rounded-2xl p-2">
            <ClientOnly fallback={<div className="h-[380px] sm:h-[480px] grid place-items-center text-sm text-muted-foreground">Cargando mapa…</div>}>
              <Suspense fallback={<div className="h-[380px] sm:h-[480px] grid place-items-center text-sm text-muted-foreground">Cargando mapa…</div>}>
                <ShippingMap point={point} onPick={pickPoint} />
              </Suspense>
            </ClientOnly>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Tarjeta con el resultado de la dirección elegida. */
function ShippingResult() {
  const { shipping } = useShop();
  if (!shipping) return null;
  const covered = shipping.zoneId !== null;
  return (
    <div className="glass rounded-2xl p-4 space-y-2 animate-fade-in">
      <div className="flex items-center gap-2 font-bold">
        {covered ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <AlertTriangle className="h-5 w-5 text-accent" />}
        {covered ? "¡Llegamos a tu zona!" : "Fuera de la zona habitual"}
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2">{shipping.address}</p>
      {shipping.locality && <p className="text-xs">Localidad: <b>{shipping.locality}</b></p>}
      {covered ? (
        <p className="text-sm">
          {shipping.zoneName} — Envío: <b className="text-gradient-brand">{shipping.cost === null ? "Precio a confirmar" : formatPrice(shipping.cost)}</b>
        </p>
      ) : (
        <>
          <p className="text-sm">Esta dirección está fuera de nuestra zona de entrega habitual. {OUT_OF_ZONE_MESSAGE}</p>
          <a href={whatsappLink(`Hola iBITE, quiero consultar un envío por mensajería a: ${shipping.address}`)} target="_blank" rel="noreferrer"
            className="btn-brand rounded-full px-4 py-2 text-xs inline-flex items-center gap-2">
            <MessageCircle className="h-4 w-4" /> Consultar por WhatsApp
          </a>
        </>
      )}
    </div>
  );
}
