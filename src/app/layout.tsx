import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Fraunces, IBM_Plex_Sans, Space_Mono } from "next/font/google";
import { BackToTop, PAGE_TOP_ID } from "./back-to-top";
import { OfflineCache } from "./offline-cache";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { buildMenuModel } from "@/content/menu/model";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

/**
 * Los datos de la pestaña del navegador que valen para todo el sitio.
 *
 * `default` es la reserva: lo que se ve si una página se olvida de poner su propio
 * título. Hoy no se ve en ninguna parte, porque la home, los índices y cada ficha
 * ponen el suyo; era el título de la plantilla de Next («Create Next App») hasta que
 * hubo una portada que lo enseñaba. Se queda en la palabra sola a propósito: si algún
 * día se ve, tiene que quedar claro que esa página se olvidó de nombrarse, y no
 * disimularlo copiando el titular de la portada.
 *
 * `template` le pega « · Presunto Café» al título de todas las páginas de dentro, donde el
 * `%s` es el título que cada una escribe. Se aplica sola a los hijos, así que se
 * escribe una vez aquí y ninguna página vuelve a nombrar el sitio. Existe porque una
 * pestaña que pone «Granos» a secas no dice de dónde es, y eso se nota en los
 * marcadores, en el historial y en los resultados de búsqueda, que es donde el título
 * se lee entero y fuera de contexto.
 *
 * La portada se salta la plantilla con `absolute` (src/app/page.tsx), porque su
 * título ya empieza por «Café» y con el sufijo lo diría dos veces.
 */
export const metadata: Metadata = {
  title: {
    default: "Presunto Café",
    template: "%s · Presunto Café",
  },
  description:
    "Café de especialidad explicado desde cero: de dónde viene el grano y cómo prepararlo en casa.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${ibmPlexSans.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/*
          El principio de la página como destino con nombre. No se ve ni ocupa alto:
          es adonde se manda el foco al pulsar «Volver al inicio», para que quien lee
          con lector de pantalla vuelva de verdad al principio y no solo vea subir la
          página. El `tabIndex={-1}` es lo que lo hace enfocable desde el código sin
          meterlo en el recorrido del tabulador de todo el mundo.
        */}
        <div id={PAGE_TOP_ID} tabIndex={-1} />
        {/*
          El menú de la cabecera se arma aquí, que es servidor, y no dentro de la
          cabecera, que es cliente: resolver las fotos obliga a mirar el disco y contar
          los métodos obliga a importar los diez. El porqué entero está en
          src/content/menu/model.ts.
        */}
        <SiteHeader menu={buildMenuModel()} />
        {children}
        {/*
          El cierre del sitio. Va aquí, en el layout raíz, y no en cada página: este
          layout envuelve todas las rutas —la portada, los índices, las fichas y
          también el 404—, así que una sección nueva lo hereda el día que exista sin
          tener que acordarse de nada.

          Después de `{children}` y no dentro: el bloque «Fotografías» con el que
          cierran varias páginas acredita las fotos de esa página en concreto, así que
          pertenece a la página y tiene que quedar dentro de ella. Esta franja es del
          sitio entero y va después.
        */}
        <SiteFooter />
        <BackToTop />
        {/*
          Lo que instala el guion que guarda la página sin conexión en el teléfono. No
          pinta nada y solo hace algo en producción; el porqué de las dos cosas está en
          offline-cache.tsx.
        */}
        <OfflineCache />
        {/*
          El contador de visitas de Vercel. No pinta nada en la página: solo avisa de
          cada cambio de ruta, y solo hace algo cuando el sitio está desplegado allí
          —en local y en el build de producción propio se queda callado—.

          Va al final del body, después del contenido, porque nada de lo que se ve
          depende de él y así no se pone por delante de la primera pintura.
        */}
        <Analytics />
      </body>
    </html>
  );
}
