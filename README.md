# Kame House Training 🥊💪🥋

Landing page estática para **Kame House Training** — gym de entrenamiento funcional, box y taekwondo.

## Stack

- **Next.js 15** (App Router, static export)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Netlify** (deploy)

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Build & Export

```bash
npm run build
```

Genera el sitio estático en la carpeta `out/`.

## Deploy

El deploy se hace automáticamente en **Netlify** al pushear a `main`. La configuración está en `netlify.toml`.

## Estructura

```
src/
├── app/              # Layout, page principal, CSS global
├── components/
│   ├── sections/     # Hero, Services, Schedule, Pricing, etc.
│   └── ui/           # GlassCard, Button, Badge, TabSelector, etc.
├── hooks/            # useScrollAnimation, useActiveSection
├── lib/              # constants (datos del negocio), metadata
└── types/            # TypeScript interfaces
```

## Datos por Configurar

Los siguientes datos en `src/lib/constants.ts` deben actualizarse:

- `CONTACT.whatsapp` — Número de WhatsApp del gym
- `CONTACT.address` — Dirección física
- `CONTACT.mapUrl` — URL de Google Maps
- `CONTACT.mapEmbed` — URL de embed de Google Maps

En `src/app/layout.tsx` actualizar:

- Teléfono en JSON-LD
- Dirección completa en JSON-LD
- URL del dominio final (si cambia de `kamehousetraining.com`)

## Diseño

- Tema oscuro con glassmorphism
- Temática Dragon Ball Z (Kame House)
- Tipografía: Bebas Neue (headings) + Inter (cuerpo)
- Animaciones CSS nativas (sin librerías)
- Mobile-first (optimizado para QR → móvil)

## Licencia

Proyecto privado — Kame House Training © 2026
