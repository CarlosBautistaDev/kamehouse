// ===== SERVICIOS =====
export const SERVICES = [
  {
    id: "box",
    title: "Box",
    emoji: "🥊",
    description:
      "Entrena box con profesores experimentados. Horarios de mañana y tarde.",
  },
  {
    id: "funcional",
    title: "Entrenamiento Funcional",
    emoji: "💪",
    description:
      "CrossFit, Calistenia, Gym, HYROX y más. Transforma tu cuerpo.",
  },
  {
    id: "taekwondo",
    title: "Taekwondo",
    emoji: "🥋",
    description:
      "Clases para niños, jóvenes y adultos. Todos los niveles.",
  },
] as const;

// ===== HORARIOS BOX =====
export const BOX_SCHEDULE = {
  weekdays: {
    label: "Lunes a Jueves",
    slots: [
      { time: "7:00 - 8:00 am", period: "morning" as const },
      { time: "8:00 - 9:00 am", period: "morning" as const },
      { time: "9:00 - 10:00 am", period: "morning" as const },
      { time: "10:00 - 11:00 am", period: "morning" as const },
      { time: "4:00 - 5:00 pm", period: "evening" as const },
      { time: "5:00 - 6:00 pm", period: "evening" as const },
      { time: "7:00 - 8:00 pm", period: "evening" as const },
    ],
  },
  saturday: {
    label: "Sábado",
    slots: [
      {
        time: "9:00 - 11:00 am",
        period: "morning" as const,
        note: "Entrenamiento continuo",
      },
    ],
  },
  professors: [
    { name: "Profesor Bocho Boxing", schedule: "Mañanas" },
    { name: "Profesor Antonio", schedule: "Tardes" },
  ],
} as const;

// ===== HORARIOS FUNCIONAL =====
export const FUNCTIONAL_SCHEDULE = {
  weekdays: {
    label: "Lunes a Viernes",
    slots: [
      { time: "7:00 - 8:00 am", period: "morning" as const },
      { time: "8:00 - 9:00 am", period: "morning" as const },
      { time: "8:00 - 9:00 pm", period: "night" as const },
    ],
  },
  saturday: {
    label: "Sábado",
    slots: [{ time: "8:00 - 9:00 am", period: "morning" as const }],
  },
} as const;

// ===== HORARIOS TAEKWONDO =====
export const TKD_SCHEDULE = {
  evening: {
    label: "Lunes a Viernes — 6:00 a 7:00 pm",
    groups: [
      { days: "Lunes - Miércoles", group: "Jóvenes / Adultos / Avanzados" },
      { days: "Martes - Jueves", group: "Niños (principiantes)" },
      { days: "Viernes", group: "Ambos grupos" },
    ],
  },
  morning: {
    label: "Lunes - Miércoles - Viernes — 9:00 a 10:00 am",
    group: "Jóvenes y Adultos",
  },
} as const;

// ===== PRECIOS =====
export const PRICING = {
  individual: [
    { price: "$300", period: "semana", highlighted: false },
    {
      price: "$1,200",
      period: "mes",
      highlighted: true,
      badge: "Mejor Valor",
    },
    {
      price: "$100",
      period: "día",
      highlighted: false,
      description: "Visita única",
    },
  ],
  combo: {
    title: "2 Actividades",
    plans: [
      { price: "$450", period: "semana" },
      { price: "$1,500", period: "mes" },
    ],
  },
  taekwondo: {
    price: "$450",
    period: "mes",
  },
} as const;

// ===== AVISO DE PAGOS =====
export const PAYMENT_NOTICE = {
  rules: [
    "Las clases se pagan en recepción antes de entrenar, sin excepción.",
    "Se aceptan transferencias mostrando comprobante en recepción.",
  ],
  warning:
    "Si pagas tu semana y comienzas martes o miércoles, los días anteriores se pierden. No son acumulables bajo ningún motivo.",
} as const;

// ===== PRÓXIMAMENTE =====
export const COMING_SOON = [
  { name: "CrossFit", emoji: "🏋️" },
  { name: "Calistenia", emoji: "🤸" },
  { name: "Gym", emoji: "🏋️‍♂️" },
  { name: "Boxeo", emoji: "🥊" },
  { name: "HYROX", emoji: "🔥" },
] as const;

// ===== CONTACTO =====
export const CONTACT = {
  whatsapp: "5215564603210",
  phone: "+52 55 6460 3210",
  instagram: "https://www.instagram.com/kamehouse_19",
  instagramHandle: "@kamehouse_19",
  address: "DIRECCIÓN DEL GYM", // REEMPLAZAR
  mapUrl: "https://maps.google.com/?q=...", // REEMPLAZAR
  mapEmbed: "https://www.google.com/maps/embed?pb=...", // REEMPLAZAR URL de embed
} as const;

// ===== NAV SECTIONS =====
export const NAV_SECTIONS = [
  { id: "inicio", label: "Inicio" },
  { id: "servicios", label: "Servicios" },
  { id: "horarios", label: "Horarios" },
  { id: "precios", label: "Precios" },
  { id: "contacto", label: "Contacto" },
] as const;
