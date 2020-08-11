import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Styles from './styles.jsx';
import SimilarListings from './components/SimilarListings.jsx';
import RelatedNews from './components/RelatedNews.jsx';
import ArticleView from './components/ArticleView.jsx';
const ORIGIN = document.location.origin;
const PATH = document.location.pathname.slice(1);

class SlnWrapper extends Component {
  constructor(props) {
    super(props);
    this.toggleArticle = this.toggleArticle.bind(this);
    this.state = {
      listing: {},
      similarListings: [],
      relatedNews: [],
      readingArticle: null
    };
  }

  componentDidMount () {
    this.getAll();
  }

  getAll () {
    this.getListing()
      .then(() => this.getSimilarListings())
      .then(() => this.getRelatedNews())
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
      .then(res => res.slice(0, 25))
      .then(similarListings => this.setState({similarListings}))
      .catch(err => null);
  }

  getRelatedNews (tags = [
    this.state.listing.category,
    this.state.listing.brand
  ]) {
    return fetch(`${ORIGIN}/api/news/${tags.join(',')}`)
      .then(res => res.json())
      .then(res => res.slice(0, 3))
      .then(relatedNews => this.setState({relatedNews}))
      .catch(err => null);
  }

  toggleArticle (idx) {
    if (idx === -1) {
      this.setState({readingArticle: null});
      return;
    }
    this.setState({readingArticle: this.state.relatedNews[idx]});
  }

  render () {
    return (
      <div>
        <Styles.Global />
        <SimilarListings listings={this.state.similarListings} />
        <RelatedNews
          articles={this.state.relatedNews}
          onReadArticle={this.toggleArticle}
        />
        <ArticleView article={this.state.readingArticle} onToggleRead={this.toggleArticle}/>
      </div>
    );
  }
}

ReactDOM.render(<SlnWrapper />, document.getElementById('sln'));

export default SlnWrapper;
