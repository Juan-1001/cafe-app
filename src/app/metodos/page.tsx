import type { Metadata } from "next";
import {
  DIFFICULTY_LEVELS,
  brewMethodsByDifficulty,
  methodDifficulty,
} from "@/content/metodos";
import { getEntryMethod } from "@/content/home";
import { resolveContentImage } from "@/content/image";
import { PhotoCredits } from "@/app/photo-credits";
import { MethodIndex, type MethodCard } from "./method-index";

export const metadata: Metadata = {
  title: "Métodos de preparación",
  description:
    "Cada método de preparación explicado paso a paso: qué necesitas, cuánto tarda y a qué sabe la taza que sale.",
};

/**
 * El índice de métodos, con la composición que el diseño de Figma dibujó para /granos
 * («índice rejilla») y que se trajo aquí: el nombre de la sección enorme, un filtro y
 * una rejilla de tarjetas con una destacada.
 *
 * Lo que se adaptó al pasar de artículos a métodos:
 *
 * - **El filtro es por nivel de dificultad** y no por etapa, que en métodos no existe.
 *   Los niveles y sus nombres salen de `DIFFICULTY_LEVELS`, los mismos de la ficha.
 * - **El orden del diseño («El recorrido / Lo más reciente») no está**: los métodos no
 *   tienen fecha y no hay un segundo criterio con datos detrás.
 * - **La destacada es el método de entrada de la home** (`home.entry.method`): una sola
 *   decisión editorial para las dos páginas, no dos que puedan contradecirse.
 * - **El cierre «Ver el recorrido completo» no está**: en /granos llevaba al recorrido,
 *   y aquí la rejilla ya es la sección entera.
 *
 * Con el diseño se fueron de esta página tres cosas que estaban: la entradilla sobre la
 * extracción, el perfil de taza de cada método y los rótulos de capítulo con su nota.
 * Las tres siguen en las fichas.
 */
export default function BrewMethodsPage() {
  const methods = brewMethodsByDifficulty();

  const cards: MethodCard[] = methods.map((method) => {
    const difficulty = methodDifficulty(method);
    const image = resolveContentImage(method.image);
    return {
      slug: method.slug,
      name: method.name,
      tagline: method.tagline,
      level: difficulty.level,
      levelNumber: difficulty.levelInfo.number,
      chip: difficulty.levelInfo.chip,
      time: method.specs.totalTime.value,
      image: { src: image.src, alt: image.alt },
    };
  });

  return (
    <div className="px-6 pb-24 md:px-16 md:pb-30">
      {/*
        El nombre de la sección es el titular, y su tamaño va atado al ancho de la
        pantalla: el 21 % del ancho, con el tope de 340 px del diseño. «Métodos» es una
        letra más larga que «Granos», la palabra para la que se dibujó, y con el tamaño
        fijo del diseño se saldría de la pantalla en móvil.

        El 21 % está medido en el navegador y la holgura es elegida: la palabra ocupa
        unos 295 px de los 327 que deja una pantalla de 375, y unos 605 de los 640 a
        768 px. Con el 23 % sobraban 4 px a 375 y a 768 ya no cabía. El precio es que a
        1440 px la letra se queda en 302 px y no en los 340 del diseño, que no llegan
        hasta una pantalla de 1620.
      */}
      <h1 className="pt-6 pb-7 font-display text-[min(21vw,340px)] leading-[0.88] tracking-[-0.04em] text-ink">
        Métodos
      </h1>

      <MethodIndex
        methods={cards}
        featuredSlug={getEntryMethod().slug}
        levels={DIFFICULTY_LEVELS.map((level) => ({
          level: level.level,
          label: level.category,
        }))}
      />

      <PhotoCredits
        images={methods.map((method) => resolveContentImage(method.image))}
      />
    </div>
  );
}
