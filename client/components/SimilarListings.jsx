import React, {Component} from 'react';
import Styled from './../styles.jsx';
import ListingBox from './ListingBox.jsx';

const SimilarListings = (props) => {

  return (
    <div>
      <h2> HAHAHA </h2>
      {props.listings.map(
        (listing, idx) => <ListingBox listing={listing} key={idx}/>
      )}
    </div>
  );

};

export default SimilarListings;
