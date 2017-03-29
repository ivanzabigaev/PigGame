/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer;
var document = this.document;
var gamePlaying;

newGame();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (!gamePlaying) {
        return;
    }
    
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    var diceDOM1 = document.querySelector('.dice-1');
    var diceDOM2 = document.querySelector('.dice-2');
    diceDOM1.style.display = 'block';
    diceDOM1.src = 'dice-' + dice1 + '.png';
    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + dice2 + '.png';
    if (dice1 !== 1 && dice2 !== 1) {
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else if (dice1 === 6 && dice2 === 6) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        nextPlayer();
    }
    else {
        nextPlayer();    
    }
});

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (!gamePlaying) {
        return;
    }
    
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    var winningScore = 100;
    var input = document.querySelector('.final-score').value;
    if(input) {
        winningScore = input;
    }
    
    
    if (scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.dice-1').style.display = 'none';
        document.querySelector('.dice-2').style.display = 'none';
        gamePlaying = false;
    } else {
        nextPlayer();
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    setTimeout(function () {
        wait(500);
        document.querySelector('.dice-1').style.display = 'none';
        document.querySelector('.dice-2').style.display = 'none';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
    }, 50);
}

document.querySelector('.btn-new').addEventListener('click', newGame);

function newGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;    
    
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    
    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}