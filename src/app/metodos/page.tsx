import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  DIFFICULTY_LEVELS,
  brewMethodsByDifficulty,
  methodDifficulty,
} from "@/content/metodos";
import type { BrewMethod, ContentImage } from "@/content/metodos";
import { resolveContentImage } from "@/content/image";
import { Eyebrow } from "@/app/eyebrow";
import { PhotoCredits } from "@/app/photo-credits";
import { ClockIcon, DifficultyMeter } from "./indicators";

export const metadata: Metadata = {
  title: "Métodos de preparación",
  description:
    "Cada método de preparación explicado paso a paso: qué necesitas, cuánto tarda y a qué sabe la taza que sale.",
};

/*
 * Los capítulos ya no se escriben aquí: son los niveles de `DIFFICULTY_LEVELS`, que
 * viven con la fórmula que los calcula. Antes esta lista repetía a mano el número, el
 * título y la nota de cada nivel, y podía desincronizarse del contenido sin que nada
 * avisara.
 *
 * Lo que no cambió es el lenguaje: los tres rótulos —«Perdonan casi todo», «Piden que
 * estés ahí», «No dan segunda oportunidad»— son los mismos de siempre. Al auditar el
 * sistema resultó que mapean uno a uno sobre los tres ejes que mandan, así que el
 * cálculo nuevo cabe debajo del copy viejo sin forzarlo.
 *
 * El número sigue siendo fijo y no calculado de la posición: si algún día no hay ningún
 * método intermedio, el capítulo de los exigentes sigue siendo el 03 y no pasa a ser el
 * 02. Un capítulo sin métodos no se pinta.
 */

/**
 * Rótulo de capítulo. Es una marca de sección, no un titular: va en mono pequeño, al
 * mismo tamaño que las demás etiquetas del sitio, para que el nombre del método sea
 * siempre lo más grande de la página. El lila queda reducido a la línea de arriba y
 * a la cifra; con cinco capítulos, la página son cinco reglas finas y no cinco
 * franjas de color peleándose con el contenido.
 *
 * La nota se va al extremo derecho en escritorio: ocupa el lado que la composición
 * deja libre, en lugar de amontonarse debajo del título.
 */
function ChapterLabel({
  chapter,
}: {
  chapter: (typeof DIFFICULTY_LEVELS)[number];
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t-2 border-lavender pt-4">
      <span className="font-mono text-xs tracking-widest text-lavender-deep">
        {chapter.number}
      </span>
      <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
        {chapter.category}
      </h2>
      <p className="text-sm text-coffee md:ml-auto md:max-w-[46ch] md:text-right">
        {chapter.note}
      </p>
    </div>
  );
}

/**
 * La fotografía del método, apaisada: es la forma en la que se fotografía un método
 * —el gesto de servir, la jarra y el cono en la misma toma— y no un retrato estrecho.
 *
 * La proporción es 3:2 también en móvil. Antes era 4:3 en pantalla pequeña, pero eso
 * obligaba a recortar la misma foto de dos maneras distintas según el ancho, y lo que
 * se pierde al recortar una foto de método es precisamente lo de los bordes: la mano
 * que sirve por arriba, la mesa por abajo.
 *
 * Mientras un método no traiga foto se pinta el bloque de color en ese mismo hueco.
 */
function MethodImage({ image }: { image: ContentImage }) {
  if (!image.src) {
    return <div className="aspect-[3/2] w-full bg-dust" aria-hidden="true" />;
  }

  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden bg-dust">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 768px) 55vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}

/**
 * Una entrada de la lista, a ancho completo. El perfil de taza cierra la fila por el
 * lado contrario al medidor: de todos los datos es el que hace elegir un método
 * y no otro, así que no puede quedar enterrado en el montón.
 */
function MethodEntry({
  method,
  mirrored,
}: {
  method: BrewMethod;
  /**
   * Las entradas van alternando el lado de la imagen. No es un adorno: con quince
   * métodos, quince filas idénticas se leen como una tabla, y así cada entrada usa
   * el lado de la página que la anterior dejó libre.
   */
  mirrored: boolean;
}) {
  const difficulty = methodDifficulty(method);

  return (
    <li className="border-t border-dust">
      <Link
        href={`/metodos/${method.slug}`}
        className={`group block py-10 md:grid md:gap-14 md:py-16 ${
          mirrored
            ? "md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
            : "md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
        }`}
      >
        <div className={mirrored ? "md:order-2" : undefined}>
          <MethodImage image={resolveContentImage(method.image)} />
        </div>

        <div className="mt-6 flex flex-col md:mt-0">
          <h3 className="font-display text-5xl leading-none group-hover:text-lavender-deep md:text-7xl">
            {method.name}
          </h3>

          <p className="mt-5 max-w-prose text-base text-coffee md:mt-6 md:text-lg">
            {method.tagline}
          </p>

          {/* Al fondo de la columna en escritorio, para que cierre a la misma altura
              que la imagen de al lado. */}
          <div className="mt-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-t border-dust pt-5 md:mt-auto">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <DifficultyMeter
                level={difficulty.level}
                label={difficulty.levelInfo.chip}
              />
              {/* Todos los métodos duran algo, así que esta casilla siempre está.
                  Lo que cambia es la unidad —«3:00 – 3:30», «5 – 8 min», «14 – 18 h»—
                  y esa diferencia es contenido: dice si el reloj manda o solo
                  orienta. Ver `BrewSpecs`. */}
              <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-coffee">
                <ClockIcon />
                {method.specs.totalTime.value}
              </span>
            </div>

            <div className="md:text-right">
              <Eyebrow>Perfil de taza</Eyebrow>
              <p className="mt-1 font-display text-2xl leading-none text-lavender-deep md:text-3xl">
                {method.specs.cupProfile.value}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

/**
 * El zigzag de las entradas se cuenta sobre la página entera y no dentro de cada
 * capítulo: si se reiniciara en cada uno, dos entradas seguidas podrían quedar con
 * la imagen del mismo lado justo a los lados del rótulo.
 */
function chapterSections(methods: BrewMethod[]) {
  let entryIndex = 0;

  return DIFFICULTY_LEVELS.map((chapter) => {
    const chapterMethods = methods.filter(
      (method) => methodDifficulty(method).level === chapter.level,
    );
    if (chapterMethods.length === 0) return null;

    return (
      <section key={chapter.number} className="mt-20 md:mt-32">
        <ChapterLabel chapter={chapter} />

        <ul className="mt-4">
          {chapterMethods.map((method) => (
            <MethodEntry
              key={method.slug}
              method={method}
              mirrored={entryIndex++ % 2 === 1}
            />
          ))}
        </ul>
      </section>
    );
  });
}

export default function BrewMethodsPage() {
  const methods = brewMethodsByDifficulty();

  return (
    <div className="px-6 pb-24 md:px-16 md:pb-36">
      {/* Titular a la izquierda y texto de entrada en la columna de la derecha: el
          hueco entre los dos es lo que hace que la cabecera ocupe el ancho entero. */}
      <header className="pt-16 md:pt-24">
        <Eyebrow>Métodos de preparación</Eyebrow>

        <div className="mt-6 md:grid md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end md:gap-16">
          <h1 className="font-display text-6xl leading-none md:text-8xl">
            Un mismo café, muchas tazas distintas
          </h1>

          <div className="mt-10 md:mt-0">
            <p className="max-w-prose text-lg text-coffee">
              Los mismos granos saben distinto según cómo pase el agua por ellos:
              cuánto tiempo están en contacto, a qué temperatura y qué se queda por
              el camino. Eso es la <em className="italic">extracción</em>, y cada
              método la resuelve a su manera.
            </p>

            <p className="mt-5 max-w-prose text-base text-coffee">
              Aquí tienes cada uno con su paso a paso, sus cantidades y, sobre todo,
              a qué sabe la taza que sale. Están ordenados de lo más fácil de lograr
              a lo que pide más pulso, así que si estás empezando, empieza por
              arriba.
            </p>
          </div>
        </div>
      </header>

      {chapterSections(methods)}

      <PhotoCredits
        images={methods.map((method) => resolveContentImage(method.image))}
      />
    </div>
  );
}
