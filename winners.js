/* eslint-disable import/extensions */
import { httpwinners, getWinners } from './http-requests.js';

import { insertWinners } from './insert-html.js';
import { disableButtons } from './garage.js';
import { sortNumbersAscending, sortNumbersDescending } from './utility-func.js';

let currPageWinners = 0;
function generateWinnersElements(object, cont, itemsOnPage = 10, currPage = 0) {
  const container = document.querySelector(`.${cont}`);
  document.querySelector(`.${cont}`).innerHTML = '';
  const obj = object.slice(currPage, itemsOnPage + currPage);
  obj.forEach((e, i) => {
    insertWinners(container, e, i);
  });
}
function nextPage(container, button) {
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    const object = await getWinners(httpwinners);
    const page = document.querySelector('.winners--page');
    currPageWinners += 1;
    page.textContent = currPageWinners;
    disableButtons(
      currPageWinners,
      object.length,
      '.winners__pagination__button--right',
      '.winners__pagination__button--left',
    );
    generateWinnersElements(object, container, 10, currPageWinners * 10);
    const btnLeft = document.querySelector(
      '.winners__pagination__button--left',
    );
    if (btnLeft.classList.contains('disabled')) {
      btnLeft.classList.remove('disabled');
    }
  });
}
function sortTime() {
  const bestTimeBtn = document.querySelector('.table__time');
  bestTimeBtn.addEventListener('click', (el) => {
    el.preventDefault();
    const tableOrder = document.querySelector('.table__time_order');
    if (tableOrder.textContent === '↑') {
      const cars1 = document.querySelectorAll('.winner--car');
      const cars = Array.from(cars1);
      const table = document.querySelector('.table__body');
      const sortedCars = sortNumbersDescending(cars, 4);
      const nodelist = Array.prototype.slice.call(sortedCars);
      table.innerHTML = '';
      nodelist.forEach((ele) => table.append(ele));
      tableOrder.textContent = '↓';
    } else if (tableOrder.textContent === '↓') {
      const cars1 = document.querySelectorAll('.winner--car');
      const cars = Array.from(cars1);
      const table = document.querySelector('.table__body');
      const sortedCars = sortNumbersAscending(cars, 4);
      const nodelist = Array.prototype.slice.call(sortedCars);
      table.innerHTML = '';
      nodelist.forEach((elem) => table.append(elem));
      tableOrder.textContent = '↑';
    }
  });
}
function sortWin() {
  const winnerSortBtn = document.querySelector('.table__wins');
  winnerSortBtn.addEventListener('click', (element) => {
    element.preventDefault();
    const tableOrder = document.querySelector('.table__wins_order');
    if (tableOrder.textContent === '↑') {
      const cars1 = document.querySelectorAll('.winner--car');
      const cars = Array.from(cars1);
      const table = document.querySelector('.table__body');
      const sortedCars = sortNumbersDescending(cars, 3);
      const nodelist = Array.prototype.slice.call(sortedCars);
      table.innerHTML = '';
      nodelist.forEach((node) => table.append(node));
      tableOrder.textContent = '↓';
    } else if (tableOrder.textContent === '↓') {
      const cars1 = document.querySelectorAll('.winner--car');
      const cars = Array.from(cars1);
      const table = document.querySelector('.table__body');
      const sortedCars = sortNumbersAscending(cars, 3);
      const nodelist = Array.prototype.slice.call(sortedCars);
      table.innerHTML = '';
      nodelist.forEach((nodeEl) => table.append(nodeEl));
      tableOrder.textContent = '↑';
    }
  });
}

function prevPage(container, button) {
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    const object = await getWinners(httpwinners);
    const page = document.querySelector('.winners--page');
    currPageWinners -= 1;
    page.textContent = currPageWinners;
    disableButtons(
      currPageWinners,
      object.length,
      '.winners__pagination__button--right',
      '.winners__pagination__button--left',
    );
    generateWinnersElements(object, container, 10, currPageWinners * 10);
    const btnRight = document.querySelector(
      '.winners__pagination__button--right',
    );
    if (btnRight.classList.contains('disabled')) {
      btnRight.classList.remove('disabled');
    }
  });
}
(async () => {
  const winnersCarList = document.querySelector(
    '.winners__section__three--title--span',
  );

  const winnersLink = document.querySelector('.winners--link');
  winnersLink.addEventListener('click', async (e) => {
    e.preventDefault();
    if (currPageWinners === 0) {
      const winners = await getWinners(httpwinners);
      generateWinnersElements(winners, 'table__body', 10, currPageWinners * 10);
      winnersCarList.textContent = winners.length;
    }
  });
  const winners = await getWinners(httpwinners);
  const btnNext = document.querySelector('.winners__pagination__button--right');
  const btnPrev = document.querySelector('.winners__pagination__button--left');
  winnersCarList.textContent = winners.length;
  nextPage('table__body', btnNext);
  prevPage('table__body', btnPrev);
  if (winners.length <= 10) {
    btnNext.classList.add('disabled');
  }
  sortWin();
  sortTime();
})();
