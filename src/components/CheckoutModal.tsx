import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (payment: string, notes: string) => void;
}

export function CheckoutModal({
  open,
  onClose,
  onConfirm,
}: Props) {
  const [payment, setPayment] = useState("Transferencia");
  const [notes, setNotes] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-strong rounded-3xl w-full max-w-md p-6 border border-border">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            Confirmar pedido
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <label className="text-sm font-semibold">
          Forma de pago
        </label>

        <div className="space-y-2 mt-3">

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={payment === "Transferencia"}
              onChange={() => setPayment("Transferencia")}
            />
            Transferencia
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={payment === "Tarjeta"}
              onChange={() => setPayment("Tarjeta")}
            />
            Tarjeta
          </label>

        </div>

        <div className="mt-6">

          <label className="text-sm font-semibold">
            Observaciones
          </label>

          <textarea
            className="mt-2 w-full rounded-xl bg-background border border-border p-3"
            rows={4}
            placeholder="Ej: retirar mañana..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

        </div>

        <button
          className="btn-brand w-full mt-6 py-3 rounded-full"
          onClick={() => onConfirm(payment, notes)}
        >
          Enviar por WhatsApp
        </button>

      </div>
    </div>
  );
}
