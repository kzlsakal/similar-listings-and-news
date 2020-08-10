import React from 'react';
import Styles from './../styles.jsx';
import ConditionIndicator from './ConditionIndicator.jsx';
import SmallCarousel from './SmallCarousel.jsx';
const ORIGIN = document.location.origin;

const priceFormatter = num => {
  if (num % 1 !== 0) {
    num = num.toFixed(2);
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const ListingBox = (props) => {
  let oldPrice = null;
  let actualPrice = `$${priceFormatter(props.listing.priceOriginal)}`;
  if (props.listing.priceDiscounted) {
    oldPrice = `$${priceFormatter(props.listing.priceOriginal)}`;
    actualPrice = `$${priceFormatter(props.listing.priceDiscounted)}`;
  }
  return (
    <a href={`${ORIGIN}/item/${props.listing.itemId}`}>
      <Styles.BoxWrapper>
        <SmallCarousel images={props.listing.photosSmall} />
        <Styles.ListingInfo>
          <Styles.ListingHeader>
            {props.listing.name}
          </Styles.ListingHeader>
          <Styles.ListingDiscountedPrice>
            {oldPrice || ''}
          </Styles.ListingDiscountedPrice>
          <Styles.ListingActualPrice>
            {actualPrice}
          </Styles.ListingActualPrice>
          <ConditionIndicator condition={props.listing.condition} preKey={props.listing.itemId}/>
        </Styles.ListingInfo>
      </Styles.BoxWrapper>
    </a>
  );
};

export default ListingBox;
