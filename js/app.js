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

// grab the deck
const deck = document.querySelector("ul.deck");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// preparing deck..., shuffle cards on the fly
deck.appendChild(generateCards(shuffle(cards)));

// TODO: write a function to generate the cards

function generateCards(cards) {
  const fragment = document.createDocumentFragment();

  // iterate over each card in the cards array
  for (const card of cards) {
    // create a pair of cards for each card in turn
    // and append it to the fragment
    for (let i = 0; i < 2; i++) {
      fragment.appendChild(createCard(card));
    }
  }

  // return the fragment of generated cards
  return fragment;
}

// TODO: write a function to generate HTML of a single card

function createCard(card) {
  // returns card HTML for each given card

  // create the listItem and set its attribute node
  let listItem = document.createElement("li"),
      attr = document.createAttribute("class");
  attr.value = "card";
  listItem.setAttributeNode(attr);

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
 *  - add the card to a *list* of "open" cards (put this functionality
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
