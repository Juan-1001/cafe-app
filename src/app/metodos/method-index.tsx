"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Lo que la rejilla necesita saber de cada método, ya resuelto en el servidor. Se pasa
 * así, plano, porque este componente baja al navegador y no puede leer el contenido
 * ni mirar el disco para saber si una foto existe.
 */
export type MethodCard = {
  slug: string;
  name: string;
  tagline: string;
  /** El nivel de dificultad, 1 a 3, que es lo que filtra. */
  level: number;
  /** «01», «02», «03»: el número fijo del nivel, igual que en la ficha. */
  levelNumber: string;
  /** «Tolerante», «Preciso», «Implacable». */
  chip: string;
  time: string;
  image: { src: string | null; alt: string };
};

export type LevelFilter = { level: number; label: string };

type Variant = "featured" | "side" | "row";

/**
 * Cada forma de tarjeta del diseño. La foto va por proporción y no por alto fijo, y la
 * proporción es la que dibuja el diseño en cada ancho: así el recuadro tiene la forma
 * correcta mida lo que mida la columna.
 *
 * La lateral no lleva entradilla, igual que en el diseño: son dos tarjetas apiladas en
 * la altura de la destacada y con texto no cabrían.
 */
const VARIANTS: Record<
  Variant,
  { photo: string; title: string; tagline: string | null; sizes: string }
> = {
  featured: {
    photo: "aspect-[335/300] lg:aspect-[922/520]",
    title: "text-[40px] lg:text-[52px]",
    tagline: "text-base lg:text-[17px]",
    sizes: "(min-width: 1024px) 60vw, 100vw",
  },
  side: {
    photo: "aspect-[335/200] lg:aspect-[405/210]",
    title: "text-[28px]",
    tagline: null,
    sizes: "(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw",
  },
  row: {
    photo: "aspect-[335/200] lg:aspect-[423/240]",
    title: "text-[28px]",
    tagline: "text-[15px]",
    sizes: "(min-width: 768px) 33vw, 100vw",
  },
};

/**
 * Una tarjeta de método. Toda la tarjeta es el enlace.
 *
 * La etiqueta lleva esquinas rectas aunque el diseño la dibuje como cápsula: el sitio no
 * redondea esquinas en ninguna parte y así se decidió al pasar este diseño a /metodos.
 */
function Card({ method, variant }: { method: MethodCard; variant: Variant }) {
  const shape = VARIANTS[variant];

  return (
    <Link
      href={`/metodos/${method.slug}`}
      // En móvil sin margen lateral: no hay filetes verticales que separar, y con él
      // la foto quedaba sangrada dos veces respecto al titular de la página.
      className="group flex h-full flex-col gap-5 py-6 md:p-7"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-coffee">
          Nivel {method.levelNumber}
        </p>
        <p className="border border-ink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] whitespace-nowrap text-ink">
          <span className="sr-only">Dificultad: </span>
          {method.chip} · <span className="sr-only">tiempo: </span>
          {method.time}
        </p>
      </div>

      <div className={`relative w-full overflow-hidden bg-dust ${shape.photo}`}>
        {method.image.src ? (
          <Image
            src={method.image.src}
            alt={method.image.alt}
            fill
            sizes={shape.sizes}
            className="object-cover"
          />
        ) : null}
      </div>

      <h3
        className={`font-display leading-[1.1] tracking-[-0.01em] text-ink group-hover:text-lavender-deep ${shape.title}`}
      >
        {method.name}
      </h3>

      {shape.tagline ? (
        <p className={`max-w-[62ch] leading-[1.6] text-coffee ${shape.tagline}`}>
          {method.tagline}
        </p>
      ) : null}

      <span className="mt-auto font-mono text-[11px] uppercase tracking-[0.1em] text-lavender-deep underline underline-offset-4">
        Leer ↗
      </span>
    </Link>
  );
}

/**
 * Reparte los métodos en filas de como mucho tres, lo más parejas posible: con siete,
 * 3 + 2 + 2 y no 3 + 3 + 1. Una fila con una sola tarjeta dejaría dos casillas vacías
 * con su filete, y eso se lee como un hueco, no como una decisión.
 */
function balancedRows<T>(items: T[]): T[][] {
  if (items.length === 0) return [];
  const count = Math.ceil(items.length / 3);
  const base = Math.floor(items.length / count);
  const extra = items.length % count;

  const rows: T[][] = [];
  let start = 0;
  for (let index = 0; index < count; index++) {
    const size = base + (index < extra ? 1 : 0);
    rows.push(items.slice(start, start + size));
    start += size;
  }
  return rows;
}

/** Una fila de la rejilla: en columna en móvil y en fila desde 768 px. */
function Row({ methods }: { methods: MethodCard[] }) {
  return (
    <ul className="flex flex-col border-b border-dust md:flex-row">
      {methods.map((method) => (
        <li
          key={method.slug}
          className="min-w-0 flex-1 border-b border-dust last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0"
        >
          <Card method={method} variant="row" />
        </li>
      ))}
    </ul>
  );
}

/**
 * El filtro por nivel y la rejilla, juntos porque el uno decide lo que enseña la otra.
 *
 * Con «Todos» la rejilla es la del diseño: el método de entrada en grande, los dos
 * siguientes apilados a su lado y el resto en filas. Con un nivel elegido no hay
 * destacada: el método de entrada solo tiene sentido como puerta de toda la sección, y
 * destacar «el primero de los precisos» sería inventarse una jerarquía que nadie
 * decidió.
 *
 * El filtro no cambia la dirección de la página, así que no se puede compartir un
 * enlace ya filtrado. Con diez métodos no hace falta; si algún día sí, se pasa a un
 * parámetro de la URL.
 */
export function MethodIndex({
  methods,
  featuredSlug,
  levels,
}: {
  /** En el orden de dificultad. */
  methods: MethodCard[];
  featuredSlug: string;
  levels: LevelFilter[];
}) {
  const [level, setLevel] = useState<number | null>(null);

  const filters: { level: number | null; label: string }[] = [
    { level: null, label: "Todos" },
    ...levels,
  ];

  const featured =
    level === null ? methods.find((method) => method.slug === featuredSlug) : undefined;
  const rest = methods.filter(
    (method) =>
      method !== featured && (level === null || method.level === level),
  );
  const side = featured ? rest.slice(0, 2) : [];
  const rows = balancedRows(featured ? rest.slice(2) : rest);

  return (
    <>
      <div className="border-b border-dust pb-7">
        <div className="flex flex-col gap-2">
          <p
            id="filtro-nivel"
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink"
          >
            Nivel ·
          </p>

          <div
            role="group"
            aria-labelledby="filtro-nivel"
            className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-coffee"
          >
            {filters.map((filter, index) => {
              const active = filter.level === level;
              return (
                <span key={filter.label} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setLevel(filter.level)}
                    className={
                      active
                        ? "text-ink underline underline-offset-4"
                        : "hover:text-ink"
                    }
                  >
                    {filter.label}
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {featured ? (
        <div className="flex flex-col border-b border-dust lg:flex-row">
          <div className="border-b border-dust lg:flex-[2_0_0] lg:border-r lg:border-b-0">
            <Card method={featured} variant="featured" />
          </div>

          <ul className="flex flex-col md:flex-row lg:flex-[1_0_0] lg:flex-col">
            {side.map((method) => (
              <li
                key={method.slug}
                className="min-w-0 flex-1 border-b border-dust last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0 lg:border-r-0 lg:border-b lg:last:border-b-0"
              >
                <Card method={method} variant="side" />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {rows.map((row) => (
        <Row key={row.map((method) => method.slug).join()} methods={row} />
      ))}
    </>
  );
}
