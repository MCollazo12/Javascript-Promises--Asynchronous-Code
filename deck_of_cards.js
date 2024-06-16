// Part 2: Deck of Cards

$(document).ready(() => {
  let baseURL = 'https://deckofcardsapi.com/api/deck';
  async function fetchSingleCard() {
    let data = await $.getJSON(`${baseURL}/new/draw/`);
    let { suit, value } = data.cards[0];

    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  }

  async function fetchMultipleCards() {
    let firstCardResponse = await $.getJSON(`${baseURL}/new/draw/?count=1`);
    let deckId = firstCardResponse.deck_id;

    let secondCardResponse = await $.getJSON(
      `${baseURL}/${deckId}/draw/?count=1`
    );

    [firstCardResponse, secondCardResponse].forEach((data) => {
      let { suit, value } = data.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
  }

  async function setup() {
    let $btn = $('button');
    let $cardArea = $('#cardArea');

    let response = await $.getJSON(`${baseURL}/new/shuffle/`);

    $btn.show().on('click', async () => {
      let data = await $.getJSON(`${baseURL}/${response.deck_id}/draw/`);
      let cardSrc = data.cards[0].image;

      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;

      $cardArea.append($('<img>').attr({
        'src': cardSrc,
        'style': `transform: translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
        }));

      if (data.remaining === 0) {
        $('.button').remove();
      }
    });
  }

  setup();
});
