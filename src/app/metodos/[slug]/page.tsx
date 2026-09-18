import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/app/eyebrow";
import { PhotoCredits } from "@/app/photo-credits";
import { resolveEquipmentImage } from "@/content/equipo/photo";
import { resolveContentImage } from "@/content/image";
import {
  brewMethods,
  getBrewMethod,
  methodDifficulty,
} from "@/content/metodos";
import { parseRatio } from "@/content/metodos/ratio";
import { parseEndSeconds, toTimedSteps } from "@/content/metodos/timing";
import { ClockIcon, DifficultyMeter } from "../indicators";
import {
  Amounts,
  CupsControl,
  PlainSteps,
  RecipeAmountsProvider,
} from "./recipe-amounts";
import { RatioField } from "./ratio-field";
import { ShotAmounts } from "./shot-amounts";
import { TimedSteps } from "./timed-steps";
import type {
  BrewMethod,
  ContentImage,
  DeviceSizes,
  EquipmentNote,
  Grounding,
  ShotReading,
} from "@/content/metodos";
import { formatDate } from "@/app/date";

export const dynamicParams = false;

export function generateStaticParams() {
  return brewMethods.map((method) => ({ slug: method.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/metodos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const method = getBrewMethod(slug);
  if (!method) return {};

  return {
    title: `${method.name} · Métodos de preparación`,
    description: method.tagline,
  };
}

const SPEC_FIELDS = [
  { key: "ratio", label: "Ratio café / agua", isTime: false, isRatio: true },
  { key: "grind", label: "Molienda", isTime: false, isRatio: false },
  { key: "waterTemperature", label: "Temperatura del agua", isTime: false, isRatio: false },
  { key: "pressure", label: "Presión", isTime: false, isRatio: false },
  { key: "totalTime", label: "Tiempo total", isTime: true, isRatio: false },
  { key: "output", label: "Rendimiento", isTime: false, isRatio: false },
  { key: "cupProfile", label: "Perfil de taza", isTime: false, isRatio: false },
] as const satisfies readonly {
  key: keyof BrewMethod["specs"];
  label: string;
  isTime: boolean;
  isRatio: boolean;
}[];

/**
 * El pie de la casilla de molienda: una línea que lleva al artículo donde esa palabra
 * deja de ser una comparación con la sal.
 *
 * Está escrita **una sola vez y aquí**, junto al rótulo «Molienda», y no en los diez
 * archivos de contenido. El enlace es el mismo en las diez fichas, así que diez copias
 * serían diez sitios donde se puede quedar desactualizado; y el método once lo hereda sin
 * que nadie se acuerde, igual que hereda el cálculo de dificultad con solo puntuar sus
 * cuatro ejes.
 *
 * Va debajo de la nota y en su propio renglón. No se enlaza el valor —«Media-fina» es el
 * dato, y va a 24-30 px en mono— ni el rótulo, porque subrayar uno de los siete rótulos
 * de la tabla descuadraría la columna. Una línea aparte se lee como lo que es, «esto
 * tiene explicación en otro sitio», y cuesta un renglón en una tabla que ya tiene siete
 * filas.
 *
 * El color no es el de los demás enlaces del sitio, y es por el fondo: esta tabla vive
 * sobre `lavender`, no sobre `paper`. El `lavender-deep` que se usa en el resto de los
 * enlaces se queda en 1,5:1 contra ese fondo y desaparece; `ink` sobre `lavender` da
 * 4,9:1, que es lo que pide un texto pequeño. Al perder el color distintivo, lo que dice
 * que esto es un enlace es el subrayado, y el hover lo cierra en vez de cambiar de tono:
 * ningún color de la paleta llega al mínimo sobre este fondo, así que la respuesta al
 * puntero no puede ser de color.
 */
const GRIND_ARTICLE = {
  href: "/granos/la-molienda",
  text: "Qué significa «media» o «gruesa» →",
} as const;

/**
 * El título de los errores lleva el número escrito con letra, no en cifra, así que
 * no basta con interpolarlo: cada método trae los errores que tiene y aquí se busca
 * la palabra. Si algún día son más de ocho, el título se queda sin número y ya está.
 */
const NUMBER_WORDS = ["dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho"];

function mistakesHeading(count: number): string {
  const word = NUMBER_WORDS[count - 2];
  if (!word) return "Si algo salió mal, casi siempre es una de estas cosas";

  return `Si algo salió mal, casi siempre es una de estas ${word} cosas`;
}

/**
 * La foto de una pieza de equipo, cuadrada.
 *
 * Llega ya resuelta desde el catálogo: si el archivo todavía no está guardado, viene
 * con `src` en null y aquí se pinta el bloque de color. Para publicarla basta con
 * dejar el archivo en /public/images/equipo/ con el nombre que dice el catálogo; ni
 * este archivo ni el del contenido hay que tocarlos.
 */
function EquipmentImage({ image }: { image: ContentImage }) {
  if (!image.src) {
    return <div className="aspect-square w-full bg-dust" aria-hidden="true" />;
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-dust">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 768px) 30vw, 45vw"
        className="object-cover"
      />
    </div>
  );
}

export default async function BrewMethodPage({
  params,
}: PageProps<"/metodos/[slug]">) {
  const { slug } = await params;
  const method = getBrewMethod(slug);
  if (!method) notFound();

  /*
   * El ratio puede faltar, y faltar significa algo: en la moka la proporción no la
   * elige quien prepara. Si está, `index.ts` ya garantizó al compilar que se puede
   * leer, así que aquí un null solo puede venir de que no haya ratio.
   */
  const ratio = method.specs.ratio
    ? parseRatio(method.specs.ratio.value)
    : null;

  const difficulty = methodDifficulty(method);

  /*
   * El final de la preparación sale del tiempo total, y solo lo hay cuando ese tiempo
   * está escrito como reloj: «14 – 18 h» devuelve null, que es lo correcto.
   */
  const timedSteps = toTimedSteps(
    method.steps,
    parseEndSeconds(method.specs.totalTime.value),
  );

  /*
   * Hay cronómetro si hay algún paso que ocurra en él. Dos métodos no tienen ninguno:
   * la moka, cuyos pasos son sucesos («al fuego», «al gorgoteo»), y el cold brew, que
   * dura catorce horas. Sus fichas salen sin panel: un cronómetro que no puede marcar
   * nada sería un adorno que pide que lo pulses, y uno que contara hacia adelante
   * durante una noche entera no serviría para nada.
   */
  const hasTimer = timedSteps.some((step) => step.startSeconds !== null);

  // La ficha declara dónde va a estar su foto; esto mira si el archivo está de verdad
  // en /public y, si no, deja el bloque de color.
  const cover = resolveContentImage(method.image);

  // Se resuelven una vez y se usan dos: en la rejilla y en el pie de créditos. Así el
  // pie no puede acreditar una foto que la rejilla no llegó a pintar.
  const equipmentImages = method.equipment.map((item) =>
    resolveEquipmentImage(item.piece),
  );

  return (
    <RecipeAmountsProvider
      recipe={method.recipe}
      shot={method.shot}
      waterPerCoffeeGram={ratio ? ratio.water / ratio.coffee : 0}
    >
      {/* El mismo relleno de abajo que el resto del sitio, con cronómetro y sin él.
          Las fichas con cronómetro llevaban aquí 208 px en móvil para que la barra
          fija no tapara el final del artículo; ese trabajo lo hace ahora el pie del
          sitio, que es lo último del documento y abre el hueco él mismo. Mantenerlo
          aquí solo dejaba un vacío de crema del doble que en las demás páginas justo
          antes de la franja. */}
      <article className="pb-24 md:pb-32">
        <header>
          {/*
            La fotografía de cabecera. En escritorio ocupa el 80 % derecho en una
            banda ancha; el recuadro crema del título se le monta encima por abajo.
            Mientras un método no traiga foto, el mismo hueco se pinta en color.
          */}
          {cover.src ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-dust md:ml-[20%] md:aspect-[21/9] md:w-[80%]">
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                priority
                sizes="(min-width: 768px) 80vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div
              className="aspect-[4/3] w-full bg-dust md:ml-[20%] md:aspect-[21/9] md:w-[80%]"
              aria-hidden="true"
            />
          )}

          <div className="px-6 md:px-16">
            <div className="relative -mt-12 max-w-[85%] bg-paper pt-6 pr-6 md:-mt-24 md:max-w-[60%] md:pt-10 md:pr-12">
              <Eyebrow>Método de preparación</Eyebrow>
              <h1 className="mt-4 font-display text-6xl leading-none md:text-8xl">
                {method.name}
              </h1>
            </div>

            <p className="mt-8 max-w-prose text-lg text-coffee md:mt-10 md:text-xl">
              {method.tagline}
            </p>

            <div className="mt-8">
              <DifficultyMeter
                level={difficulty.level}
                label={difficulty.levelInfo.chip}
              />
            </div>
          </div>
        </header>

        <section className="mt-16 bg-lavender px-6 py-10 md:mt-28 md:px-16 md:py-14">
          {/* Alineado a la izquierda: a la derecha vive el panel fijo del cronómetro. */}
          <div className="md:flex md:items-start md:gap-16">
            <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
              Ficha técnica
            </h2>

            <div className="mt-8 md:mt-0">
              <CupsControl />
            </div>
          </div>

          {/* Lo que ocupa el sitio de la calculadora cuando el aparato manda. */}
          {method.device ? <DeviceAmounts device={method.device} /> : null}

          {/* Y cuando lo que manda es la cesta: se elige la dosis y sale el peso de bebida. */}
          {method.shot ? <ShotAmounts shot={method.shot} /> : null}

          <dl className="mt-8 md:grid md:grid-cols-2 md:gap-x-20">
            {SPEC_FIELDS.map(({ key, label, isTime, isRatio }) => {
              const spec = method.specs[key];
              // Una casilla que el método no trae no se pinta vacía ni con un «no
              // aplica»: desaparece, y lo que significa su ausencia se cuenta donde
              // toca. Ver el comentario de `BrewSpecs`.
              if (!spec) return null;

              const specRatio = isRatio ? parseRatio(spec.value) : null;

              return (
                <div key={key} className="border-t border-ink py-5 md:py-6">
                  <dt className="text-sm text-ink md:text-base">{label}</dt>
                  <dd>
                    {/* La del ratio es la única casilla que puede llevar algo que
                        elegir dentro, así que se pinta aparte. Ver `RatioField`. */}
                    {isRatio ? (
                      <RatioField spec={spec} ratio={specRatio} />
                    ) : (
                      <>
                        <p className="mt-2 flex items-center gap-2 font-mono text-2xl text-ink md:text-3xl">
                          {isTime ? <ClockIcon className="h-5 w-5" /> : null}
                          <Amounts text={spec.value} />
                        </p>
                        {spec.note ? (
                          <p className="mt-2 max-w-prose text-sm text-ink">
                            <Amounts text={spec.note} />
                          </p>
                        ) : null}

                        {key === "grind" ? (
                          <p className="mt-3">
                            <Link
                              href={GRIND_ARTICLE.href}
                              className="font-mono text-xs uppercase tracking-widest text-ink underline decoration-ink/50 underline-offset-4 hover:decoration-ink"
                            >
                              {GRIND_ARTICLE.text}
                            </Link>
                          </p>
                        ) : null}
                      </>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>

        <section className="mt-20 px-6 md:mt-28 md:px-16">
          <Eyebrow>Qué necesitas</Eyebrow>
          <h2 className="mt-4 max-w-prose font-display text-3xl md:text-5xl">
            El equipo mínimo para que salga igual cada vez
          </h2>

          {/* Solo en los métodos donde el equipo es la decisión y no una lista. */}
          {method.equipmentNote ? (
            <EquipmentIntro note={method.equipmentNote} />
          ) : null}

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-14 md:grid-cols-3 md:gap-x-10 md:gap-y-14">
            {method.equipment.map((item, index) => (
              <li key={item.name}>
                <EquipmentImage image={equipmentImages[index]} />
                <p className="mt-4 font-medium text-ink">{item.name}</p>
                {item.note ? (
                  <p className="mt-1 text-sm text-coffee">{item.note}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-24 px-6 md:mt-36 md:px-16">
          <Eyebrow>Paso a paso</Eyebrow>
          <h2 className="mt-4 max-w-prose font-display text-3xl md:text-5xl">
            {/* «Del café molido» y no «de la jarra vacía»: la moka no tiene jarra,
                y de los cinco métodos solo dos la usan. Lo que sí comparten los
                cinco es que empiezan con el café ya molido. */}
            {method.steps.length} pasos, del café molido a la taza servida
          </h2>

          {/* El final del último paso sale del tiempo total de la ficha técnica. Sin
              pasos que ocurran en el cronómetro, la misma lista se pinta sin él. */}
          {hasTimer ? (
            <TimedSteps steps={timedSteps} />
          ) : (
            <PlainSteps steps={timedSteps} />
          )}
        </section>

        {/* Solo el espresso: leer lo que sale es su método, no el remedio de un fallo. */}
        {method.reading ? <ReadingBlock reading={method.reading} /> : null}

        <section className="mt-24 px-6 md:mt-36 md:ml-[20%] md:px-16">
          <Eyebrow>Errores comunes</Eyebrow>
          <h2 className="mt-4 max-w-prose font-display text-3xl md:text-5xl">
            {mistakesHeading(method.commonMistakes.length)}
          </h2>

          <ul className="mt-12">
            {method.commonMistakes.map((mistake) => (
              <li
                key={mistake.problem}
                className="max-w-prose border-t border-dust py-8"
              >
                <h3 className="font-display text-2xl md:text-3xl">
                  {mistake.problem}
                </h3>
                <p className="mt-4 text-base text-coffee">
                  <span className="font-mono text-xs uppercase tracking-widest text-sage-deep">
                    Por qué pasa{" "}
                  </span>
                  {mistake.cause}
                </p>
                <p className="mt-3 text-base text-ink">
                  <span className="font-mono text-xs uppercase tracking-widest text-sage-deep">
                    Cómo se corrige{" "}
                  </span>
                  {mistake.fix}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {method.funFact ? (
          <section className="mt-24 px-6 md:mt-36 md:ml-[20%] md:px-16">
            <div className="max-w-prose bg-lavender px-6 py-10 md:px-10 md:py-12">
              <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
                Dato curioso
              </h2>
              <p className="mt-6 font-display text-2xl leading-snug text-ink md:text-3xl">
                {method.funFact.text}
              </p>
              {method.funFact.source ? (
                <p className="mt-6 text-sm text-ink">
                  Fuente: {method.funFact.source}
                </p>
              ) : null}
            </div>
          </section>
        ) : null}

        {method.grounding ? <GroundingBlock grounding={method.grounding} /> : null}

        {/* La portada y las miniaturas de equipo se acreditan juntas aquí abajo. Bajo
            cada miniatura cuadrada, una línea de crédito mediría casi tanto como la
            propia foto y convertiría la rejilla en un muro de letra pequeña. */}
        <div className="px-6 md:px-16">
          <PhotoCredits images={[cover, ...equipmentImages]} />
        </div>
      </article>
    </RecipeAmountsProvider>
  );
}

/**
 * Lo que ocupa el sitio de la calculadora en los métodos que no calculan nada.
 *
 * No es un selector, y la razón está en el propio código de al lado: `CupsControl`
 * ya advierte que un botón que no cambia nada invita a pulsarlo y no responde. Aquí
 * elegir un tamaño no cambiaría ninguna otra cifra de la página —no hay gramos que
 * recalcular—, así que esconder la mitad de la respuesta detrás de un clic solo
 * quitaría información. Con dos ollas, verlas a la vez gana.
 *
 * Va dentro de la banda lavender, así que todo el texto es `ink`: los tonos claros de
 * la paleta no llegan al contraste mínimo sobre ese fondo.
 */
function DeviceAmounts({ device }: { device: DeviceSizes }) {
  return (
    <div className="mt-10 border-t-2 border-ink pt-6 md:mt-12">
      <h3 className="font-mono text-xs uppercase tracking-widest text-ink">
        {device.question}
      </h3>

      {/* Los tamaños a la izquierda y lo que el aparato fija a la derecha: son dos
          respuestas distintas a la misma pregunta y no una lista de cuatro cosas. */}
      <div className="mt-6 md:flex md:items-start md:gap-16">
        <ul className="md:w-72 md:shrink-0">
          {device.sizes.map((size) => (
            <li
              key={size.label}
              // Con `flex-wrap`, si un nombre de olla largo y su capacidad no caben
              // en el ancho de un móvil, la capacidad baja a la línea siguiente en
              // vez de apretar las dos.
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink py-3"
            >
              <span className="font-display text-2xl leading-none text-ink">
                {size.label}
              </span>
              <span className="font-mono text-sm text-ink">{size.capacity}</span>
            </li>
          ))}
        </ul>

        <dl className="mt-8 md:mt-0">
          {device.fixed.map((item) => (
            <div key={item.label} className="mt-4 first:mt-0">
              <dt className="font-mono text-xs uppercase tracking-widest text-ink">
                {item.label}
              </dt>
              <dd className="mt-1 max-w-prose text-base text-ink">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-8 max-w-prose">
        {device.note.map((paragraph, index) => (
          <p key={index} className="mt-4 text-sm text-ink first:mt-0">
            {paragraph}
          </p>
        ))}
      </div>

      {device.source ? (
        <p className="mt-6 font-mono text-xs text-ink">
          Capacidades: {device.source}
        </p>
      ) : null}
    </div>
  );
}

/**
 * La entradilla de la lista de equipo, en los métodos donde el equipo es la decisión.
 *
 * Hoy solo la trae el espresso, que es el único cuya barrera no es la técnica sino el
 * aparato. Va antes de la rejilla y no después: quien llega aquí necesita saber para
 * quién es esa lista antes de leerla, no cuando ya la ha leído entera.
 *
 * La comprobación va en su propio recuadro, con filete grueso y sin fondo de color, y es
 * lo único destacado de la sección. Se lo ha ganado por lo que es: la primera información
 * de este sitio que el lector no tiene que creerse, porque la resuelve él en su cocina en
 * cinco segundos. Sin fondo lavender a propósito, para no competir con el dato curioso ni
 * con la banda de la ficha técnica.
 */
function EquipmentIntro({ note }: { note: EquipmentNote }) {
  return (
    <div className="mt-8">
      <div className="max-w-prose">
        {note.body.map((paragraph, index) => (
          <p key={index} className="mt-5 text-base text-coffee first:mt-0 md:text-lg">
            {paragraph}
          </p>
        ))}
      </div>

      {note.check ? (
        <div className="mt-10 max-w-prose border-2 border-ink px-6 py-8 md:px-10 md:py-10">
          <h3 className="font-display text-2xl leading-tight md:text-3xl">
            {note.check.title}
          </h3>

          {note.check.body.map((paragraph, index) => (
            <p key={index} className="mt-4 text-base text-ink">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Cómo leer lo que sale: qué ves, qué está pasando y qué cambias en la siguiente.
 *
 * Tiene forma propia y no la de los errores comunes, y la diferencia es deliberada: dos
 * bloques que se parecen afirman que dicen lo mismo, y aquí lo que se cuenta no son
 * fallos que corregir sino el método en sí. Por eso cada señal parte en dos columnas —lo
 * que ves y lo que está pasando a la izquierda, lo que se cambia recuadrado a la
 * derecha—, mientras que los errores comunes van en una sola columna con sus dos rótulos
 * seguidos.
 *
 * En móvil las dos columnas se apilan y el recuadro queda debajo, que es además el orden
 * en el que se leen: primero lo que pasó, después qué tocar.
 */
function ReadingBlock({ reading }: { reading: ShotReading }) {
  return (
    <section className="mt-24 px-6 md:mt-36 md:px-16">
      <Eyebrow>Leer la extracción</Eyebrow>
      <h2 className="mt-4 max-w-prose font-display text-3xl md:text-5xl">
        Lo que ves salir te dice qué corregir en la siguiente
      </h2>

      <div className="mt-8 max-w-prose">
        {reading.intro.map((paragraph, index) => (
          <p key={index} className="mt-5 text-base text-coffee first:mt-0 md:text-lg">
            {paragraph}
          </p>
        ))}
      </div>

      <ul className="mt-14">
        {reading.signals.map((signal) => (
          <li
            key={signal.observation}
            className="border-t border-ink py-8 md:flex md:gap-12"
          >
            <div className="md:w-1/2">
              <h3 className="font-display text-2xl leading-tight md:text-3xl">
                {signal.observation}
              </h3>
              <p className="mt-3 text-base text-coffee">{signal.meaning}</p>
            </div>

            <div className="mt-5 border border-ink px-5 py-4 md:mt-0 md:w-1/2 md:self-start">
              <p className="font-mono text-xs uppercase tracking-widest text-sage-deep">
                Qué cambias
              </p>
              <p className="mt-2 text-base text-ink">{signal.change}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Sobre qué está construida la ficha, al final del todo.
 *
 * No es la lista de fuentes de un artículo de /granos, aunque se le parezca en la
 * forma: allí se dice de dónde sale cada dato y aquí se dice de qué está hecho el
 * método entero, que en el caso del colado en tela es la práctica de quien lo prepara
 * y ninguna medición. Por eso lleva párrafos y no solo una lista: sin el texto, tres
 * enlaces sueltos parecerían las fuentes de unas cifras que no existen.
 *
 * Va sin fondo ni recuadro, separado por un filete grueso, porque es una nota al pie
 * del sitio y no un bloque destacado más: si compitiera con el dato curioso, el lector
 * leería lo segundo primero.
 */
function GroundingBlock({ grounding }: { grounding: Grounding }) {
  return (
    <section className="mt-28 border-t-2 border-ink px-6 pt-6 md:mt-40 md:px-16">
      <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
        Sobre qué está escrita esta ficha
      </h2>

      <div className="mt-8 max-w-prose">
        {grounding.body.map((paragraph, index) => (
          <p
            key={index}
            className="mt-5 text-base text-coffee first:mt-0 md:text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {grounding.references && grounding.references.length > 0 ? (
        <ul className="mt-12 md:grid md:grid-cols-2 md:gap-x-16">
          {grounding.references.map((reference) => (
            <li key={reference.url} className="border-t border-dust py-5">
              <p className="font-mono text-xs uppercase tracking-widest text-sage-deep">
                {reference.publisher}
              </p>

              <a
                href={reference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block max-w-[52ch] text-base text-lavender-deep underline underline-offset-4"
              >
                {reference.title}
              </a>

              <p className="mt-2 font-mono text-xs text-coffee">
                Consultado el {formatDate(reference.retrieved)}
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
