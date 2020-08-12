import React from 'react';
import styled from 'styled-components';
import ConditionIndicator from './ConditionIndicator.jsx';
import SmallCarousel from './SmallCarousel.jsx';
const ORIGIN = document.location.origin;

const priceFormatter = num => {
  if (num % 1 !== 0) {
    num = num.toFixed(2);
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const Styles = {
  BoxWrapper: styled.div`
    border: .01em solid #e4e4e4;
    color: #414141;
    cursor: pointer;
    display: grid;
    font-weight: 700;
    grid-template-rows: 2fr 1fr;
    margin-right: 1.8em;
    margin-bottom: .4em;
    &:hover {
      box-shadow: 0 .1em .8em 0 rgba(33,33,33,.15);
      transition: box-shadow .1s ease-in-out;
    }
  `,
  ListingInfo: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 35px 45px 25px;
  `,
  ListingHeader: styled.div`
    grid-column: 1/3;
    padding: .2em .3em;
  `,
  ListingDiscountedPrice: styled.div`
    align-self: flex-end;
    display: block;
    font-size: .8em;
    font-weight: 400;
    grid-column: 1/3;
    opacity: .6;
    padding: 0 .5em;
    text-decoration: line-through;
  `,
  ListingActualPrice: styled.div`
    align-self: flex-end;
    font-size: 1.15em;
    padding: 0 .3em;
  `
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
        priceOriginal={props.listing.priceOriginal}
        priceDiscounted={props.listing.priceDiscounted}
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
