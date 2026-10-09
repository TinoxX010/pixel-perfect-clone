/**
 * Zonas de envío — configuración ÚNICA (mapa + carrito leen de acá).
 *
 * ⚠️ PENDIENTE DE CONFIGURACIÓN:
 *  - `price: null` = precio aún no definido por el negocio (se muestra "A confirmar").
 *  - Los polígonos son APROXIMADOS (casco urbano de La Plata y anillos alrededor).
 *    Deben verificarse contra los límites reales (Rotonda de Alpargatas → Cementerio).
 *  - `verified: false` marca que el límite todavía no fue confirmado.
 *
 * Polígonos: lista de [lat, lng]. El orden del array define la prioridad
 * (la primera zona que contiene el punto gana), por eso va de menor a mayor.
 */
export interface ShippingZone {
  id: string;
  name: string;
  color: string; // color hex del polígono (solo para el mapa)
  price: number | null; // null = pendiente de configuración
  verified: boolean;
  info: string;
  polygon: [number, number][];
}

export const SHIPPING_ZONES: ShippingZone[] = [
  {
    id: "zona-1",
    name: "Zona 1",
    color: "#22d3ee",
    price: null,
    verified: false,
    info: "Casco urbano de La Plata (aprox. entre Av. 1, 32, 31 y 72).",
    polygon: [
      [-34.902, -57.96],
      [-34.933, -57.926],
      [-34.95, -57.953],
      [-34.9185, -57.987],
    ],
  },
  {
    id: "zona-2",
    name: "Zona 2",
    color: "#a855f7",
    price: null,
    verified: false,
    info: "Alrededores inmediatos del casco (Tolosa, Los Hornos, San Carlos, Villa Elvira).",
    polygon: [
      [-34.875, -57.99],
      [-34.88, -57.93],
      [-34.905, -57.895],
      [-34.94, -57.9],
      [-34.965, -57.94],
      [-34.96, -57.99],
      [-34.935, -58.02],
      [-34.9, -58.02],
    ],
  },
  {
    id: "zona-3",
    name: "Zona 3",
    color: "#ec4899",
    price: null,
    verified: false,
    info: "Berisso, Ensenada, Gonnet y City Bell (límite a confirmar).",
    polygon: [
      [-34.83, -58.06],
      [-34.84, -57.9],
      [-34.87, -57.83],
      [-34.93, -57.83],
      [-35.0, -57.9],
      [-35.01, -58.02],
      [-34.96, -58.09],
      [-34.88, -58.1],
    ],
  },
];

/** Centro inicial del mapa (La Plata). */
export const MAP_CENTER: [number, number] = [-34.921, -57.955];

/** Mensaje para direcciones fuera de cobertura (mensajería a cargo del cliente). */
export const OUT_OF_ZONE_MESSAGE =
  "¿Estás fuera de nuestra zona habitual? Podemos coordinar un envío por mensajería. El costo queda a cargo del cliente.";
