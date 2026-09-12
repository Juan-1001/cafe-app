import { ClockIcon, LevelIcon, StageIcon } from "@/app/icons";
import type { ArticleLevel } from "@/content/granos";

/**
 * Una etiqueta de metadato del artículo.
 *
 * Van sueltas, con su recuadro, y no seguidas en una misma línea de texto: con tres
 * datos de naturaleza distinta pegados, el lector los leía como una frase corrida en
 * vez de como tres cosas que puede mirar por separado.
 *
 * Recuadro de borde fino y esquinas rectas, no cápsula redondeada: el sitio no usa
 * esquinas redondeadas en ninguna parte y una pastilla ovalada aquí cantaría.
 *
 * `label` se lee solo con lector de pantalla. El icono dice de qué tipo es el dato a
 * quien lo ve, y esto hace lo mismo para quien no: sin ello, «Introductorio» a secas
 * no dice que sea un nivel.
 */
function Pill({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <li className="inline-flex items-center gap-2 border border-dust px-3 py-2 font-mono text-xs uppercase tracking-widest text-coffee">
      {icon}
      {label ? <span className="sr-only">{label}: </span> : null}
      {children}
    </li>
  );
}

/**
 * Los metadatos del artículo. La etapa y el tiempo son opcionales porque no en todas
 * las páginas procede enseñarlos: en el índice la etapa ya la dice el rótulo de su
 * columna, y el tiempo de lectura solo aparece si varía de un artículo a otro.
 */
export function MetaPills({
  stage,
  level,
  minutes,
}: {
  stage?: string;
  level: ArticleLevel;
  minutes?: number;
}) {
  return (
    <ul className="flex flex-wrap gap-3">
      {stage ? (
        <Pill icon={<StageIcon />} label="Etapa del recorrido">
          {stage}
        </Pill>
      ) : null}

      <Pill icon={<LevelIcon />} label="Nivel">
        {level}
      </Pill>

      {minutes !== undefined ? (
        <Pill icon={<ClockIcon />}>{minutes} min de lectura</Pill>
      ) : null}
    </ul>
  );
}
