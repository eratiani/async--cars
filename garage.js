/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import { insertCar } from './insert-html.js';
import {
  // eslint-disable-next-line max-len
  http,
  post,
  getDelete,
  startStopEng,
  httpDrive,
  engineStall,
  createWinner,
  updateWinner,
  getWinner,
  deleteWinner,
} from './http-requests.js';

import { randomColor, randomName } from './utility-func.js';

const garage = document.querySelector('.section__three--garage');
const create = document.querySelector('.create');
let currentPage = 0;
function anounceWinner(winner, time) {
  // eslint-disable-next-line no-alert
  alert(`the winner is ${winner.name} with time of ${time.toFixed(1)}`);
}
function setLocalWinner(car, time) {
  let i = 0;
  car.addEventListener('animationend', (e) => {
    if (i === 0) {
      i += 1;
      const finishers = localStorage.getItem('finishers');
      const finishersObj = JSON.parse(finishers);
      if (finishersObj === null) {
        localStorage.setItem(
          'finishers',
          JSON.stringify({ id: e.target.id, time }),
        );
      } else if (time < finishersObj.time) {
        localStorage.setItem(
          'finishers',
          JSON.stringify({ id: e.target.id, time }),
        );
      } else if (time >= finishersObj.time) {
        localStorage.setItem(
          'finishers',
          JSON.stringify({ id: finishersObj.id, time: finishersObj.time }),
        );
      }
    }
  });
}
function enable(element) {
  element.forEach(
    (e) => e.classList.contains('disabled') && e.classList.remove('disabled'),
  );
}
function disable(element) {
  element.forEach(
    (e) => e.classList.contains('disabled') || e.classList.add('disabled'),
  );
}
async function getWinnerLocal() {
  const item = localStorage.getItem('finishers');
  const winnerLocalStorage = JSON.parse(item);
  const car = await getDelete(
    http,
    'GET',
    `/${parseInt(winnerLocalStorage.id, 10)}`,
  );
  const winner = await getWinner(car.id);
  const buttons = document.querySelectorAll('.reset');
  enable(buttons);
  if (winner.time) {
    if (winnerLocalStorage.time < winner.time) {
      const updateWinnerObj = {
        time: winnerLocalStorage.time,
        wins: parseInt(winner.wins, 10) + 1,
      };
      await updateWinner(updateWinnerObj, winnerLocalStorage.id);
      anounceWinner(car, winnerLocalStorage.time);
    } else {
      const updateWinnerObj = {
        time: winner.time,
        wins: parseInt(winner.wins, 10) + 1,
      };
      await updateWinner(updateWinnerObj, winner.id);
      anounceWinner(car, winner.time);
    }
  } else {
    const winnerObj = { id: car.id, time: winnerLocalStorage.time, wins: 1 };
    await createWinner(winnerObj);
    anounceWinner(car, winnerLocalStorage.time);
  }
}
export function generateGarageElements(
  object,
  cont,
  itemsOnPage = 7,
  curPage = 0,
) {
  const container = document.querySelector(`.${cont}`);
  document.querySelector('.garage__pagination').innerHTML = '';
  const obj = object.slice(curPage, itemsOnPage + curPage);
  obj.forEach((e) => {
    insertCar(container, e);
  });
}
async function animate(car, velocity, distance, id) {
  const time = distance / velocity / 1000;
  const myCar = car;
  velocity !== 0
    && (myCar.style.animation = `drive ${time}s linear 0.5s 1 forwards`);
  (await engineStall(httpDrive, 'PATCH', 'drive', id))
    && velocity === 0
    && (myCar.style.animation = 'none');
  if (car.style.animationPlayState === 'running') {
    setLocalWinner(car, time);
  }
}
async function animateStop(car, velocity, distance) {
  const newCar = car;
  velocity !== 0
    && (newCar.style.animation = `drive ${
      distance / velocity / 1000
    }s linear 0.5s 1 forwards`);
  velocity === 0 && (newCar.style.animation = 'none');
}
async function start(car, id, stopDrive) {
  const engine = await startStopEng(httpDrive, 'PATCH', stopDrive, id);
  animate(car, engine.velocity, engine.distance, id);
}
async function stop(car, id, stopDrive) {
  const engine = await startStopEng(httpDrive, 'PATCH', stopDrive, id);
  animateStop(car, engine.velocity, engine.distance, id);
}

function updateCar(method, id, obj) {
  method(http, 'put', id, obj);
}
function removeCar(method, id) {
  return method(http, 'DELETE', id);
}
export function disableButtons(curPage, length, btnNex, btnPre) {
  const btnNext = document.querySelector(btnNex);
  const btnPrev = document.querySelector(btnPre);
  const totalPages = Math.ceil(length / 7);

  if (curPage !== 0 && curPage !== totalPages - 1) {
    btnPrev.classList.contains('disabled')
      && btnPrev.classList.remove('disabled');
    btnNext.classList.contains('disabled')
      && btnNext.classList.remove('disabled');
  }
  if (curPage <= 0) {
    btnPrev.classList.contains('disabled') || btnPrev.classList.add('disabled');
    totalPages > 1
      && btnNext.classList.contains('disabled')
      && btnNext.classList.remove('disabled');
  }
  if (curPage >= totalPages - 1) {
    btnNext.classList.contains('disabled') || btnNext.classList.add('disabled');
  }
}
function selectCar(target1, target2, currEl) {
  const tar1 = target1;
  const tar2 = target2;
  tar1.value = currEl.dataset.name;
  tar2.value = currEl.dataset.color;
  localStorage.setItem('selected', `${currEl.dataset.id}`);
}
function updateRemoveCar(container) {
  const carName = document.querySelector('.section__one--text2');
  const carColor = document.querySelector('.section__one__i--color2');

  container.addEventListener('click', async (e) => {
    e.preventDefault();
    if (e.target.dataset.type === 'select') {
      selectCar(carName, carColor, e.target);
    } else if (e.target.dataset.type === 'remove') {
      removeCar(getDelete, `/${e.target.dataset.id}`);
      deleteWinner(e.target.dataset.id);
      const carsGar = await getDelete(http, 'get');
      const garageCarList = document.querySelector(
        '.section__three--title--span',
      );
      disableButtons(
        currentPage,
        carsGar.length,
        '.garage__pagination__button--right',
        '.garage__pagination__button--left',
      );
      generateGarageElements(carsGar, 'garage__pagination', 7, currentPage * 7);
      garageCarList.textContent = parseFloat(garageCarList.textContent) - 1;
      const select = document.querySelector('.section__one--text2');
      const currItem = JSON.parse(localStorage.getItem('selected'));
      currItem === parseInt(e.target.dataset.id, 10)
        && localStorage.removeItem('selected');
      select.value = '';
      select.blur;
    }
  });
}
function nextPage(container, button) {
  button.addEventListener('click', async (e) => {
    const object = await getDelete(http, 'get');
    e.preventDefault();
    const page = document.querySelector('.page');
    currentPage += 1;
    page.textContent = currentPage;
    disableButtons(
      currentPage,
      object.length,
      '.garage__pagination__button--right',
      '.garage__pagination__button--left',
    );
    generateGarageElements(object, container, 7, currentPage * 7);
    const btnLeft = document.querySelector('.garage__pagination__button--left');
    btnLeft.classList.contains('disabled')
      && btnLeft.classList.remove('disabled');
  });
}
function prevPage(container, button) {
  button.addEventListener('click', async (e) => {
    const object = await getDelete(http, 'get');
    e.preventDefault();
    const page = document.querySelector('.page');
    currentPage -= 1;
    page.textContent = currentPage;
    disableButtons(
      currentPage,
      object.length,
      '.garage__pagination__button--right',
      '.garage__pagination__button--left',
    );
    generateGarageElements(object, container, 7, currentPage * 7);
    const btnRight = document.querySelector(
      '.garage__pagination__button--right',
    );
    btnRight.classList.contains('disabled')
      && btnRight.classList.remove('disabled');
  });
}

async function generateCars(httpReq, length = 100) {
  const carsGar = await getDelete(http, 'get');
  /* eslint-disable */
  // eslint-disable-line no-parse
  // eslint-disable-next-line no-parse
  let idCar = parseInt(carsGar[carsGar.length - 1].id); // eslint-disable-next-line no-parse
  /* eslint-enable */
  // eslint-disable-next-line no-unused-expressions
  idCar || (idCar = 0);
  for (let index = 0; index < length; index += 1) {
    const randomCarN = `${randomName()}`;
    const randomCarCol = `${randomColor()}`;
    const car = {
      name: randomCarN,
      color: randomCarCol,
      id: (idCar += 1),
    };

    httpReq(http, 'post', '', car);
  }
  const page = document.querySelector('.section__three--title--span');
  const pages = parseFloat(page.textContent) + 100;
  page.textContent = pages;
  const garageCars = await getDelete(http, 'get');
  disableButtons(
    currentPage,
    garageCars.length,
    '.garage__pagination__button--right',
    '.garage__pagination__button--left',
  );
  generateGarageElements(garageCars, 'garage__pagination', 7, currentPage * 7);
}
function createCar(garageCarList) {
  const garCarL = garageCarList;
  create.addEventListener('click', async (e) => {
    e.preventDefault();
    const carName = document.querySelector('.section__one__i--text1');
    if (carName.value.length < 3) {
      // eslint-disable-next-line no-alert
      alert('car name should be more than three letters');
    } else {
      const color = document.querySelector('.section__one__i--color1');
      const car = { name: carName.value, color: color.value };
      await post(http, 'post', '', car);
      const obj = await getDelete(http, 'get');
      disableButtons(
        currentPage,
        obj.length,
        '.garage__pagination__button--right',
        '.garage__pagination__button--left',
      );
      generateGarageElements(obj, 'garage__pagination', 7, currentPage * 7);
      carName.value = '';
      // eslint-disable-next-line no-unused-expressions
      carName.blur;

      garCarL.textContent = parseFloat(garageCarList.textContent) + 1;
    }
  });
}
function race() {
  const raceButton = document.querySelector('.race');
  raceButton.addEventListener('click', (e) => {
    e.preventDefault();

    const card = document.querySelectorAll('.car__img--container');
    card.forEach((el) => {
      const startBtn = el.parentElement.children[1].children[0];
      // eslint-disable-next-line no-unused-expressions
      startBtn.classList.contains('disabled')
        || startBtn.classList.add('disabled');
      const car = el.children[0];
      const id = parseInt(car.id, 10);
      start(car, id, 'started');
    });
    setTimeout(() => {
      getWinnerLocal();
    }, 15000);
    const buttons = document.querySelectorAll('.btn--disable');
    disable(buttons);
  });
}
function reset() {
  const resetButton = document.querySelector('.reset');
  resetButton.addEventListener('click', (elem) => {
    elem.preventDefault();
    const buttons = document.querySelectorAll('.btn--disable');
    enable(buttons);
    // eslint-disable-next-line no-unused-expressions
    localStorage.getItem('finishers') && localStorage.removeItem('finishers');

    const card = document.querySelectorAll('.car__img--container');
    card.forEach((e) => {
      const startBtn = e.parentElement.children[1].children[0];
      // eslint-disable-next-line no-unused-expressions
      startBtn.classList.contains('disabled')
        && startBtn.classList.remove('disabled');
      const car = e.children[0];
      const id = parseInt(car.id, 10);
      stop(car, id, 'stopped');
    });
  });
}
function garPagination() {
  const garagePaginationCont = document.querySelector('.garage__pagination');
  garagePaginationCont.addEventListener('click', (e) => {
    e.preventDefault();
    const { id } = e.target.parentNode.parentNode.dataset;
    const car = document.getElementById(`${id}`);
    if (e.target.classList.contains('car--start')) {
      const stopB = e.target.parentNode.children[1];
      const raceB = document.querySelector('.race');
      // eslint-disable-next-line no-unused-expressions
      raceB.classList.contains('disabled') || raceB.classList.add('disabled');
      // eslint-disable-next-line no-unused-expressions
      stopB.classList.contains('disabled')
        && stopB.classList.remove('disabled');
      e.target.classList.add('disabled');
      start(car, id, 'started');
    }
    if (e.target.classList.contains('car--stop')) {
      e.target.classList.add('disabled');
      const startB = e.target.parentNode.children[0];
      const raceButton = document.querySelector('.race');
      // eslint-disable-next-line no-unused-expressions
      raceButton.classList.contains('disabled')
        && raceButton.classList.remove('disabled');
      // eslint-disable-next-line no-unused-expressions
      startB.classList.contains('disabled')
        && startB.classList.remove('disabled');
      stop(car, id, 'stopped');
    }
  });
}
function update() {
  const updateButton = document.querySelector('.update');
  updateButton.addEventListener('click', (e) => {
    e.preventDefault();
    const carName = document.querySelector('.section__one--text2');
    if (carName.value.length < 3) {
      // eslint-disable-next-line no-alert
      alert('car name should be more than 3 letters');
    } else if (localStorage.getItem('selected')) {
      const currItem = JSON.parse(localStorage.getItem('selected'));
      const carNameGet = document.querySelector('.section__one--text2');
      const colorGet = document.querySelector('.section__one__i--color2');
      const obj = { name: carNameGet.value, color: colorGet.value };

      updateCar(post, `/${currItem}`, obj);
      document.getElementById(`${currItem}`).style.fill = colorGet.value;
      document.getElementById(
        `${currItem}`,
      ).parentNode.parentNode.children[1].children[2].textContent = `${carNameGet.value}`;
      // eslint-disable-next-line no-unused-expressions
      carNameGet.blur;
      carNameGet.value = '';
    } else {
      // eslint-disable-next-line no-alert
      alert('select a car');
    }
  });
}
(async () => {
  const garageCars = await getDelete(http, 'get');
  const garageCarList = document.querySelector('.section__three--title--span');
  const garageC = document.querySelector('.garage__pagination');
  const gCars = document.querySelector('.g--cars');
  garageC.addEventListener('click', (e) => {
    e.preventDefault();
  });

  gCars.addEventListener('click', (e) => {
    e.preventDefault();
    generateCars(post);
  });
  generateGarageElements(garageCars, 'garage__pagination', 7);
  const btnNext = document.querySelector('.garage__pagination__button--right');
  const btnPrev = document.querySelector('.garage__pagination__button--left');
  garageCarList.textContent = garageCars.length;
  nextPage('garage__pagination', btnNext);
  prevPage('garage__pagination', btnPrev);
  // eslint-disable-next-line no-unused-expressions
  garageCars.length < 8 && btnNext.classList.add('disabled');
  createCar(garageCarList);
  garPagination();
  race();
  reset();
})();
update();
updateRemoveCar(garage);
