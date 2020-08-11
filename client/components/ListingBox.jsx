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
  const link = `${ORIGIN}/item/${props.listing.itemId}`;
  return (
    <Styles.BoxWrapper>
      <SmallCarousel
        images={props.listing.photosSmall}
        preKey={props.listing.itemId}
        link={`${ORIGIN}/item/${props.listing.itemId}`}
      />
      <a href={`${ORIGIN}/item/${props.listing.itemId}`}>
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
          <ConditionIndicator condition={props.listing.condition}/>
        </Styles.ListingInfo>
      </a>
    </Styles.BoxWrapper>
  );
};

export default ListingBox;
