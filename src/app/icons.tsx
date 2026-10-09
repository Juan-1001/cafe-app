/**
 * Iconos del sitio. Todos se dibujan igual —rejilla de 16, sin relleno, trazo de 1 y
 * remates redondos— para que nunca se note que vienen de sitios distintos, y todos
 * heredan el color del texto que acompañan en vez de traer el suyo.
 *
 * Van siempre `aria-hidden`: marcan de qué tipo es un dato, y el dato ya está escrito
 * al lado. Leerlos en voz alta solo repetiría.
 *
 * No son iconos decorativos de lista, que están en los antipatrones: no acompañan cada
 * punto de una enumeración, sino que identifican la clase de dato de una etiqueta.
 */

type IconProps = { className?: string };

/** Reloj. Marca un dato de tiempo. */
export function ClockIcon({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`${className} shrink-0`}
    >
      <circle cx="8" cy="8" r="6.25" />
      <path d="M8 4.5V8l2.4 1.7" />
    </svg>
  );
}
