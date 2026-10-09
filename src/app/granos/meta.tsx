import type { ArticleLevel } from "@/content/granos";

/**
 * Una etiqueta de metadato del artículo.
 *
 * Van sueltas, con su recuadro, y no seguidas en una misma línea de texto: con datos
 * de naturaleza distinta pegados, el lector los leía como una frase corrida en vez de
 * como cosas que puede mirar por separado.
 *
 * Recuadro de borde fino y esquinas rectas, no cápsula redondeada: el sitio no usa
 * esquinas redondeadas en ninguna parte y una pastilla ovalada aquí cantaría.
 *
 * Antes llevaban un icono delante que decía de qué tipo era el dato. El diseño del
 * índice las dibuja sin él, y no hace falta: «Introductorio» y «5 min» ya dicen solos
 * lo que son a quien los ve. `label` sigue haciendo ese trabajo para quien no los ve,
 * porque «Introductorio» leído a secas no dice que sea un nivel.
 */
function Pill({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <li className="border border-dust px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-coffee">
      {label ? <span className="sr-only">{label}: </span> : null}
      {children}
    </li>
  );
}

/**
 * Los metadatos de un artículo en el índice: el nivel y, si varía de un artículo a
 * otro, el tiempo de lectura (ver `readingTimesVary`).
 */
export function MetaPills({
  level,
  minutes,
}: {
  level: ArticleLevel;
  minutes?: number;
}) {
  return (
    <ul className="flex flex-wrap gap-2">
      <Pill label="Nivel">{level}</Pill>

      {minutes !== undefined ? (
        <Pill label="Tiempo de lectura">{minutes} min</Pill>
      ) : null}
    </ul>
  );
}
