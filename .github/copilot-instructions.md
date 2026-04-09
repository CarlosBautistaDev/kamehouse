# Copilot Instructions — Kame House Training

## Proyecto

**Kame House Training** — Landing page estática para gym de entrenamiento funcional, box y taekwondo. Diseño sofisticado minimalista con tema blanco, glassmorphism light, partículas canvas y secciones parallax.

## Stack

- **Next.js 15** (App Router, `output: 'export'` static site)
- **React 19**
- **TypeScript 5+** (estricto)
- **Tailwind CSS v4** (con `@tailwindcss/postcss`)
- **Netlify** (deploy, SSL)
- **Sin backend, sin BD, sin auth** — Solo HTML/CSS/JS estático

## Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx          # Root layout: SEO, JSON-LD, fonts (Bebas Neue + Inter)
│   ├── page.tsx            # Landing: composición de todas las secciones
│   └── globals.css         # Tailwind imports, CSS variables, keyframes, glass
├── components/
│   ├── sections/           # Hero, Services, Schedule, Pricing, ComingSoon, Contact, Footer
│   └── ui/                 # GlassCard, Button, Badge, TabSelector, PriceCard, AnimatedSection, ParticlesCanvas, ParallaxSection
├── hooks/
│   ├── useScrollAnimation.ts   # IntersectionObserver → ref + isVisible
│   └── useActiveSection.ts     # Track sección visible para nav
├── lib/
│   └── constants.ts        # TODOS los datos del negocio (horarios, precios, contacto)
└── types/
    └── index.ts            # TimeSlot, Schedule, PricePlan, Service, Professor, etc.
```

## Paleta de Colores (CSS variables en globals.css)

| Variable | Valor | Uso |
|----------|-------|-----|
| `--color-bg-primary` | `#FFFFFF` | Fondo principal |
| `--color-bg-secondary` | `#F7F7F8` | Secciones alternas |
| `--color-bg-dark` | `#0C0C0C` | Hero, footer |
| `--color-accent-primary` | `#FF6B35` | Naranja Dragon Ball — CTAs |
| `--color-accent-secondary` | `#E63946` | Rojo — badges, alerts |
| `--color-text-primary` | `#1A1A1A` | Texto principal |
| `--color-text-secondary` | `#6B7280` | Texto muted |

## Tipografía

- **Headings**: `Bebas Neue` (variable `--font-heading`)
- **Cuerpo**: `Inter` (variable `--font-body`)
- Cargadas via `next/font/google` en layout.tsx

## Glassmorphism

Clase `.glass` en globals.css: `backdrop-filter: blur(20px)`, border sutil, hover state.

## Animaciones

Solo CSS nativo + IntersectionObserver. **NO instalar** framer-motion, GSAP, AOS ni similares.
- `animate-fade-in-up` — entrada desde abajo
- `animate-pulse-glow` — glow naranja pulsante
- `animate-gradient` — gradiente animado
- `animate-slide-in-right` — entrada desde derecha

## Datos del Negocio

Todos los datos están en `src/lib/constants.ts`:

### Horarios Box
- Lunes a Jueves: 7-8am, 8-9am, 9-10am, 10-11am, 4-5pm, 5-6pm, 7-8pm
- Sábado: 9-11am (continuo)
- Profesores: Bocho Boxing (mañanas), Antonio (tardes)

### Horarios Funcional
- Lunes a Viernes: 7-8am, 8-9am, 8-9pm
- Sábado: 8-9am

### Horarios Taekwondo
- L-Mi 6-7pm: Jóvenes/Adultos/Avanzados
- Ma-Ju 6-7pm: Niños (principiantes)
- Viernes 6-7pm: Ambos
- L-Mi-Vi 9-10am: Jóvenes y Adultos

### Precios
- Individual: $300/semana, $1,200/mes (destacado), $100/día
- Combo 2 actividades: $450/semana, $1,500/mes
- Taekwondo: $450/mes

### Datos por completar (marcados con REEMPLAZAR en constants.ts)
- `CONTACT.whatsapp` — Número de WhatsApp
- `CONTACT.address` — Dirección física del gym
- `CONTACT.mapUrl` — URL de Google Maps
- `CONTACT.mapEmbed` — URL de embed de Google Maps
- Teléfono y dirección en JSON-LD de layout.tsx

## Reglas de Desarrollo

1. **Responder siempre en español**
2. No reescribir archivos completos, solo editar lo necesario
3. Componentes funcionales con TypeScript estricto
4. Props tipadas con `interface` (no `type` para componentes)
5. Nombres: PascalCase componentes, `use` prefix hooks
6. CSS con Tailwind utilities; clases custom solo en `globals.css` para animaciones/glass
7. **No instalar dependencias** adicionales sin justificación
8. **Mobile-first**: diseñar para 375px → `md:` → `lg:`
9. Datos del negocio siempre desde `lib/constants.ts`, nunca hardcoded
10. `next/image` con `alt` descriptivo para imágenes
11. Semantic HTML: `<section>`, `<nav>`, `<main>`, `<footer>`, headings jerárquicos
12. Custom hooks para lógica reutilizable
13. El 95%+ del tráfico viene de QR → celular. Priorizar mobile siempre

## SEO

- Metadata completa en layout.tsx (title, description, OG, Twitter Cards)
- JSON-LD `SportsActivityLocation` en layout.tsx
- `metadataBase` apunta a `https://kamehousetraining.com` (ajustar al dominio final)
- Canonical URL configurada

## Deploy

- **Netlify** — config en `netlify.toml`
- Build: `npm run build` → publish: `out/`
- Headers de seguridad: X-Frame-Options, X-Content-Type-Options, Referrer-Policy

## Git

- Config local: `CarlosBautistaDev` / `CarlosBautistaDev@users.noreply.github.com`
- Remote: `https://github.com/CarlosBautistaDev/kamehouse.git`
- **NO modificar** la config global de git (tiene credenciales de trabajo Elektra/AWS/CodeCommit)
