// String recebida do desafio contendo todos os produtos
const reciboDeVenda = 'régua/valor3=cupom0;lápis/valor0.5=cupom0;mochila/valor50=cupom10;estojo/valor8=cupom0;cola/valor4=cupom0;cola/valor4=cupom0;mochila/valor50=cupom10;lápis/valor0.5=cupom0;cola/valor4=cupom0;lápis/valor0.5=cupom0;mochila/valor50=cupom10;tesoura/valor5=cupom0;caneta/valor1=cupom0;cola/valor4=cupom0;estojo/valor8=cupom0;borracha/valor2=cupom0;caderno/valor15=cupom5;lápis/valor0.5=cupom0;lápis/valor0.5=cupom0;tesoura/valor5=cupom0;'
// array vazia que vai ser usada para armazenar os objetos que serão criados com os produtos
const listaDaVenda = []
// array vazia que vai ser usada para armazenar os objetos que serão criados com os valores dos produtos
const totais = [{}]
// Separação da string original em vários arrays diferentes mas ainda em formato string dentro da array
let stringCortada = reciboDeVenda.split(/[;]/)
// loop que vai passar por todos os arrays feitos e começar a manipular os dados
for (itens in stringCortada) {
    // criar uma variável que vai agora dividir a array total em 3 partes, nome, valor e cupom
    let produtosSeparados = stringCortada[itens].split(/[/=]/)
    /* a string original tem um ; no final, que acabava fazendo criar um objeto vazio "", para isso não prejudicar a manipulação dos
    dados, a verificação de length > 1 é usada para não pegar esse objeto vazio. */
    if (produtosSeparados.length > 1) {
        // criando a varíavel que vai ser a propriedade produto já formatando com a primeira letra em maiúscula
        let produto = produtosSeparados[0].charAt(0).toUpperCase() + produtosSeparados[0].slice(1);
        // criando a varíavel que vai armazenar o valor, removendo as letras e transformando em número
        let valor = Number(produtosSeparados[1].replace("valor",""));
        // criando a varíavel que vai armazenar o valor do cupom, removendo as letras e transformando em número
        let cupom = Number(produtosSeparados[2].replace("cupom",""));
        // aqui foi criado uma variável que vai verificar se o item que está sendo iterado já existe no objeto
        let itemExistente = listaDaVenda.find(itens => itens.produto === produto);
        // caso ele exista, vai ser aumentada a propriedade quantidade dele em 1
        if (itemExistente) {
            itemExistente.quantidade++;
        } 
        // caso não exista, ele irá criar um objeto novo, com as propriedades passadas e quantidade 1
        else {
            listaDaVenda.push({ 
                produto: produto,
                valor: valor,
                cupom: cupom,
                quantidade: 1
            });
        }
    ;
} 
}
/* método utilizado para ordenar os itens do objeto, onde ele usa o método sort() e localeCompare(), o localeCompare vai comparar o
 produto a e b, onde vai comparar se o a é alfabeticamente menor que o b, sendo verdade, retorna um valor menor que zero. Caso
 contrário, retorna um valor maior. Com esse valor retornado, o sort() irá dispor se o item fica antes ou depois do outro de acordo
 com esse retorno. */ 
listaDaVenda.sort((a, b) => a.produto.localeCompare(b.produto));


// Criando as variáveis para o objeto que vai receber os valores dos produtos, são criadas foras para não resetar no loop
let total = 0;
let quantidadeTotal = 0;
let valorTotalComDesconto = 0;
// loop que vai adicionar os valores de cada um dos produtos na variável que vai ser passada para o objeto final
for (let itens in listaDaVenda) {
    /* Aqui é criada a variável valorItens e ela recebe o valor de cada um dos objetos multiplicado pela quantidade e vai somando
    depois ele joga essa soma toda dentro da propriedade valorTotal da array criada lá no início. */
    let valorItens = listaDaVenda[itens].valor;
    total += valorItens * listaDaVenda[itens].quantidade;
    totais[0].valorTotal = total;
    /* similar ao loop anterior, mas aqui precisa verificar se tem cupom de desconto, se não tiver, é a mesma ideia de cima, caso
    tenha, ai ele vai diminuir o valor total pelo valor em % do desconto */
    let valorDescontado = listaDaVenda[itens].valor;
    if (listaDaVenda[itens].cupom === 0) {
        valorTotalComDesconto += valorDescontado * listaDaVenda[itens].quantidade;
    } else {
        valorTotalComDesconto += listaDaVenda[itens].quantidade * (valorDescontado - ((listaDaVenda[itens].valor * listaDaVenda[itens].cupom) / 100));
    }
    totais[0].valorTotalDesconto = valorTotalComDesconto;
    // mesma coisa do valor total mas utilizando a quantidade
    let quantidadeItens = listaDaVenda[itens].quantidade;
    quantidadeTotal += quantidadeItens;
    totais[0].quantidadeDeProdutos = quantidadeTotal;
}
// log das duas arrays finais para mostrar o resultado
console.log(listaDaVenda)
console.log(totais)