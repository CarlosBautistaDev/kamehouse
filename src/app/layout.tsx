import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kamehousetraining.com"),
  title: "Kame House Training | Entrenamiento Funcional, Box y Taekwondo",
  description:
    "Gym de entrenamiento funcional, box y taekwondo. CrossFit, Calistenia, HYROX y más. Horarios flexibles desde $300/semana. ¡Inscríbete hoy!",
  keywords: [
    "gym",
    "entrenamiento funcional",
    "box",
    "taekwondo",
    "crossfit",
    "calistenia",
    "HYROX",
    "Kame House Training",
    "clases de box",
    "clases de taekwondo",
  ],
  authors: [{ name: "Kame House Training" }],
  openGraph: {
    title: "Kame House Training | Entrenamiento Funcional, Box y Taekwondo",
    description:
      "Gym de entrenamiento funcional, box y taekwondo. Horarios flexibles desde $300/semana.",
    url: "https://kamehousetraining.com",
    siteName: "Kame House Training",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kame House Training — Entrenamiento Funcional, Box, Taekwondo",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kame House Training",
    description:
      "Entrenamiento Funcional, Box y Taekwondo. Desde $300/semana.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://kamehousetraining.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Kame House Training",
  description: "Gym de entrenamiento funcional, box y taekwondo.",
  url: "https://kamehousetraining.com",
  image: "https://kamehousetraining.com/images/og-image.jpg",
  telephone: "+52XXXXXXXXXX",
  address: {
    "@type": "PostalAddress",
    streetAddress: "DIRECCIÓN DEL GYM",
    addressLocality: "CIUDAD",
    addressRegion: "ESTADO",
    postalCode: "CP",
    addressCountry: "MX",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "11:00",
    },
  ],
  priceRange: "$100 - $1,500 MXN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`dark ${bebasNeue.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon_io/favicon-16x16.png" />
        <link rel="icon" href="/images/favicon_io/favicon.ico" />
        <link rel="manifest" href="/images/favicon_io/site.webmanifest" />
        <meta name="theme-color" content="#0C0C0C" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(history.scrollRestoration)history.scrollRestoration='manual';window.scrollTo(0,0);if(location.hash){history.replaceState(null,'',location.pathname+location.search)}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-body">
        {children}
        {/* SVG filter for liquid glass distortion */}
        <svg style={{ display: "none" }} aria-hidden="true">
          <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves={2} seed={92} result="noise" />
            <feGaussianBlur in="noise" stdDeviation={2} result="blurred" />
            <feDisplacementMap in="SourceGraphic" in2="blurred" scale={70} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      </body>
    </html>
  );
}
