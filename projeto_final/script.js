class Character {
    score = 0
    constructor(name, position) {
        this.name = name
        this.position = position
        this.espadaRadiante = false
        this.itens = ["Chave"]
        this.escudoDeÁgua = false
    }
    static moveCharacter(direction) {
        const computedStyle = window.getComputedStyle(mainCharacter);
        
        let currentTop = parseInt(computedStyle.top);
        let currentLeft = parseInt(computedStyle.left);
    
        let newTop = currentTop;
        let newLeft = currentLeft;
        const rowIndex = Math.floor(newTop / tileSize);
        const colIndex = Math.floor(newLeft / tileSize);
    
        switch (direction) {
            case 'up':
                newTop -= tileSize;
                break;
            case 'down':
                newTop += tileSize;
                break;
            case 'left':
                newLeft -= tileSize;
                break;
            case 'right':
                newLeft += tileSize;
                break;
            default:
                break;
        }
    
        if (canMoveTo(newLeft, newTop)) {
            mainCharacter.style.top = `${newTop}px`;
            mainCharacter.style.left = `${newLeft}px`;
            console.log('newTop:', newTop, 'newLeft:', newLeft);
            console.log("row:", rowIndex, "col:", colIndex)
        }
    }
    static colectItem(){
        const computedStyle = window.getComputedStyle(mainCharacter);  
        let currentTop = parseInt(computedStyle.top);
        let currentLeft = parseInt(computedStyle.left);    
        let newTop = currentTop / 32;
        let newLeft = currentLeft / 32;
        let audio = new Audio('sounds/item.mp3');
        let audio2 = new Audio("sounds/opening.mp3")
        console.log(newLeft, newTop)
        if ((newLeft === 3 && newTop === 12 || newLeft === 3 && newTop === 13 || newLeft === 4 && newTop === 13) && !mainPlayer.espadaRadiante) {
            audio2.play()
            alert(`Você encontrou o item Espada Radiante e uma Chave`)
            mainPlayer.espadaRadiante = true
            mainPlayer.itens.push("Espada Radiante", "Chave")
            audio.play();
            return
        }
        if ((newLeft === 2 && newTop === 1 || newLeft === 2 && newTop === 2 || newLeft === 1 && newTop === 2) && !mainPlayer.escudoDeÁgua)
        {
            audio2.play()
            alert(`Você encontrou o item Escudo de Água e uma Chave`)
            mainPlayer.escudoDeÁgua = true
            mainPlayer.itens.push("Escudo de Água", "Chave")
            audio.play();
            audio2.play()
            return
        }
        
        else {
            let audio3 = new Audio("sounds/searching.mp3")
            audio3.play()
            alert(`Não há itens nesse espaço para coletar`)
        }
    }
    static showItens(player){
        var audio = new Audio('sounds/button.mp3');
        audio.play()
        alert(`Itens no inventário: ${player.itens}`)
    }
}

class Enemy {
    constructor(name, level, reward, positionX, positionY, image) {
        this.name = name;
        this.level = level;
        this.reward = reward;
        this.positionX = positionX;
        this.positionY = positionY;
        this.image = image;
        this.defeated = false
    }
}

class BossEnemy extends Enemy {
        boss = true
        defeated = false
}

class Item {
    constructor(name, points) {
        this.name = name
        this.points = points
    }
}

class SpecialItem extends Item {
    constructor(name, points, effect) {
        super()
        this.name = name
        this.points = points
        this.effect = effect
    }
}

class GameState {
    static startGame(){
        window.location.href = 'index.html';
    }
    static pauseGame(){
        alert("O jogo foi pausado")
    }
    static quitGame(){
        window.location.href = 'start.html';
    }
}

// Matriz inicial com todos os quadrados livres
const mapa = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 2, 2, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 0, 1, 0, 0, 1],
    [1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
const tileSize = 32;

// Exemplo de criação de um inimigo e adição ao mapa
const mainPlayer = new Character("Dio", 0)
const finalBoss = new BossEnemy("Tarrask", 5, "Ultimate Wish", 224, 96, "img/monster.png");
const normalEnemy1 = new Enemy("Flameling", 4, "Iron Flail", 160, 256, "img/monster2.png")
const normalEnemy2 = new Enemy("Imp", 1, "Water Sword", 320, 416, "img/boss.png")
addEnemyToMap(normalEnemy2)
addEnemyToMap(normalEnemy1)
addEnemyToMap(finalBoss);

const initialPositionY = 14 * tileSize;
const initialPositionX = 0;

const mainCharacter = document.querySelector("#main-character");
mainCharacter.style.top = `${initialPositionY}px`;
mainCharacter.style.left = `${initialPositionX}px`;

function canMoveTo(newLeft, newTop) {
    const rowIndex = Math.floor(newTop / tileSize);
    const colIndex = Math.floor(newLeft / tileSize);

    if (colIndex < 0 || colIndex >= mapa[0].length || rowIndex < 0 || rowIndex >= mapa.length) {
        return false;
    }

    // Check if the position is not a wall (1) or a closed door (4)
    return mapa[rowIndex][colIndex] === 0
}

// Adicione um ouvinte de evento de teclado para capturar as setas
document.addEventListener("keydown", function(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        // Prevent the default scrolling behavior
        event.preventDefault();
      }
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':   
            Character.moveCharacter('up');
        break;
        case 'ArrowDown':
        case 's':
        case 'S':
            Character.moveCharacter('down');
        break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            Character.moveCharacter('left');
        break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            Character.moveCharacter('right');
        break;
        case 'E':
        case 'e':
            const mainCharacter = document.querySelector("#main-character");
            const playerPositionX = parseInt(mainCharacter.style.left);
            const playerPositionY = parseInt(mainCharacter.style.top);        
            attackNearbyEnemies(playerPositionX, playerPositionY)
        break
        case 'F':
        case 'f':
            Character.colectItem()
        break
        case 'B':
        case 'b':
            openDoor()
        break
        case 'I':
        case 'i':
            Character.showItens(mainPlayer)
        break
      default:
        break;
    }
  });

// Função para adicionar um inimigo ao mapa
function addEnemyToMap(enemy) {
    // Verificar se a posição é válida no mapa
    if (canMoveTo(enemy.positionX, enemy.positionY)) {
        // Adicionar o inimigo à matriz do mapa
        mapa[enemy.positionY / tileSize][enemy.positionX / tileSize] = 2; // Use 2 para representar inimigos, por exemplo

        // Criar elemento de imagem
        const enemyImage = document.createElement('img');
        enemyImage.src = enemy.image;
        enemyImage.classList.add('enemy');
        if(enemy.boss) {
            enemyImage.classList.add('boss');
        } // Adicionar classe para estilos ou manipulação posterior

        // Definir posição absoluta com base na posição do inimigo
        const top = enemy.positionY + 'px';
        const left = enemy.positionX + 'px';

        enemyImage.style.position = 'absolute';
        enemyImage.style.top = top;
        enemyImage.style.left = left;

        // Adicionar a imagem ao container do jogo
        document.getElementById('game-container').appendChild(enemyImage);
    }
}

// Função para atacar inimigos ao redor do jogador
function attackNearbyEnemies(playerPositionX, playerPositionY) {
    const playerTileX = Math.floor(playerPositionX / tileSize);
    const playerTileY = Math.floor(playerPositionY / tileSize);
    const rewardItens = ["Espada de Água" , "Chave", "Estrela dos Desejos"]
    var audio = new Audio('sounds/battle.wav');
    showSword();
    if (mainPlayer.itens.length === 2) {    
        audio.play()
        RemoveEnemyFromGame()
        return
    } if (mainPlayer.itens.length === 3 && normalEnemy2.defeated) {
        RemoveEnemyFromGame()
        mainPlayer.itens.push("Chave")
        audio.play()
        return
    } if (mainPlayer.itens.length > 3) {
        RemoveEnemyFromGame()
        audio.play()
        return
    }

function RemoveEnemyFromGame(){
    for (let i = playerTileY - 1; i <= playerTileY + 1; i++) {
        for (let j = playerTileX - 1; j <= playerTileX + 1; j++) {
            // Verificar se as coordenadas estão dentro dos limites do mapa
            if (i >= 0 && i < mapa.length && j >= 0 && j < mapa[0].length) {
                // Verificar se há um inimigo no tile
                if (mapa[i][j] === 2 || mapa[i][j] === 3) {
                    const isBoss = mapa[i][j] === 3;
                    // Remover inimigo do mapa
                    mapa[i][j] = isBoss ? 0 : 1;
                    // Remover imagem do inimigo do DOM
                    const enemyImage = document.querySelector('.enemy');
                    enemyImage.remove();
                    freeMapTile();
                    if (!mainPlayer.itens.find(item => item === "Espada de Água")) {
                        mainPlayer.itens.push(rewardItens[0]);
                    }

                    return;
                }
            }
        }
    }
}
}

    const btnAttack = document.querySelector("#attack-button");
btnAttack.addEventListener("click", function() {
    const mainCharacter = document.querySelector("#main-character");
    const playerPositionX = parseInt(mainCharacter.style.left);
    const playerPositionY = parseInt(mainCharacter.style.top);

    // Chama a função de ataque passando as posições do jogador
    attackNearbyEnemies(playerPositionX, playerPositionY);
});

function freeMapTile(){
    var audio = new Audio('sounds/victory.mp3');
    if (!normalEnemy2.defeated) {
        mapa[13][10] = 0
        mapa[13][11] = 0
        mapa[14][10] = 0
        mapa[14][11] = 0
        alert(`Parabéns, você derrotou o ${normalEnemy2.name} e adquiriu o item ${normalEnemy2.reward}`)
        normalEnemy2.defeated = true
        
        return
    } if (!normalEnemy1.defeated) {
        mapa[9][5] = 0
        mapa[9][6] = 0
        mapa[8][5] = 0
        mapa[8][6] = 0
        mapa[10][5] = 0
        mapa[10][6] = 0
        alert(`Parabéns, você derrotou o ${normalEnemy1.name} e adquiriu uma Chave`)
        normalEnemy1.defeated = true
        return
    } if (normalEnemy1.defeated && normalEnemy2.defeated) {
        audio.play()
        alert(`Parabéns, você derrotou o chefe final e finalizou o jogo!`)
        window.location.href = 'start.html';
    }
}

function showSword() {
    const swordContainer = document.getElementById('sword-container');
    swordContainer.style.backgroundImage = 'url("img/sword.webp")';

    const mainCharacter = document.getElementById('main-character');
    const top = parseInt(mainCharacter.style.top) - 16  + 'px';
    const left = (parseInt(mainCharacter.style.left) + 32) + 'px';
    swordContainer.style.width = "64px"
    swordContainer.style.height = "64px"
    swordContainer.style.top = top;
    swordContainer.style.left = left;
    swordContainer.style.display = 'block';
    let audio5 = new Audio('sounds/battle.wav');
    audio5.play()

    setTimeout(() => {
        swordContainer.style.display = 'none';
    }, 500);
}

function openDoor() {
    const computedStyle = window.getComputedStyle(mainCharacter);
    let currentTop = parseInt(computedStyle.top);
    let currentLeft = parseInt(computedStyle.left);
    let newTop = currentTop / tileSize;
    let newLeft = currentLeft / tileSize;

    // Check if the player is next to a door
    if ((mapa[newTop][newLeft - 1] === 4 || mapa[newTop][newLeft + 1] === 4 || mapa[newTop - 1][newLeft] === 4 || mapa[newTop + 1][newLeft] === 4) && mainPlayer.itens.includes("Chave")) {
        let audio = new Audio('sounds/door.mp3');
        audio.play()
        console.log(newTop, newLeft)
        mapa[newTop][newLeft + 1] = 0;
        mapa[newTop+1][newLeft] = 0
        mapa[newTop-1][newLeft] = 0
        alert("Você abriu a porta!");
        // Remove the door from the map
        mapa[newTop][newLeft] = 0;
        // Remove the key from the player's inventory
        const keyIndex = mainPlayer.itens.indexOf("Chave");
        if (keyIndex !== -1) {
            mainPlayer.itens.splice(keyIndex, 1);
            
        }
    } else {
        alert("Você não tem a chave ou não está próximo de uma porta.");
    }
}
