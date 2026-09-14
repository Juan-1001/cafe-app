import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, Space_Mono } from "next/font/google";
import { BackToTop, PAGE_TOP_ID } from "./back-to-top";
import { SiteHeader } from "./site-header";
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
 * Los datos por defecto de la pestaña del navegador. Cada página pone su propio título
 * —la home, los índices y cada ficha—, así que esto solo se ve si alguna se olvida de
 * hacerlo; era el título de la plantilla de Next («Create Next App») hasta que hubo una
 * portada que lo enseñaba.
 */
export const metadata: Metadata = {
  title: "Café",
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
        <SiteHeader />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
