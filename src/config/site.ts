export type PixConfig =
  | { mode: 'demo' }
  | { mode: 'disabled' }
  | {
      mode: 'live';
      key: string;
      recipient: string;
      city: string;
    };

export type DeliveryAddress = {
  label: string;
  lines: string[];
};

export type AddressConfig = {
  mode: 'demo' | 'public' | 'hidden';
  note: string;
} & (
  | {
      addresses: DeliveryAddress[];
      lines?: never;
    }
  | {
      // Compatibilidade com a configuração antiga.
      lines: string[];
      addresses?: never;
    }
);

export type SiteConfig = {
  firstName: string;
  secondName: string;
  date: string;
  greeting: string;
  cover: string;
  coverAlt: string;
  pix: PixConfig;
  address: AddressConfig;
};

const chavePix = 'bb299fbb-676e-408f-bfb8-04271cad6f5c';

export const site: SiteConfig = {
  firstName: 'Lis',
  secondName: 'Vinícius',

  date: '12 DE MÊS DE 2027',

  greeting:
    'Estamos montando nossa casa e preparando a lua de mel. Se quiser nos presentear, reunimos aqui algumas ideias para esse começo.',

  cover: 'images/capa/casal.webp',

  coverAlt:
    'Casal ilustrativo caminhando entre dunas ao pôr do sol',

  pix: {
    mode: 'live',
    key: chavePix,
    recipient: 'VINÍCIUS BIAJONI BRAGA FLÔR',
    city: 'BARRA MANSA',
  },

  address: {
    mode: 'public',

    note:
      'Se optar pela compra em loja, utilize um dos endereços abaixo no checkout. Não é necessário enviar para todos.',

    addresses: [
      {
        label: 'Entrega no endereço atual da Lis',

        lines: [
          'Lis Ribeiro',
          'Rua Moacir Padilha, 70, bloco 01, apto 1204, • Centro (portaria 24h)',
          'Niterói / RJ • CEP 24020-350',
        ],
      },

      // Para adicionar outro endereço, descomente e preencha:
      
      {
        label: 'Entrega no endereço atual do Vinícius',
        lines: [
          'Vinícius Biajoni',
          'Rua Eduardo Pereira da Costa Rangel, 66, apto 202, Verbo Divino',
          'Barra Mansa / RJ • CEP 27345330',
        ],
      }
    ]
  },
};