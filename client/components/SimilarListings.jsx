import React from 'react';
import ListingBox from './ListingBox.jsx';
import Styles from './../styles.jsx';

const SimilarListings = (props) => {
  return (
    <div>
      <h2>Similar Listings</h2>
      <Styles.ListingsRow>
        {props.listings.map(
          (listing, idx) => <ListingBox listing={listing} key={idx} />
        )}
      </Styles.ListingsRow>
    </div>
  );
};

export default SimilarListings;
