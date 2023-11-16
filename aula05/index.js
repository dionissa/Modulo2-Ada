function testHidden() {
    let leftImg = document.querySelector(".imageLeft")
    leftImg.style.display = "none"
    let leftResult = document.querySelector(".result-show")
    leftResult.style.display = "flex"
    let imcDescription = document.querySelector(".imcDescription")
    let imcBelowDesc = document.querySelector(".imcBelowDescription")
    let weightValue = parseInt(document.querySelector("#weigth").value)
    let heightValue = (parseInt(document.querySelector("#height").value) / 100)
    imcMath = (weightValue / (heightValue * heightValue)).toFixed(1)
    let imcValue = document.querySelector(".imcValue")
    imcValue.innerHTML = `<h1 class="imcValue">${imcMath}</h1>`

    if (weightValue == 0 || heightValue == 0 || heightValue == undefined || weightValue == undefined) {
        alert("Favor inserir os valores corretos")
        reset()
    } else {
    if (imcMath < 18.5) {
        imcDescription.innerHTML = `<h2 class="imcDescription">Abaixo do peso</h2>`
        imcBelowDesc.innerHTML = `<h3 class="imcBelowDescription">Frágil: Peso insuficiente para a saúde e vitalidade.</h3>`
    } else if (imcMath <= 18.5 || imcMath < 24.9) {
        imcDescription.innerHTML = `<h2 class="imcDescription">Peso normal</h2>`
        imcBelowDesc.innerHTML = `<h3 class="imcBelowDescription">Equilíbrio ponderal: Peso adequado para a estatura e saúde.</h3>`
    } else if (imcMath <= 24.9 || imcMath < 29.9) {
        imcDescription.innerHTML = `<h2 class="imcDescription">Sobrepeso</h2>`
        imcBelowDesc.innerHTML = `<h3 class="imcBelowDescription">Excesso de peso: Índice de massa corporal acima do recomendado.</h3>`
    } else {
        imcDescription.innerHTML = `<h2 class="imcDescription">Obesidade</h2>`
        imcBelowDesc.innerHTML = `<h3 class="imcBelowDescription">Peso excessivo: Índice de massa corporal indicando obesidade.</h3>`
    }}
}

function reset() {
    let leftImg = document.querySelector(".imageLeft")
    leftImg.style.display = "flex"
    let leftResult = document.querySelector(".result-show")
    leftResult.style.display = "none"
}

reset()