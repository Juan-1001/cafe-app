/**
 * Rótulo de sección: la línea corta en mono, mayúsculas y espaciada que va encima de
 * un titular y dice de qué va lo que viene debajo.
 *
 * Vive aquí y no dentro de una sección porque lo usan ya /metodos y /granos, y su
 * gracia es que sea idéntico en todo el sitio: es la marca que el lector aprende a
 * reconocer como «esto es un rótulo, no un título».
 *
 * Va en `sage-deep` y no en `sage` porque a 12 px el `sage` se queda en 3.7:1 sobre
 * `paper` y no llega al mínimo AA de texto normal.
 */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-widest text-sage-deep">
      {children}
    </p>
  );
}
