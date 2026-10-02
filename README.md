# Cardápio · 09/10/2026

Site estático, em português, com versão para celular, busca e filtros de comidas, doces, bebidas e brincadeiras. O visual é compacto, sem banner inicial: o título e a data aparecem acima dos itens. Sem instalação, compilação, fontes externas ou dependências. As ilustrações estão incluídas no próprio site.

## Colocar os itens reais

Abra `cardapio.js` em um editor de texto. Os itens informados já estão cadastrados: mousse, gelatina, espetinho de frango, refrigerante (copo), cachorro-quente, pipoca, Just Dance, desfile e outras brincadeiras. Pipoca e Just Dance estão grátis; o desfile tem taxa de R$ 1,00. Os preços não informados ficam como “Preço a confirmar”; outras brincadeiras mostram “Consulte a organização”.

Preencha os preços com números, como `5` ou `7.50`. O site apresenta esses valores como `R$ 5,00` e `R$ 7,50`. Use `0` para “Grátis” e `null` para “Preço a confirmar”. Os comentários no arquivo explicam categorias, desenhos e cores. Para adicionar ou remover itens, copie ou exclua um bloco da lista, mantendo as vírgulas entre os blocos. A opção `previa` já está em `false`, pois o site usa os itens reais informados.

## Publicar no GitHub Pages

1. No GitHub, clique em **New repository**, escolha um nome (por exemplo, `cardapio-escola`) e crie um repositório **Public**.
2. Clique em **uploading an existing file** (ou **Add file → Upload files**).
3. Arraste os arquivos **de dentro desta pasta** para o repositório. O `index.html` deve ficar na raiz, junto com `styles.css`, `cardapio.js`, `site.js` e `favicon.svg`. Não envie a pasta como uma subpasta e não envie apenas um ZIP. O README é opcional. Se a interface esconder `.nojekyll`, pode publicar sem ele: os demais arquivos bastam para este site.
4. Confirme em **Commit changes**.
5. Abra **Settings → Pages**. Em **Source**, escolha **Deploy from a branch**. Em **Branch**, escolha **main** e **/(root)**; clique em **Save**.
6. Aguarde a publicação. O endereço aparece nessa mesma página, normalmente `https://SEU-USUARIO.github.io/cardapio-escola/`.

Para atualizar o cardápio depois, edite `cardapio.js` no GitHub e confirme a alteração. O Pages republica automaticamente.

## Abrir no computador

Clique duas vezes em `index.html`. Busca, filtros e ilustrações também funcionam localmente, sem internet. O site é um cardápio informativo; não processa pedidos ou pagamentos.
