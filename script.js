/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import './insert-html.js';
import './winners.js';
import './garage.js';

const garage = document.querySelector('.garage--link');
const winners = document.querySelector('.winners--link');
const headerBtns = document.querySelector('.header__btn--container');
function garWinners() {
  window.event.preventDefault();
  const e = window.event;
  const sectionOne = document.querySelector('.section__one');
  const raceControls = document.querySelector('.race--controlls');
  const garageBody = document.querySelector('.section__three--garage');
  const winnersBody = document.querySelector('.winners--container');
  if (e.target === garage) {
    raceControls.classList.contains('display')
      && raceControls.classList.remove('display');
    garageBody.classList.contains('display')
      && garageBody.classList.remove('display');
    winnersBody.classList.contains('display')
      || winnersBody.classList.add('display');
    sectionOne.classList.contains('display')
      && sectionOne.classList.remove('display');
  } else if (e.target === winners) {
    winnersBody.classList.contains('display')
      && winnersBody.classList.remove('display');
    sectionOne.classList.contains('display')
      || sectionOne.classList.add('display');
    garageBody.classList.contains('display')
      || garageBody.classList.add('display');
    raceControls.classList.contains('display')
      || raceControls.classList.add('display');
  }
}
headerBtns.addEventListener('click', garWinners);
