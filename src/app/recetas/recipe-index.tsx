"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Lo que la rejilla necesita de cada receta, ya resuelto en el servidor (la foto ya
 * comprobada en disco). Plano porque este componente baja al navegador.
 */
export type RecipeCard = {
  slug: string;
  name: string;
  tagline: string;
  temperature: "caliente" | "fria";
  family: "espresso" | "filtrado" | null;
  /** «Fría · Espresso · 4 min», ya compuesto. */
  meta: string;
  image: { src: string | null; alt: string };
};

type Tone = "dust" | "lavender" | "ink";

/**
 * Contraste del texto pequeño: `coffee` sobre `dust` da 6,8:1; `ink` sobre `lavender`,
 * 4,8:1; `paper` sobre `ink`, 15,3:1. Las tres pasan AA.
 *
 * La de `ink` es una excepción declarada a la regla de no usar fondos oscuros, decidida
 * al pasar este diseño (ver «Antipatrones visuales» en CLAUDE.md).
 */
const TONE_CLASSES: Record<Tone, { card: string; meta: string; title: string; text: string }> = {
  dust: { card: "bg-dust", meta: "text-coffee", title: "text-ink", text: "text-coffee" },
  lavender: { card: "bg-lavender", meta: "text-ink", title: "text-ink", text: "text-ink" },
  ink: { card: "bg-ink", meta: "text-paper", title: "text-paper", text: "text-paper" },
};

/**
 * Dónde cae el recorte de la foto dentro de su casilla, en px: distancia al borde de
 * arriba y al de la derecha, y ancho; el alto sale de la proporción del archivo. Un
 * `right` negativo es un recorte que se sale de la casilla y queda cortado por ella,
 * como en el diseño.
 */
type Cutout = { top: number; right: number; width: number; height: number };

/**
 * Las siete casillas de la rejilla del diseño «Recetas — bento», en orden.
 *
 * Cada casilla lleva su color y su recorte medidos en Figma: el sitio del recorte se
 * calculó con la caja de la imagen en el diseño y el contorno del objeto dentro del
 * PNG, y se redondeó a múltiplos de 4. **Las medidas son de esa foto en esa casilla**:
 * van por posición, igual que el color, así que cambiar el orden de `recipes` o la foto
 * de una receta obliga a medir otra vez.
 *
 * `textWidth` es el ancho de la entradilla cuando el diseño la estrecha para no pisar
 * el recorte; sin él, ocupa la casilla entera.
 */
const BENTO: {
  tone: Tone;
  large: boolean;
  textAtBottom?: boolean;
  /** Ancho del título cuando el diseño lo parte: «Cold brew» / «con naranja». */
  titleWidth?: number;
  textWidth?: number;
  cutout: Cutout;
}[] = [
  { tone: "dust", large: true, cutout: { top: 224, right: 28, width: 216, height: 511 } },
  { tone: "dust", large: false, cutout: { top: 172, right: -140, width: 364, height: 259 } },
  {
    tone: "dust",
    large: false,
    textAtBottom: true,
    titleWidth: 240,
    textWidth: 312,
    cutout: { top: 28, right: -72, width: 256, height: 294 },
  },
  {
    tone: "lavender",
    large: false,
    textWidth: 416,
    cutout: { top: 164, right: -20, width: 252, height: 202 },
  },
  { tone: "dust", large: false, cutout: { top: 184, right: -32, width: 256, height: 229 } },
  {
    tone: "dust",
    large: true,
    textWidth: 348,
    cutout: { top: 80, right: -44, width: 276, height: 259 },
  },
  {
    tone: "ink",
    large: true,
    textWidth: 324,
    cutout: { top: 52, right: 32, width: 212, height: 312 },
  },
];

/**
 * Una casilla de receta: color de fondo, el texto arriba y el recorte de la foto sin
 * fondo, que se puede salir por los bordes y queda cortado por la casilla.
 *
 * Con `cutout` el recorte va donde lo pone el diseño; sin él (la rejilla regular de
 * móvil y de los filtros) va abajo a la derecha, en la mitad inferior de la casilla.
 * El texto va por encima del recorte, para que donde se crucen gane la lectura.
 */
function Card({
  recipe,
  tone,
  large,
  textAtBottom = false,
  titleWidth,
  textWidth,
  cutout,
}: {
  recipe: RecipeCard;
  tone: Tone;
  /** Título a 48 px, como en la casilla alta y en la fila de abajo del diseño. */
  large: boolean;
  textAtBottom?: boolean;
  titleWidth?: number;
  textWidth?: number;
  cutout?: Cutout;
}) {
  const colors = TONE_CLASSES[tone];

  return (
    <Link
      href={`/recetas/${recipe.slug}`}
      className={`group relative flex h-full flex-col gap-2 overflow-hidden rounded-[2px] p-4 ${
        textAtBottom ? "justify-end" : ""
      } ${colors.card}`}
    >
      {recipe.image.src ? (
        cutout ? (
          <Image
            src={recipe.image.src}
            alt={recipe.image.alt}
            width={cutout.width}
            height={cutout.height}
            sizes={`${cutout.width}px`}
            className="pointer-events-none absolute max-w-none"
            style={{
              top: cutout.top,
              right: cutout.right,
              width: cutout.width,
              height: "auto",
            }}
          />
        ) : (
          <div className="pointer-events-none absolute right-4 bottom-0 h-1/2 w-3/5">
            <Image
              src={recipe.image.src}
              alt={recipe.image.alt}
              fill
              sizes="(min-width: 768px) 25vw, 60vw"
              className="object-contain object-right-bottom"
            />
          </div>
        )
      ) : null}

      <p
        className={`relative font-mono text-[11px] uppercase tracking-[0.08em] ${colors.meta}`}
      >
        {recipe.meta}
      </p>

      <h3
        className={`relative font-display leading-[1.12] tracking-[-0.01em] group-hover:underline group-hover:underline-offset-4 ${colors.title} ${
          large ? "text-5xl" : "text-[40px]"
        }`}
        style={titleWidth ? { maxWidth: titleWidth } : undefined}
      >
        {recipe.name}
      </h3>

      <p
        className={`relative text-[15px] leading-[1.6] ${colors.text}`}
        style={textWidth ? { maxWidth: textWidth } : undefined}
      >
        {recipe.tagline}
      </p>
    </Link>
  );
}

/** Un botón de filtro, con la forma de las etiquetas del diseño. */
function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-[2px] border px-5 py-3 font-mono text-sm uppercase tracking-[0.08em] whitespace-nowrap ${
        active
          ? "border-ink bg-ink text-paper"
          : "border-dust text-coffee hover:border-coffee"
      }`}
    >
      {children}
    </button>
  );
}

type Temperature = "caliente" | "fria" | null;
type Family = "espresso" | "filtrado" | null;

const TEMPERATURES: { value: Temperature; label: string }[] = [
  { value: null, label: "Caliente y frío" },
  { value: "caliente", label: "Calientes" },
  { value: "fria", label: "Frías" },
];

const FAMILIES: { value: Family; label: string }[] = [
  { value: null, label: "Todas" },
  { value: "espresso", label: "A base de espresso" },
  { value: "filtrado", label: "A base de filtrados" },
];

/**
 * Los filtros, el recuento y la rejilla.
 *
 * Sin filtros, la rejilla es la del diseño: una casilla alta a la izquierda, un bloque
 * de cuatro a la derecha y una fila de dos debajo. Esa composición está pensada para
 * siete recetas en su orden. Con un filtro puesto ya no se puede respetar —quedarían
 * casillas vacías con su hueco—, así que las que quedan van en una rejilla regular. El
 * color de cada receta va con ella en las dos: la que vive en la casilla lavanda sigue
 * siendo lavanda al filtrar, para que el color no cambie de dueño al pulsar un botón.
 */
export function RecipeIndex({ recipes }: { recipes: RecipeCard[] }) {
  const [temperature, setTemperature] = useState<Temperature>(null);
  const [family, setFamily] = useState<Family>(null);

  const slotOf = (recipe: RecipeCard) =>
    BENTO[recipes.indexOf(recipe) % BENTO.length];

  const visible = recipes.filter(
    (recipe) =>
      (temperature === null || recipe.temperature === temperature) &&
      (family === null || recipe.family === family),
  );
  const unfiltered = temperature === null && family === null;
  const bento = (index: number) => {
    const recipe = recipes[index];
    const slot = BENTO[index];
    return <Card recipe={recipe} {...slot} />;
  };

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filtrar por temperatura"
          className="flex flex-wrap gap-2"
        >
          {TEMPERATURES.map((option) => (
            <Chip
              key={option.label}
              active={temperature === option.value}
              onClick={() => setTemperature(option.value)}
            >
              {option.label}
            </Chip>
          ))}
        </div>

        <div
          role="group"
          aria-label="Filtrar por base"
          className="flex flex-wrap gap-2"
        >
          {FAMILIES.map((option) => (
            <Chip
              key={option.label}
              active={family === option.value}
              onClick={() => setFamily(option.value)}
            >
              {option.label}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-12 flex items-end justify-between gap-6">
        <h2 className="font-display text-4xl leading-[0.96] tracking-[-0.025em] text-ink">
          Escoge una receta
        </h2>

        {/* El recuento se anuncia al cambiar de filtro: es la única señal, para quien
            no ve la rejilla, de que el botón ha hecho algo. */}
        <p
          aria-live="polite"
          className="flex items-end font-mono text-coffee"
        >
          <span className="text-[40px] leading-none tracking-[0.1em]">
            {String(visible.length).padStart(2, "0")}
          </span>
          <span className="pb-1 text-xs uppercase tracking-[0.1em]">
            {visible.length === 1 ? "receta" : "recetas"}
          </span>
        </p>
      </div>

      {/*
        La rejilla compuesta del diseño empieza en 1440 px, el ancho del diseño: los
        recortes están medidos para casillas de ese tamaño. Medido a 1280, las casillas
        anchas se estrechan unos 135 px, los recortes se meten bajo el texto y la
        entradilla del cold brew queda escrita encima de la naranja. Las columnas son las de Figma: tres iguales,
        la alta ocupa una y el bloque de la derecha dos; dentro, las casillas cuadradas
        miden 328 (330 en el diseño) y las anchas se llevan el resto. Por debajo de
        1440 las siete van en la rejilla regular, también sin filtro, y las dos
        versiones se alternan con `hidden`, que las saca del árbol de accesibilidad: el
        lector de pantalla solo encuentra una.
      */}
      {unfiltered && recipes.length === BENTO.length ? (
        <div className="mt-12 hidden flex-col gap-4 min-[1440px]:flex">
          <div className="grid h-169 grid-cols-3 gap-4">
            {bento(0)}

            <div className="col-span-2 grid grid-rows-2 gap-4">
              <div className="grid grid-cols-[328px_minmax(0,1fr)] gap-4">
                {bento(1)}
                {bento(2)}
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_328px] gap-4">
                {bento(3)}
                {bento(4)}
              </div>
            </div>
          </div>

          <div className="grid h-76 grid-cols-2 gap-4">
            {bento(5)}
            {bento(6)}
          </div>
        </div>
      ) : null}

      {visible.length > 0 ? (
        // Sin filtro, desde 1440 esta rejilla cede el sitio a la compuesta. Se esconde
        // el contenedor y no la lista porque `min-[1440px]:hidden` en la lista pierde
        // contra su `md:grid`: Tailwind ordena antes las variantes de ancho escritas a
        // mano que las de nombre, y gana la que va después.
        <div className={unfiltered ? "min-[1440px]:hidden" : undefined}>
          <ul className="mt-12 flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {visible.map((recipe) => (
              <li key={recipe.slug} className="h-105">
                <Card
                  recipe={recipe}
                  tone={slotOf(recipe).tone}
                  large={false}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-12 max-w-[52ch] border-t border-dust pt-6 text-base text-coffee">
          Todavía no hay ninguna receta con esa combinación. Prueba a quitar uno de los
          dos filtros.
        </p>
      )}
    </>
  );
}
