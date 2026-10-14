/**
 * ShippingMap — mapa Leaflet + OpenStreetMap (solo cliente).
 * Leaflet se importa dinámicamente para no romper el SSR.
 */
import { useEffect, useRef } from "react";
import type { Map as LeafletMap, CircleMarker } from "leaflet";
import { SHIPPING_ZONES, MAP_CENTER } from "@/data/shippingZones";

interface Props {
  point: [number, number] | null;
  onPick: (point: [number, number]) => void;
}

export function ShippingMap({ point, onPick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<CircleMarker | null>(null);
  const onPickRef = useRef(onPick);
  onPickRef.current = onPick;

  // Inicializa el mapa una sola vez
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");
      if (cancelled || !containerRef.current || mapRef.current) return;
      const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView(MAP_CENTER, 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      // Zonas sin superposición: comparten bordes
      SHIPPING_ZONES.forEach((z) => {
        L.polygon(z.polygon, { color: z.color, weight: 2, fillColor: z.color, fillOpacity: 0.25 })
          .bindTooltip(`${z.name}${z.price !== null ? ` — $${z.price.toLocaleString("es-AR")}` : ""}`, { sticky: true })
          .addTo(map);
      });
      map.on("click", (e) => onPickRef.current([e.latlng.lat, e.latlng.lng]));
      mapRef.current = map;
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []);

  // Actualiza el marcador cuando cambia el punto
  useEffect(() => {
    if (!point) return;
    (async () => {
      const L = (await import("leaflet")).default;
      const map = mapRef.current;
      if (!map) return;
      if (markerRef.current) markerRef.current.setLatLng(point);
      else
        markerRef.current = L.circleMarker(point, {
          radius: 9, color: "#ffffff", weight: 3, fillColor: "#ec4899", fillOpacity: 1,
        }).addTo(map);
      map.flyTo(point, Math.max(map.getZoom(), 14), { duration: 0.6 });
    })();
  }, [point]);

  return <div ref={containerRef} className="h-[380px] sm:h-[480px] w-full rounded-2xl overflow-hidden z-0" />;
}
