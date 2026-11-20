import '@fontsource-variable/dm-sans/wght.css';
import '@fontsource-variable/playfair-display/wght.css';
import '@fontsource-variable/playfair-display/wght-italic.css';
import './styles/site.css';
import { site } from './config/site';
import { categories, gifts, type Gift } from './data/presentes';
import { icon } from './lib/icons';
import { buildPix, qrOptions } from './lib/pix';

const el = <T extends HTMLElement>(id: string) =>
  document.getElementById(id) as T;

const base = import.meta.env.BASE_URL;
const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const formatPrice = (cents: number) => brl.format(cents / 100);
const pair = `${site.firstName} & ${site.secondName}`;

let currentPixGift: Gift | null = null;
let currentPixAmountCents = 0;

document.title = `${pair} | Lista de Casamento`;

document.querySelectorAll('[data-names]').forEach(node => {
  node.textContent = pair;
});

document.querySelectorAll<HTMLElement>('[data-icon]').forEach(node => {
  node.innerHTML = icon(node.dataset.icon ?? '');
});

const amp = document.createElement('em');
amp.textContent = '&';

el('hero-title').replaceChildren(
  `${site.firstName} `,
  amp,
  document.createElement('br'),
  site.secondName
);

el('hero-date').textContent = `CASAMENTO  /  ${site.date}`;
el('hero-message').textContent = site.greeting;

const cover = el<HTMLImageElement>('cover');
cover.src = base + site.cover;
cover.alt = site.coverAlt;

/* ---------------------------------- */
/* Lista de presentes                  */
/* ---------------------------------- */

const MAX_VISIBLE_CATEGORIES = 4;
const DEFAULT_PER_PAGE = 10;

const filters = el('filters');
const grid = el('gift-grid');
const pagination = el('pagination');
const perPageSelect = el<HTMLSelectElement>('per-page');

let active = 'todos';
let currentPage = 1;
let itemsPerPage = DEFAULT_PER_PAGE;

const filterOptions = [
  { id: 'todos', label: 'Todos', icon: 'gift' },
  ...categories,
];

function createCategoryButton(category: {
  id: string;
  label: string;
  icon: string;
}) {
  const button = document.createElement('button');
  button.className = 'chip';
  button.type = 'button';
  button.dataset.category = category.id;
  button.innerHTML = icon(category.icon);
  button.append(category.label);
  button.setAttribute('aria-pressed', String(category.id === active));

  button.addEventListener('click', () => {
    active = category.id;
    currentPage = 1;
    updateFilterState();
    renderGifts();
  });

  return button;
}

function renderCategoryFilters() {
  const visibleCategories = filterOptions.slice(0, MAX_VISIBLE_CATEGORIES);
  const hiddenCategories = filterOptions.slice(MAX_VISIBLE_CATEGORIES);

  filters.replaceChildren(...visibleCategories.map(createCategoryButton));

  if (!hiddenCategories.length) return;

  const moreWrapper = document.createElement('div');
  moreWrapper.className = 'more-categories';

  const moreButton = document.createElement('button');
  moreButton.type = 'button';
  moreButton.className = 'chip more-categories-button';
  moreButton.setAttribute('aria-expanded', 'false');
  moreButton.innerHTML = `${icon('dots')} Mais ${hiddenCategories.length} ${icon('arrow-down')}`;

  const hiddenList = document.createElement('div');
  hiddenList.className = 'more-categories-list';
  hiddenList.hidden = true;

  hiddenList.append(...hiddenCategories.map(createCategoryButton));

  moreButton.addEventListener('click', () => {
    const willOpen = hiddenList.hidden;

    hiddenList.hidden = !willOpen;
    moreButton.setAttribute('aria-expanded', String(willOpen));
    moreButton.innerHTML = willOpen
      ? `${icon('dots')} Menos categorias ${icon('arrow-up')}`
      : `${icon('dots')} Mais ${hiddenCategories.length} ${icon('arrow-down')}`;
  });

  moreWrapper.append(moreButton, hiddenList);
  filters.append(moreWrapper);
}

function updateFilterState() {
  filters.querySelectorAll<HTMLButtonElement>('button.chip').forEach(button => {
    const isActive = button.dataset.category === active;

    button.setAttribute('aria-pressed', String(isActive));
    button.classList.toggle('active', isActive);
  });
}

function storeLink(raw: string | undefined): URL | undefined {
  try {
    const url = new URL(raw ?? '');

    if (url.protocol === 'https:' && !url.username && !url.password) {
      return url;
    }
  } catch {
    /* malformed links are not rendered */
  }
}

function getDisplayedGifts() {
  return active === 'todos'
    ? gifts
    : gifts.filter(gift => gift.category === active);
}

function renderGifts() {
  updateFilterState();

  const displayed = getDisplayedGifts();
  const totalPages = Math.max(
    1,
    Math.ceil(displayed.length / itemsPerPage)
  );

  currentPage = Math.min(currentPage, totalPages);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageGifts = displayed.slice(start, end);

  el('gift-count').textContent = displayed.length
    ? `${start + 1}–${Math.min(end, displayed.length)} de ${displayed.length} ${displayed.length === 1 ? 'presente' : 'presentes'}`
    : 'Nenhum presente encontrado nesta categoria.';

  const nodes = pageGifts.map(gift => {
    const card = document.createElement('article');
    card.className = 'gift-card';

    card.innerHTML = `<div class="gift-media"><img width="700" height="490" loading="lazy" decoding="async"></div>
      <div class="gift-body"><p class="eyebrow gift-category"></p><h3></h3><p class="gift-description"></p>
      <div class="gift-actions"><div class="gift-price"><span></span><strong></strong></div><div class="actions"></div></div></div>`;

    const img = card.querySelector('img')!;
    img.src = `${base}images/presentes/${gift.image}`;
    img.alt = gift.imageAlt;

    if (gift.featured) {
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.innerHTML = icon('sparkle');
      badge.append('Escolha dos noivos');
      card.querySelector('.gift-media')!.append(badge);
    }

    card.querySelector('.gift-category')!.textContent =
      categories.find(category => category.id === gift.category)?.label ?? '';

    card.querySelector('h3')!.textContent = gift.name;
    card.querySelector('.gift-description')!.textContent = gift.description;

    const canPix = gift.pix && site.pix.mode !== 'disabled';
    const url = storeLink(gift.storeUrl);

    card.querySelector('.gift-price span')!.textContent = canPix
      ? 'VALOR DO PIX'
      : 'PREÇO ESTIMADO';

    card.querySelector('.gift-price strong')!.textContent =
      formatPrice(gift.priceCents);

    const actions = card.querySelector('.actions')!;

    if (canPix) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'button primary card-button';
      button.innerHTML = `${icon('pix')} Pix`;
      button.setAttribute(
        'aria-label',
        `Presentear via Pix: ${gift.name}`
      );

      button.addEventListener('click', () => {
        void openPix(gift, gift.priceCents);
      });

      actions.append(button);
    }

    if (url) {
      const link = document.createElement('a');
      link.href = url.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'button secondary card-button';
      link.innerHTML = `Ver na loja ${icon('arrow-up')}`;
      link.setAttribute(
        'aria-label',
        `Ver na loja: ${gift.name} (abre em outra aba)`
      );

      actions.append(link);
    }

    if (!canPix && !url) {
      actions.textContent = 'Indisponível';
    }

    return card;
  });

  if (!nodes.length) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = 'Ainda não há presentes nesta categoria.';

    grid.replaceChildren(empty);
  } else {
    grid.replaceChildren(...nodes);
  }

  renderPagination(totalPages, displayed.length);
}

function renderPagination(totalPages: number, totalItems: number) {
  if (totalItems <= itemsPerPage) {
    pagination.hidden = true;
    pagination.replaceChildren();
    return;
  }

  pagination.hidden = false;

  const previous = createPageNavButton(
    'Anterior',
    currentPage - 1,
    currentPage === 1,
    icon('arrow-left')
  );

  const next = createPageNavButton(
    'Próxima',
    currentPage + 1,
    currentPage === totalPages,
    icon('arrow-right')
  );

  const pageButtons: HTMLButtonElement[] = [];

  for (let page = 1; page <= totalPages; page++) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'page-button';
    button.textContent = String(page);
    button.setAttribute('aria-label', `Ir para a página ${page}`);
    button.setAttribute('aria-current', String(page === currentPage));
    button.classList.toggle('active', page === currentPage);

    button.addEventListener('click', () => {
      currentPage = page;
      renderGifts();
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    pageButtons.push(button);
  }

  pagination.replaceChildren(previous, ...pageButtons, next);
}

function createPageNavButton(
  label: string,
  page: number,
  disabled: boolean,
  iconSvg: string
) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'page-button page-nav';
  button.innerHTML = `${iconSvg}<span>${label}</span>`;
  button.disabled = disabled;

  button.addEventListener('click', () => {
    currentPage = page;
    renderGifts();
    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  return button;
}

perPageSelect.addEventListener('change', () => {
  itemsPerPage = Number(perPageSelect.value);
  currentPage = 1;
  renderGifts();
});

renderCategoryFilters();
updateFilterState();
renderGifts();

/* ---------------------------------- */
/* Pix                                 */
/* ---------------------------------- */

const dialog = el<HTMLDialogElement>('pix-dialog');
const qr = el('pix-qr');
const copyArea = el('pix-copy-area');
const field = el<HTMLInputElement>('pix-code');
const pixStatus = el('pix-status');
const pixAmount = el<HTMLInputElement>('pix-amount');
const openFreePix = el<HTMLButtonElement>('open-free-pix');
const generatePix = el<HTMLButtonElement>('generate-pix');

let generation = 0;

async function openPix(gift: Gift | null, fixedAmountCents?: number) {
  const config = site.pix;

  if (config.mode === 'disabled') return;

  const current = ++generation;

  const amountCents = fixedAmountCents ?? gift?.priceCents ?? 0;

  el('pix-item').textContent = gift?.name ?? 'Contribuição livre';
  el('pix-price').textContent = formatPrice(amountCents);

  if (fixedAmountCents !== undefined) {
    pixAmount.value = (fixedAmountCents / 100)
      .toFixed(2)
      .replace('.', ',');

    pixAmount.readOnly = true;
  } else {
    pixAmount.value = '';
    pixAmount.readOnly = false;
  }

  el('pix-help').textContent =
    'Informe ou confira o valor e gere o QR Code.';

  pixStatus.textContent = '';
  field.value = '';
  copyArea.hidden = true;
  qr.replaceChildren();

  if (!dialog.open) dialog.showModal();

  currentPixGift = gift;
  currentPixAmountCents = amountCents;

  pixAmount.focus();
}

pixAmount.addEventListener('input', () => {
  const value = Number(
    pixAmount.value.replace(/\./g, '').replace(',', '.')
  );

  currentPixAmountCents =
    Number.isFinite(value) && value > 0 ? Math.round(value * 100) : 0;

  el('pix-price').textContent = formatPrice(currentPixAmountCents);
});

generatePix.addEventListener('click', async () => {
  if (currentPixAmountCents <= 0) {
    pixStatus.textContent = 'Informe um valor maior que R$ 0,00.';
    pixAmount.focus();
    return;
  }

  await generatePixCode(
    currentPixGift,
    currentPixAmountCents,
    currentPixGift?.id ?? 'pix-livre'
  );
});

openFreePix.addEventListener('click', () => {
  void openPix(null);
});

async function generatePixCode(
  gift: Gift | null,
  amountCents: number,
  itemId: string
) {
  const config = site.pix;
  const current = ++generation;

  if (config.mode === 'disabled') return;

  const demo = config.mode === 'demo';

  try {
    const code =
      config.mode === 'live'
        ? buildPix({
            key: config.key,
            recipient: config.recipient,
            city: config.city,
            priceCents: amountCents,
            txid:
              itemId.replace(/[^a-z0-9]/gi, '').slice(0, 25) || '***',
          })
        : `DEMONSTRACAO SEM PAGAMENTO: ${
            gift?.name ?? 'Contribuição livre'
          } (${formatPrice(amountCents)}).`;

    if (demo) {
      el('pix-help').textContent =
        'Modo demonstração. Este QR Code não permite pagamentos.';
    } else {
      el('pix-help').textContent =
        `Abra o app do seu banco e confira o valor e o nome do recebedor (${config.recipient}) antes de confirmar.`;

      field.value = code;
      copyArea.hidden = false;
    }

    try {
      const { default: QRCode } = await import('qrcode');
      const canvas = await QRCode.toCanvas(code, qrOptions);

      if (current !== generation || !dialog.open) return;

      canvas.setAttribute('role', 'img');
      canvas.setAttribute(
        'aria-label',
        demo
          ? 'QR Code demonstrativo, sem pagamento'
          : `QR Code Pix de ${formatPrice(amountCents)}`
      );

      qr.replaceChildren(canvas);
    } catch {
      if (current !== generation || !dialog.open) return;

      pixStatus.textContent = demo
        ? 'O QR Code de demonstração não carregou.'
        : 'O QR Code não carregou. Use o Pix Copia e Cola e confira os dados no app do seu banco.';
    }
  } catch {
    if (current !== generation || !dialog.open) return;

    el('pix-help').textContent =
      'Não foi possível gerar o código Pix. Avise os noivos ou escolha outro presente.';
  }
}

dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();

    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    ) {
      dialog.close();
    }
  }
});

async function copy(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    /* alternative for embedded previews */
  }

  const input = document.createElement('textarea');
  input.value = text;
  input.readOnly = true;
  input.className = 'clipboard-fallback';

  const focused = document.activeElement as HTMLElement | null;
  (dialog.open ? dialog : document.body).append(input);
  input.select();

  let success = false;

  try {
    success = document.execCommand('copy');
  } catch {
    /* manual selection remains available */
  }

  input.remove();
  focused?.focus({ preventScroll: true });

  return success;
}

el('copy-pix').addEventListener('click', async () => {
  const current = generation;
  const success = await copy(field.value);

  if (current !== generation || !dialog.open) return;

  pixStatus.textContent = success
    ? 'Código Pix copiado.'
    : 'Selecione o código no campo acima para copiar manualmente.';

  if (!success) {
    field.focus();
    field.select();
  }
});

/* ---------------------------------- */
/* Entrega e orientações               */
/* ---------------------------------- */

const address = site.address;

if (site.pix.mode === 'disabled') {
  el('pix-guide').hidden = true;
  el('guide-title').textContent = 'Como comprar um presente';
} else {
  el('pix-guide-text').textContent =
    'Abra o QR Code no cartão do presente. Escaneie com seu app bancário ou use o Pix Copia e Cola. Confira o destinatário e o valor antes de confirmar. O site não confirma o pagamento.';
}

el('store-guide').textContent =
  `Nos itens com link, confira o preço, o frete e o prazo na loja. ${
    address.mode === 'public'
      ? 'Use o endereço da seção de entrega.'
      : address.mode === 'demo'
        ? 'O endereço mostrado nesta versão é ilustrativo.'
        : 'Solicite o endereço de entrega aos noivos antes da compra.'
  }`;

if (address.mode === 'hidden') {
  el('entrega').hidden = true;
  document.querySelector('nav a[href="#entrega"]')?.remove();
} else {
  el('delivery-note').textContent =
    address.mode === 'demo'
      ? 'Veja como o endereço aparecerá na lista. Não use estes dados para uma entrega real.'
      : address.note;

  if (address.mode === 'demo') {
    el('address-label').textContent = 'ENDEREÇO ILUSTRATIVO';
  }

  for (const line of address.lines) {
    const row = document.createElement('span');
    row.textContent = line;
    el('address-lines').append(row);
  }

  el('copy-address').addEventListener('click', async () => {
    el('address-status').textContent = await copy(
      address.lines.join('\n')
    )
      ? 'Endereço copiado.'
      : 'Selecione o endereço para copiar manualmente.';
  });
}