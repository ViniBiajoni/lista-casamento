import '@fontsource-variable/dm-sans/wght.css';
import '@fontsource-variable/playfair-display/wght.css';
import '@fontsource-variable/playfair-display/wght-italic.css';
import './styles/site.css';
import { site } from './config/site';
import { categories, gifts, type Gift } from './data/presentes';
import { icon } from './lib/icons';
import { buildPix, qrOptions } from './lib/pix';

function el<T extends HTMLElement = HTMLElement>(id: string): T {
  const node = document.getElementById(id);
  if (!node) throw new Error(`Elemento obrigatório ausente: #${id}`);
  return node as T;
}
const base = import.meta.env.BASE_URL;
const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const formatPrice = (cents: number) => brl.format(cents / 100);
const pair = `${site.firstName} & ${site.secondName}`;
const dialog = el<HTMLDialogElement>('pix-dialog');
const qr = el('pix-qr');
const copyArea = el('pix-copy-area');
const field = el<HTMLInputElement>('pix-code');
const pixStatus = el('pix-status');
const pixAmount = el<HTMLInputElement>('pix-amount');
const freeButton = el<HTMLButtonElement>('open-free-pix');
const generateButton = el<HTMLButtonElement>('generate-pix');
const copyButton = el<HTMLButtonElement>('copy-pix');
let currentPixGift: Gift | null = null;
let generation = 0;

 document.title = `${pair} | Lista de Casamento`;
document.querySelectorAll('[data-names]').forEach(node => { node.textContent = pair; });
document.querySelectorAll<HTMLElement>('[data-icon]').forEach(node => {
  node.innerHTML = icon(node.dataset.icon ?? '');
});
const amp = document.createElement('em');
amp.textContent = '&';
el('hero-title').replaceChildren(`${site.firstName} `, amp, document.createElement('br'), site.secondName);
el('hero-date').textContent = `CASAMENTO / ${site.date}`;
el('hero-message').textContent = site.greeting;
const cover = el<HTMLImageElement>('cover');
cover.src = base + site.cover;
cover.alt = site.coverAlt;

// Quatro filtros visíveis ao todo: Todos + três categorias.
const MAX_VISIBLE_CATEGORIES = 4;
const PAGE_SIZES = [6, 10, 16, 24];
const filters = el('filters');
const grid = el('gift-grid');
const pagination = el('pagination');
const perPage = el<HTMLSelectElement>('per-page');
let active = 'todos';
let currentPage = 1;
let itemsPerPage = 10;
perPage.value = String(itemsPerPage);
const filterOptions = [{ id: 'todos', label: 'Todos', icon: 'gift' }, ...categories];
function categoryButton(category: { id: string; label: string; icon: string }) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'chip';
  button.dataset.category = category.id;
  button.innerHTML = icon(category.icon);
  button.append(category.label);
  button.addEventListener('click', () => {
    active = category.id;
    currentPage = 1;
    renderGifts();
  });
  return button;
}
function renderFilters() {
  filters.replaceChildren(...filterOptions.slice(0, MAX_VISIBLE_CATEGORIES).map(categoryButton));
  const rest = filterOptions.slice(MAX_VISIBLE_CATEGORIES);
  if (!rest.length) return;
  const wrapper = document.createElement('div');
  wrapper.className = 'more-categories';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'chip more-categories-button';
  button.textContent = `… Mais ${rest.length}`;
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', 'extra-categories');
  const list = document.createElement('div');
  list.id = 'extra-categories';
  list.className = 'more-categories-list';
  list.hidden = true;
  list.append(...rest.map(categoryButton));
  button.addEventListener('click', () => {
    list.hidden = !list.hidden;
    button.setAttribute('aria-expanded', String(!list.hidden));
    button.textContent = list.hidden ? `… Mais ${rest.length}` : '… Menos categorias';
  });
  wrapper.append(button, list);
  filters.append(wrapper);
}
function storeLink(raw?: string): URL | undefined {
  try {
    const url = new URL(raw ?? '');
    if (url.protocol === 'https:' && !url.username && !url.password) return url;
  } catch { /* Links inválidos não são renderizados. */ }
}
function giftCard(gift: Gift) {
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
  card.querySelector('.gift-category')!.textContent = categories.find(c => c.id === gift.category)?.label ?? '';
  card.querySelector('h3')!.textContent = gift.name;
  card.querySelector('.gift-description')!.textContent = gift.description;
  const canPix = gift.pix && site.pix.mode !== 'disabled';
  const url = gift.category === 'experiencias' ? undefined : storeLink(gift.storeUrl);
  card.querySelector('.gift-price span')!.textContent = canPix ? 'VALOR SUGERIDO DO PIX' : 'PREÇO ESTIMADO';
  card.querySelector('.gift-price strong')!.textContent = formatPrice(gift.priceCents);
  const actions = card.querySelector('.actions')!;
  if (canPix) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button primary card-button';
    button.innerHTML = `${icon('pix')} Pix`;
    button.setAttribute('aria-label', `Presentear via Pix: ${gift.name}`);
    button.addEventListener('click', () => openPix(gift));
    actions.append(button);
  }
  if (url) {
    const link = document.createElement('a');
    link.href = url.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'button secondary card-button';
    link.innerHTML = `Ver na loja ${icon('arrow-up')}`;
    link.setAttribute('aria-label', `Ver na loja: ${gift.name} (abre em outra aba)`);
    actions.append(link);
  }
  if (!canPix && !url) actions.textContent = 'Indisponível';
  return card;
}
function renderGifts() {
  filters.querySelectorAll<HTMLButtonElement>('button[data-category]').forEach(button => {
    const selected = button.dataset.category === active;
    button.setAttribute('aria-pressed', String(selected));
    button.classList.toggle('active', selected);
  });
  const displayed = active === 'todos' ? gifts : gifts.filter(g => g.category === active);
  const totalPages = Math.max(1, Math.ceil(displayed.length / itemsPerPage));
  currentPage = Math.max(1, Math.min(currentPage, totalPages));
  const start = (currentPage - 1) * itemsPerPage;
  const pageGifts = displayed.slice(start, start + itemsPerPage);
  el('gift-count').textContent = displayed.length
    ? `${start + 1}–${Math.min(start + itemsPerPage, displayed.length)} de ${displayed.length} ${displayed.length === 1 ? 'presente' : 'presentes'}`
    : 'Nenhum presente nesta categoria.';
  grid.replaceChildren(...pageGifts.map(giftCard));
  if (!pageGifts.length) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = 'Ainda não há presentes nesta categoria.';
    grid.append(empty);
  }
  renderPagination(totalPages);
}
function goToPage(page: number) {
  currentPage = page;
  renderGifts();
  pagination.querySelector<HTMLButtonElement>('[aria-current="page"]')?.focus({ preventScroll: true });
  grid.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
}
function pageButton(label: string, page: number, disabled = false) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'page-button';
  button.textContent = label;
  button.disabled = disabled;
  button.addEventListener('click', () => goToPage(page));
  return button;
}
function renderPagination(total: number) {
  pagination.replaceChildren();
  pagination.hidden = total <= 1;
  if (total <= 1) return;
  pagination.append(pageButton('Anterior', currentPage - 1, currentPage === 1));
  const pages = new Set([1, total]);
  for (let p = Math.max(1, currentPage - 2); p <= Math.min(total, currentPage + 2); p++) pages.add(p);
  let previous = 0;
  for (const p of [...pages].sort((a, b) => a - b)) {
    if (previous && p - previous > 1) {
      const dots = document.createElement('span');
      dots.className = 'page-ellipsis';
      dots.textContent = '…';
      pagination.append(dots);
    }
    const button = pageButton(String(p), p);
    button.setAttribute('aria-label', `Página ${p}`);
    if (p === currentPage) {
      button.classList.add('active');
      button.setAttribute('aria-current', 'page');
    }
    pagination.append(button);
    previous = p;
  }
  pagination.append(pageButton('Próxima', currentPage + 1, currentPage === total));
}
perPage.addEventListener('change', () => {
  const size = Number(perPage.value);
  itemsPerPage = PAGE_SIZES.includes(size) ? size : 10;
  perPage.value = String(itemsPerPage);
  currentPage = 1;
  renderGifts();
});

// Aceita 119,90 ou 119.90; separadores de milhar não são usados.
function parsePixAmount(raw: string): number {
  const normalized = raw.trim().replace(',', '.');
  if (!/^\d+(?:\.\d{1,2})?$/.test(normalized)) return 0;
  const [whole = '0', fraction = ''] = normalized.split('.');
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  return Number.isSafeInteger(cents) && cents > 0 ? cents : 0;
}
function clearPix() {
  generation++;
  qr.replaceChildren();
  field.value = '';
  copyArea.hidden = true;
  copyButton.disabled = true;
  pixStatus.textContent = '';
  generateButton.disabled = false;
  generateButton.removeAttribute('aria-busy');
}
function openPix(gift: Gift | null) {
  if (site.pix.mode === 'disabled') return;
  clearPix();
  currentPixGift = gift;
  el('pix-title').textContent = gift ? 'Presentear via Pix' : 'Pix livre';
  el('pix-item').textContent = gift?.name ?? 'Uma contribuição para o nosso novo começo.';
  pixAmount.readOnly = false;
  pixAmount.disabled = false;
  pixAmount.value = gift ? (gift.priceCents / 100).toFixed(2).replace('.', ',') : '';
  pixAmount.removeAttribute('aria-invalid');
  el('pix-price').textContent = gift ? formatPrice(gift.priceCents) : '';
  el('pix-amount-hint').textContent = gift
    ? 'Este é o valor sugerido. Você pode alterá-lo antes de gerar o Pix.'
    : 'Digite o valor que deseja contribuir, por exemplo: 119,90.';
  el('pix-help').textContent = site.pix.mode === 'demo'
    ? 'Modo demonstração: os códigos gerados não permitem pagamentos.'
    : 'Confira o valor e clique em “Gerar QR Code”.';
  if (!dialog.open) dialog.showModal();
  pixAmount.focus();
  pixAmount.select();
}
pixAmount.addEventListener('input', () => {
  clearPix();
  pixAmount.removeAttribute('aria-invalid');
  const cents = parsePixAmount(pixAmount.value);
  el('pix-price').textContent = cents ? formatPrice(cents) : '';
  el('pix-help').textContent = 'Clique em “Gerar QR Code” para usar o valor informado.';
});
pixAmount.addEventListener('blur', () => {
  const cents = parsePixAmount(pixAmount.value);
  if (cents) pixAmount.value = (cents / 100).toFixed(2).replace('.', ',');
});
freeButton.addEventListener('click', () => openPix(null));
generateButton.addEventListener('click', () => { void generatePixCode(); });
pixAmount.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    if (!generateButton.disabled) void generatePixCode();
  }
});
async function generatePixCode() {
  const config = site.pix;
  if (config.mode === 'disabled' || !dialog.open) return;
  const cents = parsePixAmount(pixAmount.value);
  if (!cents) {
    pixAmount.setAttribute('aria-invalid', 'true');
    pixStatus.textContent = 'Informe um valor válido maior que zero, como 119,90 (sem separador de milhar).';
    pixAmount.focus();
    return;
  }
  clearPix();
  const current = generation;
  generateButton.disabled = true;
  generateButton.setAttribute('aria-busy', 'true');
  el('pix-help').textContent = 'Preparando o QR Code…';
  const demo = config.mode === 'demo';
  try {
    const itemId = currentPixGift?.id ?? 'pixlivre';
    const code = config.mode === 'live' ? buildPix({
      key: config.key, recipient: config.recipient, city: config.city,
      priceCents: cents,
      txid: itemId.replace(/[^a-z0-9]/gi, '').slice(0, 25) || '***',
    }) : `DEMONSTRACAO SEM PAGAMENTO: ${currentPixGift?.name ?? 'Contribuição livre'} (${formatPrice(cents)}).`;
    if (current !== generation || !dialog.open) return;
    el('pix-help').textContent = demo
      ? 'Modo demonstração. Este QR Code não permite pagamentos.'
      : `Confira o valor (${formatPrice(cents)}) e o recebedor (${config.recipient}) no app do banco antes de confirmar. O site não confirma pagamentos.`;
    if (!demo) {
      field.value = code;
      copyArea.hidden = false;
      copyButton.disabled = false;
    }
    try {
      const { default: QRCode } = await import('qrcode');
      if (current !== generation || !dialog.open) return;
      const canvas = await QRCode.toCanvas(code, qrOptions);
      if (current !== generation || !dialog.open) return;
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', demo ? 'QR Code demonstrativo, sem pagamento' : `QR Code Pix de ${formatPrice(cents)}`);
      qr.replaceChildren(canvas);
    } catch {
      if (current !== generation || !dialog.open) return;
      pixStatus.textContent = demo ? 'O QR Code demonstrativo não carregou.'
        : 'O QR Code não carregou. Use o Pix Copia e Cola e confira os dados no app do seu banco.';
    }
  } catch {
    if (current !== generation || !dialog.open) return;
    el('pix-help').textContent = 'Não foi possível gerar o Pix. Confira o valor ou avise os noivos.';
  } finally {
    if (current === generation) {
      generateButton.disabled = false;
      generateButton.removeAttribute('aria-busy');
    }
  }
}
dialog.addEventListener('close', clearPix);
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const b = dialog.getBoundingClientRect();
  if (event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom) dialog.close();
});
async function copy(text: string): Promise<boolean> {
  if (!text) return false;
  try { await navigator.clipboard.writeText(text); return true; } catch { /* Fallback local. */ }
  const input = document.createElement('textarea');
  input.value = text;
  input.readOnly = true;
  input.className = 'clipboard-fallback';
  const focused = document.activeElement as HTMLElement | null;
  (dialog.open ? dialog : document.body).append(input);
  input.select();
  let success = false;
  try { success = document.execCommand('copy'); } catch { /* Seleção manual disponível. */ }
  input.remove();
  focused?.focus({ preventScroll: true });
  return success;
}
copyButton.addEventListener('click', async () => {
  if (!field.value || copyArea.hidden) return;
  const current = generation;
  const success = await copy(field.value);
  if (current !== generation || !dialog.open) return;
  pixStatus.textContent = success ? 'Código Pix copiado.' : 'Selecione o código acima para copiar manualmente.';
  if (!success) { field.focus(); field.select(); }
});

const address = site.address;
if (site.pix.mode === 'disabled') {
  el('pix-guide').hidden = true;
  el('free-pix-card').hidden = true;
  el('guide-title').textContent = 'Como comprar um presente';
} else {
  el('pix-guide-text').textContent = 'Escolha um presente ou use o Pix livre. Informe o valor, gere o código e confira os dados no app do banco. O site não confirma o pagamento.';
}
el('store-guide').textContent = `Nos itens com link, confira o preço, o frete e o prazo na loja. ${
  address.mode === 'public' ? 'Use o endereço da seção de entrega.' :
  address.mode === 'demo' ? 'O endereço mostrado nesta versão é ilustrativo.' :
  'Solicite o endereço aos noivos antes da compra.'}`;
if (address.mode === 'hidden') {
  el('entrega').hidden = true;
  document.querySelector('nav a[href="#entrega"]')?.remove();
} else {
  el('delivery-note').textContent = address.mode === 'demo'
    ? 'Veja como o endereço aparecerá na lista. Não use estes dados para uma entrega real.' : address.note;
  if (address.mode === 'demo') el('address-label').textContent = 'ENDEREÇO ILUSTRATIVO';
  el('address-lines').replaceChildren(...address.lines.map(line => {
    const span = document.createElement('span'); span.textContent = line; return span;
  }));
  el('copy-address').addEventListener('click', async () => {
    el('address-status').textContent = await copy(address.lines.join('\n'))
      ? 'Endereço copiado.' : 'Selecione o endereço para copiar manualmente.';
  });
}
renderFilters();
renderGifts();