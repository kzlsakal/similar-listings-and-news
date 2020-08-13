import React, {Component} from 'react';
import ListingBox from './ListingBox.jsx';
import styled from 'styled-components';


const Styles = {
  ListingsRow: styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0.3em 2.9em;
  `
};

class SimilarListings extends Component {
  constructor (props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      scrollLeftEnabled: 0,
      scrollRightEnabled: 1
    };
  }

  handleScroll () {
    const clientWidth = document.getElementById('sln-listings-row').clientWidth;
    const scrollWidth = document.getElementById('sln-listings-row').scrollWidth;
    const scrollX = document.getElementById('sln-listings-row').scrollLeft;
    if (scrollX === 0) {
      this.setState({scrollLeftEnabled: 0});
    }
    if (scrollX > 0) {
      this.setState({scrollLeftEnabled: 1});
    }
    if (scrollX + clientWidth >= scrollWidth) {
      this.setState({scrollRightEnabled: 0});
    }
    if (scrollX + clientWidth < scrollWidth) {
      this.setState({scrollRightEnabled: 1});
    }
  }

  handleScrollButton (event) {
    console.log(event.target);
  }

  render () {
    return (
      <div>
        <h2>Similar Listings</h2>
        <Styles.ListingsRow onScroll={this.handleScroll} id="sln-listings-row">
          {this.props.listings.map(
            (listing, idx) => <ListingBox listing={listing} key={idx} />
          )}
        </Styles.ListingsRow>
      </div>
    );
  }
}

export default SimilarListings;
