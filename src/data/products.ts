/**
 * PRODUCTS — Fuente única de verdad del catálogo.
 *
 * Para agregar / editar / eliminar un producto, simplemente copiá o modificá
 * un bloque de este array. No hay generación automática de productos.
 *
 * Campos:
 *  - id             : identificador único (número)
 *  - name           : nombre visible
 *  - brand          : marca (debe existir en BRANDS)
 *  - category       : categoría (debe existir en CATEGORIES)
 *  - compatibility  : compatibilidad principal (debe existir en COMPATIBILITY)
 *  - price          : precio actual
 *  - oldPrice       : precio anterior tachado, o null si no hay descuento
 *  - stock          : unidades disponibles (0 = agotado)
 *  - rating         : 0 a 5
 *  - reviews        : cantidad de reseñas
 *  - material       : material del producto
 *  - color          : color principal (hex, para los círculos)
 *  - description    : descripción larga
 *  - image          : ruta de la imagen
 *  - isNew          : muestra badge "NUEVO"
 *  - isOffer        : incluye en la sección Ofertas
 */

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  compatibility: string;
  price: number;
  oldPrice: number | null;
  stock: number;
  rating: number;
  reviews: number;
  material: string;
  color: string;
  description: string;
  image: string;
  isNew: boolean;
  isOffer: boolean;
}

export const CATEGORIES = [
  { slug: "fundas", label: "Fundas", icon: "shield" },
  { slug: "cargadores", label: "Cargadores", icon: "zap" },
  { slug: "auriculares", label: "Auriculares", icon: "headphones" },
  { slug: "power-bank", label: "Power Bank", icon: "battery-charging" },
  { slug: "soportes", label: "Soportes", icon: "magnet" },
  { slug: "adaptadores", label: "Adaptadores", icon: "plug" },
  { slug: "smartwatch", label: "Smartwatch", icon: "watch" },
  { slug: "cables", label: "Cables", icon: "cable" },
] as const;

export const BRANDS = [
  "Apple", "Samsung", "Motorola", "Huawei", "JBL", "Xiaomi",
] as const;

export const COMPATIBILITY = [
  "iPhone", "Samsung", "Moto G", "Moto Edge", "Redmi", "Universal",
] as const;

export const COLOR_SWATCHES = [
  { value: "#0b0b0b", label: "Negro" },
  { value: "#ffffff", label: "Blanco" },
  { value: "#a855f7", label: "Violeta" },
  { value: "#22d3ee", label: "Cyan" },
  { value: "#ec4899", label: "Rosa" },
  { value: "#3b82f6", label: "Azul" },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Power Bank Mag-Safe — iphone",
    brand: "Apple",
    category: "power-bank",
    compatibility: "iphone",
    price: 95.000,
    oldPrice: 100000,
    stock: 5,
    rating: 4,
    reviews: 51,
    material: "Poliestireno",
    color: "#ffffff",
    description:
      "Accesorio premium Bateria Magnetica de Apple, Power-Bank con MagSafe",
    image: "/assets/images/powerbankapplemagsafe.jpg",
    isNew: true,
    isOffer: false,
  },
  {
    id: 2,
    name: "Cargador GaN 65W USB-C",
    brand: "Anker",
    category: "cargadores",
    compatibility: "Universal",
    price: 28990,
    oldPrice: 35990,
    stock: 12,
    rating: 5,
    reviews: 214,
    material: "Policarbonato",
    color: "#ffffff",
    description:
      "Cargador ultra-rápido GaN 65W con doble USB-C. Carga tu celular, tablet y notebook con un solo dispositivo.",
    image: "/assets/images/placeholder.svg",
    isNew: true,
    isOffer: true,
  },
  {
    id: 3,
    name: "Auriculares JBL Tune Buds",
    brand: "JBL",
    category: "auriculares",
    compatibility: "Universal",
    price: 45990,
    oldPrice: null,
    stock: 9,
    rating: 4,
    reviews: 512,
    material: "Plástico premium",
    color: "#0b0b0b",
    description:
      "Auriculares in-ear con cancelación activa de ruido, hasta 40h de batería y sonido JBL Pure Bass.",
    image: "/assets/images/placeholder.svg",
    isNew: true,
    isOffer: false,
  },
  {
    id: 4,
    name: "Funda MagSafe iPhone 15 Pro",
    brand: "Apple",
    category: "fundas",
    compatibility: "iPhone",
    price: 18990,
    oldPrice: 24990,
    stock: 22,
    rating: 5,
    reviews: 87,
    material: "Silicona líquida",
    color: "#a855f7",
    description:
      "Funda MagSafe oficial estilo silicona líquida. Tacto suave, protección total y compatibilidad magnética.",
    image: "/assets/images/placeholder.svg",
    isNew: false,
    isOffer: true,
  },
  {
    id: 5,
    name: "Cable USB-C a Lightning 2m",
    brand: "Apple",
    category: "cables",
    compatibility: "iPhone",
    price: 12990,
    oldPrice: null,
    stock: 40,
    rating: 5,
    reviews: 1200,
    material: "Nylon trenzado",
    color: "#ffffff",
    description:
      "Cable trenzado ultra resistente, carga rápida hasta 20W. Compatible con toda la línea iPhone y iPad.",
    image: "/assets/images/placeholder.svg",
    isNew: false,
    isOffer: false,
  },
  {
    id: 6,
    name: "Smartwatch Galaxy Fit 3",
    brand: "Samsung",
    category: "smartwatch",
    compatibility: "Samsung",
    price: 89990,
    oldPrice: 109990,
    stock: 5,
    rating: 4,
    reviews: 76,
    material: "Aluminio",
    color: "#22d3ee",
    description:
      "Reloj inteligente con AMOLED 1.6\", 100+ modos de deporte, GPS y hasta 13 días de batería.",
    image: "/assets/images/placeholder.svg",
    isNew: true,
    isOffer: true,
  },
  {
    id: 7,
    name: "Soporte MagSafe para auto",
    brand: "Xiaomi",
    category: "soportes",
    compatibility: "Universal",
    price: 15990,
    oldPrice: null,
    stock: 18,
    rating: 4,
    reviews: 143,
    material: "Aluminio anodizado",
    color: "#0b0b0b",
    description:
      "Soporte magnético MagSafe para rejilla de aire. Diseño premium en aluminio, giro 360°.",
    image: "/assets/images/placeholder.svg",
    isNew: false,
    isOffer: false,
  },
  {
    id: 8,
    name: "Adaptador USB-C a HDMI 4K",
    brand: "Anker",
    category: "adaptadores",
    compatibility: "Universal",
    price: 19990,
    oldPrice: 25990,
    stock: 14,
    rating: 5,
    reviews: 302,
    material: "Aluminio",
    color: "#ffffff",
    description:
      "Adaptador USB-C a HDMI con salida 4K@60Hz. Ideal para presentaciones, gaming y streaming.",
    image: "/assets/images/placeholder.svg",
    isNew: false,
    isOffer: true,
  },
];
