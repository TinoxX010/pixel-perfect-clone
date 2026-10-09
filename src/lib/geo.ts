import { SHIPPING_ZONES, type ShippingZone } from "@/data/shippingZones";

/** Ray casting: ¿el punto [lat,lng] está dentro del polígono? */
export function pointInPolygon(point: [number, number], polygon: [number, number][]): boolean {
  const [y, x] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [yi, xi] = polygon[i];
    const [yj, xj] = polygon[j];
    const crosses = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (crosses) inside = !inside;
  }
  return inside;
}

/** Devuelve la primera zona que contiene el punto, o null si está fuera de cobertura. */
export function findZone(point: [number, number]): ShippingZone | null {
  return SHIPPING_ZONES.find((z) => pointInPolygon(point, z.polygon)) ?? null;
}
