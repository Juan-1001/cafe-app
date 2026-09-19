import type { ContentImage, PhotoCredit } from "@/content/types";

/**
 * El bloque «Fotografías» que cierra una página, con quién hizo cada foto.
 *
 * Por qué existe. Las fotos se buscan con la API de Pexels, y sus términos piden un
 * enlace visible a Pexels en toda página que la use, más crédito al fotógrafo. Pero la
 * razón de fondo es del proyecto: aquí no se enseña material de otro sin decir de quién
 * es, igual que no se escribe una cifra sin su fuente.
 *
 * Por qué agrupado al pie y no debajo de cada foto. La regla del sitio es que el
 * crédito acompaña a la foto cuando la foto se mira —los bloques de imagen de un
 * artículo, que ya llevan pie— y se agrupa aquí cuando la foto solo sirve para
 * reconocer algo: las portadas del índice, que son ocho seguidas y viven de su ritmo, y
 * las miniaturas cuadradas del equipo, donde una línea de crédito mediría casi tanto
 * como la propia foto.
 *
 * Solo entra lo que de verdad se ve. Una foto que todavía no existe se pinta como
 * bloque de color, no se ha pedido nada a Pexels por ella y no hay a quién acreditar,
 * así que se filtra por `src`. Si no queda ninguna, el bloque entero desaparece en vez
 * de dejar un rótulo vacío.
 */

/** Las cifras pequeñas van con letra, como en el resto del sitio. */
const COUNT_WORDS = [
  "Una",
  "Dos",
  "Tres",
  "Cuatro",
  "Cinco",
  "Seis",
  "Siete",
  "Ocho",
  "Nueve",
];

function countWord(count: number): string {
  return COUNT_WORDS[count - 1] ?? String(count);
}

/**
 * Une nombres en una enumeración en español: «A», «A y B», «A, B y C».
 */
function joinNames(items: React.ReactNode[]): React.ReactNode[] {
  return items.flatMap((item, index) => {
    if (index === 0) return [item];
    if (index === items.length - 1) return [" y ", item];
    return [", ", item];
  });
}

const SOURCE_HOME = {
  Pexels: "https://www.pexels.com",
  Unsplash: "https://unsplash.com",
} as const;

/**
 * El crédito de una sola foto, para ponerlo debajo de ella.
 *
 * Lo usan los bloques de imagen de un artículo, que son los únicos sitios del sitio
 * donde la foto se mira de verdad y donde ya hay un pie donde meterlo. Todo lo demás
 * —portadas de índice, miniaturas de equipo— se acredita agrupado con `PhotoCredits`.
 *
 * Cuando no se sabe quién la hizo lo dice, en vez de no pintar nada: un hueco callado
 * se confunde con que no hiciera falta acreditar.
 */
export function PhotoCreditLine({ credit }: { credit: PhotoCredit | null }) {
  if (credit?.source === "IA") {
    return (
      <span className="mt-2 block font-mono text-xs text-coffee">
        Imagen generada con IA, provisional
      </span>
    );
  }

  // Propia: se sabe de quién es y no hay adónde enlazar. Se dice y se acaba.
  if (credit?.source === "Propia") {
    return (
      <span className="mt-2 block font-mono text-xs text-coffee">
        Fotografía propia
      </span>
    );
  }

  return (
    <span className="mt-2 block font-mono text-xs text-coffee">
      {credit ? (
        <>
          Foto de{" "}
          <a
            href={credit.photoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lavender-deep underline underline-offset-2"
          >
            {credit.photographer}
          </a>{" "}
          en{" "}
          <a
            href={SOURCE_HOME[credit.source]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lavender-deep underline underline-offset-2"
          >
            {credit.source}
          </a>
        </>
      ) : (
        "Autoría no registrada"
      )}
    </span>
  );
}

export function PhotoCredits({ images }: { images: ContentImage[] }) {
  // Una misma foto puede salir dos veces en una página; se acredita una sola vez.
  const seen = new Set<string>();
  const shown: ContentImage[] = [];
  for (const image of images) {
    if (!image.src || seen.has(image.src)) continue;
    seen.add(image.src);
    shown.push(image);
  }

  if (shown.length === 0) return null;

  /*
   * Se agrupa por fuente para poder decir «en Pexels» una vez al final de la
   * enumeración en vez de repetirlo detrás de cada nombre. Hoy son todas de Pexels,
   * pero el sitio admite las dos y una página podría mezclarlas.
   */
  type Attributed = Extract<PhotoCredit, { photographer: string }>;
  const bySource = new Map<Attributed["source"], Attributed[]>();
  let unknown = 0;
  let generated = 0;
  let own = 0;

  for (const image of shown) {
    if (!image.credit) {
      unknown += 1;
      continue;
    }

    // Las generadas con IA no tienen a quién acreditar: se cuentan aparte y se declaran
    // como lo que son, que es lo que de verdad hay que decirle a quien mira.
    if (image.credit.source === "IA") {
      generated += 1;
      continue;
    }

    // Las propias tampoco enlazan a ninguna parte, pero por el motivo contrario: se sabe
    // perfectamente de quién son. Se cuentan aparte para no acabar en el saco del hueco.
    if (image.credit.source === "Propia") {
      own += 1;
      continue;
    }

    const group = bySource.get(image.credit.source) ?? [];
    group.push(image.credit);
    bySource.set(image.credit.source, group);
  }

  return (
    // Sin margen horizontal propio: unas páginas lo llevan en el contenedor de fuera y
    // otras lo ponen sección a sección, así que lo pone quien lo coloca.
    <section className="mt-20 border-t border-dust pt-6 md:mt-28">
      <h2 className="font-mono text-xs uppercase tracking-widest text-sage-deep">
        Fotografías
      </h2>

      <div className="mt-3 max-w-prose text-sm text-coffee">
        {[...bySource].map(([source, credits]) => (
          <p key={source}>
            {joinNames(
              credits.map((credit) => (
                <a
                  key={credit.photoUrl}
                  href={credit.photoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lavender-deep underline underline-offset-2"
                >
                  {credit.photographer}
                </a>
              )),
            )}{" "}
            en{" "}
            <a
              href={SOURCE_HOME[source]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lavender-deep underline underline-offset-2"
            >
              {source}
            </a>
            .
          </p>
        ))}

        {/*
          El hueco se cuenta en voz alta. Son las fotos que se descargaron a mano antes
          de que el sitio guardara la autoría: los metadatos venían quitados de origen y
          los archivos originales ya no están, así que no hay de dónde sacarla. Escribir
          un nombre a ojo sería peor que decir que no se sabe.
        */}
        {/*
          Las sintéticas se declaran antes que el hueco de autoría, porque es lo más
          importante de este bloque: no son fotos del objeto, son un dibujo de él, y
          están puestas mientras no haya foto.
        */}
        {generated > 0 ? (
          <p className={bySource.size > 0 ? "mt-2" : undefined}>
            {countWord(generated)}{" "}
            {generated === 1 ? "imagen generada" : "imágenes generadas"} con IA, de
            forma provisional hasta que haya fotografía.
          </p>
        ) : null}

        {own > 0 ? (
          <p className={bySource.size > 0 || generated > 0 ? "mt-2" : undefined}>
            {countWord(own)} {own === 1 ? "fotografía propia" : "fotografías propias"}.
          </p>
        ) : null}

        {unknown > 0 ? (
          <p
            className={
              bySource.size > 0 || generated > 0 || own > 0 ? "mt-2" : undefined
            }
          >
            {countWord(unknown)}{" "}
            {unknown === 1 ? "fotografía" : "fotografías"} sin autoría registrada.
          </p>
        ) : null}
      </div>
    </section>
  );
}
