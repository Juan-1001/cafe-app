@AGENTS.md

# cafe-app

## Qué es

El sitio se llama **Presunto Café**. Ese es el nombre completo y el que se escribe
siempre que el sitio se nombre a sí mismo: el título de la pestaña, el manifest, las
tarjetas al compartir un enlace. La carpeta y el paquete siguen llamándose `cafe-app`
porque ese es el nombre del proyecto, no el de la web.

La única abreviatura admitida es **«Presunto»**, y existe por una razón medida: es el
nombre corto del manifest, que es lo que cabe debajo del icono en la pantalla de inicio
de un móvil —unos doce caracteres, y «Presunto Café» son trece—. Se corta por esa mitad
y no por la otra porque «Presunto» es la palabra que identifica; «Café» sola valdría
para cualquier cosa. Fuera de ahí, el nombre va entero.

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
| `/productores` | Productores         | Directorio de productores cafeteros con su contacto, para comprarles directo sin intermediarios. **Contenido bloqueado**: ver abajo |

`/tiendas` es parte del alcance de la v1, no un extra para después.

Las tres secciones sin construir **ya tienen ruta**: sirven la pantalla «En proceso»
(`src/app/[seccion]/page.tsx`), que dice qué va a haber ahí y enlaza a lo que sí existe.
La lista de secciones y su estado viven en un solo sitio, `src/content/secciones.ts`.

`/granos` es una biblioteca de artículos, no un catálogo de orígenes. Se replanteó así
porque variedades, países, procesos y altura son tipos de contenido distintos forzados en
una misma ficha, y porque el catálogo de orígenes es contenido infinito: nunca está
terminado. Cada artículo tiene nivel (introductorio o intermedio), tiempo de lectura
calculado del propio cuerpo y un cuerpo hecho de bloques con tipo.

El índice se ordena por **el recorrido del café** —la planta, la finca, el tostador y
«mientras sigue siendo grano»—, no por nivel. El recorrido deja ver los huecos que faltan por contar, mientras que una lista
solo crece; y agrupar por nivel repetiría el recurso de los capítulos por dificultad de
`/metodos`, con lo que las dos secciones se leerían como la misma plantilla rellenada dos
veces. Los artículos se leen sueltos: cada uno se entiende por su cuenta.

La sección llega **hasta donde el café sigue siendo grano**, y esa frontera estuvo antes
en «antes de llegar a tu molino». Se movió al escribir el artículo de la molienda: es una
fase que cuatro fichas de método daban por sabida y que ninguna página contaba, y la línea
vieja dejaba sin dueño el café premolido, que lo muele el tostador. La etapa 04 nació con
tres inquilinos previstos —la molienda, la frescura y el almacenamiento—, que es la razón
de abrirla en vez de acomodar el caso: la explicación entera está en
`src/content/granos/journey.ts`. `/metodos` empieza cuando el agua toca el café.

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

### Productores: la sección bloqueada

**Está en el alcance y su contenido no se escribe hasta que lo revise un abogado.** No es
falta de tiempo: publicar el contacto de personas reales es tratamiento de datos
personales, lo regula la **Ley 1581 de 2012**, y la Superintendencia de Industria y
Comercio puede multar con hasta 2.000 salarios mínimos (artículo 23). La ruta existe y
sirve la pantalla «En proceso», que no enseña ni un dato de nadie; eso sí está permitido.

Tres cosas condicionan la sección, y ninguna se resuelve escribiendo código:

- **El teléfono necesita autorización.** El artículo 10 exceptúa los «datos de naturaleza
  pública» y la calidad de comerciante lo es, así que «Fulano es productor de café» se
  puede publicar. Pero la SIC concluyó (concepto 13-172191, 3 de septiembre de 2013) que
  **dirección y teléfono no son datos públicos**, ni siquiera los de un comerciante. Es
  decir: lo único que el directorio existe para dar es justo lo que exige autorización
  previa, expresa e informada de cada productor, guardada y poder enseñarla.
- **El historial de git choca con el derecho de supresión.** El artículo 8 literal e da al
  titular el derecho a revocar la autorización y pedir que se borren sus datos. Borrarlos
  de un archivo **no los borra del repositorio**: siguen en el historial, recuperables por
  cualquiera que lo clone, para siempre. Para un artículo esa inmutabilidad es una virtud;
  para un teléfono es un defecto que impide cumplir la ley.
- **Hay que abrir contacto y política de tratamiento antes del primer productor.** El
  artículo 12 obliga a identificar al responsable del tratamiento con dirección y teléfono,
  y el artículo 8 a ofrecer un canal para ejercer los derechos. Hoy el sitio no tiene
  página de contacto y el pie no lleva enlaces a propósito. Publicar el directorio obliga
  a abrir las dos cosas, más la política de tratamiento y el aviso de privacidad.

**Dónde van a vivir los datos, ya decidido:** el contacto **se enlaza, no se copia**, donde
el productor ya tenga un canal público suyo —WhatsApp Business, Instagram, su página—,
porque así el dato se queda con su dueño, se actualiza solo y el sitio no lo guarda. Para
el resto, un **almacén fuera del repositorio leído al compilar**: el sitio sigue siendo
estático y borrar es borrar de verdad.

**Queda descartado guardarlos en archivos del repositorio, incluso como paso temporal.**
Se propuso para los primeros cinco o diez y se rechazó: migrar contactos después es peor
que hacerlo bien desde el primero, porque el coste crece con cada productor añadido y se
paga entero justo cuando ya no hay tiempo.

Lo que tiene que pasar por abogado antes del primer productor real: el texto de la
autorización, la política de tratamiento, si aplica el Registro Nacional de Bases de Datos
en este caso, y el descargo de responsabilidad. Ese descargo va **en el índice y en cada
ficha**, no en una página de términos, por la misma razón que la fecha de verificación de
las tiendas: si el dato compromete a alguien, el aviso va donde se lee el dato. Y no cubre
publicar sin autorización — la responsabilidad frente a la SIC no se transfiere con un
aviso.

**La franja «Quiero ser un Presunto» se desbloquea con esta sección, no antes.** El menú
del diseño de Figma cierra con una franja que invita a postular una tienda o un café, y
queda fuera de la implementación por la misma razón que el directorio: «postular»
significa recoger el nombre, el negocio y el contacto de una persona real, que es
tratamiento de datos y obliga a lo mismo —autorización, política de tratamiento, canal
para ejercer los derechos—. Y hoy no tendría siquiera adónde enlazar, porque el sitio no
tiene página de contacto y el pie no lleva enlaces a propósito. Es decir: abre la misma
puerta que los productores y hay que abrirla una sola vez, con lo mismo revisado. Quien
retome cualquiera de las dos, que mire aquí antes: **se desbloquean juntas**.

## Contenido

El contenido vive **en archivos dentro del repositorio**, en `src/content/<sección>/`.
No hay base de datos ni gestor de contenidos externo.

La única excepción ya decidida es **el contacto de los productores**, que no puede vivir en
el repositorio porque el historial de git no permite borrarlo de verdad. El porqué está en
«Productores: la sección bloqueada»; hasta que esa sección se desbloquee, esta regla no
tiene excepciones en la práctica.

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
- Mientras no exista la imagen real se pinta un **bloque de color sólido de la paleta** con
  la proporción correcta. Lo que la regla prohíbe es que la página pida una imagen que no
  está, no que el contenido diga dónde va a estar.
- **El contenido escribe siempre la ruta, aunque el archivo todavía no exista**, y quien
  comprueba en la compilación si está es un resolutor: `resolveContentImage`
  (`src/content/image.ts`) para métodos y artículos, y `resolveEquipmentImage`
  (`src/content/equipo/photo.ts`) para el catálogo de equipo. Si el archivo no está,
  devuelven `src: null` y la página pinta el color. **Guardar el archivo en su sitio es lo
  único que hace falta para publicar una foto**: no se toca ni el contenido ni el código.
- Por eso el contenido declara **`file`** y las páginas reciben **`src`**. Son nombres
  distintos a propósito: así una imagen sin resolver no encaja donde se espera una resuelta
  y saltarse el resolutor es un error de compilación, no un hueco que aparece en la web.
- **Nombres de archivo**: `<slug>.png` para la portada de un método, `<slug>-<qué-es>.jpg`
  para las fotos dentro de un artículo, y el nombre que diga el catálogo para las piezas de
  equipo. Si se cambia la convención, se renombra también lo que ya existía: una convención
  que solo gobierna lo nuevo son dos formatos conviviendo.
- **El nombre se escribe siempre en minúsculas**, con guiones y sin acentos, exactamente
  igual que el slug o la clave del catálogo. Windows no distingue mayúsculas de minúsculas
  y el servidor donde esto se publica sí, así que un `Kalita-Wave` guardado tal cual se ve
  perfecto en local y desaparece en producción sin que nada falle al compilar. Ya pasó una
  vez, con los filtros del Tótem.
- **Las portadas de método van en `.png`.** Antes iban en `.jfif` porque era lo que escupía
  el generador de imágenes y así se dejaba el archivo sin renombrar; el generador ahora da
  `.png` y las nueve portadas se migraron de una vez. El cambio además quita de en medio
  una advertencia que ya no hace falta: el `.jfif` solo funcionaba porque `next/image` lo
  decodifica y sirve `image/jpeg`, y **enlazarlo en crudo no funcionaba** —el servidor de
  archivos estáticos no reconocía la extensión, la servía como `application/octet-stream` y
  el navegador se la descargaba en vez de pintarla—. Con `.png` eso deja de ser un riesgo y
  estas rutas se pueden usar fuera de `next/image`, en una etiqueta `og:image` o en un
  `<img>` a pelo.

### Autoría de las fotografías

Las fotos se buscan con la API de Pexels, y sus términos piden un enlace visible a Pexels
en toda página que la use, más crédito al fotógrafo. Pero la razón de fondo es la misma que
gobierna las cifras: **aquí no se enseña material de otro sin decir de quién es**.

Cada imagen lleva un campo `credit` con el nombre, el enlace a la página de la foto y la
fuente. **Va sin `?`**: dejarlo en `null` tiene que ser un acto escrito, y `null` significa
«autoría no recuperable», no «da igual».

**Las fotografías propias se declaran `{ source: "Propia" }`** y la página dice «Fotografía
propia». Es una variante sin nombre y sin enlace, y las dos ausencias están pensadas: no
hay página contra la que comprobar el crédito —que es para lo que existe el enlace de
Pexels y Unsplash—, y el nombre sería el mismo en todas, o sea una constante repetida
archivo a archivo. Lo que sí importa es que **no se confunda con `null`**: null es «no se
sabe de quién es», y una foto propia sí se sabe, así que salir como «autoría no registrada»
sería falso. Hoy las llevan las tres fotos de las secciones que usa el menú. Donde es null, la página lo dice en voz alta
—«autoría no registrada»— en vez de callarse. Hoy lo son las seis fotos descargadas a mano
antes de que existiera el campo: Pexels y Unsplash quitan los metadatos al servir el archivo
y los originales ya no están. **Un crédito a ojo sería peor que el hueco.**

**Las imágenes generadas con IA se declaran como tales y son siempre provisionales.**
Llevan `credit: { source: "IA" }` y la página dice que no son una fotografía. No es una
formalidad: estas imágenes enseñan qué objeto comprar, y una imagen sintética puede
dibujar mal el objeto sin que se note. Ya ha pasado —la de los filtros del AeroPress
dibuja la tapa perforada como un panal en relieve cuando la real es un disco liso con
agujeros—, así que **el texto alternativo describe lo dibujado y no el objeto real**, y en
el catálogo queda anotado qué tiene mal cada una.

Dónde se ve, en una frase: **el crédito acompaña a la foto cuando la foto se mira, y se
agrupa al pie de la página cuando la foto solo sirve para reconocer algo.** En la práctica,
va pegado en los bloques de imagen de un artículo, que ya tienen pie; y agrupado en un
bloque «Fotografías» al final de la home, del índice de métodos y de cada ficha, donde son
ocho portadas seguidas o miniaturas cuadradas y una línea bajo cada una las convertiría en
un muro de letra pequeña. Solo se acredita **lo que de verdad se ve**: una foto que todavía
es bloque de color no se le ha pedido a nadie.

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

**La excepción declarada: `/sin-conexion`.** Esa página va sobre fondo `ink` y es el único
sitio donde el fondo oscuro está permitido. No es una variante estética: ahí el fondo **es
el mensaje**. Esa página aparece sola, sin que nadie la pida, cuando el teléfono se queda
sin señal, y el crema diría «aquí no pasa nada» justo cuando sí pasa; la pantalla apagada
se entiende antes de leer una palabra. Por lo mismo va sin cabecera y sin pie: los enlaces
de la cabecera llevan a secciones que en ese momento no se pueden abrir. La excepción es de
esa ruta y no se extiende: cualquier otra página oscura vuelve a ser un antipatrón.

Una página se queda sin cabecera ni pie escribiendo **`data-bare-page`** en su `<main>`;
la regla está en `globals.css`. La marca va dentro del HTML y no se deduce de la ruta por
un motivo que costó encontrar: **la página sin conexión no se sirve en su propia
dirección**, sino en la que el visitante pidió, así que nada suyo puede depender de la
URL. Preguntando por la ruta, la cabecera reaparecía al hidratarse.

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
- **`dust` nunca se usa para texto**, en ningún tamaño ni sobre ningún fondo. La única
  excepción declarada es el párrafo de entrada de `/sin-conexion`, que es `dust` sobre
  `ink`. La regla se escribió midiendo `dust` sobre `paper`, que da 1,5:1 y es ilegible;
  sobre `ink` da **9,97:1**, muy por encima del 4,5 de AA. Sigue prohibido sobre crema y
  sobre cualquier otro fondo del sitio, que son todos claros.
- **Sobre fondo `ink`, `lavender` sí es válido para texto pequeño.**

Contrastes medidos sobre `paper`: `ink` 15.3:1 · `coffee` 10.3:1 · `sage-deep` 5.3:1 ·
`lavender-deep` 4.9:1 · `sage` 3.7:1 · `lavender` 3.2:1 · `dust` 1.5:1. Sobre `ink`:
`lavender` 4.9:1. De ahí sale el corte en 24 px: AA pide 4.5:1 en texto normal y 3:1 en
texto grande.

### Espaciado

La escala va en **múltiplos de 4 px** (`--spacing: 4px`), así que las utilidades de
Tailwind se leen directamente en píxeles: `p-1` = 4 px, `p-2` = 8 px, `gap-6` = 24 px.
No uses valores arbitrarios tipo `p-[13px]`: redondea al múltiplo de 4 más cercano.

### El logotipo y el icono

Los dibuja el usuario y **no se rehacen ni se retocan por iniciativa propia**: si algo
del logotipo no encaja, se dice y se espera a que llegue el archivo nuevo.

El **logotipo** —«Presunto Café» con letras dibujadas, «Presunto» en `lavender-deep` y
«Café» en `sage`— vive escrito dentro de `src/app/logo.tsx`, no como archivo en
`/public`. Es la excepción a la regla de que las imágenes van en `/public`, y tiene dos
motivos: al estar en el HTML se pinta con la página, sin una segunda petición ni el
hueco en blanco mientras llega, y sus rellenos pueden ser las variables de la paleta en
vez de dos hexadecimales copiados a mano. Va en la cabecera en lugar del nombre escrito.

Es **muy apaisado** —952,6 × 134, algo más de siete veces más ancho que alto— y eso
manda en cómo se usa: cada píxel de alto le cuesta siete de ancho. Va a 20 px de alto en
móvil, donde mide 142, y a 28 en escritorio, donde mide 199. Esos 199 son la pieza que
decide a partir de qué ancho caben los cinco nombres en la barra; la cuenta está en «El
menú de la cabecera» y hay que rehacerla al tocarla.

Como es un dibujo y no texto, **el logotipo no lo lee ningún lector de pantalla**: el
SVG va con `aria-hidden` y el nombre del sitio viaja en un texto oculto a su lado. Si se
usa el logotipo en otro sitio, ese texto tiene que ir con él.

El **icono** del sitio sale de un único SVG cuadrado, `src/app/icon.svg`. De ahí se
generan con `sharp` los demás tamaños: `src/app/favicon.ico` (con 16, 32 y 48 px
dentro), `src/app/apple-icon.png` (180 × 180) y `public/icon-192.png` y
`public/icon-512.png` para el manifest. Los tres primeros los reconoce Next por el
nombre del archivo y los enlaza solos. **Si cambia el SVG, hay que regenerar los cinco**:
dejar el `.ico` viejo con el icono nuevo es tener dos marcas a la vez según dónde se mire.

Un icono se ve **a 16 px**, y ahí lo que decide es cuánto del cuadro ocupa la marca, no
lo bonita que sea de cerca. Antes de dar un icono por bueno hay que renderizarlo pequeño
y mirarlo, no suponerlo.

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

### Analítica

El sitio lleva **Vercel Web Analytics** (`@vercel/analytics`), montado en
`src/app/layout.tsx`. Se aceptó a sabiendas y esto es lo que se sabía al aceptarlo, para
que no haya que volver a investigarlo.

**Qué hace el paquete que está en el repositorio** (comprobado leyendo su código, no
documentación): son unas 150 líneas que no miden nada. Solo cargan un script y, en cada
cambio de página, envían dos datos: la **ruta patrón** (`/metodos/[slug]`) y la
**dirección real** (`/metodos/v60`). En desarrollo carga otro script distinto y no manda
nada real, así que en local no cuenta.

**El matiz que importa**: el script se sirve desde `/_vercel/insights/script.js`, es
decir, **desde el dominio del propio sitio**, no desde un dominio de Vercel. Lo reenvía
Vercel por detrás. La consecuencia es que **los bloqueadores y las extensiones de
privacidad lo detectan mucho menos que una analítica normal**, porque para el navegador
no hay ningún tercero. Es bueno para la fiabilidad del dato y discutible para quien creía
haberse librado de que lo midieran. Si alguna vez se escribe una página de privacidad,
esto es lo que hay que contar ahí.

**Qué recoge el script que mide**: no se puede verificar desde el repositorio —lo sirve
Vercel en el momento de la petición y no está aquí—, así que lo que sigue es **lo que
Vercel documenta**, no algo comprobado. Sin cookies y sin guardar nada en el navegador.
Al visitante se le identifica con un número calculado en el servidor a partir de su IP,
su navegador y una sal que cambia cada día, así que **ese identificador se rompe cada 24
horas**: no sigue a nadie de un día para otro ni de una web a otra. Recoge la página
vista, de dónde venía, el país (deducido de la IP, que no se guarda), el tipo de aparato,
el sistema y el navegador. Sin perfiles publicitarios.

**La palanca, si hiciera falta**: el componente acepta una función `beforeSend` que
recibe cada evento antes de salir y puede modificarlo o cancelarlo devolviendo `null`.
Ahí se quita lo que no se quiera enviar o se dejan páginas sin medir.

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

### Los 375 px se comprueban en un navegador, no a ojo

Hay un navegador de verdad disponible. El punto 4 **se mide abriendo la página**, no
razonando sobre las clases de Tailwind ni echando cuentas de anchos. Antes no lo había y
la regla era revisarlo a mano; esa razón ya no existe.

Los 375 px son el ancho del contenido, así que hay que **emular un dispositivo**: una
ventana de escritorio no baja de unos 500 px y redimensionarla no sirve.

**No basta con la página quieta.** Hay que mirar también los estados que solo existen
usándola: el cronómetro andando, la calculadora en su valor más ancho, la página
desplazada hasta abajo —que es cuando aparece «Volver al inicio»— y el final del
contenido, para ver si el panel fijo tapa las últimas líneas.

**Lo que se comprueba y lo que no.** Esta comprobación es de **hechos**, y su resultado
es un sí o un no que no se discute: si algo desborda, si un texto se corta, si una imagen
sale deformada o rota, si un elemento fijo tapa a otro o al contenido.

La navegación en dos líneas **sigue siendo un defecto**, y hoy la cabecera lo tiene en
móvil a sabiendas: es un parche con fecha, no la forma final. Está en «Pendientes
conocidos», con qué lo sustituye. No hace falta volver a señalarlo, pero tampoco se puede
tomar como permiso para que otra cosa se parta en dos líneas. **El juicio de diseño no entra aquí y no es tuyo**: si la
página respira, si la jerarquía funciona, si el logotipo se ve pequeño de más o si el
cronómetro ocupa demasiada pantalla lo decide el usuario. Lo que se hace con eso es
**darle la medida** —«el panel ocupa 171 px de los 812»— y dejar que él juzgue, en vez de
opinar o de corregirlo por cuenta propia.

Sigue en pie lo de **declarar qué se comprobó y qué no**: si algo quedó sin mirar, se
dice. Y si la comprobación se hizo contra el servidor de desarrollo y no contra el de
producción, también se dice.

### Una comprobación que da falso verde

**Lo sin conexión no se prueba cortando la red desde el navegador.** La casilla «Offline»
de la pestaña Network deja pasar las peticiones que salen del guion de `public/sw.js`,
porque no comparte el contexto de red de la pestaña. La página se carga como siempre, la
copia guardada no llega a usarse y todo parece correcto: es un verde que no ha probado
nada, y puede dar por buena una versión rota. **Se prueba apagando el servidor**, que no
se puede confundir. El detalle está escrito en el propio `public/sw.js`.

Va aquí por lo que enseña más allá del caso: **una forma de comprobar que puede mentir se
anota junto a lo que comprueba**, porque el coste de descubrirla lo paga entero quien
vuelva a probar lo mismo dentro de unos meses.

## Estado actual

En pie: la **home**, **`/granos`** con cuatro artículos (uno por cada etapa del recorrido) y
**`/metodos`** con diez métodos.

**`/recetas`, `/tiendas` y `/productores` existen como ruta y sirven la pantalla «En
proceso»**, una sola para las tres: `src/app/[seccion]/page.tsx`, un tramo dinámico con
`dynamicParams = false` cuyos slugs salen del registro de secciones. Los tramos escritos
—`/granos`, `/metodos`, `/sin-conexion`— ganan siempre sobre el dinámico, y cualquier otra
dirección sigue cayendo en el 404.

El sitio tiene ahora **`sitemap.ts` y `robots.ts`**, que antes no existían. El sitemap lleva
solo las secciones en pie y sus páginas; las que están en proceso quedan fuera por lo mismo
que llevan `noindex`. El robots.txt deja pasar a todo el mundo y **no bloquea las rutas en
proceso a propósito**: un `Disallow` no dice «no la indexes» sino «no la leas», y un
buscador que no puede leer la página tampoco puede ver el `noindex` que lleva dentro. Las
dos herramientas se estorban, así que el bloqueo vive en el metadato de cada página.

También está en pie **`/sin-conexion`**, que no es una sección ni se llega a ella
navegando: es la página que se ve cuando el teléfono se queda sin señal. La sirve
`public/sw.js`, un guion que el navegador deja instalado y que se pone delante de cada
petición. **Ese guion guarda dos cosas y nada más**: esa página y los archivos de
tipografía de `/_next/static/media/`. Ninguna ficha, ningún artículo. Es lo que permite no
tomar todavía la decisión que `src/app/manifest.ts` dejó aplazada —qué pasa cuando se
corrige un dato y alguien tiene guardada la versión de antes—: las tipografías llevan una
huella en el nombre y no pueden quedarse viejas, y la página guardada se vuelve a pedir
sola si la copia tiene más de una hora. Guardar páginas de verdad para leerlas sin red es
un trabajo aparte, y empieza por tomar aquella decisión, no por añadir rutas a esa lista.

La receta que enseña esa página **no se escribe ahí**: sale de `colado-en-tela`, con las
cantidades calculadas por el mismo `computeAmounts` que mueve la calculadora de la ficha.
Qué método se guarda es una decisión editorial fijada a mano en `SAVED_METHOD`, como el
método de entrada de la home, porque depende de algo que ningún dato del método declara:
que se pueda preparar sin comprar nada.

El guion **solo se instala en producción**. Uno instalado en `localhost` se quedaría ahí
sirviendo páginas viejas por delante del servidor de desarrollo, así que esto se comprueba
con `npm run build` y `npm start`, nunca con `npm run dev`.

Cierra todas las páginas el **pie del sitio** (`src/app/site-footer.tsx`), montado una
sola vez en el layout raíz. No es un mapa del sitio: no lleva ningún enlace, es el
remate editorial de una franja de color donde el sitio dice que la receta era un punto
de partida. Al no haber enlaces tampoco hay encabezados —las tres frases son párrafos—,
porque un `h2` ahí metería el mismo título en el esquema de todas las páginas.

### La dificultad de un método se calcula, no se escribe

Una ficha **no declara su nivel**. Declara cuatro notas del 1 al 5 —coste del error,
margen para rectificar, complejidad del gesto y lo que deja ver— **cada una con la razón
escrita al lado**, y de ahí salen el score, el nivel, el rótulo y el orden del índice.
Todo eso vive en un solo sitio, `src/content/metodos/difficulty.ts`, que además explica
por qué son esos cuatro ejes y no otros.

Para añadir un método nuevo basta con puntuar esos cuatro ejes contra los anclajes del
archivo: no hay que tocar ni la fórmula, ni los cortes, ni la página. **La razón de cada
nota es obligatoria** y no compila sin ella: sin ella nadie puede discutir una
clasificación dentro de unos meses ni puntuar el método siguiente con el mismo rasero.

Dos reglas que salieron de construirlo y que conviene no repetir:

- **Ningún eje puede medir lo que ya mide otro.** El sistema que se estudió primero
  tenía siete dimensiones y cuatro de ellas eran la misma: entre todas daban el 60 % del
  peso a un solo concepto sin que nadie lo hubiera decidido.
- **Tener muchas palancas no es ser difícil.** El V60 es el método con más control del
  sitio y no es el más exigente. El control no entra en el cálculo.

Si un método cae en un nivel que sorprende, **no se mueve el corte**: se mira qué nota lo
puso ahí y se discute esa nota. Los cortes son los tercios exactos de la escala.

La moka es el primer método que no calcula cantidades: las fija el aparato, así que su
ficha pregunta **«qué moka tienes»** en vez de «cuántas tazas quieres» y en el sitio de
la calculadora enseña lo que la olla impone. Por eso `recipe` y `specs.ratio` son
opcionales en `BrewMethod`, y por eso existe la comprobación de
`src/content/metodos/index.ts`, que revienta la compilación si un método declara un
ratio que no se puede leer o si dice sus cantidades por los dos sitios a la vez. También
es el primero sin cronómetro y sin báscula: su fabricante da un suceso y no un tiempo, y
el embudo hace de báscula. Las tres ausencias están contadas en la página, no dejadas en
blanco.

### El menú de la cabecera

La cabecera lleva un **botón que abre un panel con las cinco secciones y lo que hay dentro
de cada una**. Sustituye al apaño del `flex-wrap`, que dejaba la navegación de móvil en dos
filas; de aquello no queda nada. Vive en `src/app/site-header.tsx` y
`src/app/site-menu-panel.tsx`, y lo que enseña se arma en `src/content/menu/`.

**El buscador del diseño no se implementó.** Con quince piezas de contenido no se
justifica, y un campo que no busca nada es peor que no tenerlo. Su hueco en la barra de
escritorio lo ocupa el botón del menú, que en el diseño no existía: el panel es global —no
es un desplegable por sección— y necesitaba un disparador propio.

**Qué enseña el panel y de dónde sale.** Las secciones vienen del registro. Las que tienen
fotografía salen en grande, con la imagen y cuánto hay dentro; las que no, como una línea
bajo el rótulo «En construcción». **No hay un campo que diga cuál es destacada: lo decide
tener foto o no**, para que las dos cosas no puedan contradecirse. Debajo de cada una van
sus enlaces: los cuatro artículos de `/granos`, que son todos, y cuatro métodos de los
diez, elegidos a mano en `src/content/menu/index.ts` con el criterio escrito allí —cuatro
formas distintas de extraer, ninguna repetida—.

**El móvil llega exactamente a lo mismo que el escritorio.** El diseño de Figma ponía las
listas solo en el panel de escritorio; se llevaron también al de móvil, porque que desde el
teléfono no se pueda saltar a un método es una diferencia sin justificación en un sitio que
se consulta con el teléfono en la cocina. Por eso la composición es la misma en los dos
anchos —cada lista debajo de su propia sección— en lugar del reparto izquierda/derecha del
diseño, que obligaría a escribir los enlaces dos veces y esconder la mitad.

**La navegación aparece en la barra a partir de 1100 px, y ese número está medido.** Con
las cinco secciones de hoy la barra necesita 1053 px. Se corta en 1100 para que la holgura
sean 47 px elegidos y no los 8 que sobrarían al cortar justo encima del mínimo. **Al añadir
una sección hay que volver a medirlo**: un nombre más son unos 90 px. Por debajo de ese
ancho la barra es el logotipo y el botón, y no se pierde nada porque el panel las lleva
todas.

**Los márgenes laterales del diseño no ganan.** El menú de Figma dibuja la barra con 48 px
a los lados y 16 en móvil; el sitio usa 64 y 24, en veintitrés sitios. Se conservan los del
sitio: una cabecera con márgenes propios dejaría de alinearse con el contenido de todas las
páginas, y arreglarlo por el otro lado sería rehacer el sitio entero para que encaje la
cabecera. **Esta es la excepción a que el diseño de Figma mande**, y manda porque lo que
está en conflicto no es una decisión de composición del menú sino la retícula de todo el
sitio.

**La navegación va centrada en la barra, y el centrado no depende de que las piezas midan
lo mismo.** El logotipo mide 199 px y el botón 172; cada uno va en una casilla que ocupa la
mitad del espacio libre, así que los cinco nombres caen en el centro exacto pase lo que
pase. Si dependiera de que las dos piezas coincidieran, estaría descentrado 13 px sin que
nadie lo hubiera decidido.

**El panel se abre como `<dialog>` modal, y esa decisión resuelve la accesibilidad sola.**
El navegador atrapa el tabulador dentro, cierra con Escape y deja el resto de la página sin
poder pulsarse **y sin anunciarse al lector de pantalla**. Solo hay dos cosas escritas a
mano: devolver el foco al botón al cerrar —salvo cuando se cierra por haber navegado, que
entonces el foco es de la página nueva— y bloquear el desplazamiento de detrás.

De ahí sale lo único que puede extrañar al leer el código: **el panel lleva su propia copia
de la barra**. Al estar en la capa superior, la barra de la página deja de poder pulsarse, y
el botón de cerrar está justo ahí. La copia cae exactamente encima de la original y mide lo
mismo, así que no se ve que haya dos; para el lector de pantalla tampoco, porque lo de fuera
está callado mientras el panel esté abierto.

**El fondo de detrás no se oscurece.** Sigue cerrando al pulsarlo, pero un velo oscuro
chocaría con la regla del sitio. En escritorio, donde el panel acaba a media pantalla y
debajo se sigue viendo la página del mismo crema, lo que marca dónde termina es un filete
de `dust`, no un fondo.

La franja «Quiero ser un Presunto» del diseño **queda fuera**, por lo mismo que el
directorio de productores: ver «Productores: la sección bloqueada».

### El registro de secciones

**`src/content/secciones.ts` es la única lista de secciones del sitio.** Cada una declara
su slug, su nombre, su estado (`"en-pie"` o `"en-proceso"`) y una frase con lo que va a
haber ahí. De ese archivo salen cuatro cosas: la navegación de la cabecera, las rutas que
sirve la pantalla «En proceso», el bloque de secciones del final de esa pantalla y el
sitemap.

**Completar una sección es cambiar su `estado` a `"en-pie"`**, y las cuatro se enteran
solas: deja de tener pantalla de espera, entra al sitemap, pierde la marca de la cabecera
y se convierte en enlace vivo dentro de las otras pantallas. Añadir una sección pendiente
es una entrada más y nada más.

Esto sustituye a la regla anterior —«mientras una sección no exista, nada enlaza a su
ruta»—, que existía porque «un enlace a /recetas hoy es un 404». Ya no lo es: la ruta
responde y explica qué se está construyendo. Lo que sobrevive de aquella regla es su
fondo, y es lo que justifica la marca de la cabecera: **un enlace de navegación no puede
prometer lo que no hay**. Las pendientes llevan un círculo hueco al lado, con un texto
oculto que dice «, en proceso» para quien navega con lector de pantalla, porque la marca no
puede ser solo una forma ni solo un color.

Dos cuidados al tocar el registro:

- **Lo importa la cabecera, que es componente de cliente**, así que ahí no puede entrar
  `node:fs` ni nada de servidor. La comprobación que necesita el sistema de archivos —que
  una sección marcada `"en-pie"` tenga de verdad su carpeta en `src/app/`— vive en
  `src/app/sitemap.ts` y revienta la compilación si no cuadra.
- **El nombre más largo manda en el rótulo de la pantalla «En proceso»**, que es donde
  aparece: el titular es el mismo en las tres rutas —«Estamos tostando algo.»— y lo que
  distingue una sección de otra es «EN CONSTRUCCIÓN · PRODUCTORES». Con el nombre más
  largo de hoy ese rótulo mide 296 px de los 327 que quedan a 375 px de pantalla. Una
  sección con un nombre más largo hay que medirla ahí.

- **Las casillas del final son cuatro porque hay cinco secciones y una es la actual.**
  Esa resta es lo que sostiene la fila de cuatro columnas del diseño. Con una sección más
  serían cinco casillas y la fila hay que repensarla, no estirarla.

Y una advertencia para cualquier diseño futuro que traiga su propio pie: **una franja de
color al final de una página choca con el pie del sitio**, que va en el layout raíz y sale
en todas. Ya ha pasado dos veces —el 404 y la pantalla «En proceso»—, y las dos veces se
quitó la franja de la página y se dejó cerrar al pie: `lavender` sobre `lavender-deep` se
lee como un fallo de pintado, no como una decisión.

## Pendientes conocidos

Defectos detectados y aceptados a sabiendas. No hace falta volver a señalarlos ni
arreglarlos por iniciativa propia; si un trabajo futuro toca la zona, este es el sitio
donde mirar antes.

- **`/sin-conexion` es la única página que trata de usted.** Su texto dice «haga lo que
  toca» y «Le dejamos una receta»; el resto del sitio tutea —«puedes usarla», «desde que
  mojas el café»—. Viene así del diseño y se deja así. **No se corrige página por
  página**: el tratamiento es una decisión de todo el sitio, pendiente desde la guía de
  lenguaje, y arreglar esta sola dejaría el sitio con dos tratamientos igual que ahora
  pero repartidos de otra forma. El día que se decida, esta es una de las páginas que hay
  que repasar.

- **La Fraunces del sitio no es la que dibuja Figma, y eso afecta a todos los títulos
  grandes.** Fraunces tiene un eje de tamaño óptico (`opsz`): no es una escala, es un
  dibujo distinto de la letra según el cuerpo en el que se vaya a leer —en cuerpos
  pequeños es robusta y de poco contraste, y en cuerpos grandes adelgaza los trazos
  finos y aprieta el espaciado—. Figma la pinta con ese eje y el sitio no: `next/font`
  la carga solo con el eje de peso, así que **todo título del sitio usa el corte de
  texto, mida 24 px o 96**. La diferencia es medible: «El café no tiene una» a 96 px
  ocupa **789 px** con la del sitio y **674** con el corte de display, un 15 % menos.
  La consecuencia práctica es que **un texto en Fraunces siempre va a medir más de lo
  que mide en Figma**, así que un diseño que encaja justo en su caja aquí se parte en
  una línea más, y hay que contar con ello al pasar un título de Figma al sitio.

  Dos frases ya se ajustaron por esto, y las dos cedieron por el mismo lado —**el
  cuerpo, no la caja**—, que es el criterio a repetir: bajar el tamaño conserva la
  composición, ensanchar la caja la deshace. La respuesta del pie del sitio se queda en
  72 px en vez de los 96 dibujados, y el titular de `/sin-conexion` en 88 en vez de 92;
  el cálculo de cada una está escrito en su archivo. **Sigue sin cuadrar en un sitio**:
  esa frase del pie se parte en tres líneas a 375 px y por debajo, por cinco píxeles.
  Desde 390 px, y a los 400 del diseño de móvil, son dos. Se decidió no inventar un
  punto de corte a 390 px ni encoger el texto en teléfonos donde ya cabe.
  No se corrige por iniciativa propia: añadir `axes: ["opsz"]` al cargar la tipografía
  cambiaría de golpe el dibujo de todos los títulos del sitio, y eso se decide mirando
  todas las páginas a la vez, no arreglando una.

- **Un artículo no puede enlazar a otro.** El bloque `paragraph` solo admite itálicas, así
  que cuando un artículo manda a otro lo hace en prosa, nombrándolo: es lo que hace el
  final de «Niveles de tueste» con la molienda. Se decidió **no** abrir un enlace entre
  artículos ahora y esperar a que haya dos casos reales —la frescura va a querer apuntar a
  la molienda y al revés—, para montarlo bien en vez de improvisar uno suelto.
- **El cronómetro se superpone al recuadro del título entre 768 y 1000 px de ancho.** En
  ese rango, el panel fijo del cronómetro de las fichas de método pisa la esquina derecha
  del recuadro crema del título. No tapa texto, así que se decidió no corregirlo por
  ahora. Si en el futuro se rediseña el cronómetro, valorar pasarlo a una columna propia
  en escritorio: dejaría de flotar sobre el contenido y el solape desaparecería solo.
