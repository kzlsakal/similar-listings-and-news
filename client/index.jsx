import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Styles from './styles.jsx';
import SimilarListings from './components/SimilarListings.jsx';
const ORIGIN = document.location.origin;
const PATH = document.location.pathname.slice(1);

class SlnWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: {},
      similarListings: []
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
    return fetch(`${ORIGIN}/api/${PATH}`)
      .then(res => res.json())
      .then(listing => this.setState({listing}))
      .catch(err => null);
  }

  getSimilarListings (category = this.state.listing.category) {
    return fetch(`${ORIGIN}/api/listings/${category}`)
      .then(res => res.json())
      .then(similarListings => this.setState({similarListings}))
      .catch(err => null);
  }

  render () {
    return (
      <div>
        <Styles.Global />
        <SimilarListings listings={this.state.similarListings} />
      </div>
    );
  }
}

ReactDOM.render(<SlnWrapper />, document.getElementById('sln'));

export default SlnWrapper;
