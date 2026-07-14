/** Formateo de moneda en pesos argentinos, sin decimales. */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Descuento porcentual entre precio anterior y actual. */
export function discountPercent(oldPrice: number | null, price: number): number | null {
  if (!oldPrice || oldPrice <= price) return null;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}
