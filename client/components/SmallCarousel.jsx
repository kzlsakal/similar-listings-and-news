import React from 'react';
import Styles from './../styles.jsx';

const SmallCarousel = (props) => {
  return (
    <Styles.CarouselImg src={props.images[0]} />
  );
};

export default SmallCarousel;
