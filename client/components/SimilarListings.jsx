import Styled from './../styles.jsx';
import ListingBox from './ListingBox.jsx';

const SimilarListings = (props) => {

  return (
    <Styled.container>
      <Styled.h2> HAHAHA </Styled.h2>
      {props.listings.map(
        (listing, idx) => <ListingBox listing={listing} key={idx}/>
      )}
    </Styled.container>
  );

};

export default SimilarListings;
