**Resolução:**

Primeiro, declaramos as variáveis que iremos precisar para realizar o tratamento:

```js
const reciboDeVenda = 'régua/valor3=cupom0;lápis/valor0.5=cupom0;mochila/valor50=cupom10;estojo/valor8=cupom0;cola/valor4=cupom0;cola/valor4=cupom0;mochila/valor50=cupom10;lápis/valor0.5=cupom0;cola/valor4=cupom0;lápis/valor0.5=cupom0;mochila/valor50=cupom10;tesoura/valor5=cupom0;caneta/valor1=cupom0;cola/valor4=cupom0;estojo/valor8=cupom0;borracha/valor2=cupom0;caderno/valor15=cupom5;lápis/valor0.5=cupom0;lápis/valor0.5=cupom0;tesoura/valor5=cupom0;'
const listaDaVenda = []
const totais = [{}]
let stringCortada = reciboDeVenda.split(/[;]/)
```


A seguir, iremos utilizar o for(), antes de iniciar as operações no loop, vamos dividir a string para criar um objeto para
cada produto, então, iremos começar a tratar esses objetos um a um e colocando eles dentro do array final.

```js
    for (itens in stringCortada) {
    let produtosSeparados = stringCortada[itens].split(/[/=]/)
    if (produtosSeparados.length > 1) {
        let produto = produtosSeparados[0].charAt(0).toUpperCase() + produtosSeparados[0].slice(1);
        let valor = Number(produtosSeparados[1].replace("valor",""));
        let cupom = Number(produtosSeparados[2].replace("cupom",""));
        let itemExistente = listaDaVenda.find(item => item.produto === produto);
        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
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
listaDaVenda.sort((a, b) => a.produto.localeCompare(b.produto));
```

Após fazer essa primeira parte onde irá catalogar os produtos, valores, cupom e quantidade, iremos fazer outro array que conterá
o preço dos produtos tanto com desconto quanto sem, e também a quantidade total.

```js
let total = 0;
let quantidadeTotal = 0;
let valorTotalComDesconto = 0;

for (let itens in listaDaVenda) {
let valorItens = listaDaVenda[itens].valor;
total += valorItens * listaDaVenda[itens].quantidade;
totais[0].valorTotal = total;

let valorDescontado = listaDaVenda[itens].valor;
if (listaDaVenda[itens].cupom === 0) {
    valorTotalComDesconto += valorDescontado * listaDaVenda[itens].quantidade;
} else {
    valorTotalComDesconto += listaDaVenda[itens].quantidade * (valorDescontado - ((listaDaVenda[itens].valor * listaDaVenda[itens].cupom) / 100));
}
totais[0].valorTotalDesconto = valorTotalComDesconto;

let quantidadeItens = listaDaVenda[itens].quantidade;
quantidadeTotal += quantidadeItens;
totais[0].quantidadeDeProdutos = quantidadeTotal;
}
```
