import ListingBox from './ListingBox.jsx';

const SimilarListings = (props) => {
  return (
    <div>
      {props.listings.map(
        (listing, idx) => <ListingBox listing={listing} key={idx}/>
      )}
    </div>
  );

};

export default SimilarListings;
