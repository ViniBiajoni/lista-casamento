const byteLength = (value: string) => new TextEncoder().encode(value).length;

export const qrOptions = { width: 220, margin: 4, errorCorrectionLevel: 'M' } as const;

function tlv(id: string, value: string): string {
  const size = byteLength(value);
  if (!size || size > 99) throw new Error(`Tamanho inválido no campo Pix ${id}.`);
  return `${id}${String(size).padStart(2, '0')}${value}`;
}

export function crc16(value: string): string {
  let crc = 0xffff;
  for (const byte of new TextEncoder().encode(value)) {
    crc ^= byte << 8;
    for (let i = 0; i < 8; i++) {
      crc = ((crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1) & 0xffff);
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

function displayField(value: string, max: number): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toUpperCase()
    .replace(/[^A-Z0-9 .'-]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max).trimEnd();
}

export function buildPix(input: {
  key: string; recipient: string; city: string; priceCents: number; txid?: string;
}): string {
  const key = input.key.trim();
  const validKey = /^(?:[0-9]{11}|[0-9]{14}|\+[1-9]\d{1,14}|[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}|[^\s@]+@[^\s@]+\.[^\s@]+)$/i;
  if (!validKey.test(key) || !/^[!-~]+$/.test(key) || byteLength(key) > 77) {
    throw new Error('Chave Pix inválida. Confira o formato cadastrado no banco.');
  }
  if (!Number.isSafeInteger(input.priceCents) || input.priceCents <= 0 || input.priceCents > 999999999999) {
    throw new Error('Valor do presente inválido.');
  }
  const name = displayField(input.recipient, 25);
  const city = displayField(input.city, 15);
  if (!name || !city) throw new Error('Informe o nome e a cidade do recebedor.');
  const txid = input.txid ?? '***';
  if (txid !== '***' && !/^[a-z0-9]{1,25}$/i.test(txid)) throw new Error('Identificador Pix inválido.');
  const amount = `${Math.trunc(input.priceCents / 100)}.${String(input.priceCents % 100).padStart(2, '0')}`;
  const payload = tlv('00', '01') + tlv('26', tlv('00', 'br.gov.bcb.pix') + tlv('01', key))
    + tlv('52', '0000') + tlv('53', '986') + tlv('54', amount) + tlv('58', 'BR')
    + tlv('59', name) + tlv('60', city) + tlv('62', tlv('05', txid)) + '6304';
  return payload + crc16(payload);
}
