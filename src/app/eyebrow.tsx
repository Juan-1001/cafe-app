/**
 * Rótulo de sección: la línea corta en mono, mayúsculas y espaciada que va encima de
 * un titular y dice de qué va lo que viene debajo.
 *
 * Vive aquí y no dentro de una sección porque lo usan ya /metodos y /granos, y su
 * gracia es que sea idéntico en todo el sitio: es la marca que el lector aprende a
 * reconocer como «esto es un rótulo, no un título».
 *
 * Lo que cambia entre tonos es el color y nada más —la tipografía, el tamaño, las
 * mayúsculas y el espaciado son los mismos—, que es justo lo que mantiene en pie esa
 * idea: dos rótulos de distinto color siguen leyéndose como el mismo objeto, igual
 * que los enlaces de la navegación cambian de color sin dejar de ser la navegación.
 *
 * Los dos tonos son los «profundos» de cada acento y no los claros, y es por el
 * contraste: a 12 px sobre `paper`, `sage` se queda en 3,7:1 y `lavender` en 3,2:1,
 * cuando el mínimo AA de texto normal es 4,5:1. `sage-deep` da 5,3:1 y
 * `lavender-deep` 4,9:1.
 */
const TONES = {
  /** El de siempre, y el que sale si nadie pide otro. */
  sage: "text-sage-deep",
  /**
   * El del 404, donde el rótulo no nombra una sección sino que avisa de un error.
   * El lavanda es el acento protagonista del sitio y ahí hace de señal, no de
   * etiqueta: es lo único con color en una página cuyos datos están todos a cero.
   */
  lavender: "text-lavender-deep",
  /**
   * El mismo lavanda de señal, pero sobre fondo `ink`: hoy solo la página sin
   * conexión, que es la única oscura del sitio.
   *
   * Se llama por el fondo y no solo por el color a propósito, porque lo que lo
   * distingue es dónde vale. Sobre negro la relación se invierte: el lavanda claro da
   * 4,9:1 y pasa AA, y el profundo —que es el que vale sobre crema— se hunde. Usar
   * este tono sobre `paper` sería exactamente el fallo de contraste que el resto de
   * este archivo existe para evitar.
   */
  lavenderOnInk: "text-lavender",
} as const;

export function Eyebrow({
  children,
  tone = "sage",
}: {
  children: React.ReactNode;
  tone?: keyof typeof TONES;
}) {
  return (
    <p className={`font-mono text-xs uppercase tracking-widest ${TONES[tone]}`}>
      {children}
    </p>
  );
}
