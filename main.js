//Variables
let sum = 0
let dealerSum = 0
let cards = []
let dealerCards = []
let hasBlackjack = false
let inTheGame = false
let message = ""
const messageEl = document.getElementById("message-el")
const sumEl = document.getElementById("sum-el")
const dealerSumEl = document.getElementById("dealerSum-el")
const cardsEl = document.getElementById("cards-el")
const dealerCardsEl = document.getElementById("dealerCards-el")
const startGameBtn = document.getElementById("startGame-btn")
const hitBtn = document.getElementById("hit-btn")
const standBtn = document.getElementById("stand-btn")
const refreshBtn = document.getElementById("refresh-btn")
//Button functions
//startGame draws random cards
startGameBtn.addEventListener("click", () => {
    startGameBtn.disabled = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    let dealer1Card = getRandomCard()
    sum = firstCard + secondCard
    cards = [firstCard, secondCard]
    dealerCards = [dealer1Card] 
    dealerSum = dealer1Card
    showCards()
})
hitBtn.addEventListener("click", () => {
    if (inTheGame && hasBlackjack === false) {
        let hitCard = getRandomCard()
        sum += hitCard
        cards.push(hitCard)
        showCards()
    }    
})
//cpu draws more cards if sum below 17
standBtn.addEventListener("click", () => {
    if (inTheGame && hasBlackjack === false) {
        while (dealerSum < 17) {
            let newCard = getRandomCard()
            dealerSum += newCard
            dealerCards.push(newCard)
        } 
        showCards()
        dealerResults()
    } 
})  
refreshBtn.addEventListener("click", () => location.reload())

//random number 1(ACE) has value of 11
function getRandomCard() {
    let randomNum = Math.floor(Math.random() * 13) + 1
    if (randomNum === 1) {
        return 11
    } else if (randomNum > 10) {
        return 10
    } else {
        return randomNum
    }
}
//display cards and sum
function showCards() {
    cardsEl.textContent = "Your Cards: "
    sumEl.textContent = "Your Sum: " + sum
    dealerCardsEl.textContent = "Dealer Card(s): " 
    dealerSumEl.textContent = "Dealer Sum: " + dealerSum
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += " " + cards[i] + " "
    }
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardsEl.textContent += " " + dealerCards[i] + " "
    } 
    results()
}
//user results logic
function results() {
    if (sum <= 20) {
        message = "Hit?"
        inTheGame = true
    } else if (sum === 21) {
        message = "Blackjack!"
        hasBlackjack = true
        inTheGame = false
    } else {
        message = "Bust!"
        inTheGame = false
    }
    messageEl.textContent = message  
}
//dealer results logic
function dealerResults() {
    messageEl.textContent = ""
    inTheGame = false
    if (dealerSum < sum) {
        message = "You win!"
    } else if (dealerSum > sum && dealerSum < 21) {
        message = "Dealer wins!"
    } else if (dealerSum === 21) {
        message = "Dealer wins with Blackjack!"
    } else if (dealerSum === sum) {
        message = "Draw, play again!"
    } else {
        message = "You win, dealer bust!"
    }
    messageEl.textContent = message
}