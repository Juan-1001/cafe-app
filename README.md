# Presunto Café

Web de contenido para aficionados al café de especialidad. El objetivo es que alguien
curioso llegue, aprenda y se lleve algo aplicable: entender de dónde viene un grano,
cómo prepararlo en casa y dónde tomarse un buen café en Bogotá.

No es la web de una cafetería ni una tienda: no hay carrito, ni pagos, ni pedidos. No
hay cuentas de usuario ni panel de administración; todo el contenido es público y de
solo lectura.

## Arrancarlo

```bash
npm install
npm run dev     # servidor de desarrollo en http://localhost:3000
npm run build   # build de producción
npm start       # sirve el build de producción
npm run lint    # eslint
```

Hace falta Node 20.9 o superior, que es lo que pide Next 16.

Hay un quinto comando que no entra en la compilación: `npm run verificar-fuentes`
recorre los enlaces de las fuentes citadas en el contenido y dice cuáles siguen vivos.
Necesita internet y se lanza a mano, al tocar una ficha o un artículo que cite
documentos. No comprueba que el documento siga diciendo lo mismo —para eso está la
fecha de consulta que lleva cada fuente—, solo que el servidor conteste.

**La página sin conexión solo se puede ver con `npm start`, nunca con `npm run dev`.**
Es la que se muestra cuando el teléfono se queda sin señal (`/sin-conexion`), y la sirve
`public/sw.js`, un guion que el navegador deja instalado y que **solo se instala en
producción**, a propósito: uno instalado en `localhost` se quedaría sirviendo páginas
viejas por delante del servidor de desarrollo.

Se prueba **apagando el servidor**, no con la casilla «Offline» del navegador, que deja
pasar las peticiones de ese guion y da un falso visto bueno. Está explicado dentro de
`public/sw.js`.

## Secciones

| Ruta            | Sección                | Estado |
|-----------------|------------------------|--------|
| `/`             | Inicio                 | En pie |
| `/granos`       | Granos                 | En pie — cuatro artículos |
| `/metodos`      | Métodos de preparación | En pie — diez métodos |
| `/recetas`      | Recetas                | En proceso |
| `/tiendas`      | Tiendas en Bogotá      | En proceso |
| `/productores`  | Productores            | En proceso — y **bloqueado**, ver abajo |

Las tres secciones en proceso **ya tienen ruta**: sirven una pantalla que dice qué va a
haber ahí y enlaza a lo que sí existe. No son un 404.

La lista de secciones y su estado viven en un solo sitio, `src/content/secciones.ts`,
y de ahí salen la navegación de la cabecera, el menú, las rutas de esa pantalla, el
bloque de secciones del final de esa misma pantalla y el sitemap. **Completar una
sección es cambiar su `estado` a `"en-pie"`**, y todo lo que sale de ahí se entera solo.
Lo único que hay que escribir además es cómo cuenta el menú lo que tiene dentro: sin
eso la compilación falla, en lugar de enseñar una sección que parece vacía.

Además de las secciones hay dos rutas que no se alcanzan navegando: `/sin-conexion`, la
de arriba, y el 404.

## Dónde está el contenido

El contenido vive en archivos dentro del repositorio, en `src/content/`. No hay base de
datos ni gestor de contenidos externo.

- Un archivo por elemento (un artículo, un método, una receta, una tienda), y el
  `slug` de la URL sale del nombre del archivo.
- `src/content/secciones.ts` es la única lista de secciones del sitio.
- `src/content/home.ts` son los textos propios de la portada, que es una página única
  y no una sección con elementos.
- `src/content/menu/` es lo que enseña el menú de la cabecera: qué métodos aparecen
  —elegidos a mano, con el criterio escrito ahí— y cómo se arma el panel.
- `src/content/equipo/` es el catálogo compartido de piezas de equipo (molino,
  báscula, hervidor), que se repiten entre métodos.
- `src/content/metodos/difficulty.ts` calcula la dificultad de cada método a partir de
  cuatro notas razonadas. Una ficha no declara su nivel: sale de ahí.

Las fotografías se descargan y se guardan en `/public/images/<sección>/`. Nunca se
enlazan desde un dominio externo. El contenido escribe siempre la ruta aunque el archivo
todavía no exista: si no está, la página pinta un bloque de color de la paleta, y
**guardar el archivo en su sitio es lo único que hace falta para publicar una foto**.

## Antes de tocar nada

**Las reglas del proyecto están en [`CLAUDE.md`](CLAUDE.md)**: el sistema de diseño
(paleta, tipografías, espaciado y las reglas de contraste que no son negociables), el
tono, los antipatrones visuales, cómo se nombran los archivos de imagen y cómo se
acredita la autoría de cada fotografía. Está escrito para que lo lea Claude Code al
abrir el proyecto, pero vale igual para una persona.

Tres que conviene saber de entrada:

- **`/productores` está bloqueada y no es falta de tiempo.** Publicar el contacto de
  personas reales es tratamiento de datos personales, lo regula la Ley 1581 de 2012 y
  la Superintendencia de Industria y Comercio puede multar por ello. Su contenido no se
  escribe hasta que lo revise un abogado. La ruta existe y no enseña ni un dato de
  nadie; eso sí está permitido. Los detalles, en `CLAUDE.md`.
- **Ningún dato comprobable** —cifra, porcentaje, fecha, temperatura, récord— se escribe
  sin fuente primaria. El procedimiento está en
  [`.claude/skills/verificar-datos/SKILL.md`](.claude/skills/verificar-datos/SKILL.md).
- **Todo el texto visible va en español; el código, en inglés.**

Y antes de dar algo por terminado: `npm run lint` y `npm run build` sin errores, el
contraste de todo el texto en AA como mínimo, y la página abierta de verdad a 375 px de
ancho para ver que nada desborda ni se corta.

## Stack

Next.js 16 con App Router, React 19, TypeScript y Tailwind CSS v4. Todo el sitio es
estático: Server Components por defecto, y `"use client"` solo donde hay interacción
real en el navegador. Sin librerías de UI.

La única dependencia que habla con fuera es **Vercel Web Analytics**. Según lo que
documenta Vercel, no usa cookies y no sigue a nadie de un día para otro; recoge la
página vista, de dónde se venía, el país y el tipo de aparato y navegador. En
desarrollo no manda nada real. Lo que se sabía al aceptarla está contado en `CLAUDE.md`.
