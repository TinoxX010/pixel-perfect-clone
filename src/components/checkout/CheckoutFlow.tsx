/**
 * CheckoutFlow — checkout por pasos (modal a pantalla completa en mobile).
 * Paso 1: Método de pago · Paso 2: ¿A dónde lo enviamos? · Paso 3: Resumen.
 * Reutiliza la lógica de zonas del mapa de envíos (findZone + SHIPPING_ZONES)
 * y la integración de WhatsApp ya configurada en el proyecto.
 */
import { useCallback, useState } from "react";
import { X, ArrowLeft, Check, CreditCard, Landmark, MapPin, MessageCircle } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/lib/format";
import { whatsappLink } from "@/lib/contact";
import { AddressStep } from "./AddressStep";

interface Props {
  open: boolean;
  onClose: () => void;
}

const STEPS = ["Pago", "Envío", "Resumen"] as const;

const PAYMENT_METHODS = [
  { id: "Transferencia", label: "Transferencia bancaria", desc: "Te pasamos los datos por WhatsApp al confirmar.", icon: Landmark },
  { id: "Tarjeta", label: "Tarjeta", desc: "Coordinamos el pago con tarjeta al confirmar.", icon: CreditCard },
] as const;

export function CheckoutFlow({ open, onClose }: Props) {
  const { cart, cartTotal, shipping } = useShop();
  const [step, setStep] = useState(0);
  const [payment, setPayment] = useState<string>("Transferencia");
  const [addressValid, setAddressValid] = useState(false);

  const shippingCost = shipping?.cost ?? 0;
  const orderTotal = cartTotal + shippingCost;
  const covered = shipping?.zoneId != null;

  const onValidChange = useCallback((v: boolean) => setAddressValid(v), []);

  if (!open) return null;

  const canContinue = step === 0 ? Boolean(payment) : step === 1 ? addressValid : true;

  const confirm = () => {
    const mapsUrl = shipping?.lat != null ? `https://www.google.com/maps?q=${shipping.lat},${shipping.lng}` : "";
    const shippingLine = !shipping
      ? "A coordinar"
      : shipping.cost !== null
        ? `${shipping.zoneName} — ${formatPrice(shipping.cost)}`
        : "Mensajería a cargo del cliente (a coordinar)";
    const message = `
🛒 *Nuevo pedido — iBITE*

👤 *Cliente:* ${shipping?.name ?? "-"}
📞 *Teléfono:* ${shipping?.phone ?? "-"}

📍 *Dirección:* ${shipping?.address ?? "-"}${shipping?.details ? `\n🏢 *Detalles:* ${shipping.details}` : ""}
🗺️ *Ubicación:* ${mapsUrl}
🚚 *Zona de envío:* ${shipping?.zoneName ?? "Fuera de zona habitual"}

━━━━━━━━━━━━━━━

${cart
  .map(
    ({ product, qty }) => `📦 *${product.name}*
• Marca: ${product.brand}
• Cantidad: ${qty}
• Precio: ${formatPrice(product.price * qty)}`,
  )
  .join("\n\n")}

━━━━━━━━━━━━━━━

🧾 *Subtotal:* ${formatPrice(cartTotal)}
🚚 *Envío:* ${shippingLine}
💰 *Total:* ${formatPrice(orderTotal)}

💳 *Forma de pago:* ${payment}

¡Muchas gracias!
`;
    window.open(whatsappLink(message), "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4">
      <div className="glass-strong w-full sm:max-w-lg max-h-[92vh] sm:rounded-3xl rounded-t-3xl border border-border flex flex-col animate-fade-in">
        {/* Header + stepper */}
        <header className="px-5 pt-5 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Finalizar compra</h2>
            <button onClick={onClose} aria-label="Cerrar" className="h-9 w-9 grid place-items-center rounded-full hover:bg-white/5">
              <X className="h-5 w-5" />
            </button>
          </div>
          <ol className="mt-4 flex items-center gap-2">
            {STEPS.map((label, i) => (
              <li key={label} className="flex items-center gap-2 flex-1">
                <span
                  className={`h-7 w-7 shrink-0 grid place-items-center rounded-full text-xs font-bold border ${
                    i < step
                      ? "bg-primary text-primary-foreground border-primary"
                      : i === step
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <span className={`text-xs ${i === step ? "font-bold" : "text-muted-foreground"}`}>{label}</span>
                {i < STEPS.length - 1 && <span className="flex-1 h-px bg-border" />}
              </li>
            ))}
          </ol>
        </header>

        {/* Contenido del paso */}
        <div className="flex-1 overflow-y-auto p-5">
          {step === 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold">¿Cómo querés pagar?</h3>
              {PAYMENT_METHODS.map(({ id, label, desc, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPayment(id)}
                  className={`w-full glass rounded-2xl p-4 flex items-center gap-3 text-left transition ${
                    payment === id ? "ring-2 ring-primary glow-brand" : "hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-6 w-6 text-primary shrink-0" />
                  <span className="flex-1">
                    <span className="block font-bold text-sm">{label}</span>
                    <span className="block text-xs text-muted-foreground">{desc}</span>
                  </span>
                  {payment === id && <Check className="h-5 w-5 text-primary shrink-0" />}
                </button>
              ))}
            </div>
          )}

          {step === 1 && <AddressStep onValidChange={onValidChange} />}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Revisá tu pedido</h3>

              <div className="glass rounded-2xl p-4 space-y-2">
                {cart.map(({ product, qty }) => (
                  <div key={product.id} className="flex justify-between gap-3 text-sm">
                    <span className="min-w-0 truncate">
                      {product.name} <span className="text-muted-foreground">×{qty}</span>
                    </span>
                    <span className="font-semibold shrink-0">{formatPrice(product.price * qty)}</span>
                  </div>
                ))}
              </div>

              <div className="glass rounded-2xl p-4 space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold">{shipping?.name}</p>
                    <p className="text-xs text-muted-foreground">{shipping?.address}</p>
                    {shipping?.details && <p className="text-xs text-muted-foreground">{shipping.details}</p>}
                    <p className="text-xs text-muted-foreground">Tel: {shipping?.phone}</p>
                  </div>
                </div>
                <div className="border-t border-border pt-2 space-y-1">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Envío{shipping?.zoneName ? ` (${shipping.zoneName})` : ""}</span>
                    <span>{covered && shipping?.cost !== null ? formatPrice(shippingCost) : "A coordinar"}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="font-bold">Total</span>
                    <span className="text-xl font-black text-gradient-brand">{formatPrice(orderTotal)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Pago: {payment}</p>
                </div>
              </div>

              {!covered && (
                <p className="text-xs text-muted-foreground glass rounded-xl p-3">
                  Tu dirección está fuera de la zona habitual: el costo de envío se coordina por WhatsApp y no está incluido en el total.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer con acciones */}
        <footer className="border-t border-border p-4 flex gap-2">
          {step > 0 && (
            <button onClick={() => setStep((s) => s - 1)} className="glass rounded-full px-4 py-3 text-sm inline-flex items-center gap-2 hover:bg-white/5">
              <ArrowLeft className="h-4 w-4" /> Volver
            </button>
          )}
          {step < 2 ? (
            <button
              onClick={() => canContinue && setStep((s) => s + 1)}
              disabled={!canContinue}
              className="btn-brand flex-1 rounded-full py-3 text-sm disabled:opacity-50"
            >
              Continuar
            </button>
          ) : (
            <button onClick={confirm} className="btn-brand flex-1 rounded-full py-3 text-sm inline-flex items-center justify-center gap-2">
              <MessageCircle className="h-4 w-4" /> Confirmar pedido
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
