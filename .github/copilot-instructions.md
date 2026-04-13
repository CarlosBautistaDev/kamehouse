# Copilot Instructions — Kame House Training

## Proyecto

**Kame House Training** — Landing page estática para gym de entrenamiento funcional, box y taekwondo. Diseño sofisticado con dark mode por defecto, glassmorphism, liquid glass (iOS 26 style), partículas canvas interactivas y secciones parallax con esferas del dragón.

## Stack

- **Next.js 16.2.3** (App Router, `output: 'export'` static site)
- **React 19.2.4**
- **TypeScript 5+** (estricto)
- **Tailwind CSS v4** (con `@tailwindcss/postcss`, `@theme inline` con `var(--theme-*)`)
- **Netlify** (deploy, SSL, auto-deploy on push to main)
- **Sin backend, sin BD, sin auth** — Solo HTML/CSS/JS estático
- **Sin libs de animación** — Solo CSS nativo + IntersectionObserver

## Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx          # Root layout: SEO, JSON-LD, fonts, dark mode script, SVG filter
│   ├── page.tsx            # Landing: composición de todas las secciones + WhatsApp flotante
│   └── globals.css         # @theme inline, :root/:dark variables, keyframes, glass, liquid-glass
├── components/
│   ├── sections/           # Hero, Services, Schedule, Pricing, ComingSoon, Contact, Footer
│   └── ui/                 # ThemeToggle, ParticlesCanvas, ParallaxParticles, AnimatedSection,
│                           #   GlassCard, Button, Badge, TabSelector, PriceCard, ParallaxSection
├── hooks/
│   ├── useScrollAnimation.ts   # IntersectionObserver → ref + isVisible + isMobile (sin anim en mobile)
│   └── useActiveSection.ts     # Track sección visible para nav
├── lib/
│   └── constants.ts        # TODOS los datos del negocio (horarios, precios, contacto)
└── types/
    └── index.ts            # TimeSlot, ScheduleDay, PricePlan, Service, Professor, etc.
```

## Sistema de Temas (Dark/Light Mode)

**Dark mode es el default.** Si no hay tema en localStorage, inicia en dark.

### Arquitectura CSS
- `@theme inline` usa `var(--theme-*)` (NO valores estáticos) para que Tailwind genere references dinámicas
- `:root` define `--theme-*` con valores light
- `html.dark` sobreescribe `--theme-*` con valores dark
- Script inline en `<head>` previene FOUC: si `localStorage.theme !== 'light'` → `classList.add('dark')`
- El mismo script hace `scrollTo(0,0)`, `history.scrollRestoration = 'manual'` y limpia hash `/#`

### Paleta Light (`:root`)

| Variable | Valor | Uso |
|----------|-------|-----|
| `--theme-bg-primary` | `#FFFFFF` | Fondo principal |
| `--theme-bg-secondary` | `#F7F7F8` | Secciones alternas |
| `--theme-bg-dark` | `#0C0C0C` | Hero, footer |
| `--theme-bg-elevated` | `#FFFFFF` | Cards elevadas |
| `--theme-text-primary` | `#1A1A1A` | Texto principal |
| `--theme-text-secondary` | `#6B7280` | Texto muted |
| `--theme-text-tertiary` | `#9CA3AF` | Texto terciario |

### Paleta Dark (`html.dark`)

| Variable | Valor |
|----------|-------|
| `--theme-bg-primary` | `#0C0C0C` |
| `--theme-bg-secondary` | `#141416` |
| `--theme-bg-dark` | `#000000` |
| `--theme-bg-elevated` | `#1A1A1C` |
| `--theme-text-primary` | `#F0F0F0` |
| `--theme-text-secondary` | `#9CA3AF` |
| `--theme-text-tertiary` | `#6B7280` |

### Colores Fijos (no cambian con tema)

| Variable | Valor | Uso |
|----------|-------|-----|
| `--color-accent-primary` | `#FF6B35` | Naranja Dragon Ball — CTAs |
| `--color-accent-secondary` | `#E63946` | Rojo — badges, alerts |
| `--color-text-on-dark` | `#FFFFFF` | Texto sobre fondos oscuros |

### Variables Glass (cambian con tema)
- `--glass-bg`, `--glass-border`, `--glass-hover` — glassmorphism light/dark
- `--glass-dark-bg`, `--glass-dark-border` — glass sobre fondos oscuros
- `--accent-glow` — glow naranja (más intenso en dark)

## Tipografía

- **Headings**: `Bebas Neue` (variable `--font-heading` / `--font-bebas-neue`)
- **Cuerpo**: `Inter` (variable `--font-body` / `--font-inter`)
- Cargadas via `next/font/google` en layout.tsx

## Clases CSS Custom (globals.css)

### `.glass`
`backdrop-filter: blur(20px) saturate(1.4)`, border sutil, hover state. Usa variables de glass.

### `.glass-dark`
Para Hero, Parallax, Footer. Blur 24px, border sutil blanco/8%.

### `.liquid-glass` (iOS 26 style — 3 capas)
- `.lg-filter` — blur 5px + SVG distortion (solo desktop via `@media min-width: 768px`)
- `.lg-overlay` — tinted overlay
- `.lg-specular` — highlight especular + chromatic aberration con `color-mix()`
- `.lg-content` — layer de contenido
- SVG filter `#lg-dist`: feTurbulence + feDisplacementMap (scale: 70) en layout.tsx

## Animaciones

Solo CSS nativo + IntersectionObserver. **NO instalar** framer-motion, GSAP, AOS ni similares.

| Clase | Efecto | Duración |
|-------|--------|----------|
| `animate-fade-in-up` | Entrada desde abajo | 0.7s |
| `animate-fade-in-down` | Entrada desde arriba | 0.7s |
| `animate-slide-in-right` | Entrada desde derecha | 0.7s |
| `animate-slide-in-left` | Entrada desde izquierda | 0.7s |
| `animate-scale-in` | Scale 0.95→1 | 0.5s |
| `animate-pulse-glow` | Glow naranja pulsante | 2.5s infinite |
| `animate-gradient` | Gradiente animado | 8s infinite |
| `animate-float` | Flotar vertical | 3s infinite |
| `animate-scroll-hint` | Opacity pulse | 2s infinite |

**En mobile (<768px):** Animaciones desactivadas. `AnimatedSection` renderiza hijos directamente. `useScrollAnimation` retorna `isVisible: true` inmediato.

## Partículas Canvas

- 80 partículas (mobile: 40% = ~32)
- Colores: naranja `#FF6B35`, rojo `#E63946`, verde, azul cielo, índigo
- Speed: 0.3, connection distance: 120px
- Mouse repulsion: dist < 200px, fuerza 0.8
- Random burst: 0.2% prob/frame (6x velocidad)
- Blink con targetOpacity aleatorio
- `pointer-events-none` en canvas, listeners en `window` (para no bloquear clicks)
- DPR escalado (max 2)

## Composición de Secciones (page.tsx)

1. `ThemeToggle` — fixed top-right, sol/luna, localStorage
2. `ParallaxParticles` — fixed background, 80 partículas
3. `Hero` — hero-bg.jpg, gradiente dinámico (dark/light), palm.png decorativa, liquid-glass CTA
4. `Services` — 3 cards: Box, Funcional, Taekwondo
5. `ParallaxSection` (parallax-1.jpg) — Stats: 3 Disciplinas | 7+ Horarios | $100/día
6. `Schedule` — Tabs (Box/Funcional/Taekwondo) con horarios
7. `Pricing` — Cards + esferas del dragón parallax (scroll-linked scale)
8. `ParallaxSection` (parallax-2.jpg) — CTA "Tu mejor versión empieza aquí"
9. `ComingSoon` — CrossFit, Calistenia, Gym, Boxeo, HYROX
10. `Contact` — Info contacto + Instagram
11. `Footer`
12. WhatsApp flotante — fixed bottom-right, `#25D366`, scale hover

## Hero — Detalles

- `min-h-[100svh]` (NO dvh, para Safari iOS)
- Gradiente overlay dinámico: MutationObserver detecta clase `dark` en `<html>`
- Palm tree: `<img>` nativa (no next/image), mask `radial-gradient(ellipse 60% 60% at 70% 50%)`
- Visible en todos los tamaños: `w-[250px] md:w-[500px] lg:w-[700px]`

## Pricing — Esferas Dragon Ball Parallax

- Imagen: `/images/esferas-dragon.png`
- Scale scroll-linked: mobile `0.4 → 3.5`, desktop `0.6 → 3.0`
- TranslateY: `-progress * 60px`
- Background max: `clamp(280px, 50vw, 500px)`
- Scroll listener con rAF throttle

## Datos del Negocio

Todos en `src/lib/constants.ts` — **nunca hardcodear datos**.

### Contacto
| Campo | Valor | Estado |
|-------|-------|--------|
| `whatsapp` | `5215564603210` | ✅ Real |
| `phone` | `+52 55 6460 3210` | ✅ Real |
| `instagram` | `https://www.instagram.com/kamehouse_19` | ✅ Real |
| `instagramHandle` | `@kamehouse_19` | ✅ Real |
| `address` | `DIRECCIÓN DEL GYM` | ❌ Placeholder |
| `mapUrl` | placeholder | ❌ Placeholder |
| `mapEmbed` | placeholder | ❌ Placeholder |

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

### Precios (MXN)
- Individual: $300/semana, $1,200/mes (destacado), $100/día
- Combo 2 actividades: $450/semana, $1,500/mes
- Taekwondo: $450/mes

### Datos por completar
- `CONTACT.address` — Dirección física del gym
- `CONTACT.mapUrl` — URL de Google Maps
- `CONTACT.mapEmbed` — URL de embed de Google Maps
- Teléfono y dirección en JSON-LD de layout.tsx

## Optimizaciones iOS/Mobile

- **Viewport**: `100svh` (no `dvh`) para evitar saltos en Safari
- **Glass blur**: 20px (reducido de 40px)
- **SVG liquid glass filter**: solo desktop (`@media min-width: 768px`)
- **Animaciones**: desactivadas en mobile (<768px)
- **Scroll listeners**: throttled con requestAnimationFrame
- **WhatsApp button**: `transition-transform` (no `transition-all`)
- **html**: `overflow-y: scroll` para evitar layout shift
- **body**: `min-height: 100svh`

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
10. `next/image` con `alt` descriptivo para imágenes (excepto palm decorativa que usa `<img>`)
11. Semantic HTML: `<section>`, `<nav>`, `<main>`, `<footer>`, headings jerárquicos
12. Custom hooks para lógica reutilizable
13. El 95%+ del tráfico viene de QR → celular. **Priorizar mobile siempre**
14. Usar `bg-bg-primary` en vez de `bg-white` para respetar dark mode
15. Colores dinámicos via `var(--theme-*)`, nunca hardcodear colores de fondo/texto

## SEO

- Metadata completa en layout.tsx (title, description, OG, Twitter Cards)
- JSON-LD `SportsActivityLocation` en layout.tsx
- `metadataBase` apunta a `https://kamehousetraining.com` (ajustar al dominio final)
- Canonical URL configurada

## Deploy

- **Netlify** — config en `netlify.toml`
- Build: `npm run build` → publish: `out/`
- Node: 20
- Headers de seguridad: X-Frame-Options (DENY), X-Content-Type-Options (nosniff), Referrer-Policy, Permissions-Policy
- **Auto-deploy** on push to `main`

## Git

- Config local: `CarlosBautistaDev` / `CarlosBautistaDev@users.noreply.github.com`
- Remote: `https://github.com/CarlosBautistaDev/kamehouse.git`
- Branch: `main`
- **NO modificar** la config global de git (tiene credenciales de trabajo Elektra/AWS/CodeCommit)
