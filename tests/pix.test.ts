import assert from 'node:assert/strict';
import { test } from 'node:test';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { PNG } from 'pngjs';
import { buildPix, crc16, qrOptions } from '../src/lib/pix';

const sample = {
  key: '123e4567-e12b-12d1-a456-426655440000',
  recipient: 'João de Sá',
  city: 'São José dos Campos',
  priceCents: 14990,
};

test('CRC16 confere com vetor padrão e exemplo estático do Banco Central', () => {
  assert.equal(crc16('123456789'), '29B1');
  assert.equal(crc16('00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400005204000053039865802BR5913Fulano de Tal6008BRASILIA62070503***6304'), '1D3D');
});

function fields(payload: string) {
  const all: Record<string, string> = {};
  for (let pos = 0; pos < payload.length;) {
    const tag = payload.slice(pos, pos + 2);
    const length = Number(payload.slice(pos + 2, pos + 4));
    all[tag] = payload.slice(pos + 4, pos + 4 + length);
    assert.equal(all[tag].length, length);
    pos += 4 + length;
  }
  return all;
}

test('monta BR Code com valor fixo, cidade normalizada, TXID e checksum', () => {
  const p = buildPix({ ...sample, txid: 'tacas' });
  const tags = fields(p);
  assert.equal(fields(tags['26'])['00'], 'br.gov.bcb.pix');
  assert.equal(fields(tags['26'])['01'], sample.key);
  assert.equal(tags['53'], '986');
  assert.equal(tags['54'], '149.90');
  assert.equal(tags['59'], 'JOAO DE SA');
  assert.equal(tags['60'], 'SAO JOSE DOS CA');
  assert.equal(fields(tags['62'])['05'], 'tacas');
  assert.equal(tags['63'], crc16(p.slice(0, -4)));
});

test('preserva centavos e usa *** quando não há TXID', () => {
  for (const [cents, expected] of [[1, '0.01'], [100, '1.00'], [105, '1.05']] as const) {
    const tags = fields(buildPix({ ...sample, priceCents: cents }));
    assert.equal(tags['54'], expected);
    assert.equal(fields(tags['62'])['05'], '***');
  }
});

test('rejeita parâmetros incompletos, Unicode na chave e valores impróprios', () => {
  for (const priceCents of [0, -1, 1.01, NaN, Infinity, Number.MAX_SAFE_INTEGER]) {
    assert.throws(() => buildPix({ ...sample, priceCents }), /Valor/);
  }
  for (const key of ['', 'sem-arroba', 'josé@exemplo.com', 'a'.repeat(72) + '@ex.com']) {
    assert.throws(() => buildPix({ ...sample, key }), /Chave/);
  }
  assert.throws(() => buildPix({ ...sample, recipient: '🥰' }), /nome/);
  assert.throws(() => buildPix({ ...sample, txid: 'fora-do-padrao' }), /Identificador/);
});

test('um leitor independente recupera o payload completo da imagem do QR', async () => {
  const payload = buildPix({ ...sample, txid: 'tacas' });
  const image = PNG.sync.read(await QRCode.toBuffer(payload, qrOptions));
  assert.equal(jsQR(new Uint8ClampedArray(image.data), image.width, image.height)?.data, payload);
});
