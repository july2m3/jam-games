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
  const [imgs, setImgs] = useState('');
  // const buffer = document.createElement('canvas').getContext('2d');
  const [buffer, setBuffer] = useState(
    document.createElement('canvas').getContext('2d'),
  );
  const [firstImage, updateFirstImage] = useState({
    clickedOnFirstImage: false,
    x: 0,
    y: 0,
  });
  // const grid = defineGridArray();
  const [grid, updateGrid] = useState(defineGridArray);
  const size = 100;

  const myCanvas = useRef<HTMLCanvasElement>(null);

  // Initial Setup
  useEffect(() => {
    myCanvas.current!.width = window.innerWidth * 0.7;
    myCanvas.current!.height = window.innerHeight * 0.7;
    myCanvas.current!.style.background = 'lightblue';
    buffer!.canvas.height = grid.length * size;
    buffer!.canvas.width = grid[0].length * size;

    updateGrid(setupGameBoard(grid));
    drawGrid(myCanvas, buffer, grid, size);

    const setupGameBoardImages = async () => {
      const cards = new Array(16);
      for (let i = 0; i < cards.length; i++) {
        cards[i] = (
          await fetch('https://source.unsplash.com/random/100x100')
        ).url;
      }
      console.log(cards[5]);
    };
    setupGameBoardImages();

    // fetch('https://source.unsplash.com/random/100x100')
    // .then((res) => {
    // console.log(res);
    //   setImgs(res.url);
    // })
    // .catch((err) => {
    //   console.log('Error happened during fetching!', err);
    // });

    // setImgs(getImages());
  }, [buffer, grid]);

  const compareClickedImages = (x: number, y: number) => {
    if (firstImage.clickedOnFirstImage) {
      // console.clear();
      // console.log(grid[x][y].front, grid[firstImage.x][firstImage.y].front);
      if (x === firstImage.x && y === firstImage.y) {
        updateFirstImage({ clickedOnFirstImage: false, x, y });
        return;
      }
      if (grid[x][y].front === grid[firstImage.x][firstImage.y].front) {
        console.log('found a pair');

        const newGrid = grid;
        newGrid[x][y].back = newGrid[x][y].front;
        newGrid[firstImage.x][firstImage.y].back = newGrid[x][y].front;
        updateGrid(newGrid);
      }
      setTimeout(() => drawGrid(myCanvas, buffer, grid, size), 1000);
      updateFirstImage({ clickedOnFirstImage: false, x, y });
      return;
    }

    updateFirstImage({
      clickedOnFirstImage: true,
      x,
      y,
    });
  };

  const showCard = (x: number, y: number) => {
    buffer!.drawImage(
      convertNumberToImage(grid[x][y].front),
      x * size,
      y * size,
    );
    updateCanvas(myCanvas.current!, buffer!);
    buffer!.drawImage(
      convertNumberToImage(grid[x][y].back),
      x * size,
      y * size,
    );
    compareClickedImages(x, y);
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

    if (
      grid[xCoordinate][yCoordinate].front ===
      grid[xCoordinate][yCoordinate].back
    ) {
      return;
    }
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
    <div className="memory-game">
      <canvas
        className="memory-game-canvas"
        ref={myCanvas}
        onClick={handleClick}
      />
      <LoadImages />
      {/* {imgs && <LoadUnsplashImages imageOne={imgs} />} */}
    </div>
  );
};

export default MemoryGame;
