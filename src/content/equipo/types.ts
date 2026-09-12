/**
 * Una pieza de equipo, fotografiada por su cuenta.
 *
 * Aquí vive solo lo que es cierto del objeto mire quien lo mire: cómo es y qué foto lo
 * retrata. Todo lo que depende del método —cómo se le llama en esa receta y por qué
 * importa allí— se queda en la lista de equipo del propio método, porque cambia de uno
 * a otro. Un molino de muelas es el mismo molino en el V60 y en la prensa francesa,
 * pero la razón para tenerlo no es la misma.
 */
export type EquipmentPiece = {
  /**
   * Nombre neutro del objeto. No es el que se enseña: cada método escribe el suyo, que
   * suele ser más concreto («Báscula con temporizador» frente a «Báscula»). Este está
   * para poder leer el catálogo y saber de qué se habla.
   */
  name: string;
  /**
   * Ruta de la fotografía dentro de /public.
   *
   * Se declara aunque el archivo todavía no exista: es la ruta que va a tener cuando
   * se guarde, y así la foto aparece sola el día que se añada, sin tocar el código.
   * Lo que no puede pasar nunca es que la página pida una imagen que no está, y de eso
   * se encarga `resolveEquipmentImage`: comprueba en la compilación si el archivo está
   * y, si no, deja el bloque de color.
   */
  photo: string;
  /**
   * Descripción para quien no puede ver la foto: qué es la pieza, qué forma tiene y de
   * qué material, y después lo demás que salga en la imagen.
   *
   * La foto puede enseñar la pieza en uso —unas manos moliendo, el hervidor al fuego—,
   * pero nunca puede estar atada a un método concreto: «la báscula con la prensa
   * francesa encima» sería la foto de la prensa, no de la báscula, y entonces no se
   * podría compartir con los demás métodos. La pieza tiene que ser la protagonista y
   * el resto, contexto reconocible en cualquier receta.
   */
  alt: string;
};
