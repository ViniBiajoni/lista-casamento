# Avaliação adversarial e comparação

A revisão separou três questões: se o convidado entende o que está escolhendo, se os fluxos falham de modo seguro e onde um site estático fica aquém de uma plataforma de casamento. Foram comparadas as páginas públicas dos serviços, sem criar contas nem fazer compras.

## Comparação com outras listas

| Referência | O que a referência oferece | Decisão para este projeto |
|---|---|---|
| [Lista Ideal](https://listaideal.com.br) | Combina presentes em dinheiro, links de lojas e vaquinhas. | Mantivemos Pix e link externo no mesmo catálogo, inclusive no mesmo cartão quando fizer sentido. |
| [MyWishlist para casamentos](https://www.mywishlist.co/pt/lista-de-presentes/casamento) | Combina compra física, reserva de itens, contribuições por Pix ou cartão, cotas e acompanhamento da lista. | Mantivemos produtos de loja e experiências na lista, com o endereço em seção própria. Não simulamos reserva, cotas nem acompanhamento: eles exigem estado compartilhado e não funcionariam de forma confiável em um site puramente estático. |
| [iCasei: lista de casamento](https://www.icasei.com.br/lista-de-casamento) | Organiza sugestões para o lar e a lua de mel, recebe valores de presentes virtuais e permite acompanhar recebimentos em painel. | Adotamos categorias e experiências de lua de mel, mas sem checkout, painel, intermediador ou confirmação automática. O Pix ativo é enviado no app bancário do convidado. |

O principal compromisso: o site é simples de hospedar e mantém o Pix fora de uma plataforma intermediária, mas os noivos conferem os recebimentos no banco e atualizam a lista manualmente. Se evitar presentes físicos duplicados for essencial, será preciso coordenar as compras fora do site ou optar por um serviço com reservas.

## Cenários testados e correções

| Cenário | Resultado |
|---|---|
| Convidado tenta pagar com os dados iniciais | O QR de demonstração contém texto não pagável; o Pix Copia e Cola não aparece. O endereço tem rótulo ilustrativo e aviso para não usar em entregas. |
| Pix ativo com chave fictícia | O QR e o código foram gerados, valor e identificador foram verificados e a cópia foi conferida. Trocar de presente atualizou o valor do código. O payload também foi recuperado com um leitor de QR independente em teste automatizado. |
| Chave inválida ou biblioteca do QR indisponível | Configuração inválida não expõe QR nem código. Falha isolada ao carregar o QR mantém o Pix Copia e Cola e exibe orientação. |
| Fechamento e teclado | Modal fecha pelo botão, Escape e clique fora. O foco volta ao botão do presente ao fechar com Escape. |
| Loja externa e conteúdo inesperado | Link de exemplo abriu em nova aba com o URL esperado (destino simulado no teste). URL `javascript:` não virou link e texto parecido com HTML permaneceu texto. |
| Endereço oculto, Pix desativado e lista sem itens em uma categoria | Endereço saiu da interface e o guia passou a instruir contato privado. Ações Pix foram removidas e a categoria vazia mostrou uma mensagem. O endereço de exemplo pôde ser copiado. |
| Dispositivos e caminhos de publicação | Capa, imagens, filtros e modal revisados visualmente no Chromium em desktop e celular. Não houve rolagem horizontal de 320 a 1.440 px nos tamanhos verificados. O build abriu em subdiretório e carregou imagens e QR; o modal Pix ativo e seu status de cópia couberam em 375 × 680 px. |
| Build e dependências | `npm ci`, `npm test` (6 casos), `npm run build` e `npm audit` concluídos. A consulta à base do npm não apontou vulnerabilidades no momento da verificação. |

## Antes de compartilhar a lista

Não foi feita transferência nem validação da chave em um banco, e nenhum checkout ou deploy na sua conta foi executado. Configure uma chave aleatória, confirme o nome e o valor tanto pelo QR quanto pelo Copia e Cola no app do banco e confira os links reais em um celular antes de divulgar. Se o endereço for particular, informe-o em mensagem privada e não o guarde no código, nem na opção oculta.
