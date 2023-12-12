## Opção Desafio 2

**Tema do Exercício: Desenvolvimento de Jogo com Programação Orientada a Objetos em JavaScript**

**Requisitos:**

1. Criar um jogo simples que envolva personagens, inimigos e itens. ✅
2. Cada personagem pode interagir com inimigos, coletar itens e ganhar pontos. ✅
3. Cada inimigo tem diferentes níveis de dificuldade e oferece uma quantidade variável de pontos ao ser derrotado. ✅
4. O jogo deve permitir a movimentação dos personagens no ambiente e detectar colisões entre eles. ✅
5. Implementar métodos para calcular a pontuação do jogador, exibir informações relevantes e controlar o estado do jogo (iniciado, pausado, concluído). ✅

**Classes:**

1. `Personagem`: Representa um personagem do jogo. Atributos: `nome`, `pontuacao`, `posicao`.

```javascript
class Character {
    score = 0
    constructor(name, position) {
        this.name = name
        this.position = position
        this.espadaRadiante = false
        this.itens = ["Chave"]
        this.escudoDeÁgua = false
    }
}
```

- Métodos: `mover(direcao)`, `coletarItem(item)`, `derrotarInimigo(inimigo)`, `calcularPontuacao()`.

```javascript
    move(direction) {
        mainCharacter = document.querySelector("#main-character")
        const upButton = document.querySelector("#up-button")
        upButton.addEventListener("click", () => {
            switch (direction){
                case "up": 
                            let currentTop = parseInt(mainCharacter.style.top) || 0;
                            currentTop += 30;
                            mainCharacter.style.top = currentTop + 'px';
                    break
                case "down":
                    break
                case "left":
                    break
                case "right":
                    break
            }
        })
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
```

1. `Inimigo`: Representa um inimigo do jogo. Atributos: `tipo`, `nivelDificuldade`, `pontos`.

```javascript

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
```

2. `Item`: Representa um item que pode ser coletado pelos personagens. Atributos: `nome`, `pontos`.

```javascript
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
```

3. `Jogo`: Representa o estado geral do jogo. Atributos: `personagens`, `inimigos`, `itens`, `estado` (iniciado, pausado, concluído).

- Métodos: `iniciarJogo()`, `pausarJogo()`, `concluirJogo()`.

```javascript
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
```

**Exemplo de Uso:**

```javascript
const mainPlayer = new Character("Dio", 0)
const finalBoss = new BossEnemy("Tarrask", 5, "Ultimate Wish", 224, 96, "img/monster.png");
const normalEnemy1 = new Enemy("Flameling", 4, "Iron Flail", 160, 256, "img/monster2.png")
const normalEnemy2 = new Enemy("Imp", 1, "Water Sword", 320, 416, "img/boss.png")
addEnemyToMap(normalEnemy2)
addEnemyToMap(normalEnemy1)
addEnemyToMap(finalBoss);
```

---
