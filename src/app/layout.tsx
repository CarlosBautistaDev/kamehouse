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
  title: {
    default: "Kame House Training | Gym en Azcapotzalco CDMX — Box, Funcional y Taekwondo",
    template: "%s | Kame House Training",
  },
  description:
    "Gym en Azcapotzalco, CDMX. Clases de box, entrenamiento funcional, taekwondo y kickboxing. CrossFit, Calistenia, HYROX. Horarios de lunes a sábado desde $100/día. ¡Inscríbete hoy!",
  keywords: [
    "gym Azcapotzalco",
    "gym CDMX",
    "clases de box CDMX",
    "clases de box Azcapotzalco",
    "entrenamiento funcional CDMX",
    "entrenamiento funcional Azcapotzalco",
    "taekwondo CDMX",
    "taekwondo Azcapotzalco",
    "kickboxing CDMX",
    "crossfit CDMX",
    "calistenia CDMX",
    "HYROX México",
    "Kame House Training",
    "gym barato CDMX",
    "clases de taekwondo niños CDMX",
    "gimnasio Azcapotzalco",
  ],
  authors: [{ name: "Kame House Training" }],
  creator: "Kame House Training",
  publisher: "Kame House Training",
  formatDetection: {
    telephone: true,
    address: true,
  },
  openGraph: {
    title: "Kame House Training | Gym en Azcapotzalco — Box, Funcional, Taekwondo",
    description:
      "Gym en Azcapotzalco, CDMX. Box, funcional, taekwondo y kickboxing. Desde $100/día. Horarios de lunes a sábado.",
    url: "https://kamehousetraining.com",
    siteName: "Kame House Training",
    images: [
      {
        url: "/images/kh-logo.png",
        width: 800,
        height: 800,
        alt: "Kame House Training — Gym en Azcapotzalco, CDMX",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kame House Training | Gym en Azcapotzalco CDMX",
    description:
      "Box, Entrenamiento Funcional, Taekwondo y Kickboxing. Desde $100/día.",
    images: ["/images/kh-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://kamehousetraining.com",
  },
  verification: {
    // Agregar cuando se tenga: google: "TU_CODIGO_DE_VERIFICACION",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "@id": "https://kamehousetraining.com/#gym",
  name: "Kame House Training",
  description: "Gym de entrenamiento funcional, box, taekwondo y kickboxing en Azcapotzalco, Ciudad de México. CrossFit, Calistenia, HYROX y más.",
  url: "https://kamehousetraining.com",
  image: "https://kamehousetraining.com/images/kh-logo.png",
  logo: "https://kamehousetraining.com/images/kh-logo.png",
  telephone: "+525564603210",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Leopoldo Blackaller 150",
    addressLocality: "Azcapotzalco",
    addressRegion: "Ciudad de México",
    postalCode: "02719",
    addressCountry: "MX",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 19.4869,
    longitude: -99.1840,
  },
  areaServed: {
    "@type": "City",
    name: "Ciudad de México",
  },
  sameAs: [
    "https://www.instagram.com/kamehouse_19",
    "https://www.facebook.com/profile.php?id=61575310498498",
  ],
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
  currenciesAccepted: "MXN",
  paymentAccepted: "Cash, Bank Transfer",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Planes de entrenamiento",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Actividad Individual — Día",
        price: "100",
        priceCurrency: "MXN",
        description: "Visita única, 1 actividad, 1 sesión",
      },
      {
        "@type": "Offer",
        name: "Actividad Individual — Semana",
        price: "300",
        priceCurrency: "MXN",
        description: "1 actividad, lunes a sábado",
      },
      {
        "@type": "Offer",
        name: "Actividad Individual — Mes",
        price: "1200",
        priceCurrency: "MXN",
        description: "1 actividad, lunes a sábado, horarios flexibles",
      },
      {
        "@type": "Offer",
        name: "Combo 2 Actividades — Mes",
        price: "1500",
        priceCurrency: "MXN",
        description: "2 actividades, lunes a sábado",
      },
      {
        "@type": "Offer",
        name: "Taekwondo — Mes",
        price: "450",
        priceCurrency: "MXN",
        description: "Niños, jóvenes y adultos, todos los niveles",
      },
    ],
  },
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
