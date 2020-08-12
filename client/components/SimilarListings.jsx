import React from 'react';
import ListingBox from './ListingBox.jsx';
import styled from 'styled-components';

const ListingsRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  min-width: 50em;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.3em 2.9em;
`;

const SimilarListings = (props) => {
  return (
    <div>
      <h2>Similar Listings</h2>
      <ListingsRow>
        {props.listings.map(
          (listing, idx) => <ListingBox listing={listing} key={idx} />
        )}
      </ListingsRow>
    </div>
  );
};

export default SimilarListings;
