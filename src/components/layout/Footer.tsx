import { Instagram, MessageCircle, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer id="contacto" className="mt-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl font-black">i<span className="text-gradient-brand">BITE</span></div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Accesorios premium con estética futurista. Diseñados para brillar.
          </p>
        </div>

        <FooterCol title="Tienda" links={["Productos", "Ofertas", "Marcas", "Nuevos"]} />
        <FooterCol title="Ayuda" links={["Envíos", "Cambios", "Contacto", "FAQ"]} />

        <div>
          <h4 className="text-[11px] tracking-[0.25em] uppercase font-bold text-muted-foreground">Contacto</h4>
          <div className="mt-3 flex gap-2">
            <a href="https://www.instagram.com/ibite_accesorios/" target="_blank" rel="noreferrer" className="h-10 w-10 grid place-items-center rounded-full glass hover:glow-magenta"><Instagram className="h-4 w-4" /></a>
            <a href="https://wa.me/5490000000000" target="_blank" rel="noreferrer" className="h-10 w-10 grid place-items-center rounded-full glass hover:glow-brand"><MessageCircle className="h-4 w-4" /></a>
            <a href="mailto:hola@ibite.com" className="h-10 w-10 grid place-items-center rounded-full glass hover:glow-cyan"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-muted-foreground flex justify-between flex-wrap gap-2">
          <span>© {new Date().getFullYear()} iBITE Accesorios</span>
          <span>Hecho con estética neon.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-[11px] tracking-[0.25em] uppercase font-bold text-muted-foreground">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l}><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}
