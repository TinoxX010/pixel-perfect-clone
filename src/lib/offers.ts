/** Only a real boolean true opts a catalog product into offers. */
export function isOfferProduct(product: { isOffer?: unknown }): boolean {
  return product.isOffer === true;
}