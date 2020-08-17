import React, { Component } from 'react';
import ListingBox from './ListingBox.jsx';
import styled from 'styled-components';

const Styles = {
  ListingsRow: styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    padding: .3em 0 .3em 2.9em;
    scroll-behavior: smooth;
    width: 100%;
  `,
  ScrollRight: styled.div`
    align-items: center;
    color: #838383;
    cursor: pointer;
    background-color: rgba(255,255,255,.8);
    border: .05rem solid #dadada;
    border-right: none;
    border-top-left-radius: 4rem;
    border-bottom-left-radius: 4rem;
    display: flex;
    font-family: serif;
    font-size: 2.25rem;
    font-weight: 700;
    height: 4.8rem;
    justify-content: center;
    padding-left: .3rem;
    position: absolute;
    right: -1.3em;
    top: 45%;
    transition: visibility .5s ease, opacity .3s ease;
    user-select: none;
    width: 2rem;
    z-index: 1000;
    @media (max-width: 768px) {
      transform: scale(0);
    }
    &:hover {
      color: #057bc4;
      transition: color .2s ease;
    }
  `,
  ScrollLeft: styled.div`
    align-items: center;
    color: #838383;
    cursor: pointer;
    left: 0;
    background-color: rgba(255,255,255,.8);
    border: .05rem solid #dadada;
    border-left: none;
    border-top-right-radius: 4rem;
    border-bottom-right-radius: 4rem;
    display: flex;
    height: 4.8rem;
    font-family: serif;
    font-size: 2.25rem;
    font-weight: 700;
    justify-content: center;
    padding-right: .3rem;
    position: absolute;
    top: 45%;
    transition: visibility .5s ease, opacity .3s ease;
    user-select: none;
    width: 2rem;
    z-index: 1000;
    @media (max-width: 768px) {
      transform: scale(0);
    }
    &:hover {
      color: #057bc4;
      transition: color .2s ease;
    }
  `,
  Wrapper: styled.div`
    position: relative;
    width: 100%;
  `
};

class SimilarListings extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    const scrollLeft = document.getElementById('sln-listings-scroll-left');
    scrollLeft.style.visibility = 'hidden';
  }

  handleScroll () {
    const clientWidth = document.getElementById('sln-listings-row').clientWidth;
    const scrollWidth = document.getElementById('sln-listings-row').scrollWidth;
    const scrollX = document.getElementById('sln-listings-row').scrollLeft;
    const scrollLeft = document.getElementById('sln-listings-scroll-left');
    const scrollRight = document.getElementById('sln-listings-scroll-right');
    if (scrollX === 0) {
      scrollLeft.style.opacity = '0';
      scrollLeft.style.visibility = 'hidden';
    }
    if (scrollX > 0) {
      scrollLeft.style.opacity = '1';
      scrollLeft.style.visibility = 'visible';
    }
    if (scrollX + clientWidth >= scrollWidth) {
      scrollRight.style.opacity = '0';
      scrollRight.style.visibility = 'hidden';
    }
    if (scrollX + clientWidth < scrollWidth) {
      scrollRight.style.opacity = '1';
      scrollRight.style.visibility = 'visible';
    }
  }

  handleScrollButton (event) {
    const row = document.getElementById('sln-listings-row');
    const clientWidth = document.getElementById('sln-listings-row').clientWidth;
    const scrollWidth = document.getElementById('sln-listings-row').scrollWidth;
    const maxScroll = scrollWidth - clientWidth;
    if (event.target.id === 'sln-listings-scroll-right') {
      row.scrollLeft = Math.min(maxScroll, row.scrollLeft + clientWidth * .92);
    }
    if (event.target.id === 'sln-listings-scroll-left') {
      row.scrollLeft = Math.max(0, row.scrollLeft - clientWidth * .92);
    }
  }

  render () {
    return (
      <Styles.Wrapper>
        <h2>Similar Listings</h2>
        <Styles.ListingsRow onScroll={this.handleScroll} id="sln-listings-row">
          {this.props.listings.map(
            (listing, idx) => <ListingBox listing={listing} key={idx} />
          )}
        </Styles.ListingsRow>
        <Styles.ScrollRight id="sln-listings-scroll-right" onClick={this.handleScrollButton}>&gt;</Styles.ScrollRight>
        <Styles.ScrollLeft id="sln-listings-scroll-left" onClick={this.handleScrollButton}>&lt;</Styles.ScrollLeft>
      </Styles.Wrapper>
    );
  }
}

export default SimilarListings;
