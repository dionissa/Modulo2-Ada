const arrayOfTasks = []
const date = new Date();
const day = ('0' + date.getDate()).slice(-2);
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const year = date.getFullYear();
const formattedDate = year + '-' + month + '-' + day;
let dayOfToday = document.querySelector("#input-date")
dayOfToday.value = formattedDate

function addTask() {
        let title = document.querySelector("#input-title").value
        let description = document.querySelector("#input-description").value
        let category = document.querySelector("#input-category").value
        let expirationDate = document.querySelector("#input-date").value
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

        let id = Date.now()
        pushNewTask(id, title, description, category, expirationDate)
    } catch (error) {
        alert(error.message);
    }
}


function pushNewTask(id, title, description, category, expiration) {
    arrayOfTasks.push({
        id: id,
        title: title,
        description: description,
        category: category,
        expirationDate: expiration,
        deleted: false,
        expired: false
    })
    passTaskToDom(id);
    saveTasksToLocalStorage();
}

function passTaskToDom(id) {
    let taskDiv = document.createElement("div")
    taskDiv.className = "task showing"
    taskDiv.id = `id${id}`
    document.querySelector("#task-box").appendChild(taskDiv);
    let titleDiv = document.createElement("div")
    titleDiv.className = "task-title"
    titleDiv.id = `titleId${id}`
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

function deleteTask(id) {
    for (itens of arrayOfTasks) {
        if (itens.id === id){
            itens.deleted = true
        }
    }
    checkDeletedOnTask(id)
}

function checkDeletedOnTask(id) {
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

function recallAllDeleted() {
    for (let i = 0; i < arrayOfTasks.length; i++) {
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


function editTask(id) {
    for (itens of arrayOfTasks) {
        if (itens.id === id){
            let idIdentifierDiv = `#id${id}`
            let taskDiv = document.querySelector(idIdentifierDiv);

            if (!taskDiv.classList.contains("editOn")) {
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

                let newButtonEdit = document.createElement("button");
                newButtonEdit.addEventListener("click", function() {
                    try {
                        confirmEditTask(id);
                        
                    } catch (error) {
                        alert(error.message);
                    }
                });
                newButtonEdit.type = "button"
                newButtonEdit.className = "button edit"
                newButtonEdit.id = `edit${itens.id}`
                newButtonEdit.innerHTML = "Confirmar Edição"
                taskDiv.appendChild(newDivEdit).appendChild(newButtonEdit)
                }
        }
    }
}

function confirmEditTask(id) {
    for (itens of arrayOfTasks) {
        if (itens.id === id) {
            let idForNewTitleEdited = `#input${id}`
            let titleEdited = document.querySelector(idForNewTitleEdited).value

            let idForNewDescriptionEdited = `#desc${id}`
            let descriptionEdited = document.querySelector(idForNewDescriptionEdited).value

            let idForNewCategoryEdited = `#category${id}`
            let categoryEdited = document.querySelector(idForNewCategoryEdited).value

            let idForNewExpirationEdited = `#date${id}`
            let expirationEdited = document.querySelector(idForNewExpirationEdited).value

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
            if (editDivToRemove){
                editDivToRemove.parentNode.removeChild(editDivToRemove)
            }
            saveTasksToLocalStorage();
        } catch (error) {
            alert(error.message);
            return;
        }
    }
}
}

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

setInterval(updateExpiredStatus, 60000);

function showAllTasks() {
    const allTasks = document.querySelectorAll('.task');
    allTasks.forEach(task => task.style.display = 'flex');
}

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

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(arrayOfTasks));
}

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

loadTasksFromLocalStorage();