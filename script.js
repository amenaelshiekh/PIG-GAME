'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
// const current0El = document.getElementById('current--0');
// const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
// const btnHold = document.querySelector('.btn--hold');

// Starting conditions
let currentScore, activePlayer, scores, playing;

function init() {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  // current0El.textContent = 0;
  // current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

init();

function switchPlayer() {
  currentScore = 0;
  // document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// Rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Random dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check for 1
    if (dice !== 1) {
      // Add to current score
      currentScore += dice;
      // document.getElementById(`current--${activePlayer}`).textContent =
      //   currentScore;

      // Add current score to score
      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

      if (scores[activePlayer] >= 20) {
        // end game
        playing = false;
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
      } else {
        // switch player
        switchPlayer();
      }
    } else {
      // switch player
      switchPlayer();
    }
  }
});

// holding the score
/* btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check >= 20
    if (scores[activePlayer] >= 20) {
      // end game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      // switch player
      switchPlayer();
    }
  }
}); */

// New game
btnNew.addEventListener('click', init);
