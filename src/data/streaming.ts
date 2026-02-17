export type StreamPlan = { label: string; monthly: number };
export type StreamService = { name: string; logoText: string; plans: StreamPlan[] };

export const STREAMING: StreamService[] = [
  

  { name: "Netflix", logoText: "NETFLIX", plans: [
    { label: "Padrão com anúncios", monthly: 20.9 },
    { label: "Padrão", monthly: 44.9 },
    { label: "Premium", monthly: 59.9 },
  ]},

  { name: "Disney+", logoText: "DISNEY+", plans: [
    { label: "Padrão com anúncios", monthly: 27.99 },
    { label: "Padrão", monthly: 46.9 },
    { label: "Premium", monthly: 66.9 },
  ]},

  { name: "Max", logoText: "MAX", plans: [
    { label: "Básico com anúncios", monthly: 29.9 },
    { label: "Standard", monthly: 44.9 },
    { label: "Platinum", monthly: 55.9 },
  ]},

  { name: "Prime Video", logoText: "prime", plans: [
    { label: "Mensal", monthly: 19.9 },
  ]},

  { name: "Apple TV+", logoText: "tv+", plans: [
    { label: "Mensal", monthly: 29.9 },
  ]},

  { name: "Globoplay", logoText: "globoplay", plans: [
    { label: "Padrão com anúncios", monthly: 22.9 },
    { label: "Premium", monthly: 54.9 },
  ]},

  { name: "Paramount+", logoText: "Paramount+", plans: [
    { label: "Padrão", monthly: 34.9 },
    { label: "Premium", monthly: 44.9 },
  ]},

  { name: "Meli+ Total (Disney incluído)", logoText: "Meli+ / Disney", plans: [
    { label: "Mensal", monthly: 24.9 },
  ]},

  { name: "Telecine", logoText: "TELECINE", plans: [
    { label: "Mensal", monthly: 29.9 },
  ]},

  { name: "Premiere", logoText: "PREMIERE", plans: [
    { label: "Mensal", monthly: 59.9 },
  ]},

  { name: "YouTube Premium", logoText: "YouTube", plans: [
    { label: "Individual", monthly: 26.9 },
  ]},
];
