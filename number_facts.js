$(document).ready(() => {
  let baseUrl = 'http://numbersapi.com';
  let favoriteNumber = 42;
  // Part 1: Number Facts
  async function fetchNumberFact() {
    let response = await $.getJSON(`${baseUrl}/${favoriteNumber}?json`);
    console.log(response);
  }

  const favNums = [7, 13, 21];
  async function fetchMultipleNumbers() {
    let response = await $.getJSON(`${baseUrl}/${favNums}?json`);
    console.log(response);
  }

  async function fetchFourFacts() {
    let response = await Promise.all(Array.from({ length: 4 }), () =>
      $.getJSON(`${baseUrl}/${favoriteNumber}?json`)
    );
    response.forEach((data) => {
      $('body').append(`<p>${data.text}</p>`);
    });
  }
});
