import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { articlesByJourney } from "@/content/granos";
import { getEntryMethod, home } from "@/content/home";
import {
  brewMethodsByDifficulty,
  methodDifficulty,
} from "@/content/metodos";
import type { ContentImage } from "@/content/metodos";
import { Eyebrow } from "./eyebrow";
import { ClockIcon } from "./icons";
import { DifficultyMeter } from "./metodos/indicators";

export const metadata: Metadata = {
  title: "Café · De dónde viene y cómo prepararlo",
  description:
    "Café de especialidad explicado desde cero: cómo preparar en casa el café que ya tienes y qué le pasó al grano antes de llegar a tu bolsa.",
};

/**
 * La fotografía del método de entrada. Se va a sangre —hasta el borde de la pantalla,
 * sin margen— y es la única imagen de la portada: es la invitación a hacer café hoy, y
 * si compartiera protagonismo con otras cinco dejaría de ser una invitación para ser un
 * catálogo.
 *
 * La proporción es 3:2 en todos los anchos, igual que en /metodos y en la ficha, porque
 * es la misma foto: recortarla de otra manera aquí le quitaría justo lo de los bordes,
 * que en una foto de método es la mano que sirve y la mesa.
 */
function EntryImage({ image }: { image: ContentImage }) {
  if (!image.src) {
    return <div className="aspect-[3/2] w-full bg-dust" aria-hidden="true" />;
  }

  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden bg-dust">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 768px) 58vw, 100vw"
        className="object-cover"
        priority
      />
    </div>
  );
}

/**
 * El enlace que cierra un bloque y lleva a la sección entera.
 *
 * Va en mono pequeño sobre crema, así que el lavanda tiene que ser `lavender-deep`: el
 * `lavender` a 12 px no llega al contraste mínimo. La flecha es decoración y queda
 * oculta al lector de pantalla, que ya oye a dónde va el enlace.
 */
function SectionLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="inline-block font-mono text-xs uppercase tracking-widest text-lavender-deep hover:underline"
    >
      {children}
      <span aria-hidden="true"> →</span>
    </Link>
  );
}

/**
 * Cuánto se desplaza a la derecha cada parada del recorrido del grano: la lista baja en
 * escalera para que el camino se vea antes de leerlo.
 *
 * El desplazamiento existe en los dos anchos y no solo en escritorio, para que el
 * recurso sea el mismo en el móvil y no una variante por punto de corte. En pantalla
 * pequeña los pasos son cortos (12 y 24 px) porque ahí cada píxel de sangrado se lo
 * quita al ancho de lectura; en escritorio sobra sitio y se abren.
 *
 * Hoy el recorrido tiene tres paradas y esta lista cubre las tres. Si algún día hubiera
 * una cuarta, se queda en el último escalón en vez de seguir saliéndose a la derecha.
 */
const STAGE_INDENT = ["", "ml-3 md:ml-16", "ml-6 md:ml-32"] as const;

export default function Home() {
  const entryMethod = getEntryMethod();

  // Los demás, en el mismo orden que la página de métodos: del más accesible al que más
  // pide. El de entrada se quita porque ya está arriba, en grande.
  const otherMethods = brewMethodsByDifficulty().filter(
    (method) => method.slug !== entryMethod.slug,
  );

  const journeyGroups = articlesByJourney();

  return (
    /*
     * La portada no tiene un contenedor único: cada bloque pone su propio margen
     * lateral y su propio alto. Eso es lo que permite que la foto llegue al borde de la
     * pantalla y que el ritmo vertical no sea el mismo en toda la página.
     */
    <div className="pb-24 md:pb-36">
      {/*
        El titular ocupa el ancho entero y la entradilla entra después por la derecha,
        dejando vacía la columna de la izquierda. Ese hueco es la composición: no es un
        titular centrado con su párrafo debajo.
      */}
      <header className="px-6 pt-16 pb-20 md:px-16 md:pt-24 md:pb-32">
        {/*
          En lavanda, que es el acento protagonista del sitio. Eso obliga a lo demás: el
          lavanda sobre crema solo llega al contraste mínimo a partir de 24 px, así que
          este titular no baja de 60 px en móvil (`text-6xl`) ni de 96 px en escritorio
          (`text-8xl`), y ningún texto pequeño de la página hereda este color. Donde hace
          falta lavanda en pequeño —los enlaces de sección— se usa `lavender-deep`.
        */}
        <h1 className="max-w-[24ch] font-display text-6xl leading-none text-lavender md:text-8xl">
          {home.title}
        </h1>

        <div className="mt-12 md:mt-20 md:grid md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-16">
          <div className="md:col-start-2">
            <p className="max-w-[58ch] text-lg text-coffee md:text-xl">
              {home.intro[0]}
            </p>
            <p className="mt-5 max-w-[58ch] text-base text-coffee md:text-lg">
              {home.intro[1]}
            </p>
          </div>
        </div>
      </header>

      {/*
        El bloque de entrada. La foto se va al borde derecho de la pantalla y el texto se
        queda en el margen izquierdo de la página, así que la fila entera está
        descentrada a propósito. En móvil la foto va primero y a todo lo ancho.
      */}
      <section className="border-t border-dust">
        <Link
          href={`/metodos/${entryMethod.slug}`}
          className="group block md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center md:gap-16 md:pl-16"
        >
          <div className="md:order-2">
            <EntryImage image={entryMethod.image} />
          </div>

          <div className="px-6 py-12 md:px-0 md:py-20">
            <h2 className="font-mono text-xs uppercase tracking-widest text-sage-deep">
              {home.entry.label}
            </h2>

            <p className="mt-4 max-w-[42ch] text-base text-coffee md:text-lg">
              {home.entry.note}
            </p>

            <h3 className="mt-10 font-display text-5xl leading-none group-hover:text-lavender-deep md:text-7xl">
              {entryMethod.name}
            </h3>

            <p className="mt-5 max-w-[46ch] text-base text-coffee md:text-lg">
              {entryMethod.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-dust pt-5">
              <DifficultyMeter
                level={methodDifficulty(entryMethod).level}
                label={methodDifficulty(entryMethod).levelInfo.chip}
              />
              {/* Todos los métodos duran algo; lo que cambia es la unidad en la que
                  se dice, y eso es contenido. Ver `BrewSpecs`. */}
              <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-coffee">
                <ClockIcon />
                {entryMethod.specs.totalTime.value}
              </span>
            </div>

            <div className="mt-6">
              <Eyebrow>Perfil de taza</Eyebrow>
              {/* Aquí el lavanda es texto de 24 px o más, que es donde sí llega al
                  contraste mínimo sobre crema. */}
              <p className="mt-1 font-display text-2xl leading-none text-lavender-deep md:text-3xl">
                {entryMethod.specs.cupProfile.value}
              </p>
            </div>

            <p className="mt-8 font-mono text-xs uppercase tracking-widest text-lavender-deep group-hover:underline">
              Ver el paso a paso
              <span aria-hidden="true"> →</span>
            </p>
          </div>
        </Link>
      </section>

      {/*
        Los demás métodos, en una línea cada uno. No llevan foto: la de arriba es la que
        invita, y repetir el recurso con fotos pequeñas convertiría la portada en el
        índice de /metodos. Si algún día el de entrada es el único método que hay, este
        bloque no se pinta en lugar de quedarse como un rótulo sin lista.
      */}
      {otherMethods.length > 0 && (
        <section className="px-6 pt-20 md:px-16 md:pt-32">
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-dust pt-4">
            <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
              {home.moreMethods.label}
            </h2>
            <p className="text-sm text-coffee md:ml-auto md:max-w-[46ch] md:text-right">
              {home.moreMethods.note}
            </p>
          </div>

          <ul>
            {otherMethods.map((method) => (
              <li key={method.slug} className="border-t border-dust first:border-t-0">
                <Link
                  href={`/metodos/${method.slug}`}
                  className="group flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 py-8 md:py-10"
                >
                  <h3 className="font-display text-4xl leading-none group-hover:text-lavender-deep md:text-5xl">
                    {method.name}
                  </h3>

                  <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-coffee">
                    <ClockIcon />
                    {method.specs.totalTime.value}
                    <span aria-hidden="true">·</span>
                    {methodDifficulty(method).levelInfo.chip}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-dust pt-5">
            <SectionLink href="/metodos">{home.moreMethods.link}</SectionLink>
          </div>
        </section>
      )}

      {/*
        El recorrido del grano. Es el segundo movimiento de la página —el «por qué»
        después del «cómo»— y por eso su rótulo lleva el filete grueso de lavanda,
        mientras que el de los otros métodos va en filete fino: no son dos bloques del
        mismo peso, y si los dos se dibujaran igual la portada sería una sucesión de
        franjas iguales.
      */}
      <section className="px-6 pt-24 md:px-16 md:pt-40">
        <div className="border-t-2 border-lavender pt-4 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
            {home.journey.label}
          </h2>
          <p className="mt-4 max-w-[54ch] text-base text-coffee md:mt-0">
            {home.journey.note}
          </p>
        </div>

        {/*
          Una lista ordenada porque el recorrido lo es: la planta va antes que la finca, y
          la finca antes que el tostador. Los números que se ven son los de la etapa
          —escritos en el contenido y estables— y no los que pintaría el navegador, así
          que la numeración automática se quita.
        */}
        <ol className="mt-16 list-none md:mt-24">
          {journeyGroups.map(({ stage, articles }, index) => (
            <li
              key={stage.key}
              className={`mt-12 border-t border-dust pt-6 first:mt-0 ${
                STAGE_INDENT[index] ?? STAGE_INDENT[STAGE_INDENT.length - 1]
              }`}
            >
              <p className="font-mono text-xs tracking-widest">
                <span className="text-lavender-deep">{stage.number}</span>
                <span className="ml-4 uppercase text-ink">{stage.title}</span>
              </p>

              <ul className="mt-6">
                {articles.map((article) => (
                  <li key={article.slug} className="mt-8 first:mt-0">
                    <Link href={`/granos/${article.slug}`} className="group block">
                      <h3 className="font-display text-4xl leading-none group-hover:text-lavender-deep md:text-5xl">
                        {article.title}
                      </h3>
                      <p className="mt-4 max-w-[56ch] text-base text-coffee md:text-lg">
                        {article.tagline}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="mt-12 border-t border-dust pt-5">
          <SectionLink href="/granos">{home.journey.link}</SectionLink>
        </div>
      </section>
    </div>
  );
}
