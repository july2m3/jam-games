import React, { useState, useEffect, useRef } from 'react';

/*
idea:
  use the pokemon api and make a pokemon matching game,
    with random pokemon
to do:
  make a grid of cards
  have cards have a front and back
  have cards shown
  make cards clickable
  have game logic for comparison
*/

//  get a grid of 12 and 4 blank, grid is 4 x 4
// arrow, circle, hexagon, line, rectangle, triangle, blank, blank

import './style.css';

import BackOfCards from './BackTwo.png';
import starImage from './Star.png';
import circleImage from './Circle.png';
import hexagonImage from './Hexagon.png';
import lineimage from './Line.png';
import rectangleImage from './Rectangle.png';
import triangleImage from './Triangle.png';
import blankImage from './Empty.png';

const updateCanvas = (myCanvas:HTMLCanvasElement, buffer: CanvasRenderingContext2D) => {
  const ctx = myCanvas!.getContext('2d');
  ctx!.drawImage(buffer.canvas, 0, 0, buffer!.canvas.width, buffer!.canvas.height, 0, 0, myCanvas.width, myCanvas.height);
};

// shuffle cards using Durstenfed Shuffle
// see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffleCards = (cards:any) => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }
};

const setupGrid = (grid: any) => {
  const cards = [7, 7, 8, 8, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
  shuffleCards(cards);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (cards.length) {
        grid[i][j].front = cards[cards.length - 1];
        cards.pop();
      }
    }
    // grid[0][0].front = 2;
  }
};

const convertNumberToImage = (num : number) => {
  const currentImage = new Image(100, 100);
  let imageSource = triangleImage;

  switch (num) {
    case 0:
      imageSource = BackOfCards;
      break;
    case 1:
      imageSource = starImage;
      break;
    case 2:
      imageSource = circleImage;
      break;
    case 3:
      imageSource = hexagonImage;
      break;
    case 4:
      imageSource = lineimage;
      break;
    case 5:
      imageSource = rectangleImage;
      break;
    case 6:
      imageSource = triangleImage;
      break;
    case 7:
      imageSource = blankImage;
      break;
    default:
      imageSource = lineimage;
      break;
  }
  currentImage.src = imageSource;
  return currentImage;
};

const drawGrid = (
  myCanvas: any, buffer :null | CanvasRenderingContext2D,
  grid:any, size:number,
) => {
  if (myCanvas === null || buffer === null) return;

  // const currentImage = new Image(100, 100);
  // currentImage.src = BackOfCards;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
       buffer!.drawImage(convertNumberToImage(grid[j][i].back), i * size, j * size);
      //  buffer!.drawImage(convertNumberToImage(grid[i][j].front), i * size, j * size);
    }
  }

  updateCanvas(myCanvas.current, buffer);
};

const MemoryGame = () => {
  const [score, setScore] = useState(0);
  // const buffer = document.createElement('canvas').getContext('2d');
  const [buffer, setBuffer] = useState(document.createElement('canvas').getContext('2d'));
  // const columns = 4;
  // const rows = 4;
  const size = 100;

  const myCanvas = useRef<HTMLCanvasElement>(null);


  const grid = [
    [{ front: 0, back: 0 }, { front: 0, back: 0 }, { front: 0, back: 0 }, { front: 0, back: 0 }],
    [{ front: 0, back: 0 }, { front: 0, back: 0 }, { front: 0, back: 0 }, { front: 0, back: 0 }],
    [{ front: 0, back: 0 }, { front: 0, back: 0 }, { front: 0, back: 0 }, { front: 0, back: 0 }],
    [{ front: 0, back: 0 }, { front: 0, back: 0 }, { front: 0, back: 0 }, { front: 0, back: 0 }],
  ];

  // the second argument makes it only run once
  // Initial Setup
  useEffect(() => {
    myCanvas.current!.width = window.innerWidth * 0.7;
    myCanvas.current!.height = window.innerHeight * 0.7;
    myCanvas.current!.style.background = 'lightblue';

    buffer!.canvas.height = grid.length * size;
    buffer!.canvas.width = grid[0].length * size;

    setupGrid(grid);

    drawGrid(myCanvas, buffer, grid, size);
  }, [buffer]);

  const showCard = (x:number, y:number) => {
    console.log(x, y);
    buffer!.drawImage(convertNumberToImage(grid[x][y].front), x * size, y * size);
    updateCanvas(myCanvas.current!, buffer!);

    setTimeout(() => {
      // buffer!.drawImage(convertNumberToImage(grid[x][y].back), x * size, y * size);
      // updateCanvas(myCanvas.current!, buffer!);
    }, 500);
  };

  const findCardClicked = (mouseX:number, mouseY:number) => {
    if (
      mouseX >= myCanvas.current!.width ||
      mouseX <= 0 ||
      mouseY >= myCanvas.current!.height ||
      mouseY <= 0
    ) {
      return;
    }
    const xCoordinate = Math.floor(mouseX / 100);
    const yCoordinate = Math.floor(mouseY / 100);

    // console.log(xCoordinate);
    // console.log(yCoordinate);
    // console.log(grid[xCoordinate][yCoordinate]);
    showCard(xCoordinate, yCoordinate);
  };


  const handleClick = (e:any) => {
    const rectangle = myCanvas.current!.getBoundingClientRect();
    const { canvas } = buffer!;
    const scaleX = canvas.width / rectangle.width;
    const scaleY = canvas.height / rectangle.height;

    const mouseX = (e.clientX - rectangle.left) * scaleX;
    const mouseY = (e.clientY - rectangle.top) * scaleY;

    console.log(mouseX);
    console.log(mouseY);
    findCardClicked(mouseX, mouseY);
  };

  return (
    <div className='memory-game'>
      <p className='p__score'>
        Score:
        {score}
      </p>
      <canvas className='memory-game-canvas' ref={myCanvas} onClick={handleClick} />
      <img src={BackOfCards} alt='d' className='blank' />
      <img src={starImage} alt='d' className='blank' />
      <img src={circleImage} alt='d' className='blank' />
      <img src={hexagonImage} alt='d' className='blank' />
      <img src={lineimage} alt='d' className='blank' />
      <img src={rectangleImage} alt='d' className='blank' />
      <img src={triangleImage} alt='d' className='blank' />
      <img src={blankImage} alt='d' className='blank' />
    </div>
  );
};

export default MemoryGame;
