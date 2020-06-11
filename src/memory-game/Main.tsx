import React, { useState, useEffect, useRef } from 'react';

// images seem to not be loaded until needed, this gets around that
import LoadImages from './LoadImages';

import {
  defineGridArray,
  updateCanvas,
  setupGameBoard,
  drawGrid,
  convertNumberToImage,
} from './gameFunctions';

import './style.css';

const MemoryGame = () => {
  const [score, setScore] = useState(0);
  // const buffer = document.createElement('canvas').getContext('2d');
  const [buffer, setBuffer] = useState(
    document.createElement('canvas').getContext('2d'),
  );
  const size = 100; //100 pixels

  const myCanvas = useRef<HTMLCanvasElement>(null);

  const grid = defineGridArray();

  // Initial Setup
  useEffect(() => {
    myCanvas.current!.width = window.innerWidth * 0.7;
    myCanvas.current!.height = window.innerHeight * 0.7;
    myCanvas.current!.style.background = 'lightblue';
    buffer!.canvas.height = grid.length * size;
    buffer!.canvas.width = grid[0].length * size;

    setupGameBoard(grid);
    drawGrid(myCanvas, buffer, grid, size);
  }, [buffer]);

  const showCard = (x: number, y: number) => {
    buffer!.drawImage(
      convertNumberToImage(grid[x][y].front),
      x * size,
      y * size,
    );
    updateCanvas(myCanvas.current!, buffer!);

    setTimeout(() => {
      buffer!.drawImage(
        convertNumberToImage(grid[x][y].back),
        x * size,
        y * size,
      );
      updateCanvas(myCanvas.current!, buffer!);
    }, 500);
  };

  const findCardClicked = (mouseX: number, mouseY: number) => {
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

    showCard(xCoordinate, yCoordinate);
  };

  const handleClick = (e: any) => {
    const rectangle = myCanvas.current!.getBoundingClientRect();
    const { canvas } = buffer!;
    const scaleX = canvas.width / rectangle.width;
    const scaleY = canvas.height / rectangle.height;

    const mouseX = (e.clientX - rectangle.left) * scaleX;
    const mouseY = (e.clientY - rectangle.top) * scaleY;

    findCardClicked(mouseX, mouseY);
  };

  return (
    <div className='memory-game'>
      <p className='p__score'>
        Score:
        {score}
      </p>
      <canvas
        className='memory-game-canvas'
        ref={myCanvas}
        onClick={handleClick}
      />
      <LoadImages />
    </div>
  );
};

export default MemoryGame;
