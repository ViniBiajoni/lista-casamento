# Lista de Presentes de Casamento

Projeto estático em HTML, CSS e TypeScript, com Vite apenas para desenvolvimento e build. O resultado em `dist/` roda sem backend, banco de dados, login, variáveis de ambiente ou serviço externo de QR Code. Os nomes, data, preços, fotos, links e endereço iniciais são demonstrativos. O QR de demonstração não é pagável.

A [avaliação adversarial](AVALIACAO.md) registra o que foi testado, as limitações e a comparação com MyWishlist, Lista Ideal e iCasei.

## Rodar localmente

Instale [Node.js](https://nodejs.org/) 24 LTS (recomendado; o projeto aceita 20.19 ou superior). Extraia o ZIP, abra o PowerShell ou terminal na pasta `lista-casamento` e execute:

```powershell
npm ci
npm run dev
```

Abra `http://localhost:5173` ou o endereço exibido no terminal. Para testar a versão de produção:

```powershell
npm test
npm run build
npm run preview
```

Por padrão, o preview abre em `http://localhost:4173`. Não abra `index.html` por duplo clique: o TypeScript precisa passar pelo Vite. O conteúdo de `dist/` é recriado a cada build; edite os arquivos originais, não o `dist/`.

## Onde editar

| Arquivo ou pasta | O que mudar |
|---|---|
| `src/config/site.ts` | Nomes, data, mensagem, capa, Pix e endereço |
| `src/data/presentes.ts` | Categorias, nomes, preços, imagens, botões e links de loja |
| `public/images/capa/` | Foto de capa. Atualize `cover` e `coverAlt` se trocar o arquivo. |
| `public/images/presentes/` | Uma imagem por presente. Informe só o nome do arquivo em `image`. |
| `src/styles/site.css` | Paleta, fontes, espaçamentos e responsividade |
| `index.html` | Títulos das seções, textos fixos e estrutura |
| `src/lib/pix.ts` | Gerador local do Pix estático. Não precisa editar para cadastrar sua chave. |
| `.github/workflows/pages.yml` e `vercel.json` | Configuração de publicação |

Use `priceCents: 14990` para R$ 149,90. Use `pix: true` para aceitar Pix, `storeUrl` para indicar compra externa ou os dois no mesmo presente. Use um `id` único, simples, sem espaços nem acentos. Cada imagem de exemplo é ilustrativa; ao indicar um produto específico, troque a imagem e o link de busca por uma foto e URL correspondentes ao item. Os preços das lojas são estimados e podem mudar.

```ts
{
  id: 'tacas-cristal',
  category: 'casa',
  name: 'Taças de Cristal',
  description: 'Para brindar em casa.',
  priceCents: 14990,
  image: 'tacas.webp',
  imageAlt: 'Duas taças sobre a mesa',
  pix: true,
  storeUrl: 'https://www.amazon.com.br/s?k=ta%C3%A7as+de+cristal',
}
```

### Ativar o Pix

Em `src/config/site.ts`, troque `pix: { mode: 'demo' }` por:

```ts
pix: {
  mode: 'live',
  key: 'SUBSTITUA-PELA-CHAVE-CADASTRADA-NO-BANCO',
  recipient: 'NOME DO TITULAR DA CONTA',
  city: 'RESENDE',
},
```

A chave Pix fica acessível no site, no bundle e no QR Code. **Prefira uma chave aleatória** em vez de expor CPF, telefone ou e-mail. Nunca insira senha bancária, token, certificado ou chave privada. O código é formado localmente conforme o [Manual do Pix do Banco Central](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/II_ManualdePadroesparaIniciacaodoPix.pdf), mas o site não consulta o DICT nem confirma se a chave está ativa.

Antes de compartilhar, teste o QR e o Pix Copia e Cola no app do banco. Confira o titular e o valor exibidos pelo banco antes de autorizar qualquer transferência. Use `mode: 'disabled'` se quiser remover os botões Pix. Não há conciliação, confirmação no site, reserva ou baixa automática: confira recebimentos no seu banco e ajuste a lista manualmente.

### Publicar o endereço de entrega

Em `address`, altere `mode` para `'public'` e preencha `lines` com destinatário, rua, número, complemento, bairro, cidade, UF e CEP. Um site estático não controla quem acessa o endereço. Prefira um ponto de entrega autorizado, ou use `mode: 'hidden'` e informe o endereço aos convidados em particular. Se escolher ocultar, remova também todo endereço real de `lines` e evite publicá-lo no histórico do Git.

## Publicar

### Vercel

1. Suba o conteúdo da pasta `lista-casamento` para a raiz de um repositório Git, incluindo `package-lock.json` e `vercel.json`. Não envie `node_modules/`.
2. Na Vercel, use **Add New → Project**, importe o repositório e selecione **Vite** se o preset não for detectado.
3. Confirme **Build Command** `npm run build` e **Output Directory** `dist`. O `vercel.json` já contém esses valores. Não adicione variáveis de ambiente.
4. Clique em **Deploy**. Abra a URL gerada e teste o Pix, os links e o endereço. Novos commits na branch de produção geram novos deploys, conforme as configurações do projeto.

Veja também [Vite na Vercel](https://vercel.com/docs/frameworks/frontend/vite).

### GitHub Pages

1. Crie um repositório compatível com o GitHub Pages e use `main` como branch principal. Coloque o conteúdo da pasta `lista-casamento` na raiz, incluindo a pasta oculta `.github/`.
2. No repositório, vá a **Settings → Pages → Build and deployment → Source** e selecione **GitHub Actions**.
3. Envie um commit à `main` ou execute **Actions → Publicar no GitHub Pages → Run workflow**.
4. Quando o workflow terminar, abra o endereço indicado em **Settings → Pages**. Os caminhos relativos do build funcionam também em `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`.

Veja também [Configuração da publicação no GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
