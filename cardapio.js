/* EDITE O CARDÁPIO AQUI. Não precisa instalar nenhum programa.
 * preco: número como 5 ou 7.50 (sem R$). 0 = grátis; null = a confirmar.
 * categoria: "comidas", "doces", "bebidas" ou "brincadeiras".
 * desenho: "hotdog", "pastel", "pipoca", "bolo", "brigadeiro",
 *          "algodao", "suco", "refrigerante", "agua", "espetinho",
 *          "mousse", "gelatina", "danca", "desfile" ou "brincadeiras".
 * cor: "peach", "yellow", "pink", "green" ou "blue".
 * previa: true exibe aviso de exemplos; false exibe o cardápio real.
 * Copie um bloco de item para adicionar outros; apague o bloco para remover.
 */
window.CARDAPIO = {
  titulo: "Cardápio",
  data: "2026-10-09",
  previa: false,
  itens: [
    { nome: "Cachorro-quente", descricao: "Um clássico que combina com alegria.", categoria: "comidas", preco: null, unidade: "Unidade", desenho: "hotdog", cor: "peach" },
    { nome: "Espetinho de frango", descricao: "Mais sabor para esse dia especial.", categoria: "comidas", preco: null, unidade: "Unidade", desenho: "espetinho", cor: "yellow" },
    { nome: "Pipoca", descricao: "Para acompanhar as boas brincadeiras.", categoria: "comidas", preco: 0, unidade: "Porção", desenho: "pipoca", cor: "green" },
    { nome: "Mousse", descricao: "Uma pausa doce entre as brincadeiras.", categoria: "doces", preco: null, unidade: "Porção", desenho: "mousse", cor: "pink" },
    { nome: "Gelatina", descricao: "Cor e doçura para alegrar o dia.", categoria: "doces", preco: null, unidade: "Porção", desenho: "gelatina", cor: "peach" },
    { nome: "Refrigerante", descricao: "Uma pausa fresquinha entre os sorrisos.", categoria: "bebidas", preco: null, unidade: "Copo", desenho: "refrigerante", cor: "green" },
    { nome: "Just Dance", descricao: "Solte os passos e entre na diversão!", categoria: "brincadeiras", preco: 0, unidade: "Participação", desenho: "danca", cor: "pink" },
    { nome: "Desfile", descricao: "Seu momento de brilhar e se divertir.", categoria: "brincadeiras", preco: 1, unidade: "Taxa de participação", desenho: "desfile", cor: "yellow" },
    { nome: "Outras brincadeiras", descricao: "Mais momentos para brincar e sorrir juntos.", categoria: "brincadeiras", preco: null, valorPendente: "Consulte a organização", unidade: "Atividades", desenho: "brincadeiras", cor: "blue" }
  ]
};
