/** Canal de contacto de la tienda (WhatsApp). */
export const WHATSAPP_NUMBER = "5492215749478";

export function whatsappLink(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
