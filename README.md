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
npm run lint    # eslint
```

Hace falta Node 20 o superior.

Para buscar fotografías en Pexels con `npm run verificar-fuentes` y los guiones que
usan su API se necesita un archivo `.env.local` con `PEXELS_API_KEY`. El sitio compila
y funciona sin él: solo se usa al buscar imágenes nuevas.

## Secciones

| Ruta       | Sección                | Estado |
|------------|------------------------|--------|
| `/`        | Inicio                 | En pie |
| `/granos`  | Granos                 | En pie |
| `/metodos` | Métodos de preparación | En pie |
| `/recetas` | Recetas                | Por construir |
| `/tiendas` | Tiendas en Bogotá      | Por construir |

Mientras una sección no exista, nada enlaza a su ruta: ni la cabecera ni la portada.

## Dónde está el contenido

El contenido vive en archivos dentro del repositorio, en `src/content/`. No hay base de
datos ni gestor de contenidos externo.

- Un archivo por elemento (un artículo, un método, una receta, una tienda), y el
  `slug` de la URL sale del nombre del archivo.
- `src/content/home.ts` son los textos propios de la portada, que es una página única
  y no una sección con elementos.
- `src/content/equipo/` es el catálogo compartido de piezas de equipo (molino,
  báscula, hervidor), que se repiten entre métodos.
- `src/content/metodos/difficulty.ts` calcula la dificultad de cada método a partir de
  cuatro notas razonadas. Una ficha no declara su nivel: sale de ahí.

Las fotografías se descargan y se guardan en `/public/images/<sección>/`. Nunca se
enlazan desde un dominio externo.

## Antes de tocar nada

**Las reglas del proyecto están en [`CLAUDE.md`](CLAUDE.md)**: el sistema de diseño
(paleta, tipografías, espaciado y las reglas de contraste que no son negociables), el
tono, los antipatrones visuales, cómo se nombran los archivos de imagen y cómo se
acredita la autoría de cada fotografía.

Dos que conviene saber de entrada:

- Ningún dato comprobable —cifra, porcentaje, fecha, temperatura, récord— se escribe
  sin fuente primaria. El procedimiento está en
  [`.claude/skills/verificar-datos/SKILL.md`](.claude/skills/verificar-datos/SKILL.md).
- Todo el texto visible va en español; el código, en inglés.

## Stack

Next.js 16 con App Router, React 19, TypeScript y Tailwind CSS v4. Todo el sitio es
estático: Server Components por defecto, y `"use client"` solo donde hay interacción
real en el navegador.
