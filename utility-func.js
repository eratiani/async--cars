export function sortNumbersAscending(numbers, element) {
  return numbers.sort(
    (a, b) => a.children[element].textContent - b.children[element].textContent,
  );
}
export function sortNumbersDescending(numbers, element) {
  return numbers.sort(
    (a, b) => b.children[element].textContent - a.children[element].textContent,
  );
}
const carNames = [
  'FORD mustang',
  'FORD fiesta',
  'MAZDA rx8',
  'BMW m5',
  'CHEVROLET SILVERADO',
  'TOYOTA RAV4',
  'HONDA CR-V',
  'HONDA CIVIC',
  'HONDA ACCORD',
  'TOYOTA CAMRY',
  'TOYOTA COROLLA',
  'NISSAN ROGUE',
  'Subaru Outback',
  'Nissan Altima',
  'Ford Escape',
  'Jeep Grand Cherokee',
];
export function randomName() {
  let rCar = '';
  const rnmb = Math.floor(Math.random() * 16);
  rCar = carNames[rnmb];
  return rCar;
}
const colors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

export function randomColor() {
  let rcol = '#';
  for (let i = 0; i < 6; i += 1) {
    const rnmb = Math.floor(Math.random() * 16);
    rcol += colors[rnmb];
  }
  return rcol;
}
