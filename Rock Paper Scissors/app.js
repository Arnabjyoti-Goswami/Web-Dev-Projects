let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
}

updateScoreElement();


function pickComputerMove() {
  let computerMove = '';
  const randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'Rock';
  }
  else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'Paper';
  }
  else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'Scissors'; 
  }
  return computerMove;
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove ==='Rock') {
    if(computerMove === 'Rock') {
      result = 'Tie.';
    }
    else if(computerMove === 'Paper') {
      result = 'You lose.';
    }
    else if(computerMove === 'Scissors') {
      result = 'You win.';
    }
  }
  else if(playerMove === 'Scissors') {
    if(computerMove === 'Rock') {
      result = 'You lose.';
    }
    else if(computerMove === 'Paper') {
      result = 'You win.';
    }
    else if(computerMove === 'Scissors') {
      result = 'Tie.';
    }
  }
  else if(playerMove === 'Paper') {
    if(computerMove === 'Rock') {
      result = 'You win.';
    }
    else if(computerMove === 'Paper') {
      result = 'Tie.';
    }
    else if(computerMove === 'Scissors') {
      result = 'You lose.';
    }
  }

  // Update the score
  if(result === 'You win.') {
    score.wins ++;
  }
  else if(result === 'You lose.') {
    score.losses ++;
  }
  else if(result === 'Tie.') {
    score.ties ++;
  }

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
<img src="images/${playerMove.toLowerCase()}-emoji.png" class="move-icon"> 
<img src="images/${computerMove.toLowerCase()}-emoji.png" class="move-icon">
Computer`; //this toLowerCase method for strings is required as moves were named with first letter in capital and saved images have all lowercase letters names
  localStorage.setItem('score', JSON.stringify(score));
}


function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetScoreButton() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  
  document.querySelector('.js-result').innerHTML = '';
  document.querySelector('.js-moves').innerHTML = '';
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if(isAutoPlaying === false) { //can also write it as !isAutoPlaying
    intervalId= setInterval(function() {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000); //make the computer play a game against itself every 1 second

    isAutoPlaying = true;

    document.querySelector('.auto-play-button').innerHTML = 'Stop Playing';
  }
  else {
    clearInterval(intervalId); //this will stop the setInterval function permanently until it's called again
    isAutoPlaying = false;
    document.querySelector('.auto-play-button').innerHTML = 'Auto Play';
  }
}