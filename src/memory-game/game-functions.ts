import catBack from './images/catBack.png';
import catOne from './images/catOne.jpg';
import catTwo from './images/catTwo.jpg';
import catThree from './images/catThree.jpg';
import catFour from './images/catFour.jpg';
import catFive from './images/catFive.jpg';
import catSix from './images/catSix.jpg';
import catSeven from './images/catSeven.jpg';
import catEight from './images/catEight.jpg';

const defineGridArray = () => [
  [
    { front: 0, back: 0 },
    { front: 0, back: 0 },
    { front: 0, back: 0 },
    { front: 0, back: 0 },
  ],
  [
    { front: 0, back: 0 },
    { front: 0, back: 0 },
    { front: 0, back: 0 },
    { front: 0, back: 0 },
  ],
  [
    { front: 0, back: 0 },
    { front: 0, back: 0 },
    { front: 0, back: 0 },
    { front: 0, back: 0 },
  ],
  [
    { front: 0, back: 0 },
    { front: 0, back: 0 },
    { front: 0, back: 0 },
    { front: 0, back: 0 },
  ],
];

const updateCanvas = (
  myCanvas: HTMLCanvasElement,
  buffer: CanvasRenderingContext2D,
) => {
  const ctx = myCanvas!.getContext('2d');
  ctx!.drawImage(
    buffer.canvas,
    0,
    0,
    buffer!.canvas.width,
    buffer!.canvas.height,
    0,
    0,
    myCanvas.width,
    myCanvas.height,
  );
};

// shuffle cards using Durstenfed Shuffle
// see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffleCards = (cards: any) => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }
};

const setupGameBoard = (grid: any) => {
  const cards = [7, 7, 8, 8, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
  shuffleCards(cards);
  const newGrid = grid;

  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[i].length; j++) {
      if (cards.length) {
        newGrid[i][j].front = cards[cards.length - 1];
        cards.pop();
      }
    }
  }
  return newGrid;
};

const convertNumberToImage = (num: number) => {
  const currentImage = new Image();
  let imageSource = catEight;

  switch (num) {
    case 0:
      imageSource = catBack;
      break;
    case 1:
      imageSource = catOne;
      break;
    case 2:
      imageSource = catTwo;
      break;
    case 3:
      imageSource = catThree;
      break;
    case 4:
      imageSource = catFour;
      break;
    case 5:
      imageSource = catFive;
      break;
    case 6:
      imageSource = catSix;
      break;
    case 7:
      imageSource = catSeven;
      break;
    default:
    case 8:
      imageSource = catEight;
      break;
  }
  currentImage.src = imageSource;
  return currentImage;
};

const drawGrid = (
  myCanvas: any,
  buffer: null | CanvasRenderingContext2D,
  grid: any,
  size: number,
) => {
  if (myCanvas === null || buffer === null) return;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      buffer!.drawImage(
        convertNumberToImage(grid[i][j].back),
        i * size,
        j * size,
        90,
        90,
      );
    }
  }

  updateCanvas(myCanvas.current, buffer);
};

export {
  defineGridArray,
  updateCanvas,
  setupGameBoard,
  drawGrid,
  convertNumberToImage,
};
