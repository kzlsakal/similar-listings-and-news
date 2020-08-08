import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import SimilarListings from './components/SimilarListings.jsx';
const API_URL = document.location.origin;
const PATH = document.location.pathname.slice(1);

class SlnWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: null,
      similarListings: null
    };
  }

  componentDidMount () {
    this.getAll();
  }

  getAll () {
    this.getListing()
      .then(() => this.getSimilarListings())
      .catch(err => null);
  }

  getListing () {
    return fetch(`${API_URL}/api/${PATH}`)
      .then(res => res.json())
      .then(listing => this.setState({listing}))
      .catch(err => null);
  }

  getSimilarListings (category = this.state.listing.category) {
    return fetch(`${API_URL}/api/listings/${category}`)
      .then(res => res.json())
      .then(similarListings => this.setState({similarListings}))
      .catch(err => null);
  }

  render () {
    return (
      <div>
        Hello world
      </div>
    );
  }
}

window.Sln = SlnWrapper;

export default SlnWrapper;
