/*
 * Create a list that holds all of your cards
 */

let cards = [
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bolt",
  "fa-cube",
  "fa-leaf",
  "fa-bicycle",
  "fa-bomb"
];

// double the cards (using spread syntax)
cards = [...cards, ...cards];

// Target all the DOM elements to work with
let deck = document.querySelector("ul.deck"),
    restart = document.querySelector("div.restart"),
    moves = document.querySelector("span.moves"),
    stars = document.querySelector(".stars"),
    progModal = document.getElementById("progress-modal");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

initGame();

/*
 * @description returns a fragment for our deck
 * with all the cards populated
 * @constructor
 * @param {Array} cards - The card types
 */

function generateCards(cards) {
  const fragment = document.createDocumentFragment();

  // iterate over each card in the cards array
  for (const card of cards) {
    fragment.appendChild(createCard(card));
  }

  // return the fragment of generated cards
  return fragment;
}

/*
 * @description returns an li element for a given card,
 * it is a helper function to generateCards
 * @constructor
 * @param {string} card - The card type
 */

function createCard(card) {
  // create the listItem and set its attribute nodes
  let listItem = document.createElement("li"),
    attr = document.createAttribute("class"),
    type = document.createAttribute("data-card-type");
  attr.value = "card";
  type.value = `${card}`;
  listItem.setAttributeNode(attr);
  listItem.setAttributeNode(type);

  // create the icon element and set its attribute node
  let icon = document.createElement("i"),
    att = document.createAttribute("class");
  att.value = `fa ${card}`;
  icon.setAttributeNode(att);

  // append the icon element to its respective listItem
  listItem.appendChild(icon);

  // return card HTML
  return listItem;
}

// Shuffle function from http://stackoverflow.com/a/2450976
/*
 * @description returns the given array shuffled/jumbled
 * @constructor
 * @param {Array} array - The card types
 * @returns {Array} The suffled/jumbled array
 */
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// array to work with list of open cards, move counter
let openCards = [],
  moveCounter = 0;

// initialize timer object
let timer = new Timer();

// Restart the game when the restart icon is clicked
restart.addEventListener("click", () => {
  restartGame();
});

// Event delegation for our Memory Game
deck.addEventListener("click", (event) => {
  // detect only cards that have been clicked
  let target = event.target;
  if (target.nodeName === "LI" || target.nodeName === "I") {
    target = target;
  } else {
    return;
  }
  // display the card that has been clicked on
  displayCard(target);
  // add target to the list of openCards
  addCard(target, openCards);
  // handle gamePlay for target and openCards
  gamePlay(target, openCards);
});

/*
 * @description Handles the game play asynchronously
 * on our Deck
 * @constructor
 * @param {event.target} target - The card type that has been clicked on
 * @param {Array} openCards - The list of cards that are currently open
 */
function gamePlay(target, openCards) {
  if (openCards.length == 2) {
    // check if the cards match
    if (matchCards(openCards)) {
      // match found, lock the cards in open position, update moves
      setTimeout(() => {
        lockCards(openCards);
        emptyList(openCards);
      }, 300);
    } else {
      // unmatch openCards
      unmatch(openCards);
      // match not found, hide cards, empty list of open cards, update moves
      setTimeout(() => {
        hideCards(openCards);
        emptyList(openCards);
      }, 300);
    }
    updateMoves(target);
  }
  // Check if the user has won the game and display
  // the congrats modal, at every click on a card
  setTimeout(isWinner, 300);
}

/*
 * @description Reloads the current window location
 * to restart the game and reset game stats
 */
function restartGame() {
  location.reload();
}

/*
 * @description Initializes the game,
 * Shows an indefinite progress bar modal,
 * Prepares the deck of cards
 */
function initGame() {
  // display progress modal
  setTimeout(() => displayModal(progModal, "block"), 0);
  // close progress modal
  setTimeout(() => displayModal(progModal, "none"), 5500);
  // prepare deck before time
  setTimeout(() => {
    // preparing deck..., shuffle cards on the fly
    deck.appendChild(generateCards(shuffle(cards)));
  }, 5000);
}

/*
 * @description Displays the card when it is clicked on
 * @constructor
 * @param {event.target} card - The card type that was clicked on
 */
function displayCard(card) {
  (card) && card.classList.add("open", "show", "disable");
}

/*
 * @description Adds open cards on the deck to the
 * given list of openCards
 * @constructor
 * @param {event.target} card - The card type that was clicked on
 * @param {Array} list - The list of cards that are currently open
 */
function addCard(card, list) {
  list.push(card);
}

/*
 * @description Matches the given list of cards that
 * are currently open
 * @constructor
 * @param {Array} list - The list of cards that are currently open
 * @returns {Boolean} whether card A matches card B
 */
function matchCards(list) {
  let cardTypes = [];
  for (const card of list) {
    cardTypes.push(card.getAttribute("data-card-type"));
  }

  return cardTypes[0] === cardTypes[1];
}

/*
 * @description Locks the cards in open position
 * once they have been matched
 * @constructor
 * @param {Array} list - The list of cards that are currently open
 */
function lockCards(list) {
  for (const card of list) {
    card.classList.remove("open", "show");
    card.classList.add("match");
  }
}

/*
 * @description Hides the cards if they don't match
 * @constructor
 * @param {Array} list - The list of cards that are currently open
 */
function hideCards(list) {
  for (const card of list) {
    card.classList.remove("open", "show", "disable");
  }
}

/*
 * @description Empties the list of cards that are currently open
 * @constructor
 * @param {Array} list - The list of cards that are currently open
 */
function emptyList(list) {
  while (list.length > 0) {
    list.pop();
  }
}

/*
 * @description Plays the vibrate animation frame when the cards
 * that are currently open don't match
 * @constructor
 * @param {Array} list - The list of cards that are currently open
 */
function unmatch(list) {
  for (const card of list) {
    card.classList.add("unmatch");
  }
  setTimeout(function() {
    for (const card of list) {
      card.classList.remove("unmatch");
    }
  }, 300);
}

/*
 * @description Updates the moves when a pair of cards have been
 * clicked on, Starts the timer game when a player makes the first move,
 * Updates the star rating by invoking updateStars
 * @constructor
 * @param {event.target} card - The card type that was clicked on
 */
function updateMoves(target) {
  if (target) {
    moveCounter++;
    moves.textContent = "";
    moves.textContent = moveCounter;
  }
  (moveCounter === 1) && timer.start();
  updateStars();
}

/*
 * @description Updates the star rating based on the value of the
 * moveCounter, helper function to updateMoves
 */
function updateStars() {
  const starOne = document.getElementById("star-two");
  const starTwo = document.getElementById("star-three");
  if (moveCounter === 4) {
    starTwo.classList.remove("fa-star");
    starTwo.classList.add("fa-star-half-full");
  } else if (moveCounter === 8) {
    starTwo.classList.remove("fa-star-half-full");
    starTwo.classList.add("fa-star-o");
  } else if (moveCounter === 12) {
    starOne.classList.remove("fa-star");
    starOne.classList.add("fa-star-half-full");
  } else if (moveCounter === 16) {
    starOne.classList.remove("fa-star-half-full");
    starOne.classList.add("fa-star-o");
  }
}

/*
 * @description Checks for a win win situation,
 * Retrieves the game stats by invoking gameStats,
 * Displays the congrats modal with game stats after
 * a brief delay
 */
function isWinner() {
  let matchedCards = document.querySelectorAll(".match");
  if (matchedCards.length === 16) {
    timer.stop();
    gameStats();
    setTimeout(() => displayModal(congratsModal, "block"), 1200);
  }
}

// TODO: Implement the congrats modal dialgoue box
// Target all the congrats modal components to work with
// Get the congrats modal
let congratsModal = document.getElementById("congrats-dialogue");
// Get the <span> element that closes the congrats modal
let closeButton = document.querySelector(".close-button");
// Get the congrats modal close button to close the dialogue
let modalCloseBtn = document.getElementById("modal-close-btn");
// Get the congrats modal play again button to restart the game
let modalPlayAgain = document.getElementById("modal-play-again");

// Handle events for each component of the congrats modal
// When the user clicks on <span> (x), close the modal
closeButton.addEventListener("click", () => {
  displayModal(congratsModal, "none");
});

// When the user clicks on dialogue Close button, close the modal
modalCloseBtn.addEventListener("click", () => {
  displayModal(congratsModal, "none");
});

// When the user clicks on Play Again! button, close the congrats
// modal and restart the game
modalPlayAgain.addEventListener("click", () => {
  restartGame();
  displayModal(congratsModal, "none");
});

// When the user clicks anywhere outside of the congrats modal, close it
window.addEventListener("click", (event) => {
  (event.target === congratsModal) && displayModal(congratsModal, "none");
});

/*
 * @description A helper function to display/hide a given modal,
 * based on the given type of display
 * @constructor
 * @param {HTML Element} modal - The modal window HTML Element to
 * display the appropriate modal (progress bar modal || congrats modal)
 * in this case
 * @param {String} display - The css property to set the display style
 * of a modal
 */
function displayModal(modal, display) {
  modal.style.display = display;
}

/*
 * @description Summarizes the Game Stats, gets the moves, time,
 * stars (by invoking getStars) and injects the game stats on to
 * the appropriate placeholders in the congrats modal
 */
function gameStats() {
  let timer = document.getElementById("display-timer").textContent;
  let movesPlaceholder = document.getElementById("moves-placeholder");
  let timePlaceholder = document.getElementById("time-placeholder");
  getStars();
  movesPlaceholder.textContent = moves.textContent;
  timePlaceholder.textContent = timer;
}

/*
 * @description Gets the star rating and injects it on the appropriate
 * placeholder in the congrats modal, leaves the stars intact in the
 * score panel by invoking keepDocumentStars
 */
function getStars() {
  let starsPlaceholder = document.getElementById("stars-placeholder");
  let stars = document.querySelectorAll(".stars li");
  let fragment = document.createDocumentFragment();
  let uList = document.createElement("ul");
  let fragmentCopy;
  for (const star of stars) {
    star.style.display = "inline";
    fragment.appendChild(star);
  }
  // Clone fragment to keep display of stars intact
  // on the Memory Game UI window.
  fragmentClone = fragment.cloneNode(true);
  // preformat unordered list for modal window
  uList.style.cssText = "list-style-type:none;margin:0;padding:0;";
  // Leave the Document Window display of stars intact
  keepDocumentStars(fragmentClone);
  // clone it to the modal window
  uList.appendChild(fragment);
  // make sure the stars placeholder is empty in the congrats dialgoue
  starsPlaceholder.innerHTML = "";
  // paste the stars in congrats modal
  starsPlaceholder.appendChild(uList);
}

/*
 * @description: keeps the stars in our Memory Game UI window .score panel
 * intact which get erased as a side effect of using querySelectorAll
 * in my getStars function, helper function to getStars
 * @constructor
 * @param {node} fragmentClone - The copy of fragment containing the
 * star rating from getStars
 */
function keepDocumentStars(fragmentClone) {
  // create new unordered list element
  let uList = document.createElement("ul");
  // target the Memory Game UI window .score panel stars
  let documentStars = document.querySelector(".stars");
  // populate unordered list using fragmentClone
  uList.appendChild(fragmentClone);
  // Re-display the stars
  documentStars.innerHTML = uList.innerHTML;
}
