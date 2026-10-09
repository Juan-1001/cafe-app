/**
 * Convierte los tramos entre asteriscos en itálica. Es el único marcado que admite el
 * texto del contenido y está aquí por una necesidad concreta: los nombres
 * científicos, las variedades y las palabras en otro idioma van en itálica por
 * convención tipográfica, y eso no merece un bloque propio pero tampoco se puede
 * perder.
 *
 * Nació dentro de los artículos de /granos y subió aquí al aparecer el segundo uso,
 * el glosario, para que los dos lean el mismo marcado de la misma forma.
 *
 * Un asterisco suelto, sin pareja, se queda tal cual en el texto en vez de romper el
 * párrafo o comerse el resto de la frase.
 */
export function withEmphasis(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((part, index) => {
    if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={index} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }

    return part;
  });
}
