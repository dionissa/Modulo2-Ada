function checkAverageStar(){
    var oneStar = Number(document.querySelector('#starOne').value);
    var twoStar = Number(document.querySelector('#starTwo').value);
    var threeStar = Number(document.querySelector('#starThree').value);
    var fourStar = Number(document.querySelector('#starFour').value);
    var fiveStar = Number(document.querySelector('#starFive').value);
    var clientReview = oneStar + twoStar + threeStar + fourStar + fiveStar;
    var averageStar = Math.round(((oneStar) + (twoStar*2) + (threeStar*3) + (fourStar*4) + (fiveStar*5)) / clientReview);
    document.querySelector(".result-box").style.opacity = 100;
        switch (averageStar) {
        case 1:
            document.querySelector('#stars-html').innerHTML = "⭐<a>⭐⭐⭐⭐</a>"
            document.querySelector('#clients').innerHTML = `Tivemos um total de ${clientReview} avaliações`
            break;
        case 2:
            document.querySelector('#stars-html').innerHTML = "⭐⭐<a>⭐⭐⭐</a>"
            document.querySelector('#clients').innerHTML = `Tivemos um total de ${clientReview} avaliações`
            break;
        case 3:
            document.querySelector('#stars-html').innerHTML = "⭐⭐⭐<a>⭐⭐</a>"
            document.querySelector('#clients').innerHTML = `Tivemos um total de ${clientReview} avaliações`
            break;
        case 4:
            document.querySelector('#stars-html').innerHTML = "⭐⭐⭐⭐<a>⭐</a>"
            document.querySelector('#clients').innerHTML = `Tivemos um total de ${clientReview} avaliações`
            break;
        case 5:
            document.querySelector('#stars-html').innerHTML = "⭐⭐⭐⭐⭐"
            document.querySelector('#clients').innerHTML = `Tivemos um total de ${clientReview} avaliações`
            break;
        default:
            alert("Por favor, inserir pelo menos um campo para realizar a média");
            document.querySelector(".result-box").style.opacity = 0;
            break
    }
}

function resetFields() {
    document.querySelector(".result-box").style.opacity = 0;
}