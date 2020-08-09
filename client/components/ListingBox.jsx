import React from 'react';
import Styles from './../styles.jsx';
const ListingBox = (props) => {
  return (
    <Styles.BoxWrapper>
      {props.listing.name}
    </Styles.BoxWrapper>
  );
};

export default ListingBox;
