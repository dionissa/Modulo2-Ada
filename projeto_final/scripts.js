function addNewTask() {
    // Pegar o texto que for inserido no input de texto pelo usuário
    let newTaskText = document.querySelector("#input-text").value
    // Pegar o valor que foi selecionado pelo usuario no select
    let newTaskValue = document.querySelector("#type").value
    // Gerar um id único para a task que vai ser criada, com um número aleatório que vai ser concatenado na string id
    let newIndexGenerator = String((Math.random() * 99999).toFixed(0))
    newIndexGenerator = 'id' + newIndexGenerator;

    // Checar aqui uma condicional para quando não for passado nenhum texto, dar um erro se não for passado
    if (!!!newTaskText){
        alert("Adicione um texto para a nova tarefa :)")
    } 
    // Caso tenha texto, começar a logica de fato para criar uma nova task
    else {
        // Criar uma div nova com a função nativa createElement()
        const newDiv = document.createElement("div")
        // Passar o nome das classes que vamos querer nessa div, sendo task um nome para todas, newTaskValue o texto que o usuário passou
        // e newIndexGenerator o id único que foi criado para essa task
        newDiv.className = `task ${newTaskValue} ${newIndexGenerator}`
        // Aqui também vamos adicionar um evento nessa div que quando ela for clicada, vai disparar a função a seguir:
        newDiv.onclick = function() {

            // Iremos armazenar o id que foi criado em uma variavel para poder ser utilizada como ID pelo querySelector
            let selectors = `.${newIndexGenerator}`
            // Chamaremos de taskCheck a variável que vai selecionar o elemento que tenha o ID criado no começo da função.
            let taskCheck = document.querySelector(selectors)

            // Essa parte é responsável por deixar a tarefa concluída ou disponível, usando a seguinte lógica:

            // se o taskCheck (a div que tem as classes padrões e também a classe específica feita pelo ID) não tiver a tag checked
            // ou se ele ter todas as classes e já tiver a classe unchecked, irá entrar no primeiro caso:
            if (taskCheck.className === `task ${newTaskValue} ${newIndexGenerator}` || taskCheck.className === `task ${newTaskValue} ${newIndexGenerator} unchecked`) {
                // Precisamos declarar denovo o taskCheck aqui igual feito em cima, porque ele não consegue acessar o let de fora por conta 
                // de escopo diferente
                let taskCheck = document.querySelector(selectors)
                // Agora que temos acesso ao taskCheck, vamos apenas adicionar a classe checked no final das classes dele.
                taskCheck.className = `task ${newTaskValue} ${newIndexGenerator} checked`;
            } else {
                // Criar novamente a variável por conta do escopo
                let taskCheck = document.querySelector(selectors)
                // Aqui é pra adicionar a classe unchecked, que vai servir pra quando a classe checked estiver na div, trocando assim um
                // pelo outro.
                taskCheck.className = `task ${newTaskValue} ${newIndexGenerator} unchecked`;
            }
        }       
        const newDelButton = document.createElement("button")
        newDelButton.className = "deleteButton"
        const newDelButtonText = document.createTextNode("❌")
        newDelButton.appendChild(newDelButtonText)
        newDelButton.onclick = function() {
            let selectors = `.${newIndexGenerator}`
            let taskToBeDeleted = document.querySelector(selectors)
            taskToBeDeleted.parentNode.removeChild(taskToBeDeleted)
        }
        const newLi = document.createElement("li")
        const newLiText = document.createTextNode(`${newTaskText}`)

        newLi.appendChild(newLiText)
        document.querySelector("#task-box").appendChild(newDiv).appendChild(newLi)
        document.querySelector("#task-box").appendChild(newDiv).appendChild(newDelButton)
    }
}