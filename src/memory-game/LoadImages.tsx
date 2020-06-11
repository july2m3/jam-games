import React from 'react';

import BackOfCards from './BackTwo.png';
import starImage from './Star.png';
import circleImage from './Circle.png';
import hexagonImage from './Hexagon.png';
import lineimage from './Line.png';
import rectangleImage from './Rectangle.png';
import triangleImage from './Triangle.png';
import blankImage from './Empty.png';

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
  </>
);

export default LoadImages;
