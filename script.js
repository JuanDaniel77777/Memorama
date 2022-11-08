const cards = document.querySelectorAll(".card");
const timeTag = document.querySelector(".time b");
const flipsTag = document.querySelector(".flips b");
const refreshBtn = document.querySelector(".details button");
const aciertosFinales = document.querySelector(".details");

let maxTime = 40;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

let oneCard = [];
let twoCard = [];
let arr = [];
for (var i = 0; i < 8; i++) {
    i = i++;
    var x = Math.floor(Math.random()*(0-33+1)+33);
    if(twoCard.indexOf(x)!=-1){i--;continue;}else{twoCard.push(x)}
    
  }
  oneCard = twoCard.sort(()=>{return Math.random()-0.5});
  arr = twoCard.concat(oneCard);
  

function initTimer() {
    if(timeLeft <= 0) {
        return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerHTML = timeLeft;
}

function flipCard({target: clickedCard}) {
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if(clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matchedCard++;
        aciertosFinales.style.background = "green";
        if(matchedCard == 8 && timeLeft > 0) {
            return clearInterval(timer);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    aciertosFinales.style.background = "red";

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    timeLeft = maxTime;
    flips = matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    arr = arr.sort(()=>{return Math.random()-0.5});
    console.log(arr);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `images/img-${arr[index]}.jpg`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

refreshBtn.addEventListener("click", shuffleCard);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});