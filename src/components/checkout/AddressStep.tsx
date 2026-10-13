/**
 * AddressStep — Paso 2 del checkout: «¿A dónde lo enviamos?»
 * Búsqueda con autocompletado (debounce), mapa compacto ampliable,
 * marcador movible, «Usar mi ubicación» y datos de contacto.
 * La zona y el costo se calculan con la MISMA lógica del mapa
 * informativo (findZone + SHIPPING_ZONES).
 */
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { Search, LocateFixed, MapPin, CheckCircle2, AlertTriangle, Loader2, Maximize2, Minimize2 } from "lucide-react";
import { SHIPPING_ZONES, OUT_OF_ZONE_MESSAGE } from "@/data/shippingZones";
import { findZone } from "@/lib/geo";
import { searchAddress, reverseGeocode, type GeoResult } from "@/lib/geocoding";
import { formatPrice } from "@/lib/format";
import { useShop, type ShippingSelection } from "@/context/ShopContext";

const CheckoutMap = lazy(() => import("./CheckoutMap").then((m) => ({ default: m.CheckoutMap })));

const inputCls = "glass rounded-xl px-3 py-2.5 text-sm bg-transparent outline-none focus:ring-brand w-full";
const labelCls = "text-xs font-semibold text-muted-foreground";

interface Props {
  onValidChange: (valid: boolean) => void;
}

export function AddressStep({ onValidChange }: Props) {
  const { shipping, setShipping } = useShop();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoResult[]>([]);
  const [point, setPoint] = useState<[number, number] | null>(shipping?.lat != null && shipping?.lng != null ? [shipping.lat, shipping.lng] : null);
  const [searching, setSearching] = useState(false);
  const [locating, setLocating] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Datos de contacto + detalles de entrega (se guardan en shipping)
  const name = shipping?.name ?? "";
  const phone = shipping?.phone ?? "";
  const details = shipping?.details ?? "";

  // Autocompletado con debounce (Nominatim permite ~1 req/seg)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const q = query.trim();
    if (q.length < 4) { setResults([]); return; }
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        setResults(await searchAddress(`${q}, Buenos Aires`));
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 800);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  /** Aplica una ubicación: detecta zona, costo y actualiza el estado global. */
  const applyPoint = (lat: number, lng: number, label: string, locality: string) => {
    const zone = findZone([lat, lng]);
    setPoint([lat, lng]);
    setResults([]);
    setErrors((e) => ({ ...e, address: "" }));
    setShipping({
      ...(shipping ?? {}),
      address: label,
      locality,
      lat,
      lng,
      zoneId: zone?.id ?? null,
      zoneName: zone?.name ?? null,
      cost: zone?.price ?? null,
    } as ShippingSelection);
  };

  const selectResult = (r: GeoResult) => {
    setQuery("");
    applyPoint(r.lat, r.lng, r.label, r.locality);
  };

  const pickPoint = async (p: [number, number]) => {
    const r = await reverseGeocode(p[0], p[1]);
    applyPoint(r.lat, r.lng, r.label, r.locality);
  };

  const onLocate = () => {
    if (!navigator.geolocation) {
      setErrors((e) => ({ ...e, address: "Tu navegador no permite geolocalización. Buscá tu dirección manualmente." }));
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => { void pickPoint([pos.coords.latitude, pos.coords.longitude]); setLocating(false); },
      () => { setErrors((e) => ({ ...e, address: "No pudimos acceder a tu ubicación. Buscá tu dirección o marcá el punto en el mapa." })); setLocating(false); },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const updateField = (field: "name" | "phone" | "details", value: string) => {
    setShipping({ ...(shipping as ShippingSelection), [field]: value });
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  // Validación: dirección con zona detectada + nombre + teléfono
  useEffect(() => {
    const valid = Boolean(
      shipping?.address && shipping.lat != null && shipping.lng != null &&
      (shipping.name ?? "").trim().length >= 3 &&
      (shipping.phone ?? "").trim().length >= 6,
    );
    onValidChange(valid);
  }, [shipping, onValidChange]);

  /** Marca errores visibles al intentar continuar con datos incompletos. */
  const validate = () => {
    const e: Record<string, string> = {};
    if (!shipping?.address || shipping.lat == null) e.address = "Elegí una dirección de la lista o marcá el punto en el mapa.";
    if ((shipping?.name ?? "").trim().length < 3) e.name = "Ingresá tu nombre y apellido.";
    if ((shipping?.phone ?? "").trim().length < 6) e.phone = "Ingresá un teléfono de contacto válido.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const covered = shipping?.zoneId != null;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold">¿A dónde lo enviamos?</h3>
        <p className="text-sm text-muted-foreground">Ingresá tu dirección para calcular el costo de envío.</p>
      </div>

      {/* Búsqueda con autocompletado */}
      <div className="relative">
        <label className={labelCls}>Buscá tu dirección</label>
        <div className="relative mt-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            className={`${inputCls} pl-9`}
            placeholder="Calle y altura, ej. 7 1234, La Plata"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {searching && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />}
        </div>
        {results.length > 0 && (
          <ul className="absolute z-20 mt-1 w-full glass-strong rounded-xl border border-border max-h-52 overflow-y-auto">
            {results.map((r) => (
              <li key={`${r.lat},${r.lng}`}>
                <button type="button" onClick={() => selectResult(r)} className="w-full text-left text-xs p-2.5 hover:bg-white/5 flex gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" /> {r.label}
                </button>
              </li>
            ))}
          </ul>
        )}
        {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
      </div>

      <button type="button" onClick={onLocate} disabled={locating}
        className="glass rounded-full px-4 py-2 text-xs inline-flex items-center gap-2 hover:glow-brand disabled:opacity-60">
        {locating ? <Loader2 className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4" />}
        Usar mi ubicación
      </button>

      {/* Mapa compacto ampliable */}
      <div className="glass rounded-2xl p-2 relative">
        <ClientOnly fallback={<div className="h-[220px] grid place-items-center text-sm text-muted-foreground">Cargando mapa…</div>}>
          <Suspense fallback={<div className="h-[220px] grid place-items-center text-sm text-muted-foreground">Cargando mapa…</div>}>
            <div className={expanded ? "[&>div]:h-[420px]" : ""}>
              <CheckoutMap point={point} onPick={pickPoint} />
            </div>
          </Suspense>
        </ClientOnly>
        <button type="button" onClick={() => setExpanded((v) => !v)}
          className="absolute top-3 right-3 z-10 glass-strong rounded-full h-8 w-8 grid place-items-center hover:glow-brand"
          aria-label={expanded ? "Achicar mapa" : "Ampliar mapa"}>
          {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
        <p className="text-[11px] text-muted-foreground px-2 pt-2">Tocá el mapa o arrastrá el marcador para ajustar tu ubicación.</p>
      </div>

      {/* Resultado de zona / cobertura */}
      {shipping?.address && (
        <div className="glass rounded-2xl p-4 space-y-1.5 animate-fade-in">
          <div className="flex items-center gap-2 font-bold text-sm">
            {covered ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <AlertTriangle className="h-5 w-5 text-accent" />}
            {covered ? "¡Llegamos a tu domicilio!" : "Fuera de la zona habitual"}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">{shipping.address}</p>
          {shipping.locality && <p className="text-xs">Localidad: <b>{shipping.locality}</b></p>}
          {covered ? (
            <p className="text-sm flex items-center gap-2 flex-wrap">
              <span className="h-3 w-3 rounded-full" style={{ background: SHIPPING_ZONES.find((z) => z.id === shipping.zoneId)?.color }} />
              Tu dirección está en {shipping.zoneName} — Costo de envío:{" "}
              <b className="text-gradient-brand">{shipping.cost === null ? "A confirmar" : formatPrice(shipping.cost)}</b>
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">{OUT_OF_ZONE_MESSAGE} El envío se coordina por WhatsApp al confirmar el pedido.</p>
          )}
        </div>
      )}

      {/* Datos de contacto y detalles */}
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Nombre y apellido</label>
          <input className={`${inputCls} mt-1`} placeholder="Ej. Juan Pérez" value={name} onChange={(e) => updateField("name", e.target.value)} maxLength={80} />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label className={labelCls}>Teléfono de contacto</label>
          <input className={`${inputCls} mt-1`} placeholder="Ej. 221 555 1234" value={phone} onChange={(e) => updateField("phone", e.target.value)} maxLength={20} inputMode="tel" />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <label className={labelCls}>Piso / departamento / indicaciones (opcional)</label>
        <input className={`${inputCls} mt-1`} placeholder="Ej. Piso 2, depto B — timbre roto" value={details} onChange={(e) => updateField("details", e.target.value)} maxLength={140} />
      </div>
    </div>
  );
}

/** Expone la validación al paso padre mediante ref imperativo simple. */
export type AddressStepHandle = { validate: () => boolean };
