import Link from "next/link";

/**
 * Cabecera del sitio. Solo aparecen las secciones que ya existen: enlazar a
 * /granos, /recetas o /tiendas antes de construirlas dejaría enlaces a un 404.
 * Cada sección nueva se añade a esta lista cuando su ruta esté en pie.
 */
const NAV_LINKS = [
  { href: "/metodos", label: "Métodos" },
] as const;

export function SiteHeader() {
  return (
    <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 px-6 pt-8 md:px-16 md:pt-10">
      <Link href="/" className="font-display text-2xl leading-none">
        Café
      </Link>

      <nav>
        <ul className="flex gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest text-coffee hover:text-lavender-deep"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
