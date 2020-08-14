import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Styles from './styles.jsx';
import SimilarListings from './components/SimilarListings.jsx';
import RelatedNews from './components/RelatedNews.jsx';
import ArticleView from './components/ArticleView.jsx';
const PATH = document.location.pathname.slice(1);
const PROTOCOL = 'http';
const HOST = 'localhost';
const PORT = '3005';

class SlnWrapper extends Component {
  constructor (props) {
    super(props);
    this.toggleArticle = this.toggleArticle.bind(this);
    this.state = {
      listing: {},
      similarListings: [],
      relatedNews: [],
      readingArticle: null,
      nextArticle: null,
      nextId: null
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
    return fetch(
      `${PROTOCOL}://${HOST}:${PORT}/api/${PATH}`
    )
      .then(res => res.json())
      .then(listing => this.setState({listing}))
      .catch(err => null);
  }

  getSimilarListings (category = this.state.listing.category) {
    return fetch(
      `${PROTOCOL}://${HOST}:${PORT}/api/listings/${category}/random`
    )
      .then(res => res.json())
      .then(res => res.slice(0, 25))
      .then(similarListings => this.setState({similarListings}))
      .catch(err => null);
  }

  getRelatedNews (tags = [
    this.state.listing.category,
    this.state.listing.brand
  ]) {
    return fetch(
      `${PROTOCOL}://${HOST}:${PORT}/api/news/${tags.join(',')}/random`
    )
      .then(res => res.json())
      .then(res => res.slice(0, 3))
      .then(relatedNews => this.setState({relatedNews}))
      .catch(err => null);
  }

  toggleArticle (idx) {
    if (idx === -1) {
      this.setState({readingArticle: null, nextArticle: null, nextId: null});
      return;
    }
    let nextId = idx + 1;
    if (nextId >= this.state.relatedNews.length) {
      nextId = 0;
    }
    this.setState({
      nextId: nextId,
      readingArticle: this.state.relatedNews[idx],
      nextArticle: this.state.relatedNews[nextId]
    });
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
        <ArticleView
          article={this.state.readingArticle}
          nextArticle={this.state.nextArticle}
          nextId={this.state.nextId}
          onToggleRead={this.toggleArticle}
        />
      </div>
    );
  }
}

ReactDOM.render(<SlnWrapper />, document.getElementById('sln'));

export default SlnWrapper;
