/**
 * CheckoutMap — mapa Leaflet compacto para el checkout (solo cliente).
 * Marcador ARRASTRABLE + click para elegir punto. Reutiliza las zonas
 * y el punto de partida de @/data/shippingZones (misma fuente que el
 * mapa informativo de la sección Envíos).
 */
import { useEffect, useRef } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import { SHIPPING_ZONES, MAP_CENTER, START_POINT } from "@/data/shippingZones";

interface Props {
  point: [number, number] | null;
  onPick: (point: [number, number]) => void;
}

export function CheckoutMap({ point, onPick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<Marker | null>(null);
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
      SHIPPING_ZONES.forEach((z) => {
        L.polygon(z.polygon, { color: z.color, weight: 2, fillColor: z.color, fillOpacity: 0.2 })
          .bindTooltip(`${z.name}${z.price !== null ? ` — $${z.price.toLocaleString("es-AR")}` : ""}`, { sticky: true })
          .addTo(map);
      });
      if (START_POINT.coords) {
        const icon = L.divIcon({
          className: "",
          html: '<div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#22d3ee,#a855f7);border:2px solid #fff;display:grid;place-items:center;font-size:13px">🏠</div>',
          iconSize: [28, 28], iconAnchor: [14, 14],
        });
        L.marker(START_POINT.coords, { icon }).bindTooltip(START_POINT.name).addTo(map);
      }
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

  // Marcador arrastrable sincronizado con el punto elegido
  useEffect(() => {
    if (!point) return;
    (async () => {
      const L = (await import("leaflet")).default;
      const map = mapRef.current;
      if (!map) return;
      if (markerRef.current) {
        markerRef.current.setLatLng(point);
      } else {
        const icon = L.divIcon({
          className: "",
          html: '<div style="width:26px;height:26px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#ec4899;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.5)"></div>',
          iconSize: [26, 26], iconAnchor: [13, 26],
        });
        const marker = L.marker(point, { icon, draggable: true }).addTo(map);
        marker.on("dragend", () => {
          const ll = marker.getLatLng();
          onPickRef.current([ll.lat, ll.lng]);
        });
        markerRef.current = marker;
      }
      map.flyTo(point, Math.max(map.getZoom(), 14), { duration: 0.5 });
    })();
  }, [point]);

  return <div ref={containerRef} className="h-[220px] sm:h-[260px] w-full rounded-xl overflow-hidden z-0" />;
}
