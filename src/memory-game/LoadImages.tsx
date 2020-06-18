import React from 'react';

import BackOfCards from './images/BackTwo.png';
import starImage from './images/Star.png';
import circleImage from './images/Circle.png';
import hexagonImage from './images/Hexagon.png';
import lineimage from './images/Line.png';
import rectangleImage from './images/Rectangle.png';
import triangleImage from './images/Triangle.png';
import blankImage from './images/Empty.png';
import arrowImage from './images/Arrow.png';
import cloudImage from './images/Cloud.png';

const LoadImages = () => (
  <>
    <img src={BackOfCards} alt='d' className='blank' />
    <img src={starImage} alt='d' className='blank' />
    <img src={circleImage} alt='d' className='blank' />
    <img src={hexagonImage} alt='d' className='blank' />
    <img src={lineimage} alt='d' className='blank' />
    <img src={rectangleImage} alt='d' className='blank' />
    <img src={triangleImage} alt='d' className='blank' />
    <img src={blankImage} alt='d' className='blank' />
    <img src={arrowImage} alt='d' className='blank' />
    <img src={cloudImage} alt='d' className='blank' />
  </>
);

export default LoadImages;
