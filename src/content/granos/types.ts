import type { ContentImage } from "../types";
import type { JourneyStage } from "./journey";

/**
 * Cuánto café hay que saber para leer el artículo sin perderse. Es una etiqueta que
 * avisa, no un orden: la sección se ordena por el recorrido del grano, no por esto.
 */
export type ArticleLevel = "Introductorio" | "Intermedio";

/**
 * De dónde sale un dato comprobable. Se listan al final del artículo.
 *
 * `retrieved` no es un adorno: los enlaces se mueren y las cifras se actualizan, así
 * que la fecha dice hasta cuándo se sabe que esto era lo que decía la fuente.
 */
export type Source = {
  /** Quién publica, tal y como se cita a la vista: "Organización Internacional del Café". */
  publisher: string;
  title: string;
  url: string;
  /** Fecha ISO (YYYY-MM-DD) en la que se consultó. */
  retrieved: string;
};

/**
 * Una fila de una comparación: el nombre de lo que se compara y su valor en cada
 * columna. Siempre dos valores, en el mismo orden que las columnas del bloque.
 */
export type ComparisonRow = {
  label: string;
  values: [string, string];
};

/**
 * Cuánto pesa un lado del intercambio en el diagrama del deslizador de tueste, de 0
 * (casi nada) a 6 (todo).
 *
 * Es una unión cerrada y no un `number` para que un 9 o un -1 no compilen, igual que
 * las claves del catálogo de equipo. Y la escala es corta y sin unidades a propósito:
 * estos valores NO son una medición de nada. No existe una magnitud llamada «cuánta
 * fruta le queda a un tueste medio»; lo que está medido es la dirección del cambio, no
 * la cantidad. Por eso el bloque nunca enseña estos números en pantalla y por eso
 * `note` es obligatorio.
 */
export type RoastWeight = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * El tope de `RoastWeight`, que es lo que convierte un peso en el ancho de la barra.
 *
 * Vive pegado al tipo porque los dos tienen que cambiar a la vez: si algún día la
 * unión llega hasta 8 y esto sigue en 6, las barras se saldrían del carril sin que
 * nada falle al compilar.
 */
export const ROAST_WEIGHT_MAX = 6;

/**
 * Un peldaño de la escala de tueste.
 *
 * `weightLoss` es el único dato medido de la fila y sale del estudio que el artículo
 * cita en `sources`; los dos `weights` son el diagrama. Esa diferencia es importante y
 * se nota a la vista: la cifra se escribe con su número y las barras no llevan ninguno.
 */
export type RoastLevel = {
  /** Como se lee en la bolsa, en español: "Claro", "Medio-oscuro"… */
  name: string;
  /** El nombre inglés que también circula por las tostadurías, cuando lo tiene. */
  alias?: string;
  /** Pérdida de peso medida, ya formateada para leerse: "16,3 %". */
  weightLoss: string;
  /** Qué se sigue notando del grano y qué ha puesto el fuego, en el orden de `axes`. */
  notes: [string, string];
  /** Cuánto pesa cada lado del intercambio, en el mismo orden que `axes`. */
  weights: [RoastWeight, RoastWeight];
  /** Cómo se ve el grano a este nivel. */
  bean: RoastBean;
};

/**
 * El aspecto del grano tostado a un nivel, para el dibujo del deslizador.
 *
 * Aquí hay una excepción a la regla del sistema de diseño, y es deliberada: estos
 * colores NO salen de la paleta del sitio ni de los tokens, sino que son los del café
 * tostado de verdad. El motivo es que en este dibujo el color no decora, es el dato: si
 * el grano claro se pintara con un token del sitio dejaría de decir lo único que tiene
 * que decir. El resto del dibujo —el trazo del contorno— sí va con el token `ink`, que
 * es lo que lo mantiene dentro de la estética del sitio.
 *
 * Por eso también viven aquí, en el contenido, y no en una tabla dentro del componente:
 * una lista paralela de cinco colores puesta al lado del componente se descuadraría en
 * silencio el día que alguien reordene o añada un nivel.
 */
export type RoastBean = {
  /** El cuerpo del grano visto desde arriba. */
  body: string;
  /** El surco del centro, donde queda la película pálida que envuelve el grano. */
  crease: string;
  /**
   * Cuánto aceite asoma en la superficie: 0 ninguno, 1 algo, 2 mucho.
   *
   * No es un adorno del dibujo. Es lo que le pasa al grano tras el segundo crack, que el
   * artículo explica justo antes del deslizador: la estructura ya frágil se rompe y los
   * aceites salen a la superficie. De ahí que solo los dos niveles más oscuros lo tengan.
   */
  sheen: 0 | 1 | 2;
};

/**
 * Las piezas con las que se monta un artículo.
 *
 * El cuerpo no es un texto largo, sino una lista de bloques con nombre, y cada uno se
 * dibuja como le corresponde: el párrafo en una columna estrecha de lectura, la
 * comparación a todo lo ancho, la cifra rompiendo la retícula. Un texto corrido
 * acabaría todo en un contenedor centrado del mismo ancho, que es justo lo que este
 * sitio evita.
 *
 * El juego es pequeño a propósito. Cuando un artículo pida de verdad un bloque que no
 * está aquí (una foto, una línea de tiempo, un mapa), se añade entonces y no antes.
 */
export type ArticleBlock =
  /**
   * Texto normal. Se puede marcar énfasis rodeando un tramo con asteriscos:
   * "la especie *Coffea arabica*" sale en itálica. Es el único marcado que admite el
   * texto, y existe porque los nombres científicos y las variedades van en itálica
   * por convención; para cualquier otra cosa hay un bloque propio.
   */
  | { kind: "paragraph"; text: string }
  /** Subtítulo dentro del artículo: parte el texto en tramos con nombre. */
  | { kind: "heading"; text: string }
  /** Dos cosas enfrentadas fila a fila. */
  | {
      kind: "comparison";
      columns: [string, string];
      rows: ComparisonRow[];
      /** Una línea debajo para lo que la tabla no puede decir por sí sola. */
      caption?: string;
    }
  /** Una cifra que merece leerse sola, fuera del párrafo. */
  | {
      kind: "stat";
      value: string;
      label: string;
      /** Qué matiza o qué acota esa cifra. */
      note?: string;
      /** Atribución corta; la referencia completa va en `sources`. */
      source?: string;
    }
  /**
   * Una fotografía, apoyada en la mitad derecha de la página. Es un respiro: corta el
   * texto técnico sin meter ruido.
   *
   * Mientras `image.src` sea null se pinta un bloque de color de la paleta con la
   * proporción correcta. El `alt` se escribe igual desde el primer día, aunque todavía
   * no haya foto: es lo que dice qué fotografía hay que buscar.
   */
  | {
      kind: "image";
      image: ContentImage;
      /**
       * Orientación de la fotografía. Decide el hueco en el que se pinta, y ese hueco
       * tiene la proporción exacta de la foto para que no se recorte nada: una foto
       * vertical metida en un marco apaisado pierde más de la mitad del alto, y se
       * pierde justo por arriba y por abajo, que es donde suele estar el asunto.
       *
       * Va sin `?` para que no haya un valor por defecto silencioso: quien añada una
       * foto tiene que mirarla y decir cómo es.
       */
      shape: "landscape" | "portrait";
      caption?: string;
    }
  /**
   * Una frase suelta, grande, que rompe el ritmo del texto.
   *
   * Solo admite dos cosas: un dicho popular sobre el café, que no lleva atribución, o
   * una cita cuya fuente esté verificada, que sí la lleva. Nunca una letra de canción
   * ni una frase inventada y puesta en boca de alguien.
   *
   * Con `text` vacío el bloque no se pinta. Eso permite dejar el hueco marcado en el
   * artículo, en el sitio exacto donde va a ir la frase, sin que la página publicada
   * enseñe un espacio en blanco esperándola.
   */
  | { kind: "pullquote"; text: string; attribution?: string }
  /**
   * El deslizador de tueste: la escala de niveles con las dos barras que se
   * intercambian al moverla.
   *
   * Es el primer bloque interactivo de un artículo, y está aquí porque lo que enseña
   * no es un par de valores sino el intercambio entre ellos: que una cosa se retira
   * a medida que la otra avanza. Una `comparison` de "claro" frente a "oscuro" daría
   * las dos fotos de los extremos y perdería justo el movimiento, que es lo que en
   * texto cuesta explicar.
   *
   * Los cinco niveles con sus textos están siempre en la página, no solo el elegido:
   * el deslizador destaca uno, no hace aparecer el contenido. Así el bloque se lee
   * entero aunque el JavaScript no llegue nunca.
   */
  | {
      kind: "roastScale";
      /** Qué hacer con el deslizador. Encabeza el bloque. */
      intro: string;
      /**
       * Los dos lados del intercambio. Nombran las barras y también cada nota de cada
       * nivel, así que salen de un solo sitio y no pueden decir cosas distintas en la
       * misma página.
       */
      axes: [string, string];
      /** De más claro a más oscuro. El orden es el recorrido del deslizador. */
      levels: RoastLevel[];
      /**
       * Qué son las barras y qué no son. Va sin `?` porque un diagrama sin números
       * que no avisa de que es un diagrama se lee como una medición, y aquí no lo es.
       */
      note: string;
      /**
       * Qué se está viendo en el dibujo de los granos. Va aparte de `note` porque
       * dice otra cosa: `note` avisa de que las barras no son una medición, y esto
       * explica de dónde sale el brillo de los dos últimos granos.
       */
      beanNote: string;
    };

export type Article = {
  /** Sale del nombre del archivo y es el último tramo de la URL: /granos/<slug>. */
  slug: string;
  title: string;
  /** Una línea que dice qué se lleva el lector. */
  tagline: string;
  stage: JourneyStage;
  level: ArticleLevel;
  blocks: ArticleBlock[];
  /**
   * Las fuentes de los datos comprobables del artículo. Va sin `?` a propósito: un
   * artículo sin nada que citar declara `sources: []` y eso significa "aquí no se
   * afirma nada que haga falta comprobar", no "faltan las fuentes".
   */
  sources: Source[];
};
