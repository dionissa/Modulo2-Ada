```js
const arrayParceiros = [
    [19660156627897, "Fernanda Santos"],
    [23998058019370, "Rafael Souza"],
    [92291338611, "Maria Silva"],
    [55443795656, "Maria Souza"],
    [77743761456, "Ana Costa"],
    [47202302326, "Maria Ferreira"],
    [58017232567, "Sofia Costa"],
    [16733009491247, "Lucas Silva"],
    [63351859919, "Rafael Souza"],
    [84297701780, "Carlos Oliveira"],
]

// Criar um novo objeto que contém os objetos PJ e PF.
let finalPfPj = {
    PF: [],
    PJ: []
}

// Executar a função forEach passando por todos os elementos do array inicial
// verificando se o parceirosId contém 11 ou 14 caracteres.
// 11 = PF e 14 = PJ

arrayParceiros.forEach((parceiro) => {
    // Aqui foi criado uma variável para conseguir ler o valor da parceirosID e pegar o tamanho dele sem erros
    // Esse valor como number não aceita muito bem o length, por isso a troca para string
    let parceirosIdLength = parceiro[0].valueOf().toString().length;
    // Verificar com uma condicional se o tamanho do id é 11 ou não
    if (parceirosIdLength === 11) {
        // Caso o id tenha 11 caracteres, mandar esses dados como um novo objeto no PF
        // Aqui está pegando o objeto finalPfPj, entrando no objeto PF e adicionando um novo objeto com o valor de id e nome de
        // cada iteração que é feito no forEach
        finalPfPj.PF.push({
            parceirosID: parceiro[0],
            nome: parceiro[1]
        })
    } else {
        // Caso o id não tenha 11 caracteres, ele vai mandar esses dados para o objeto PJ, similar a situação anterior
        finalPfPj.PJ.push({
            parceirosID: parceiro[0],
            nome: parceiro[1]
        })
    }
})

console.log(finalPfPj)
```
```
Saída no terminal: 

{
  PF: [
    { parceirosID: 92291338611, nome: 'Maria Silva' },
    { parceirosID: 55443795656, nome: 'Maria Souza' },
    { parceirosID: 77743761456, nome: 'Ana Costa' },
    { parceirosID: 47202302326, nome: 'Maria Ferreira' },
    { parceirosID: 58017232567, nome: 'Sofia Costa' },
    { parceirosID: 63351859919, nome: 'Rafael Souza' },
    { parceirosID: 84297701780, nome: 'Carlos Oliveira' }
  ],
  PJ: [
    { parceirosID: 19660156627897, nome: 'Fernanda Santos' },
    { parceirosID: 23998058019370, nome: 'Rafael Souza' },
    { parceirosID: 16733009491247, nome: 'Lucas Silva' }
  ]
}
```
