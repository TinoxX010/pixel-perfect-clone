/**
 * Zonas de envío — configuración ÚNICA (mapa, cálculo y carrito leen de acá).
 *
 * Regla de superposición: el ORDEN del array define la prioridad.
 * La primera zona cuyo polígono contiene el punto gana → una dirección
 * nunca recibe dos precios. Orden: Roja (centro) → Azul (norte) → Rosa (resto).
 *
 * ⚠️ Polígonos APROXIMADOS (`verified: false`). Puntos a confirmar:
 *  - Zona Azul: límite oeste de Arturo Seguí y norte de Villa Elisa.
 *  - Zona Roja: límite sur de Los Hornos.
 *  - Zona Rosa: ubicación exacta de la Rotonda de Alpargatas y alcance hasta El Pato.
 */
export interface ShippingZone {
  id: string;
  name: string;
  color: string; // color hex del polígono y la leyenda
  price: number | null; // null = pendiente de configuración
  verified: boolean;
  info: string;
  polygon: [number, number][];
}

export const SHIPPING_ZONES: ShippingZone[] = [
  {
    id: "zona-roja",
    name: "Zona Roja",
    color: "#ef4444",
    price: 10000,
    verified: false,
    info: "Centro de La Plata (casco urbano) y Los Hornos.",
    polygon: [
      [-34.902, -57.96],
      [-34.933, -57.926],
      [-34.952, -57.952],
      [-34.975, -57.975],
      [-34.985, -58.005],
      [-34.962, -58.025],
      [-34.94, -58.0],
      [-34.9185, -57.987],
    ],
  },
  {
    id: "zona-azul",
    name: "Zona Azul",
    color: "#3b82f6",
    price: 5000,
    verified: false,
    info: "Villa Elisa, Arturo Seguí, Gonnet, City Bell y Hernández.",
    polygon: [
      [-34.83, -58.06],
      [-34.835, -58.1],
      [-34.87, -58.155],
      [-34.91, -58.14],
      [-34.925, -58.06],
      [-34.915, -58.0],
      [-34.9, -57.97],
      [-34.88, -57.985],
      [-34.86, -58.01],
    ],
  },
  {
    id: "zona-rosa",
    name: "Zona Rosa",
    color: "#ec4899",
    price: 15000,
    verified: false,
    info: "Zona del Cementerio, hasta El Pato y la Rotonda de Alpargatas (área intermedia incluida).",
    polygon: [
      [-34.82, -58.12],
      [-34.84, -58.22],
      [-34.9, -58.22],
      [-34.96, -58.15],
      [-35.0, -58.06],
      [-35.0, -57.97],
      [-34.97, -57.93],
      [-34.94, -57.9],
      [-34.905, -57.93],
      [-34.88, -57.97],
      [-34.85, -58.0],
      [-34.825, -58.05],
    ],
  },
];

/**
 * Punto de partida — El Rincón.
 * ⚠️ PENDIENTE: `coords: null` hasta confirmar la dirección real del negocio.
 * Cuando esté confirmada, poner [lat, lng] y el marcador aparece solo.
 */
export const START_POINT: { name: string; coords: [number, number] | null } = {
  name: "Punto de partida — El Rincón",
  coords: null,
};

/** Centro inicial del mapa (La Plata). */
export const MAP_CENTER: [number, number] = [-34.9, -58.03];

/** Mensaje para direcciones fuera de cobertura (mensajería a cargo del cliente). */
export const OUT_OF_ZONE_MESSAGE =
  "¿Estás fuera de nuestra zona habitual? Podemos coordinar un envío por mensajería. El costo queda a cargo del cliente.";
