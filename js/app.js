/*
 * Create a list that holds all of your cards
 */

let cards = [
  "fa-diamond", "fa-diamond",
  "fa-paper-plane-o", "fa-paper-plane-o",
  "fa-anchor", "fa-anchor",
  "fa-bolt", "fa-bolt",
  "fa-cube", "fa-cube",
  "fa-leaf", "fa-leaf",
  "fa-bicycle", "fa-bicycle",
  "fa-bomb", "fa-bomb"
];

// grab the deck
const deck = document.querySelector("ul.deck");
// get me the restart button
const restart = document.querySelector("div.restart");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

initGame();

// TODO: write a function to generate the cards

function generateCards(cards) {
  const fragment = document.createDocumentFragment();

  // iterate over each card in the cards array
  for (const card of cards) {
    fragment.appendChild(createCard(card));
  }

  // return the fragment of generated cards
  return fragment;
}

// TODO: write a function to generate HTML of a single card

function createCard(card) {
  // returns card HTML for each given card

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

  // return card HTML as listItem
  return listItem;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another
 *    function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality  --> CONTINUE HERE...
 *    in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this
 *      functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the
 *      card's symbol (put this functionality in another function that you call
 *      from this one)
 *    + increment the move counter and display it on the page (put this
 *      functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score
 *      (put this functionality in another function that you call from this one)
 */

// array to work with list of open cards
let openCards = [];

// TODO: write an event handler for the restart button
restart.addEventListener("click", function () {
  // clear the deck
  clearDeck();
  // reinitialize game using the same function to initialize our game
  initGame();
});

// TODO: write an event handler for the deck
deck.addEventListener("click", function (event) {
  let target = event.target;
  // console.log(openCards);
  displayCard(target);
  addCard(target, openCards);
  if (openCards.length == 2) {
    // check if the cards match
    if (matchCards(openCards)) {
      // match found, lock the cards in open position
      setTimeout(function () {
        lockCards(openCards);
        emptyList(openCards);
      }, 100);
    } else {
      // match not found, hide cards, empty list of open cards
      setTimeout(function () {
        hideCards(openCards);
        emptyList(openCards);
      }, 100);
    }
  }
});

// TODO: write a function to initialize Game
function initGame() {
  // preparing deck..., shuffle cards on the fly
  deck.appendChild(generateCards(shuffle(cards)));
}

// TODO: write a function to clear the deck
function clearDeck() {
  while (deck.firstElementChild != null) {
    deck.firstElementChild.remove();
  }
}

// TODO: write a function to display card

function displayCard(card) {
  if (card && card.nodeName == "LI") {
    card.classList.add("open", "show");
  }
}

// TODO: write a function to add open cards to the list of openCards
function addCard(card, list) {
  list.push(card);
}

// TODO: write a function to match cards
function matchCards(list) {
  let cardTypes = [];
  for (const card of list) {
    cardTypes.push(card.getAttribute("data-card-type"));
  }

  return (cardTypes[0] === cardTypes[1]);
}

// TODO: write a function to lock the cards in open position
function lockCards(list) {
  for (const card of list) {
    card.classList.remove("open", "show");
    card.classList.add("match");
  }
}

// TODO: write a function to hide cards
function hideCards(list) {
  for (const card of list) {
    card.classList.remove("open", "show");
  }
}

// TODO: write a function to empty the list of open cards
function emptyList(list) {
  while (list.length > 0) {
    list.pop();
  }
}
