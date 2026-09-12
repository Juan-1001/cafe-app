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
  | { kind: "pullquote"; text: string; attribution?: string };

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
