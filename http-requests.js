/* eslint-disable no-console */

/* eslint-disable consistent-return */
export const http = new URL('http://localhost:3000/garage');
export const httpDrive = new URL('http://localhost:3000/engine');
export const httpwinners = new URL('http://localhost:3000/winners');
export async function getDelete(httpreq, method, id = '') {
  try {
    const garage = await fetch(`${httpreq}${id}`, {
      body: JSON.stringify(),
      method: `${method}`,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    const answer = await garage.json();
    return answer;
  } catch (error) {
    console.log(error);
  }
}
export async function post(httpR, method, id = '', obj = '') {
  try {
    const garage = await fetch(`${httpR}${id}`, {
      body: JSON.stringify(obj),
      method: `${method}`,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    const answer = garage.json();
    return answer;
  } catch (error) {
    console.log(error);
  }
}

export async function startStopEng(httpRe, method, status, id = '') {
  try {
    const garage = await fetch(`${httpRe}?id=${id}&status=${status}`, {
      method: `${method}`,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    const answer = await garage.json();
    return answer;
  } catch (error) {
    console.log(error);
  }
}
export async function engineStall(httpreq, method, status, id = '') {
  try {
    const garage = await fetch(`${httpreq}?id=${id}&status=${status}`, {
      method: `${method}`,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    const answer = await garage.json();
    return answer;
  } catch (error) {
    const element = document.getElementById(`${id}`);
    console.log(error);
    element.style.animationPlayState = 'paused';
  }
}
export async function getWinners(httpReques) {
  try {
    const garage = await fetch(`${httpReques}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    const answer = await garage.json();
    return answer;
  } catch (error) {
    console.log(error);
  }
}
export async function getWinner(id) {
  try {
    const garage = await fetch(`http://localhost:3000/winners/${id}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    const answer = await garage.json();
    return answer;
  } catch (error) {
    console.log(error);
  }
}
export async function createWinner(object) {
  try {
    const garage = await fetch('http://localhost:3000/winners', {
      method: 'POST',
      body: JSON.stringify(object),
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    const answer = await garage.json();
    return answer;
  } catch (error) {
    console.log(error);
  }
}
export async function updateWinner(object, id) {
  try {
    const garage = await fetch(`http://localhost:3000/winners/${id}`, {
      method: 'PUT',
      body: JSON.stringify(object),
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    const answer = await garage.json();
    return answer;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteWinner(id) {
  try {
    const garage = await fetch(`http://localhost:3000/winners/${id}`, {
      method: 'PUT',
      body: JSON.stringify(),
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    const answer = await garage.json();
    return answer;
  } catch (error) {
    console.log(error);
  }
}
