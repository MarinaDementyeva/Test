'use strict';

let cardsContainer = document.querySelector(`.cards__list`);

window.renderCards = () => {
  let cardsContainer = document.querySelector(`.cards__list`);
  let TemplateContent = document.querySelector(`#template`).innerHTML;
  let Template = window.Handlebars.compile(TemplateContent);
  let renderData = {
    cards: cards,
  };
  cardsContainer.innerHTML = Template(renderData);
};

let deleteLastCard = () => {
  cards.pop();
  window.renderCards();
};

let addCard = (cardType) => {
  cards[cards.length] = {
    type: cardType
  };

  window.renderCards();
};

let writeBrowserHistory = () => {
  history.pushState({snapshot: cards}, ``, ``);
};

let cardsClickHandler = (event) => {
  writeBrowserHistory();

  if (event.shiftKey && event.altKey) {
    addCard(`wide`);
  } else if (event.shiftKey) {
    addCard('narrow');
  } else {
    deleteLastCard();
  }
};

let popStateHandler = (event) => {
  let data = event.state;
  if (data && data.snapshot) {
    cards = data.snapshot;
    window.renderCards();
  }
};

window.addEventListener(`popstate`, popStateHandler);
cardsContainer.addEventListener(`click`, cardsClickHandler);

window.renderCards();
