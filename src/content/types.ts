/**
 * Tipos que comparten todas las secciones de contenido. Lo que solo le sirve a una
 * sección vive en el `types.ts` de su carpeta; aquí solo sube lo que ya usan dos.
 */

/**
 * Quién hizo una fotografía y dónde está publicada.
 *
 * Existe porque las fotos se buscan con la API de Pexels, y sus términos piden dos
 * cosas que la licencia de la foto suelta no pide: un enlace visible a Pexels siempre
 * que se use la API, y crédito al fotógrafo cuando se pueda. Pero la razón de fondo es
 * del proyecto y no del contrato: aquí no entra un dato sin decir de dónde sale, y una
 * fotografía es material de otro igual que lo es un porcentaje sacado de un estudio.
 *
 * El nombre enlaza a la página de la foto y no al perfil, porque es lo que la propia
 * guía de Pexels pone de ejemplo y porque es el enlace que sirve para comprobar el
 * crédito.
 */
export type PhotoCredit =
  | {
      /** Cómo lo firma quien la hizo, tal y como aparece en la fuente. */
      photographer: string;
      /** La página de la foto, no la del perfil. Es la que se enlaza. */
      photoUrl: string;
      source: "Pexels" | "Unsplash";
    }
  /**
   * Imagen generada con IA, puesta como provisional mientras no haya una fotografía.
   *
   * No lleva autor ni enlace porque no hay a quién acreditar, y por eso es una variante
   * aparte en vez de un `source` más: pedirle un `photographer` obligaría a inventarlo.
   *
   * Lo que sí hay que declarar es que **no es una fotografía**, y la página lo dice. No
   * es una formalidad: estas imágenes se usan para enseñar qué objeto comprar, y una
   * imagen sintética puede dibujar mal el objeto sin que se note. Ha pasado ya: la de
   * los filtros del AeroPress dibuja la tapa perforada como un panal en relieve cuando
   * la real es un disco liso con agujeros redondos. Quien la mire tiene que saber que
   * lo que ve puede no ser el objeto.
   */
  | { source: "IA" }
  /**
   * Fotografía hecha por quien hace el sitio.
   *
   * Es una variante sin `photographer` y sin `photoUrl`, y las dos ausencias son
   * deliberadas. No lleva enlace porque **no hay página contra la que comprobar el
   * crédito**: el enlace de las otras dos fuentes existe para eso, y uno inventado aquí
   * no comprobaría nada. Y no lleva nombre porque sería el mismo en todas, o sea una
   * constante repetida archivo a archivo, que es justo la clase de dato que en este
   * sitio se escribe una vez o no se escribe.
   *
   * Lo que sí hace falta es que se distinga de `null`, y ese es el motivo de existir de
   * esta variante: `null` significa «no se sabe de quién es» y la página lo dice en voz
   * alta. Una foto propia sí se sabe de quién es, así que salir como «autoría no
   * registrada» sería falso. La página dice «Fotografía propia».
   */
  | { source: "Propia" };

/**
 * La imagen tal y como la escribe el contenido: la ruta donde la foto **va a estar**,
 * exista ya el archivo o no, y su texto alternativo.
 *
 * Antes esto se escribía con un `src` que había que dejar en null a mano mientras no
 * hubiera foto, y volver a rellenar el día que se guardara el archivo. Ese paso se
 * olvidaba, y olvidarlo en el sentido contrario —dejar escrita la ruta de algo que no
 * existe— deja la página rota sin que se note leyendo el código. Ahora la ruta se
 * declara siempre y quien mira si el archivo está de verdad es `resolveContentImage`,
 * en la compilación. Guardar el archivo en su sitio es lo único que hay que hacer para
 * que la foto salga.
 *
 * El campo se llama `file` y no `src` a propósito: así una imagen declarada no encaja
 * donde se espera una resuelta y saltarse el resolutor es un error de compilación, no
 * un hueco que aparece en la página. Es el mismo reparto que ya hacía el catálogo de
 * equipo entre `EquipmentPiece.photo` y lo que devuelve `resolveEquipmentImage`.
 */
export type DeclaredImage = {
  /** Ruta dentro de /public, siempre escrita. Ver arriba por qué no admite null. */
  file: string;
  alt: string;
  /**
   * Quién hizo la foto. Va sin `?` a propósito: escribir `null` tiene que ser un acto
   * deliberado y no un descuido, porque una foto sin crédito es lo que este campo
   * existe para impedir. `null` significa «autoría no recuperable», y la página lo dice
   * en voz alta en vez de callárselo.
   *
   * Hoy lo llevan en null las seis fotos que se descargaron a mano antes de que
   * existiera este campo: Pexels y Unsplash quitan los metadatos al servir el archivo y
   * los originales ya no están, así que no hay de dónde sacarlo. Escribir un nombre a
   * ojo sería peor que el hueco.
   */
  credit: PhotoCredit | null;
};

/**
 * Imagen ya resuelta, que es lo único que las páginas pintan. Si `src` es null el
 * archivo no está en /public y se pinta un bloque de color de la paleta con la
 * proporción correcta.
 *
 * Nadie escribe esto a mano: sale de `resolveContentImage` o de
 * `resolveEquipmentImage`.
 */
export type ContentImage = {
  src: string | null;
  alt: string;
  credit: PhotoCredit | null;
};

/**
 * Un documento al que el contenido remite. Empezó siendo la fuente de un dato de un
 * artículo de /granos y subió aquí al aparecer el segundo uso: las fichas de método
 * también remiten a documentos, aunque por otro motivo —ver `Grounding`—, y una sola
 * definición evita que las dos se separen.
 *
 * `retrieved` no es un adorno: los enlaces se mueren y las cifras se actualizan, así
 * que la fecha dice hasta cuándo se sabe que esto era lo que decía el documento.
 */
export type Source = {
  /** Quién publica, tal y como se cita a la vista: "Organización Internacional del Café". */
  publisher: string;
  title: string;
  url: string;
  /** Fecha ISO (YYYY-MM-DD) en la que se consultó. */
  retrieved: string;
};
