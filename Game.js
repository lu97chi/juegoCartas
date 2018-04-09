alert('Presione las flechas Arriba y Abajo para la cantidad de juegos \n Presione la tecla enter para iniciar el juego \n Presione la flecha derecha para avanzar de turno')
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
document.addEventListener("keydown", keyDownHandler);
myAudio = new Audio('music.mp3');
myAudio.loop = true;
myAudio.play();
let turn = -1;
scores = {
    player1: 0,
    player2: 0,
    player3: 0,
    player4: 0
}
total = {
    player1: 0,
    player2: 0,
    player3: 0,
    player4: 0
}
let i, j = 1;
let auxHand = 0;
let player1, player2, player3, player4;
let card1, card2, card3, card4;
let cards = [];
let deck1 = [];
let deck2 = [];
let deck3 = [];
let deck4 = [];
let deck1aux = [];
let deck2aux = [];
let deck3aux = [];
let deck4aux = [];
let rounds = 0;
let roundsPlayed = 0;
let gameStarted = false;
let ready = false;
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        canvas.classList.add('flipInY')
        setTimeout(() => {
            canvas.classList.remove('flipInY')
            ready = true;
        }, 1000);
        turn += 1;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayers();
        drawCardsBack();
        drawCardPlaying();
        drawBoard();
        if (turn > 9) {
            restartRound();
        }

    }
    if (!gameStarted) {
        if (e.keyCode == 38) {
            rounds += 1;
            loadingScreen();
        }
        if (e.keyCode == 40) {
            if (rounds > 0) {
                rounds -= 1;
            }
            loadingScreen();
        }
    }
    if (e.keyCode == 13) {
        gameStarted = true;
        canvas.classList.remove('bounceIn');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        canvas.classList.add('fadeIn')
        setTimeout(() => {
            canvas.classList.remove('fadeIn')
        }, 1000);
    }
}

function loadingScreen() {
    background = new Image();
    background.onload = function () {
        ctx.drawImage(background, 0, 0, 800, 640)
        ctx.font = "40px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText('Cantidad de juegos: ' + rounds, 200, 40)

    }
    background.src = './OnGame/sample.png'
}

function draw() {
    drawScore();
    drawBoard();
    drawPlayers();
    drawCardsBack();
    cardsAssing();
    drawCardPlaying();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score:" + scores.player1, 8, 20);
    ctx.fillText("Score:" + scores.player4, 700, 20);
    ctx.fillText("Score:" + scores.player3, 8, 340);
    ctx.fillText("Score:" + scores.player2, 700, 340);
    ctx.fillText("Total:" + total.player1, 340, 20);
    ctx.fillText("Total:" + total.player4, 410, 20);
    ctx.fillText("Total:" + total.player3, 340, 340);
    ctx.fillText("Total:" + total.player2, 410, 340);
}

function drawBoard() {
    ctx.beginPath();
    ctx.rect(400, 0, 1, 640);
    ctx.rect(0, 320, 800, 1);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}

function drawPlayers() {
    player1 = new Image();
    player1.src = './OnGame/player1.png'
    player1.onload = function () {
        ctx.drawImage(player1, 0, 20)
    }
    player2 = new Image();
    player2.src = './OnGame/player2.png'
    player2.onload = function () {
        ctx.drawImage(player2, 700, 20)

    }
    player3 = new Image();
    player3.src = './OnGame/player3.png'
    player3.onload = function () {
        ctx.drawImage(player3, 0, 340)

    }
    player4 = new Image();
    player4.src = './OnGame/player4.png'
    player4.onload = function () {
        ctx.drawImage(player4, 700, 340)

    }
}

function drawCardsBack() {
    card1 = new Image();
    card1.src = './OnGame/cardGreen.png'
    card1.onload = function () {
        ctx.drawImage(card1, 0, 100, 120, 150)
    }
    card2 = new Image();
    card2.src = './OnGame/cardRed.png'
    card2.onload = function () {
        ctx.drawImage(card2, 0, 420, 120, 150)
    }
    card3 = new Image();
    card3.src = './OnGame/cardBlue.png'
    card3.onload = function () {
        ctx.drawImage(card3, 680, 100, 120, 150)
    }
    card4 = new Image();
    card4.src = './OnGame/cardYellow.png'
    card4.onload = function () {
        ctx.drawImage(card4, 680, 420, 120, 150)
    }
}

function cardsAssing() {
    let h = 1;
    let n = 1;
    let i, j, k;
    let aux = [];
    let aux2 = [];
    while (h <= 40) {
        cards.push('./OnGame/' + h + '.png');
        aux.push(h);
        h++;
    }
    for (i = aux.length; i; i--) {
        j = Math.floor(Math.random() * i);
        k = aux[i - 1];
        aux[i - 1] = aux[j];
        aux[j] = k;
    }
    for (let v = 0; v <= 39; v++) {
        number = aux[v];
        parseInt(number)
        if (v < 10) {
            deck1.push(number)
            if (number <= 10) {
                deck1aux.push(number)
            } else if (number > 10 && number < 21) {
                deck1aux.push(number - 10)
            } else if (number > 20 && number < 31) {
                deck1aux.push(number - 20)
            } else if (number > 30) {
                deck1aux.push(number - 30)
            }
        } else if (v > 9 && v < 20) {
            deck2.push(number)
            if (number <= 10) {
                deck4aux.push(number)
            } else if (number > 10 && number < 21) {
                deck4aux.push(number - 10)
            } else if (number > 20 && number < 31) {
                deck4aux.push(number - 20)
            } else if (number > 30) {
                deck4aux.push(number - 30)
            }
        } else if (v > 19 && v < 30) {
            deck3.push(number)
            if (number <= 10) {
                deck3aux.push(number)
            } else if (number > 10 && number < 21) {
                deck3aux.push(number - 10)
            } else if (number > 20 && number < 31) {
                deck3aux.push(number - 20)
            } else if (number > 30) {
                deck3aux.push(number - 30)
            }
        } else if (v > 29) {
            deck4.push(number)
            if (number <= 10) {
                deck2aux.push(number)
            } else if (number > 10 && number < 21) {
                deck2aux.push(number - 10)
            } else if (number > 20 && number < 31) {
                deck2aux.push(number - 20)
            } else if (number > 30) {
                deck2aux.push(number - 30)
            }
        }
    }
}


function drawCardPlaying() {
    let auxNumber1, auxNumber2, auxNumber3, auxNumber4;
    cardGame1 = new Image();
    cardGame1.src = cards[deck1[turn] - 1]
    cardGame1.onload = function () {
        ctx.drawImage(cardGame1, 200, 100, 120, 150)
    }
    cardGame2 = new Image();
    cardGame2.src = cards[deck2[turn] - 1]
    cardGame2.onload = function () {
        ctx.drawImage(cardGame2, 500, 100, 120, 150)
    }
    cardGame3 = new Image();
    cardGame3.src = cards[deck3[turn] - 1]
    cardGame3.onload = function () {
        ctx.drawImage(cardGame3, 200, 420, 120, 150)
    }
    cardGame4 = new Image();
    cardGame4.src = cards[deck4[turn] - 1]
    cardGame4.onload = function () {
        ctx.drawImage(cardGame4, 500, 420, 120, 150)
    }

    if (deck1aux[turn] == deck2aux[turn]) {
        if (deck1[turn] > deck2[turn]) {
            auxNumber1 = deck1aux[turn]
        } else {
            auxNumber2 = deck2aux[turn]
        }
    } else {
        if (deck1aux[turn] > deck2aux[turn]) {
            auxNumber1 = deck1aux[turn]
        } else {
            auxNumber2 = deck2aux[turn]
        }
    }

    if (deck3aux[turn] == deck4aux[turn]) {
        if (deck1[turn] > deck2[turn]) {
            auxNumber3 = deck3aux[turn]
        } else {
            auxNumber4 = deck4aux[turn]
        }
    } else {
        if (deck3aux[turn] > deck4aux[turn]) {
            auxNumber3 = deck3aux[turn]
        } else {
            auxNumber4 = deck4aux[turn]
        }
    }
    if (auxNumber1) {
        if (auxNumber3) {
            if (auxNumber1 == auxNumber3) {
                if (deck1[turn] > deck3[turn]) {
                    scores.player1 += 1;
                } else {
                    scores.player3 += 1;
                }
            } else {
                if (auxNumber1 > auxNumber3) {
                    scores.player1 += 1;
                } else {
                    scores.player3 += 1;
                }
            }
        } else {
            if (auxNumber1 == auxNumber4) {
                if (deck1[turn] > deck4[turn]) {
                    scores.player1 += 1;
                } else {
                    scores.player4 += 1;
                }
            } else {
                if (auxNumber1 > auxNumber4) {
                    scores.player1 += 1;
                } else {
                    scores.player4 += 1;
                }
            }
        }
    } else if (auxNumber2) {
        if (auxNumber3) {
            if (auxNumber2 == auxNumber3) {
                if (deck2[turn] > deck3[turn]) {
                    scores.player2 += 1;
                } else {
                    scores.player3 += 1;
                }
            } else {
                if (auxNumber2 > auxNumber3) {
                    scores.player2 += 1;
                } else {
                    scores.player3 += 1;
                }
            }
        } else {
            if (auxNumber2 == auxNumber4) {
                if (deck2[turn] > deck4[turn]) {
                    scores.player2 += 1;
                } else {
                    scores.player4 += 1;
                }
            } else {
                if (auxNumber2 > auxNumber4) {
                    scores.player2 += 1;
                } else {
                    scores.player4 += 1;
                }
            }
        }
    }

    drawScore();
}

function restartRound() {
    roundsPlayed += 1;
    if (scores.player1 >= scores.player2 && scores.player1 >= scores.player3 && scores.player1 >= scores.player4) {
        total.player1 += 1;
    } else if (scores.player2 >= scores.player1 && scores.player2 >= scores.player3 && scores.player2 >= scores.player4) {
        total.player2 += 1;
    } else if (scores.player3 >= scores.player1 && scores.player3 >= scores.player4 && scores.player3 >= scores.player2) {
        total.player3 += 1;
    } else if (scores.player4 >= scores.player1 && scores.player4 >= scores.player3 && scores.player4 >= scores.player2) {
        total.player4 += 1;
    }
    scores.player1 = 0;
    scores.player2 = 0;
    scores.player3 = 0;
    scores.player4 = 0;
    if (roundsPlayed < rounds) {
        cards = [];
        deck1 = [];
        deck2 = [];
        deck3 = [];
        deck4 = [];
        deck1aux = [];
        deck2aux = [];
        deck3aux = [];
        deck4aux = [];
        turn = -1;
        cardsAssing();
    } else {
        auxHand++;
        if (auxHand == 2) {
            document.removeEventListener("keydown", keyDownHandler);
            winner = new Image();
            winner.src = './OnGame/winner.png'
            if (total.player1 > total.player2 && total.player1 > total.player3 && total.player1 > total.player4) {
                winner.onload = function () {
                    ctx.drawImage(winner, 200, 100, 150, 150)
                }
            } else if (total.player2 > total.player1 && total.player2 > total.player3 && total.player2 > total.player4) {
                winner.onload = function () {
                    ctx.drawImage(winner, 500, 400, 150, 150)

                }
            } else if (total.player3 > total.player1 && total.player3 > total.player4 && total.player3 > total.player2) {
                winner.onload = function () {
                    ctx.drawImage(winner, 200, 400, 150, 150)
                }
            } else if (total.player4 > total.player1 && total.player4 > total.player3 && total.player4 > total.player2) {
                winner.onload = function () {
                    ctx.drawImage(winner, 500, 100, 150, 150)
                }
            }
        }


    }
}

loadingScreen();