export const FEATURES = [
  {
    icon: "Phone",
    title: "Répond à chaque appel",
    description: "Sofia décroche en moins de 2 secondes, 24h/24, sans jamais mettre en attente.",
  },
  {
    icon: "Calendar",
    title: "Prend les rendez-vous",
    description: "Elle vérifie votre agenda en temps réel et crée les RDV directement dans Google Calendar.",
  },
  {
    icon: "Mail",
    title: "Envoie les confirmations",
    description: "Email de confirmation automatique envoyé depuis votre Gmail dès la fin de l'appel.",
  },
  {
    icon: "FileText",
    title: "Transcrit chaque appel",
    description: "Chaque appel est transcrit, résumé et archivé dans votre dashboard en temps réel.",
  },
  {
    icon: "CheckSquare",
    title: "Crée les tâches de suivi",
    description: "Les rappels et tâches importantes sont créés automatiquement pour votre équipe.",
  },
  {
    icon: "Shield",
    title: "Données hébergées en France",
    description: "Conformité RGPD, chiffrement AES-256, aucun partage avec des tiers.",
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "PhoneIncoming",
    title: "Le client appelle",
    description: "Sofia répond immédiatement en votre nom, de façon naturelle et professionnelle.",
  },
  {
    step: "02",
    icon: "Brain",
    title: "Sofia comprend",
    description: "Elle identifie la demande : RDV, information, rappel, document...",
  },
  {
    step: "03",
    icon: "Zap",
    title: "L'action est exécutée",
    description: "Google Calendar, Gmail, tâche de suivi — tout se fait en temps réel.",
  },
];

export const TESTIMONIALS = [
  {
    quote: "Depuis Sofia, je n'ai plus aucun appel manqué. Mes patients obtiennent un RDV immédiatement, même à 22h. Mon cabinet tourne mieux.",
    name: "Dr. Isabelle Moreau",
    title: "Médecin généraliste",
    location: "Paris 15e",
    initials: "IM",
    sector: "Médical",
  },
  {
    quote: "On reçoit 40 appels par jour. Secretaria traite 80% d'entre eux sans intervention. Mon équipe se concentre sur les visites, pas le téléphone.",
    name: "Julien Fabre",
    title: "Directeur agence",
    location: "Bordeaux",
    initials: "JF",
    sector: "Immobilier",
  },
  {
    quote: "Sofia est plus fiable qu'une vraie secrétaire. Elle ne prend jamais de congés et ne fait jamais d'erreurs sur les créneaux.",
    name: "Dr. Marc Tissier",
    title: "Chirurgien-dentiste",
    location: "Lyon",
    initials: "MT",
    sector: "Médical",
  },
];

export const PRICING = [
  {
    name: "Trial",
    price: { monthly: 0, annual: 0 },
    description: "14 jours pour tout tester",
    minutes: "30 min incluses",
    features: [
      "30 minutes d'appels",
      "1 numéro de téléphone",
      "Gmail + Google Calendar",
      "Dashboard complet",
      "Transcriptions illimitées",
    ],
    cta: "Commencer gratuitement",
    highlighted: false,
    badge: "14 jours gratuits",
  },
  {
    name: "Starter",
    price: { monthly: 79, annual: 59 },
    description: "Pour les indépendants",
    minutes: "200 min/mois",
    features: [
      "200 minutes/mois",
      "1 numéro dédié",
      "Gmail + Calendar",
      "Support email",
      "Sans filigrane",
      "Export CSV",
    ],
    cta: "Commencer",
    highlighted: false,
    badge: null,
  },
  {
    name: "Pro",
    price: { monthly: 199, annual: 149 },
    description: "Pour les cabinets actifs",
    minutes: "600 min/mois",
    features: [
      "600 minutes/mois",
      "3 numéros dédiés",
      "Plusieurs membres d'équipe",
      "Statistiques avancées",
      "Support prioritaire",
      "Intégration CRM",
    ],
    cta: "Commencer",
    highlighted: true,
    badge: "Recommandé",
  },
  {
    name: "Entreprise",
    price: { monthly: null, annual: null },
    description: "Pour les grandes structures",
    minutes: "Illimité",
    features: [
      "Minutes illimitées",
      "Numéros illimités",
      "SLA 99.9%",
      "Intégrations custom",
      "Onboarding dédié",
      "Account manager",
    ],
    cta: "Nous contacter",
    highlighted: false,
    badge: null,
  },
];
