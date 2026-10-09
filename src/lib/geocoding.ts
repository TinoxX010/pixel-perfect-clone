/**
 * Geocodificación con Nominatim (OpenStreetMap). Gratis, sin API key.
 * Política de uso: máx. 1 request/seg y sin autocompletado por tecla,
 * por eso solo se busca al enviar el formulario.
 */
const BASE = "https://nominatim.openstreetmap.org";
// Caja de búsqueda alrededor del Gran La Plata (lng/lat oeste,norte,este,sur).
const VIEWBOX = "-58.25,-34.75,-57.75,-35.10";

export interface GeoResult {
  label: string;
  locality: string;
  lat: number;
  lng: number;
}

interface NominatimItem {
  display_name: string;
  lat: string;
  lon: string;
  address?: Record<string, string>;
}

function toResult(item: NominatimItem): GeoResult {
  const a = item.address ?? {};
  return {
    label: item.display_name,
    locality: a.city || a.town || a.suburb || a.village || a.state_district || "",
    lat: Number(item.lat),
    lng: Number(item.lon),
  };
}

export async function searchAddress(query: string): Promise<GeoResult[]> {
  const params = new URLSearchParams({
    q: query,
    format: "jsonv2",
    addressdetails: "1",
    countrycodes: "ar",
    viewbox: VIEWBOX,
    bounded: "1",
    limit: "5",
    "accept-language": "es",
  });
  const res = await fetch(`${BASE}/search?${params}`);
  if (!res.ok) throw new Error(`Error de búsqueda (${res.status})`);
  return ((await res.json()) as NominatimItem[]).map(toResult);
}

export async function reverseGeocode(lat: number, lng: number): Promise<GeoResult> {
  const params = new URLSearchParams({
    lat: String(lat), lon: String(lng), format: "jsonv2", addressdetails: "1", "accept-language": "es",
  });
  const res = await fetch(`${BASE}/reverse?${params}`);
  if (!res.ok) return { label: "Tu ubicación actual", locality: "", lat, lng };
  return toResult((await res.json()) as NominatimItem);
}
