import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { test } from 'node:test';
import { gifts, categories } from '../src/data/presentes';
import { site } from '../src/config/site';

test('catálogo mantém IDs e TXIDs únicos, valores válidos, links HTTPS e imagens locais existentes', () => {
  const ids = new Set<string>();
  const txids = new Set<string>();
  for (const gift of gifts) {
    assert.match(gift.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(!ids.has(gift.id), `ID duplicado: ${gift.id}`);
    ids.add(gift.id);
    const txid = gift.id.replace(/[^a-z0-9]/gi, '').slice(0, 25);
    assert.ok(!txids.has(txid), `Identificador Pix duplicado: ${txid}`);
    txids.add(txid);
    assert.ok(categories.some(c => gift.category === c.id));
    assert.ok(gift.name.trim());
    assert.ok(gift.imageAlt.trim());
    assert.ok(Number.isSafeInteger(gift.priceCents) && gift.priceCents > 0 && gift.priceCents <= 999999999999);
    assert.ok(existsSync(`public/images/presentes/${gift.image}`), `Imagem ausente: ${gift.image}`);
    assert.ok(gift.pix || gift.storeUrl, `Sem modalidade: ${gift.name}`);
    if (gift.storeUrl) {
      const url = new URL(gift.storeUrl);
      assert.equal(url.protocol, 'https:');
      assert.ok(!url.username && !url.password);
    }
  }
  assert.ok(existsSync(`public/${site.cover}`));
});
