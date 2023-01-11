/* eslint-disable import/extensions */
import { getDelete, http } from './http-requests.js';

const body = document.querySelector('body');
body.insertAdjacentHTML(
  'beforeend',
  `
  <header class="header">
      <div class="header__btn--container">
        <div class="garage">
          <a href="" class="garage--link btn--disable">to garage</a>
        </div>
        <div class="winners">
          <a href="" class="winners--link btn--disable">to winners</a>
        </div>
      </div>
      <div class="logo--container">
        <h1 class="logo--main">
          A<span class="blink_me">sy</span>nc R<span class="blink_me">ac</span>e
        </h1>
      </div>
    </header>
    <main class="main">
      <section class="section__one">
        <div class="section__one--container">
          <div class="section__one--row section__one--row1">
            <input
              minlength="4"
              type="text"
              name=""
              id=""
              class="section__one--text section__one__i--text1"
            />
            <input
              minlength="4"
              type="color"
              value="#e66465"
              name=""
              id=""
              class="section__one__i--color section__one__i--color1"
            />
            <a href="" class="section__one--link create btn--disable">create</a>
          </div>
          <div class="section__one--row section__one--row2">
            <input
              type="text"
              name=""
              id=""
              class="section__one--text section__one--text2"
            />
            <input
              type="color"
              value="#f6b73c"
              name=""
              id=""
              class="section__one__i--color section__one__i--color2"
            />
            <a href="" class="section__one--link update btn--disable">update</a>
          </div>
        </div>
      </section>
      <section class="section__two race--controlls display">
        <a class="link--basic race btn--disable" href="">Race</a>
        <a class="link--basic reset btn--disable disabled" href="">Reset</a>
        <a class="link--basic g--cars btn--disable" href="">Generate Cars</a>
      </section>
      <section class="section__three section__three--garage display">
        <h2 class="section__three--title">
          GARAGE ( <span class="section__three--title--span">0</span> )
        </h2>
        <div class="garage__pagination"></div>
        <div class="garage__pagination--buttons">
          <a
            href=""
            class="disabled pagination--button link--basic garage__pagination__button--left pagination--prev btn--disable"
            >prev</a
          >
          <a href="" class="link--basic page">0</a>
          <a
            href=""
            class="pagination--button link--basic garage__pagination__button--right pagination--next btn--disable"
            >next</a
          >
        </div>
      </section>
      <section class="section__four winners--container display">
        <h2 class="section__four--title">
          Winners (
          <span class="winners__section__three--title--span">0</span> )
        </h2>
        <div class="winners__pagination">
          <table class="winners--table">
            <tr>
              <th class="table__number">№</th>
              <th class="table__car">Car</th>
              <th class="table__name">Name</th>
              <th class="table__wins sort" data-sort="wins">
                <div class="table__wins">
                  <span>Wins</span>
                  <span class="table__wins_order">↓</span>
                </div>
              </th>
              <th class="table__time sort" data-sort="time">
                <div class="table__time">
                  <span>Best time (sec)</span>
                  <span class="table__time_order">↓</span>
                </div>
              </th>
            </tr>
            <tbody class="table__body">
              <!-- <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr> -->
            </tbody>
          </table>
        </div>
        <div class="winners__pagination--buttons">
          <a
            href=""
            class="disabled pagination--button link--basic winners__pagination__button--left pagination--prev"
            >prev</a
          >
          <a href="" class="link--basic winners--page">0</a>
          <a
            href=""
            class="pagination--button link--basic winners__pagination__button--right pagination--next"
            >next</a
          >
        </div>
      </section>
    </main>

  `,
);
function createSvg(color, id, width = 150) {
  return `<?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Transformed by: SVG Repo Mixer Tools -->
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg id="${id}" fill="${color}" height="${width}px" width="${width}px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
         viewBox="0 0 511 511" xml:space="preserve">
    <g>
        <path d="M119.5,388c-4.142,0-7.5,3.358-7.5,7.5c0,9.098-7.402,16.5-16.5,16.5S79,404.598,79,395.5S86.402,379,95.5,379
            c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5C78.131,364,64,378.131,64,395.5S78.131,427,95.5,427s31.5-14.131,31.5-31.5
            C127,391.358,123.642,388,119.5,388z"/>
        <path d="M439.5,388c-4.142,0-7.5,3.358-7.5,7.5c0,9.098-7.402,16.5-16.5,16.5s-16.5-7.402-16.5-16.5s7.402-16.5,16.5-16.5
            c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5c-17.369,0-31.5,14.131-31.5,31.5s14.131,31.5,31.5,31.5s31.5-14.131,31.5-31.5
            C447,391.358,443.642,388,439.5,388z"/>
        <path d="M511,259.5c0-0.323-0.027-0.638-0.067-0.95c-0.01-0.076-0.023-0.151-0.035-0.227c-0.042-0.268-0.098-0.53-0.167-0.787
            c-0.013-0.048-0.023-0.097-0.037-0.145c-0.091-0.311-0.201-0.614-0.33-0.907c-0.016-0.036-0.034-0.07-0.051-0.105
            c-0.119-0.26-0.253-0.51-0.4-0.753c-0.02-0.032-0.033-0.068-0.053-0.1l-65.9-105.441C433.751,133.751,416.157,124,396.896,124H247
            V91.5c0-17.369-14.131-31.5-31.5-31.5H183v-0.5c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5V60h-49v-0.5
            c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5V60H71.5C54.131,60,40,74.131,40,91.5V124h-8.5C14.131,124,0,138.131,0,155.5v208
            c0,19.347,13.985,35.478,32.375,38.844C35.799,434.15,62.798,459,95.5,459c32.475,0,59.318-24.51,63.042-56h193.916
            c3.724,31.49,30.567,56,63.042,56s59.318-24.51,63.042-56h8.958c12.958,0,23.5-10.542,23.5-23.5V259.5L511,259.5
            C511,259.5,511,259.5,511,259.5z M496,316h-8.5c-4.687,0-8.5-3.813-8.5-8.5s3.813-8.5,8.5-8.5h8.5V316z M489.968,252H351v-89h80.5
            c0.9,0,1.758-0.167,2.558-0.457L489.968,252z M199,252v-89h137v89H199z M79.5,252c-4.687,0-8.5-3.813-8.5-8.5v-72
            c0-4.687,3.813-8.5,8.5-8.5H184v89H79.5z M215.5,75c9.098,0,16.5,7.402,16.5,16.5V124h-49V75H215.5z M168,75v49h-49V75H168z
             M55,91.5C55,82.402,62.402,75,71.5,75H104v49H55V91.5z M95.5,444C68.757,444,47,422.243,47,395.5S68.757,347,95.5,347
            s48.5,21.757,48.5,48.5S122.243,444,95.5,444z M415.5,444c-26.743,0-48.5-21.757-48.5-48.5s21.757-48.5,48.5-48.5
            s48.5,21.757,48.5,48.5S442.243,444,415.5,444z M487.5,388h-8.958c-3.724-31.49-30.567-56-63.042-56s-59.318,24.51-63.042,56
            H158.542c-3.724-31.49-30.567-56-63.042-56c-32.131,0-58.746,23.993-62.915,55C22.434,384.008,15,374.608,15,363.5V299h376.497
            c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5H15V155.5c0-9.098,7.402-16.5,16.5-16.5h365.396c9.473,0,18.386,3.243,25.476,9H79.5
            C66.542,148,56,158.542,56,171.5v72c0,12.958,10.542,23.5,23.5,23.5H496v17h-8.5c-12.958,0-23.5,10.542-23.5,23.5
            s10.542,23.5,23.5,23.5h8.5v48.5C496,384.187,492.187,388,487.5,388z"/>
        <path d="M327.5,356h-144c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h144c4.142,0,7.5-3.358,7.5-7.5S331.642,356,327.5,356z"/>
        <path d="M439.503,284h-16c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h16c4.142,0,7.5-3.358,7.5-7.5S443.646,284,439.503,284z"/>
    </g>
    </svg>`;
}
function createSvgWin(color, id, width = 150) {
  return `<?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Transformed by: SVG Repo Mixer Tools -->
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg data-id="${id}" fill="${color}" height="${width}px" width="${width}px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
         viewBox="0 0 511 511" xml:space="preserve">
    <g>
        <path d="M119.5,388c-4.142,0-7.5,3.358-7.5,7.5c0,9.098-7.402,16.5-16.5,16.5S79,404.598,79,395.5S86.402,379,95.5,379
            c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5C78.131,364,64,378.131,64,395.5S78.131,427,95.5,427s31.5-14.131,31.5-31.5
            C127,391.358,123.642,388,119.5,388z"/>
        <path d="M439.5,388c-4.142,0-7.5,3.358-7.5,7.5c0,9.098-7.402,16.5-16.5,16.5s-16.5-7.402-16.5-16.5s7.402-16.5,16.5-16.5
            c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5c-17.369,0-31.5,14.131-31.5,31.5s14.131,31.5,31.5,31.5s31.5-14.131,31.5-31.5
            C447,391.358,443.642,388,439.5,388z"/>
        <path d="M511,259.5c0-0.323-0.027-0.638-0.067-0.95c-0.01-0.076-0.023-0.151-0.035-0.227c-0.042-0.268-0.098-0.53-0.167-0.787
            c-0.013-0.048-0.023-0.097-0.037-0.145c-0.091-0.311-0.201-0.614-0.33-0.907c-0.016-0.036-0.034-0.07-0.051-0.105
            c-0.119-0.26-0.253-0.51-0.4-0.753c-0.02-0.032-0.033-0.068-0.053-0.1l-65.9-105.441C433.751,133.751,416.157,124,396.896,124H247
            V91.5c0-17.369-14.131-31.5-31.5-31.5H183v-0.5c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5V60h-49v-0.5
            c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5V60H71.5C54.131,60,40,74.131,40,91.5V124h-8.5C14.131,124,0,138.131,0,155.5v208
            c0,19.347,13.985,35.478,32.375,38.844C35.799,434.15,62.798,459,95.5,459c32.475,0,59.318-24.51,63.042-56h193.916
            c3.724,31.49,30.567,56,63.042,56s59.318-24.51,63.042-56h8.958c12.958,0,23.5-10.542,23.5-23.5V259.5L511,259.5
            C511,259.5,511,259.5,511,259.5z M496,316h-8.5c-4.687,0-8.5-3.813-8.5-8.5s3.813-8.5,8.5-8.5h8.5V316z M489.968,252H351v-89h80.5
            c0.9,0,1.758-0.167,2.558-0.457L489.968,252z M199,252v-89h137v89H199z M79.5,252c-4.687,0-8.5-3.813-8.5-8.5v-72
            c0-4.687,3.813-8.5,8.5-8.5H184v89H79.5z M215.5,75c9.098,0,16.5,7.402,16.5,16.5V124h-49V75H215.5z M168,75v49h-49V75H168z
             M55,91.5C55,82.402,62.402,75,71.5,75H104v49H55V91.5z M95.5,444C68.757,444,47,422.243,47,395.5S68.757,347,95.5,347
            s48.5,21.757,48.5,48.5S122.243,444,95.5,444z M415.5,444c-26.743,0-48.5-21.757-48.5-48.5s21.757-48.5,48.5-48.5
            s48.5,21.757,48.5,48.5S442.243,444,415.5,444z M487.5,388h-8.958c-3.724-31.49-30.567-56-63.042-56s-59.318,24.51-63.042,56
            H158.542c-3.724-31.49-30.567-56-63.042-56c-32.131,0-58.746,23.993-62.915,55C22.434,384.008,15,374.608,15,363.5V299h376.497
            c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5H15V155.5c0-9.098,7.402-16.5,16.5-16.5h365.396c9.473,0,18.386,3.243,25.476,9H79.5
            C66.542,148,56,158.542,56,171.5v72c0,12.958,10.542,23.5,23.5,23.5H496v17h-8.5c-12.958,0-23.5,10.542-23.5,23.5
            s10.542,23.5,23.5,23.5h8.5v48.5C496,384.187,492.187,388,487.5,388z"/>
        <path d="M327.5,356h-144c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h144c4.142,0,7.5-3.358,7.5-7.5S331.642,356,327.5,356z"/>
        <path d="M439.503,284h-16c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h16c4.142,0,7.5-3.358,7.5-7.5S443.646,284,439.503,284z"/>
    </g>
    </svg>`;
}
export function insertCar(container, object) {
  container.insertAdjacentHTML(
    'beforeend',
    `
    <div data-id="${object.id}" class="car">
                    <div class="select__remove--container">
                        <a data-type="select" data-name = "${
  object.name
}" data-id="${object.id}" data-color = "${
  object.color
}" href="" class="car--select link--basic btn--disable">select</a>
                        <a data-type="remove" data-id="${
  object.id
}" href="" class="car--remove link--basic btn--disable">remove</a>
                    </div>
                    <div class="start__stop__name--container">
                        <a href="" class="car--start link--basic btn--disable">start</a>
                        <a href="" class="car--stop link--basic btn--disable disabled">stop</a>
                        <h3 class="car--name">${object.name}</h3>
                    </div>
                    <div class="car__img--container">
                        ${createSvg(object.color, object.id)}
                    </div>
                  </div>
    `,
  );
}
export async function insertWinners(container, object, index) {
  try {
    const car = await getDelete(http, 'GET', `/${object.id}`);
    container.insertAdjacentHTML(
      'beforeend',
      `
      <tr class="winner--car">
      <td>${index}</td>
      <td>${createSvgWin(car.color, object.id, '100')}</td>
      <td>${car.name}</td>
      <td>${object.wins}</td>
      <td>${parseFloat(object.time.toFixed(1))}</td>
    </tr>
      `,
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}
