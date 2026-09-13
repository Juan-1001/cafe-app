@AGENTS.md

# cafe-app

## Qué es

Web de contenido para aficionados al café de especialidad. El objetivo es que alguien
curioso llegue, aprenda y se lleve algo aplicable: entender de dónde viene un grano,
cómo prepararlo en casa y dónde tomarse un buen café en Bogotá.

No es la web de una cafetería ni una tienda: **no hay carrito, ni pagos, ni pedidos**.

## Quién la usa

Visitantes anónimos. **No hay registro, ni inicio de sesión, ni cuentas de usuario, ni
panel de administración.** Todo el contenido es público y de solo lectura.

Si una tarea parece pedir autenticación, favoritos guardados, comentarios o aportes de
usuarios, no lo implementes: pregúntalo antes, porque está fuera del alcance actual.

## Secciones

| Ruta        | Sección                | Contenido |
|-------------|------------------------|-----------|
| `/`         | Inicio                 | Bienvenida, qué es el café de especialidad y accesos a las demás secciones |
| `/granos`   | Granos                 | Biblioteca de artículos sobre lo que le pasa al café antes de prepararlo |
| `/metodos`  | Métodos de preparación | Guías paso a paso: V60, prensa francesa, Aeropress, espresso, moka, cold brew… |
| `/recetas`  | Recetas                | Preparaciones concretas con ingredientes, proporciones y pasos |
| `/tiendas`  | Tiendas en Bogotá      | Directorio de cafeterías recomendadas: barrio, qué las hace buenas, cómo llegar |

`/tiendas` es parte del alcance de la v1, no un extra para después.

`/granos` es una biblioteca de artículos, no un catálogo de orígenes. Se replanteó así
porque variedades, países, procesos y altura son tipos de contenido distintos forzados en
una misma ficha, y porque el catálogo de orígenes es contenido infinito: nunca está
terminado. Cada artículo tiene nivel (introductorio o intermedio), tiempo de lectura
calculado del propio cuerpo y un cuerpo hecho de bloques con tipo.

El índice se ordena por **el recorrido del café** —la planta, la finca, el tostador—, no
por nivel. El recorrido deja ver los huecos que faltan por contar, mientras que una lista
solo crece; y agrupar por nivel repetiría el recurso de los capítulos por dificultad de
`/metodos`, con lo que las dos secciones se leerían como la misma plantilla rellenada dos
veces. Los artículos se leen sueltos: cada uno se entiende por su cuenta.

Los orígenes y las variedades vuelven más adelante como artículo (por ejemplo, «las
variedades que vas a ver en Colombia»), nunca como catálogo con una ficha por país.

Otro artículo pendiente es **la acidez**: qué es la que se prueba en una taza y por qué no
es el pH. Salió al escribir el AeroPress, cuyo fabricante afirma sin citar ningún estudio
que su café tiene «un quinto de la acidez» del de goteo; esa cifra se quedó fuera de la
ficha porque ahí solo cabría afirmarla, y es justo el material de un artículo.

Cada tienda debe incluir un campo con la **fecha de la última verificación de sus datos**
(dirección, horario, si sigue abierta) y esa fecha se muestra en la página. Los datos de
locales caducan: sin fecha visible no se puede saber si la información sigue sirviendo.

Cada sección tiene una página índice que lista sus elementos y una página de detalle por
elemento (por ejemplo `/metodos/v60`, `/tiendas/<slug>`).

## Contenido

El contenido vive **en archivos dentro del repositorio**, en `src/content/<sección>/`.
No hay base de datos ni gestor de contenidos externo.

- Un archivo por elemento (un grano, un método, una receta, una tienda).
- Los datos estructurados (nombre, origen, tiempo de preparación, barrio, etc.) van en
  campos explícitos y tipados, no dispersos en el texto.
- El `slug` de la URL sale del nombre del archivo.
- Al añadir contenido, respeta la forma de los archivos que ya existen en esa carpeta en
  lugar de inventar una estructura nueva.

**Ningún dato comprobable —cifra, porcentaje, fecha, temperatura, récord— se escribe sin
fuente primaria y sin aprobarlo antes, aunque parezca sólido.** El procedimiento completo
está en la Skill `verificar-datos` (`.claude/skills/verificar-datos/SKILL.md`).

### Textos de la home

La home no es una sección con elementos: no tiene índice ni fichas. Sus textos propios
—el titular, la entradilla y los rótulos de cada bloque— viven en **`src/content/home.ts`**,
un archivo suelto y no una carpeta, porque aquí el elemento es la página entera. Lo que
la home muestra del resto del sitio (nombres de métodos, títulos de artículos, fotos,
datos) **no se copia ahí**: se lee del contenido de su sección.

En ese mismo archivo se fija **el método de entrada**, el que la portada enseña en
grande. Se elige a mano en un campo y no se calcula del nivel de dificultad, porque es
una decisión editorial: el día que haya ocho métodos puede convenir entrar por la moka
aunque otro sea más fácil. Si el slug no existe, la compilación falla en lugar de dejar
la portada sin su bloque principal.

### Imágenes

- Las fotografías se descargan de **Unsplash o Pexels** y se guardan en el repositorio,
  en `/public/images/<sección>/`.
- **Nunca se enlazan imágenes desde dominios externos.** Nada de URLs a Unsplash, a un CDN
  ni a ningún otro sitio: el archivo vive en `/public`.
- Mientras no exista la imagen real, usa un **bloque de color sólido de la paleta** con la
  proporción correcta como marcador. Nunca apuntes a la ruta de un archivo que todavía no
  existe: eso deja la página rota sin que se note en el código.
- Sí se puede dejar escrita la ruta de una foto que aún no está **siempre que algo compruebe
  en la compilación que el archivo existe** y caiga al bloque de color cuando no. Lo que la
  regla prohíbe es que la página pida una imagen inexistente, no que el contenido diga dónde
  va a estar. Así la foto aparece sola el día que se guarda el archivo. Es lo que hace el
  catálogo de equipo (`src/content/equipo/photo.ts`).

### Equipo de los métodos

Las piezas de equipo (molino, báscula, hervidor…) se repiten entre métodos, así que sus
fotos viven una sola vez en el catálogo compartido `src/content/equipo/`, con una entrada
por objeto y su ruta en `/public/images/equipo/`. No es una sección del sitio: no tiene
ruta ni página propia.

Cada método sigue teniendo su lista de equipo con su **nombre** y su **nota**, porque eso
cambia de un método a otro —el V60 pide «Báscula con temporizador» y a la prensa le basta
«Báscula»—, y apunta a la foto con una clave tipada del catálogo: una clave que no exista
no compila. Por la misma razón hay dos hervidores distintos y no uno: el de cuello de cisne
y el corriente son objetos diferentes, y esa diferencia es contenido.

Las fotos del catálogo retratan **el objeto solo**, nunca la escena de un método, y su texto
alternativo describe el objeto. Una foto de «la báscula con la prensa encima» sería la foto
de otra cosa y no se podría compartir.

## Idioma y tono

- **Todo el texto visible está en español**, incluidas rutas, títulos, botones y mensajes.
  El código (nombres de variables, componentes, comentarios) va en inglés.
- Tono cercano y didáctico, sin sonar a manual técnico. Se explican los términos del café
  la primera vez que aparecen (extracción, molienda, proceso lavado/natural…).
- Sin lenguaje de venta ni promesas de marketing.

## Estética

Referencia visual: revista de café bien editada. Cuidada y cálida.

- Base de tonos tierra (crema y tostado) con lavanda como acento protagonista. La paleta
  exacta está en «Sistema de diseño»: no se usan colores fuera de ella.
- Mucho espacio en blanco; se prefiere una página que respire a una densa.
- Fotografía grande y protagonista; el texto la acompaña.
- Tipografía elegante y legible, con contraste claro entre títulos y cuerpo de texto.
- Diseño responsive: se lee bien en móvil, que es donde se consultará una receta o un
  método mientras se prepara el café.

Evita: fondos oscuros, estilo «dashboard» y tarjetas dentro de tarjetas. La lista completa
está en «Antipatrones visuales».

## Sistema de diseño

Estos son los valores exactos del proyecto. **No inventes colores, tipografías ni tamaños
fuera de estos tokens.** Están definidos en `src/app/globals.css` con `@theme` de
Tailwind v4 y se usan siempre a través de las utilidades de Tailwind (`bg-paper`,
`text-coffee`, `font-display`…), nunca con el valor hexadecimal escrito a mano.

### Tipografías

Se cargan con `next/font/google` en `src/app/layout.tsx` (self-hosted, sin peticiones a
Google desde el navegador).

| Familia | Token / utilidad | Uso |
|---------|------------------|-----|
| **Fraunces** | `--font-display` → `font-display` | Títulos y display |
| **IBM Plex Sans** | `--font-sans` → `font-sans` (por defecto en `body`) | Cuerpo de texto, navegación e interfaz. Su **itálica** (`italic`) se usa para énfasis y para nombres de variedades |
| **Space Mono** | `--font-mono` → `font-mono` | Datos técnicos (ratio, molienda, temperatura, altura), etiquetas de categoría y números |

**Space Mono nunca se usa para párrafos**, solo para dato suelto, etiqueta o cifra.

### Colores

| Token | Hex | Uso |
|-------|-----|-----|
| `paper` | `#F1EDE5` | Fondo principal |
| `ink` | `#171719` | Texto principal y fondos oscuros |
| `coffee` | `#4A3028` | Texto secundario y detalles cálidos |
| `lavender` | `#807EC5` | Acento protagonista: fondos, títulos grandes, gráficos |
| `lavender-deep` | `#605DAE` | Acento en texto pequeño y enlaces sobre `paper` |
| `sage` | `#777C61` | Segundo acento: uso decorativo y texto grande |
| `sage-deep` | `#5F6350` | Segundo acento en texto pequeño sobre `paper` |
| `dust` | `#C9C0B5` | Bordes y fondos secundarios |

### Reglas de uso del color

Estas reglas existen para no bajar del contraste AA; no son preferencias estéticas.

- **Texto por debajo de 24 px sobre `paper`:** solo `ink`, `coffee`, `lavender-deep` o
  `sage-deep`.
- **`lavender` y `sage`** solo en texto de **24 px o más**, fondos y elementos gráficos.
- **`dust` nunca se usa para texto**, en ningún tamaño ni sobre ningún fondo.
- **Sobre fondo `ink`, `lavender` sí es válido para texto pequeño.**

Contrastes medidos sobre `paper`: `ink` 15.3:1 · `coffee` 10.3:1 · `sage-deep` 5.3:1 ·
`lavender-deep` 4.9:1 · `sage` 3.7:1 · `lavender` 3.2:1 · `dust` 1.5:1. Sobre `ink`:
`lavender` 4.9:1. De ahí sale el corte en 24 px: AA pide 4.5:1 en texto normal y 3:1 en
texto grande.

### Espaciado

La escala va en **múltiplos de 4 px** (`--spacing: 4px`), así que las utilidades de
Tailwind se leen directamente en píxeles: `p-1` = 4 px, `p-2` = 8 px, `gap-6` = 24 px.
No uses valores arbitrarios tipo `p-[13px]`: redondea al múltiplo de 4 más cercano.

## Antipatrones visuales

Este sitio debe verse **editorial y hecho a mano, no generado**. Evita:

- **Hero centrado** con título, subtítulo y dos botones. Prefiere composiciones asimétricas.
- **Rejillas de tres tarjetas iguales** como recurso por defecto.
- **Ritmo vertical uniforme**: todas las secciones con el mismo alto y el mismo padding.
- **Iconos genéricos** acompañando cada punto de una lista.
- **Sombras difusas y esquinas muy redondeadas.** Prefiere bordes finos y esquinas rectas o
  apenas redondeadas.
- **Gradientes.**
- **Todo el contenido dentro de un contenedor centrado del mismo ancho.** Varía los anchos:
  texto de lectura angosto, imágenes amplias o a sangre.

En su lugar:

- Contraste fuerte de escala tipográfica entre títulos y cuerpo.
- Uso deliberado del espacio en blanco asimétrico.
- Elementos que rompan la retícula de forma intencional.

## Stack y convenciones

- Next.js 16 con App Router, React 19, TypeScript y Tailwind CSS v4.
- Todo lo del sitio es contenido estático: usa Server Components por defecto y reserva
  `"use client"` para lo que realmente necesite interacción en el navegador.
- Estilos con clases de Tailwind; los tokens de color y tipografía se definen una sola vez
  en `src/app/globals.css` y se reutilizan.
- Sin librerías de UI ni dependencias nuevas salvo que se justifiquen y se acuerden antes.

Comandos:

```bash
npm run dev     # servidor de desarrollo
npm run build   # build de producción
npm run lint    # eslint
```

## Antes de darme algo por terminado

No digas que un cambio está listo hasta haber comprobado, en este orden:

1. `npm run lint` pasa sin errores.
2. `npm run build` termina sin errores.
3. **Contraste**: todo el texto cumple como mínimo el nivel AA (4.5:1 en texto normal,
   3:1 en texto grande). Los tonos tierra claros sobre crema fallan con facilidad, así que
   verifícalos en lugar de darlos por buenos.
4. **Móvil**: la página se ve bien a **375 px de ancho**, sin desbordes horizontales, sin
   texto cortado y con las imágenes en su proporción.

Si alguno de los cuatro no pasa y no lo puedes arreglar, dímelo explícitamente en lugar
de entregar el cambio como terminado.

## Estado actual

En pie: la **home**, **`/granos`** con tres artículos (uno por cada etapa del recorrido) y
**`/metodos`** con cinco métodos. `/recetas` y `/tiendas` están por construir.

La moka es el primer método que no calcula cantidades: las fija el aparato, así que su
ficha pregunta **«qué moka tienes»** en vez de «cuántas tazas quieres» y en el sitio de
la calculadora enseña lo que la olla impone. Por eso `recipe` y `specs.ratio` son
opcionales en `BrewMethod`, y por eso existe la comprobación de
`src/content/metodos/index.ts`, que revienta la compilación si un método declara un
ratio que no se puede leer o si dice sus cantidades por los dos sitios a la vez. También
es el primero sin cronómetro y sin báscula: su fabricante da un suceso y no un tiempo, y
el embudo hace de báscula. Las tres ausencias están contadas en la página, no dejadas en
blanco.

Mientras una sección no exista, **nada enlaza a su ruta**: ni la cabecera ni la home.
Un enlace a `/recetas` hoy es un 404. Cada sección nueva se añade a la navegación y a la
portada el día que su ruta esté en pie.

## Pendientes conocidos

Defectos detectados y aceptados a sabiendas. No hace falta volver a señalarlos ni
arreglarlos por iniciativa propia; si un trabajo futuro toca la zona, este es el sitio
donde mirar antes.

- **El cronómetro se superpone al recuadro del título entre 768 y 1000 px de ancho.** En
  ese rango, el panel fijo del cronómetro de las fichas de método pisa la esquina derecha
  del recuadro crema del título. No tapa texto, así que se decidió no corregirlo por
  ahora. Si en el futuro se rediseña el cronómetro, valorar pasarlo a una columna propia
  en escritorio: dejaría de flotar sobre el contenido y el solape desaparecería solo.
