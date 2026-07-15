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
  "Apple", "Samsung", "Motorola", "Huawei", "JBL", "Xiaomi", "TXME"
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
    price: 95000,
    oldPrice: 100000,
    stock: 5,
    rating: 4,
    reviews: 51,
    material: "Poliestireno",
    color: "#ffffff",
    description:
      "Accesorio premium Bateria Magnetica de Apple, Power-Bank con MagSafe",
    image: "/assets/applecargadormagsafe.jpg",
    isNew: true,
    isOffer: false,
  },
  {
    id: 2,
    name: "Cargador rapido Pd",
    brand: "TXME",
    category: "cargadores",
    compatibility: "Universal",
    price: 40000,
    oldPrice: 50000,
    stock: 5,
    rating: 4,
    reviews: 25,
    material: "Policarbonato",
    color: "#ffffff",
    description:
      "Cargador ultra-rápido GaN 30W con doble USB-C. Carga tu celular y tablet con un solo dispositivo.",
    image: "/assets/cargadormarcarara.jpg",
    isNew: true,
    isOffer: true,
  },
  {
    id: 3,
    name: "Auriculares Xiaomi redmi Buds",
    brand: "Xiaomi",
    category: "auriculares",
    compatibility: "Universal",
    price: 55000,
    oldPrice: 60000,
    stock: 10,
    rating: 4,
    reviews: 30,
    material: "Plástico premium",
    color: "#0b0b0b",
    color: "#ffffff",
    color: "#ec4899",
    description:
      "Auriculares in-ear con cancelación activa de ruido, hasta 40h de batería y sonido JBL Pure Bass.",
    image: "/assets/redmibudsa6.jpg",
    isNew: true,
    isOffer: true,
  },
  {
    id: 4,
    name: "Parlante JBL Go Essentials",
    brand: "JBL",
    category: "Parlantes",
    compatibility: "Universal",
    price: 98000,
    oldPrice: 100000,
    stock:12,
    rating: 5,
    reviews: 65,
    material: "Plastico Premium",
    color: "#0b0b0b",
    description:
      "Parlante JBL GO Essential Perfecto para trnasportar y con potencia espectacular!.",
    image: "/assets/jblparlantechiquito.jpg",
    isNew: true,
    isOffer: true,
  },
  {
    id: 5,
    name: "Cargador Completo de Iphone",
    brand: "Apple",
    category: "cables",
    compatibility: "iPhone",
    price: 70000,
    oldPrice: 80000,
    stock: 20,
    rating: 5,
    reviews: 80,
    material: "Goma Premiujm",
    color: "#ffffff",
    description:
      "Cable trenzado ultra resistente, carga rápida hasta 20W. Compatible con toda la línea iPhone y iPad.",
    image: "/assets/cargadorcompletodeiphone.jpg",
    isNew: true,
    isOffer: true,
  },
  {
    id: 6,
    name: "Smartwatch Galaxy Fit 3",
    brand: "Samsung",
    category: "smartwatch",
    compatibility: "Samsung",
    price: 145000,
    oldPrice: 150000,
    stock: 5,
    rating: 4,
    reviews: 76,
    material: "Aluminio",
    color: "#0b0b0b",
    description:
      "Reloj inteligente con AMOLED 1.6\", 100+ modos de deporte, GPS y hasta 13 días de batería.",
    image: "/assets/relojinteligentesamsumg.jpg",
    isNew: true,
    isOffer: true,
  },
  {
    id: 7,
    name: "SmartWatch Deportivo Inteligente Band 9",
    brand: "Xiaomi",
    category: "Relojes",
    compatibility: "Universal",
    price: 95000,
    oldPrice: 100000,
    stock: 15,
    rating: 4,
    reviews: 20,
    material: "Aluminio Premium",
    color: "#0b0b0b",
    description:
      "Reloj Inteligente perfecto para Deportes",
    image: "/assets/relojlindosmart.jpg",
    isNew: true,
    isOffer: true,
  },
  {
    id: 8,
    name: "Smartwatch Deportivo Inteligente",
    brand: "Samsumg",
    category: "Relojes",
    compatibility: "Universal",
    price: 85000,
    oldPrice: 95000,
    stock: 14,
    rating: 5,
    reviews: 34,
    material: "Aluminio",
    color: "#ec4899",
    description:
      "Reloj Inteligente perfecto para Deportes, con Nicton NT07 Android IOS",
    image: "/assets/smartwatchdeportivo.jpg",
    isNew: true,
    isOffer: true,
  },
  {
    id: 8,
    name: "Auriculares JBL Tune",
    brand: "JBL",
    category: "Auriculares",
    compatibility: "Universal",
    price: 135000,
    oldPrice:150000,
    stock: 6,
    rating: 5,
    reviews: 14,
    material: "Plastico Premium",
    color: "#0b0b0b",
    description:
      "Auriculares JBL tune 520 Bluetooth",
    image: "/assets/images/auricularesjblgrandes.jpg",
    isNew: true,
    isOffer: true,
  },
];
