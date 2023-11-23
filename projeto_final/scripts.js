// Criação da Array que vai armazenar todas as tasks como objetos únicos
const arrayOfTasks = []

// Criação de algumas variáveis para conseguir a data do dia e formatar em um jeito que o input date aceite
const date = new Date();
const day = ('0' + date.getDate()).slice(-2);
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const year = date.getFullYear();
const formattedDate = year + '-' + month + '-' + day;
let dayOfToday = document.querySelector("#input-date")
dayOfToday.value = formattedDate

// Função principal da aplicação, que vai criar as novas tarefas
function addTask() {
        // Aqui ele vai receber os dados inseridos nos inputs pelo usuário
        let title = document.querySelector("#input-title").value
        let description = document.querySelector("#input-description").value
        let category = document.querySelector("#input-category").value
        let expirationDate = document.querySelector("#input-date").value
        // Validações para que não fique título em branco, muito pequeno, entre outros.
        try {
            if (title.trim() === "") {
                throw new Error("Por favor, insira um título");
            }
            if (!isNaN(title)) {
                throw new Error("Título não pode conter somente números");
            }
            if (title.length < 4) {
                throw new Error("O título precisa ter pelo menos 4 letras.");
            }
    
            if (description.length < 20) {
                throw new Error("A descrição precisa ter pelo menos 20 caractéres.");
            }
            if (category.trim() !== "" && category.length < 5) {
                throw new Error("Categoria precisa ter no mínimo 5 letras.");
            }
            if (new Date(expirationDate) < new Date(formattedDate)) {
                throw new Error("Prazo não pode ser menor que hoje");
            }
            if (arrayOfTasks.some(task => task.title === title)) {
                throw new Error("Título já existe, favor inserir outro");
            }
        
        // Caso esteja tudo correto, vai criar uma ID única para essa tarefa, utilizando o horário com milisegundos para não ter como
        // surgirem duplicatas
        let id = Date.now()
        // Após isso, uma nova função será chamada utilizando de paramêtros as propriedades que são inseridas no objeto.
        pushNewTask(id, title, description, category, expirationDate)
    } catch (error) {
        alert(error.message);
    }
}

// Essa função é responsável por inserir as informações que pegamos no addTask na array.
function pushNewTask(id, title, description, category, expiration) {
    // Inserção direta das informações que recebemos do usuário no input em cada propriedade.
    // Note que criamos 2 propriedades a mais aqui, deleted e expired, serão utilizadas futuramente para ações que teremos a mais.
    arrayOfTasks.push({
        id: id,
        title: title,
        description: description,
        category: category,
        expirationDate: expiration,
        deleted: false,
        expired: false
    })
    // Depois de enviar essas informações para o array, iremos chamar a função que passa essa tarefa da array para uma parte
    // visual no DOM.
    passTaskToDom(id);
    // Estamos utilizando o localStorage para salvar nossas tarefas, então após adicionar uma nova, será salva também no local.
    saveTasksToLocalStorage();
}

// Como funciona nossa função de passar a tarefa criada para o DOM?
function passTaskToDom(id) {
    // Criamos aqui a div que vai englobar essa nova tarefa
    let taskDiv = document.createElement("div")
    taskDiv.className = "task showing"
    taskDiv.id = `id${id}`
    document.querySelector("#task-box").appendChild(taskDiv);
    let titleDiv = document.createElement("div")
    titleDiv.className = "task-title"
    titleDiv.id = `titleId${id}`
    // Depois de criar essa div, iremos fazer uma varredura pelo array com as tarefas, e sempre que ele encontrar um array, irá
    // fazer uma sequência de lógica que cria novos elementos, divs, paragráfos, botões, etc, para que a nossa tarefa apareça como
    // se fosse um post it na página.
    for (itens of arrayOfTasks) {
        if (itens.id === id){
            titleDiv.innerHTML = `<h2>${itens.title}</h2>`
            document.querySelector("#task-box").appendChild(taskDiv).appendChild(titleDiv)

            let descriptionDiv = document.createElement("div")
            descriptionDiv.className = "description"
            descriptionDiv.id = `descriptionId${id}`
            descriptionDiv.innerHTML = `<p>${itens.description}</p>`
            document.querySelector("#task-box").appendChild(taskDiv).appendChild(descriptionDiv)

            let categoryDiv = document.createElement("div")
            categoryDiv.className = "category"
            categoryDiv.id = `categoryId${id}`
            categoryDiv.innerHTML = `<strong>Categoria:</strong> ${itens.category}`
            document.querySelector("#task-box").appendChild(taskDiv).appendChild(categoryDiv)

            let expirationDiv = document.createElement("div")
            expirationDiv.className = "expiration"
            expirationDiv.id = `expirationId${id}`
            expirationDiv.innerHTML = `<strong>Prazo da tarefa:</strong> até ${itens.expirationDate.split('-').reverse().join('-')}`;
            document.querySelector("#task-box").appendChild(taskDiv).appendChild(expirationDiv)

            let editionsDiv = document.createElement("div")
            editionsDiv.className = "edits"
            editionsDiv.innerHTML = `<button class=\"button\" onclick=\"editTask(${itens.id})\">Editar</button><button class=\"button\" onclick=\"deleteTask(${itens.id})\">Deletar</button>`
            document.querySelector("#task-box").appendChild(taskDiv).appendChild(editionsDiv)
        }
    }
}

// Essa função é para o soft delete, onde irá mudar aquela propriedade deleted que inicialmente era false para true
function deleteTask(id) {
    for (itens of arrayOfTasks) {
        if (itens.id === id){
            itens.deleted = true
        }
    }
    // Após fazer essa troca, chamamos essa nova função que vai checar as tarefas deletadas
    checkDeletedOnTask(id)
}

function checkDeletedOnTask(id) {
    // Aqui ela vai passar por todas as tarefas da array, como na maioria das funções e verificar se o deleted é true
    // Caso ele seja rtue, iremos mudar o display dessa tarefa pra none, fazendo ela sumir do nosso DOM.
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id === id && arrayOfTasks[i].deleted === true) {
            let findIdDiv = `#id${id}`;
            let taskDiv = document.querySelector(findIdDiv);
            if (taskDiv) {
                taskDiv.style.display = "none";
            }
            break;
        }
    }
}


// Temos uma função que vai chamar de volta todas as tarefas excluidas, por isso chamamos de soft delete, elas não sairam da nossa
// array principal
function recallAllDeleted() {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        // Se a tarefa estiver com o deleted true, iremos voltar o display dela para flex, fazendo assim ela aparecer novamente no DOM
        if (arrayOfTasks[i].deleted === true) {
            arrayOfTasks[i].deleted = false;
            let findIdDiv = `#id${arrayOfTasks[i].id}`;
            let taskDiv = document.querySelector(findIdDiv);
            if (taskDiv) {
                taskDiv.style.display = "flex";
            }
        }
    }
}

// Aqui é a parte que vamos editar as tarefas já mostradas na DOM
function editTask(id) {
    // Novamente um loop que vai iterar entre todas as tarefas até encontrar a que estamos querendo manipular
    for (itens of arrayOfTasks) {
        if (itens.id === id){
            // Após encontrar, criamos apenas essa variável pra poder utilizar seu ID como seletor no querySelector
            let idIdentifierDiv = `#id${id}`
            let taskDiv = document.querySelector(idIdentifierDiv);

            // Caso essa div não contenha a classe editOn, iremos seguir com a lógica para abrir o menu de edições,
            // essa verificação eu coloquei porque se não o usuário poderia clicar em editar várias vezes e sempre ia abrindo
            // novos menus de edições, que não é o que eu queria.
            if (!taskDiv.classList.contains("editOn")) {
                // Aqui, como ele não possui ainda o editOn, vai ser adicionado essa classe e criaremos o menu de edição na DOM
                taskDiv.className = "task showing editOn"

                let newDivEdit = document.createElement("div")
                newDivEdit.className = `edit${id}`
                newDivEdit.style.display = "flex"
                newDivEdit.style.flexDirection = "column"
                taskDiv.appendChild(newDivEdit)

                let newTitleLabel = document.createElement("label")
                newTitleLabel.innerHTML = "Novo título: "
                taskDiv.appendChild(newDivEdit).appendChild(newTitleLabel);

                let newTitleInput = document.createElement("input")
                newTitleInput.type = "text"
                newTitleInput.className = "input-title"
                newTitleInput.id = `input${id}`
                taskDiv.appendChild(newDivEdit).appendChild(newTitleInput)

                let newDescriptionLabel = document.createElement("label")
                newDescriptionLabel.innerHTML = "Nova descrição: "
                taskDiv.appendChild(newDivEdit).appendChild(newDescriptionLabel)

                let newDescriptionInput = document.createElement("input")
                newDescriptionInput.type = "text"
                newDescriptionInput.id = `desc${id}`
                newDescriptionInput.className = "input-desc"
                taskDiv.appendChild(newDivEdit).appendChild(newDescriptionInput)

                let newCategoryLabel = document.createElement("label")
                newCategoryLabel.innerHTML = "Nova categoria: "
                taskDiv.appendChild(newDivEdit).appendChild(newCategoryLabel)

                let newCategoryInput = document.createElement("input")
                newCategoryInput.type = "text"
                newCategoryInput.id = `category${id}`
                newCategoryInput.className = "input-desc"
                taskDiv.appendChild(newDivEdit).appendChild(newCategoryInput)

                let newExpirationLabel = document.createElement("label")
                newExpirationLabel.innerHTML = "Novo prazo: "
                taskDiv.appendChild(newDivEdit).appendChild(newExpirationLabel)

                let newExpirationInput = document.createElement("input")
                newExpirationInput.type = "date"
                newExpirationInput.value = formattedDate
                newExpirationInput.id = `date${id}`
                newExpirationInput.className = "input-date"
                taskDiv.appendChild(newDivEdit).appendChild(newExpirationInput)

                // Essa parte específica é para que o botão criado no menu de edição tenha a função para confirmar a edição
                let newButtonEdit = document.createElement("button");
                newButtonEdit.addEventListener("click", function() {
                    try {
                        confirmEditTask(id);
                        
                    } catch (error) {
                        alert(error.message);
                    }
                });

                // Aqui foi preciso adicionar essas alterações porque se não o próximo botão edit que surgisse no menu de edições
                // era um botão sem função, assim, garantimos que depois de editar ainda podemos editar novamente se quiser
                newButtonEdit.type = "button"
                newButtonEdit.className = "button edit"
                newButtonEdit.id = `edit${itens.id}`
                newButtonEdit.innerHTML = "Confirmar Edição"
                taskDiv.appendChild(newDivEdit).appendChild(newButtonEdit)
                }
        }
    }
}

// Chegamos aqui na função que confirma a edição da nossa tarefa
function confirmEditTask(id) {
    // Loop para passar pelas tarefas da array e encontrar qual estamos querendo alterar
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id === id) {
            let idForNewTitleEdited = `#input${id}`
            let titleEdited = document.querySelector(idForNewTitleEdited).value

            let idForNewDescriptionEdited = `#desc${id}`
            let descriptionEdited = document.querySelector(idForNewDescriptionEdited).value

            let idForNewCategoryEdited = `#category${id}`
            let categoryEdited = document.querySelector(idForNewCategoryEdited).value

            let idForNewExpirationEdited = `#date${id}`
            let expirationEdited = document.querySelector(idForNewExpirationEdited).value

            // Aqui temos as mesmas validações de na hora de criação da tarefa
            try {
                if (titleEdited.trim() === "") {
                    throw new Error("Título editado não pode ser vazio.");
                }
                if (!isNaN(titleEdited)) {
                    throw new Error("Título editado não pode ser apenas números.");
                }
                if (titleEdited.length < 4) {
                    throw new Error("Título editado precisa ter no mínimo 4 letras.");
                }
                if (descriptionEdited.length < 20) {
                    throw new Error("Descrição editada não pode ser menor que 20 caractéres");
                }
                if (categoryEdited.trim() !== "" && categoryEdited.length < 5) {
                    throw new Error("Categoria não pode ser menor que 5 caractéres");
                }
                if (new Date(expirationEdited) < new Date(formattedDate)) {
                    throw new Error("Prazo de validade inferior a data de hoje");
                }
                if (arrayOfTasks.some(task => task.title === titleEdited && task.id !== id)) {
                    throw new Error("Título editado deve ser único.");
                }

                // Se todos os requisitos forem cumpridos, iremos passar as novas informações para a tarefa na array e atualizar
                // essas informações na DOM
                arrayOfTasks[i].title = titleEdited;
                arrayOfTasks[i].description = descriptionEdited;
                arrayOfTasks[i].category = categoryEdited;
                arrayOfTasks[i].expirationDate = expirationEdited;

                let idForOldTitleEdited = `#titleId${id}`
                let alteredTitle = document.querySelector(idForOldTitleEdited)
                alteredTitle.innerHTML = `<h2>${titleEdited}</h2>`

                let idForOldDescriptionEdited = `#descriptionId${id}`
                let alteredDescription = document.querySelector(idForOldDescriptionEdited)
                alteredDescription.innerHTML = `<p>${descriptionEdited}</p>`

                let idForOldCategoryEdited = `#categoryId${id}`
                let alteredCategory = document.querySelector(idForOldCategoryEdited)
                alteredCategory.innerHTML = `<strong>Categoria:</strong> ${categoryEdited}`

                let idForOldExpirationEdited = `#expirationId${id}`
                let alteredExpiration = document.querySelector(idForOldExpirationEdited)
                alteredExpiration.innerHTML = `<strong>Prazo da tarefa:</strong> até ${expirationEdited.split('-').reverse().join('-')}`

                let classForEditDiv = `.edit${id}`
                let editDivToRemove = document.querySelector(classForEditDiv)
                if (editDivToRemove) {
                    editDivToRemove.parentNode.removeChild(editDivToRemove);
                }
                let idIdentifierDiv = `#id${id}`;
                let taskDiv = document.querySelector(idIdentifierDiv);
                if (taskDiv.classList.contains("editOn")) {
                    taskDiv.classList.remove("editOn");
                }
                // Novamente, precisamos salvar agora essas inforamações no Local Storage para não perder a edição dessa tarefa
                saveTasksToLocalStorage();
            } catch (error) {
                alert(error.message);
                return;
            }
        }
    }
}

// Função simples que vai procurar as tarefas que o Título que o usuário escrever na caixa bata com as tarefas com esse título
function searchTask() {
    let searchValue = document.querySelector("#searchValue").value.toLowerCase();
    for (const task of arrayOfTasks) {
        const taskDivId = `#id${task.id}`;
        const taskDiv = document.querySelector(taskDivId);

        if (task.title.toLowerCase().includes(searchValue)) {
            task.deleted = false;
            if (taskDiv) {
                taskDiv.style.display = 'flex';
            }
        } else {
            task.deleted = true;
            if (taskDiv) {
                taskDiv.style.display = 'none';
            }
        }
    }
}

// Como as tarefas tem prazo de validade, sempre estaremos checando com uma função pra caso esse prazo esteja passado,
// Se a tarefa passou do prazo, iremos emitir um alert e trocaremos a cor dela para vermelho.
function updateExpiredStatus() {
    const currentDate = new Date();

    for (const task of arrayOfTasks) {
        const expirationDate = new Date(task.expirationDate);
        
        const taskDivId = `#id${task.id}`;
        const taskDiv = document.querySelector(taskDivId);
        if (!task.expired) {
            if (expirationDate < currentDate) {
                task.expired = true;
                if (taskDiv) {
                    taskDiv.classList.add("expired");
                }
                alert(`Tarefa com o título ${task.title} expirou`);
            }
        }
    }
}

// A cada 1 minuto essa verificação é feita
setInterval(updateExpiredStatus, 60000);


// Função para que o usuário mostre Todas as tarefas que possui, expirada, deletada, qualquer uma, mostra todas da array.
function showAllTasks() {
    const allTasks = document.querySelectorAll('.task');
    allTasks.forEach(task => task.style.display = 'flex');
}

// Função que mostra apenas as tarefas expiradas e esconde todas as outras
function showExpiredTasks() {
    const allTasks = document.querySelectorAll('.task');
    allTasks.forEach(task => {
        const taskId = parseInt(task.id.slice(2));
        const taskData = arrayOfTasks.find(task => task.id === taskId);
        if (taskData && taskData.expired) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}

// Função que mostra apenas as tarefas não expiradas e esconde todas as outras
function showNonExpiredTasks() {
    const allTasks = document.querySelectorAll('.task');
    allTasks.forEach(task => {
        const taskId = parseInt(task.id.slice(2));
        const taskData = arrayOfTasks.find(task => task.id === taskId);
        if (taskData && !taskData.expired) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}

// Função que mostra uma totalização de todas as tarefas que possui no array, dividindo elas por tipos.
function showTaskTotals() {
    const totalTasks = arrayOfTasks.length;
    const tasksWithoutCategory = arrayOfTasks.filter(task => !task.category).length;

    const tasksByCategory = {};
    for (const task of arrayOfTasks) {
        if (task.category) {
            if (tasksByCategory[task.category]) {
                tasksByCategory[task.category]++;
            } else {
                tasksByCategory[task.category] = 1;
            }
        }
    }
    const expiredTasks = arrayOfTasks.filter(task => task.expired).length;
    const tasksInTime = arrayOfTasks.filter(task => !task.expired && task.expirationDate).length;
    const resultMessage = `
    Quantidade total de tarefas: ${totalTasks}
    Quantidade de tarefas sem categoria: ${tasksWithoutCategory}
    Quantidade de tarefas por categoria: ${JSON.stringify(tasksByCategory)}
    Quantidade de tarefas vencidas: ${expiredTasks}
    Quantidade de tarefas no prazo: ${tasksInTime}
    `;

    alert(resultMessage);
}

// Função que salva nossas tarefas da arrayOfTask em um json em modo string no localStorage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(arrayOfTasks));
}

// Função necessária para que ao abrir a página, irá carregas as tarefas existentes no LocalStorage
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        arrayOfTasks.length = 0; // Clear existing tasks
        const parsedTasks = JSON.parse(storedTasks);
        parsedTasks.forEach(task => {
            arrayOfTasks.push(task);
            passTaskToDom(task.id);
        });
    }
}

function searchTaskByIndex(index) {
    if (!!arrayOfTasks[index]) {
        console.log(`A tarefa que se encontra no ID ${index} tem o título de ${arrayOfTasks[index].title}, a descrição dela é: "${arrayOfTasks[index].description}", a categoria é "${arrayOfTasks[index].category}" e o prazo de validade é até o dia ${arrayOfTasks[index].expirationDate.split('-').reverse().join('-')}`)
    } else {
        console.log("Não existe tarefa com esse ID.")
    }
}

function searchTaskById(id) {
    for (itens of arrayOfTasks){
        if (itens.id === id) {
            console.log(`A tarefa que se tem o ID ${id} tem o título de ${itens.title}, a descrição dela é: "${itens.description}", a categoria é "${itens.category}" e o prazo de validade é até o dia ${itens.expirationDate.split('-').reverse().join('-')}`)
            return
        } else {
            console.log("Não existe tarefa com esse ID.")
            return
        }
    }
}


// Chamada a função para carregar as tarefas já existentes no localStorage
loadTasksFromLocalStorage();
updateExpiredStatus();

// Futuras implementações:
// Uma opção de Hard Delete, onde vai excluir a tarefa da arrayOfTasks e sumir com ela da aplicação
// Salvar os dados em um banco de dados externo invés de no Local Storage
// Deixar responsivo para aparelhos mobile