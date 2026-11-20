export type PixConfig =
  | { mode: 'demo' }
  | { mode: 'disabled' }
  | { mode: 'live'; key: string; recipient: string; city: string };

type SiteConfig = {
  firstName: string; secondName: string; date: string; greeting: string; cover: string; coverAlt: string;
  pix: PixConfig;
  address: { mode: 'demo' | 'public' | 'hidden'; note: string; lines: string[] };
};

export const site: SiteConfig = {
  firstName: 'Lis',
  secondName: 'Vinícius',
  date: '12 DE MÊS DE 2027',
  greeting: 'Estamos montando nossa casa e preparando a lua de mel. Se quiser nos presentear, reunimos aqui algumas ideias para esse começo.',
  cover: 'images/capa/casal.webp',
  coverAlt: 'Casal ilustrativo caminhando entre dunas ao pôr do sol',
  // pix: { mode: 'demo' },
  pix: { mode: 'live', key: '191730b5-3e10-4ab8-a66c-e5459c385fbf', recipient: 'VINÍCIUS BIAJONI BRAGA FLÔR', city: 'BARRA MANSA' },
  address: {
    mode: 'demo',
    note: 'Se optar pela compra em loja, use o endereço de entrega no checkout.',
    lines: ['Lis e Vinícius', 'Rua Moacir Padilha, 70 • Centro', 'Niterói / RJ • CEP 24020-350'],
  },
};
