/**
 * Zonas de envío — configuración ÚNICA (mapa, cálculo y carrito leen de acá).
 *
 * Los polígonos son irregulares y NO se superponen: comparten bordes
 * (vértices marcados "compartido"). Si movés un vértice compartido,
 * movelo en las dos zonas. Coordenadas [lat, lng] reales de OpenStreetMap.
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
      [-34.893, -57.948], // Av. 1 y 32 (vértice norte del casco)
      [-34.917, -57.917], // Av. 1 y 72 (vértice este)
      [-34.945, -57.948], // 31 y 72 (vértice sur)
      [-34.952, -57.958], // borde norte del Cementerio (límite con Rosa)
      [-34.965, -57.975], // Los Hornos — sur
      [-34.985, -57.995], // Los Hornos — límite sur ⚠️ confirmar
      [-34.97, -58.02], // Los Hornos — oeste
      [-34.945, -57.995],
      [-34.921, -57.982], // 31 y 32 (vértice oeste del casco)
      [-34.905, -57.965], // límite con Hernández (Azul)
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
      [-34.825, -58.075], // Villa Elisa — norte ⚠️ confirmar
      [-34.84, -58.11], // Villa Elisa — oeste (límite con Rosa)
      [-34.87, -58.15], // Arturo Seguí — oeste ⚠️ confirmar
      [-34.905, -58.14], // Arturo Seguí — sur
      [-34.915, -58.075], // El Rincón — sur
      [-34.925, -58.015], // Hernández — sur
      [-34.921, -57.982], // compartido con Roja
      [-34.905, -57.965], // compartido con Roja
      [-34.893, -57.948], // compartido con Roja
      [-34.865, -57.99], // Gonnet — este
      [-34.835, -58.035], // City Bell — norte
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
      [-34.84, -58.11], // compartido con Azul
      [-34.825, -58.2], // más allá de la Rotonda de Alpargatas ⚠️ confirmar
      [-34.88, -58.215], // El Pato — oeste ⚠️ confirmar
      [-34.94, -58.15],
      [-34.995, -58.04],
      [-34.98, -57.935], // este del Cementerio
      [-34.945, -57.948], // compartido con Roja (desde acá sigue su borde)
      [-34.952, -57.958],
      [-34.965, -57.975],
      [-34.985, -57.995],
      [-34.97, -58.02],
      [-34.945, -57.995],
      [-34.921, -57.982], // compartido con Roja y Azul
      [-34.925, -58.015], // borde sur de Azul
      [-34.915, -58.075],
      [-34.905, -58.14],
      [-34.87, -58.15],
    ],
  },
];

/**
 * Punto de partida — El Rincón.
 * Calle 443 entre 139 y 140, El Rincón (Villa Elisa, La Plata).
 */
export const START_POINT: { name: string; coords: [number, number] | null } = {
  name: "Punto de partida — El Rincón",
  coords: [-34.8835, -58.0925], // Calle 443 e/ 139 y 140 (OpenStreetMap, aprox.)
};

/** Centro inicial del mapa (El Rincón). */
export const MAP_CENTER: [number, number] = [-34.8835, -58.0925];

/** Mensaje para direcciones fuera de cobertura (mensajería a cargo del cliente). */
export const OUT_OF_ZONE_MESSAGE =
  "¿Estás fuera de nuestra zona habitual? Podemos coordinar un envío por mensajería. El costo queda a cargo del cliente.";
