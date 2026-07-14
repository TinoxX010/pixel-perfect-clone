import { Instagram, MessageCircle } from "lucide-react";

/**
 * FloatingButtons — WhatsApp + Instagram flotantes con animación,
 * glow y tooltip. Ambos conviven en la esquina inferior derecha.
 */
export function FloatingButtons() {
  return (
    <div className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-40 flex flex-col gap-3">
      <FloatingBtn
        href="https://www.instagram.com/ibite_accesorios/"
        label="Seguinos en Instagram"
        className="bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] glow-magenta"
      >
        <Instagram className="h-6 w-6 text-white" />
      </FloatingBtn>
      <FloatingBtn
        href="https://wa.me/+5492215749478"
        label="Escribinos por WhatsApp"
        className="bg-[#25D366] shadow-[0_0_30px_-6px_#25D366]"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </FloatingBtn>
    </div>
  );
}

function FloatingBtn({ href, label, className, children }: { href: string; label: string; className: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className={`group relative h-14 w-14 rounded-full grid place-items-center animate-floaty hover:scale-110 transition-transform ${className}`}
    >
      {children}
      <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap glass-strong text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
    </a>
  );
}
