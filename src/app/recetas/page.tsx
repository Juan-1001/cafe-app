import type { Metadata } from "next";
import Image from "next/image";
import { Eyebrow } from "@/app/eyebrow";
import { PhotoCredits } from "@/app/photo-credits";
import { resolveContentImage } from "@/content/image";
import { recipes, recipesCover, recipesCoverBackground } from "@/content/recetas";
import { RecipeIndex, type RecipeCard } from "./recipe-index";

export const metadata: Metadata = {
  title: "Recetas",
  description:
    "Preparaciones concretas con café: espressos, filtrados, bebidas con leche y combinados fríos, con sus proporciones y sus pasos.",
};

const TEMPERATURE_LABEL = { caliente: "Caliente", fria: "Fría" } as const;

/**
 * El índice de recetas, del diseño «Recetas — bento» de Figma.
 *
 * El banner de arriba lleva un velo de `ink` al 40 % sobre la foto. Es la segunda
 * excepción declarada a la regla de no oscurecer —la primera es la tarjeta de la moka—
 * y está anotada en «Antipatrones visuales» de CLAUDE.md. El velo es el token `ink` con
 * opacidad y no un negro escrito a mano, para que no entre un color de fuera de la
 * paleta.
 */
export default function RecipesPage() {
  const cover = resolveContentImage(recipesCover);
  const coverBackground = resolveContentImage(recipesCoverBackground);

  const cards: RecipeCard[] = recipes.map((recipe) => {
    const image = resolveContentImage(recipe.image);
    return {
      slug: recipe.slug,
      name: recipe.name,
      tagline: recipe.tagline,
      temperature: recipe.temperature,
      family: recipe.family,
      meta: `${TEMPERATURE_LABEL[recipe.temperature]} · ${recipe.base} · ${recipe.time}`,
      image: { src: image.src, alt: image.alt },
    };
  });

  return (
    <div className="px-6 pt-8 pb-24 md:px-16 md:pt-12 md:pb-30">
      {/*
        El banner. Detrás, la foto estirada a lo ancho y bajo el velo; en el recuadro
        del centro, la misma foto entera: son las dos imágenes del diseño. Al ser la
        misma, el texto alternativo va una sola vez, en la del centro; la de fondo es
        adorno.
        Las dos cargan sin esperar: son lo primero que se ve al abrir la página, y en
        carga diferida el banner salía unos instantes como un rectángulo gris.
      */}
      {cover.src ? (
        <div className="relative flex h-55 items-center justify-center overflow-hidden rounded-[2px] md:h-90">
          {coverBackground.src ? (
            <Image
              src={coverBackground.src}
              alt=""
              fill
              loading="eager"
              sizes="100vw"
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-ink/40" aria-hidden="true" />
          <div className="relative h-[70%] w-[80%] max-w-[608px] overflow-hidden rounded-[2px] md:h-[274px]">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              loading="eager"
              sizes="(min-width: 768px) 608px, 80vw"
              className="object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="h-55 rounded-[2px] bg-dust md:h-90" aria-hidden="true" />
      )}

      {/*
        El titular va en dos líneas, como en el diseño, y para eso cede el cuerpo y no
        la caja (el criterio de «Pendientes conocidos» en CLAUDE.md): con la Fraunces
        del sitio «Ya sabes prepararlo.» mide 9 veces su cuerpo, y a los 96 px del
        diseño son 864 px en una columna de 797. El cuerpo sale del ancho de esa
        columna —la pantalla menos los márgenes (128), la entradilla (452) y el hueco
        (48)— dividido entre 9,5 y no entre 9, para dejar un 5 % de holgura elegida:
        84 px a 1440 de pantalla y 67 a 1280. Por debajo de 1280 el titular va encima
        de la entradilla y tiene el ancho entero.
      */}
      <header className="mt-12 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between xl:gap-12">
        <div className="min-w-0">
          <Eyebrow tone="lavender">Recetas</Eyebrow>
          <h1 className="mt-3 font-display text-5xl leading-[0.96] tracking-[-0.025em] text-ink md:text-7xl xl:text-[min(84px,calc((100vw-628px)/9.5))]">
            Ya sabes prepararlo.{" "}
            <span className="block text-lavender-deep">Ahora juega</span>
          </h1>
        </div>

        <div className="flex max-w-113 flex-col gap-4 xl:w-113 xl:shrink-0">
          <p className="text-[17px] leading-[1.65] text-coffee">
            Desde los clásicos espressos y cafés de preparación lenta hasta bebidas con
            leche de textura sedosa y refrescantes combinados cítricos.
          </p>
          <p className="font-display text-[19px] leading-normal text-lavender-deep italic">
            Elige según tu gusto y prepáralos con las proporciones adecuadas y pasos
            claros.
          </p>
        </div>
      </header>

      <div className="mt-12">
        <RecipeIndex recipes={cards} />
      </div>

      <PhotoCredits
        images={[cover, ...recipes.map((recipe) => resolveContentImage(recipe.image))]}
      />
    </div>
  );
}
