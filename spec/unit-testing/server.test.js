const mockListing = require('./../__mocks__/listingMock.js').json();
const mockCategory = require('./../__mocks__/categoryMock.js').json();
const mockArticles = require('./../__mocks__/articlesMock.js').json();
process.env.CLOUD_BUNDLE_URL = 'http://mockcloudurl';

const mockGetById = (id) => {
  if (id === mockListing.itemId) {
    return Promise.resolve([mockListing]);
  }
  if (id === 999) {
    return new Error('Erroneous Item');
  }
  return Promise.resolve([]);
};

const mockGetListings = (options) => {
  if (options.category === mockCategory[0].category) {
    return Promise.resolve(mockCategory);
  }
  if (options.category === 'erroneous-category') {
    return new Error();
  }
  return Promise.resolve([]);
};

const mockGetArticles = (tags) => {
  if (tags[0] === mockArticles[0].tags[0]) {
    return Promise.resolve(mockArticles);
  }
  if (tags[0] === 'erroneous-tag') {
    return new Error();
  }
  return Promise.resolve([]);
};

jest.mock('./../../server/models', () => ({
  Listing: {
    getById: mockGetById,
    get: mockGetListings,
    getRandom: mockGetListings
  },
  Article: {
    getByTag: mockGetArticles,
    getByTagRandom: mockGetArticles
  }
}));

const { app } = require('./../../server/sln.js');
const request = require('supertest');

describe ('API calls', () => {
  test('Responds to GET calls for a listing with the correct item', (done) => {
    request(app)
      .get('/api/item/30')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.itemId).toBe(30);
        expect(response.body.name).toBe(mockListing.name);
      })
      .then(() => done());
  });

  test('Ignores human-friendly pathname for GET listing calls', (done) => {
    request(app)
      .get('/api/item/30-Impossible-Sponge-Guitar')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.itemId).toBe(30);
        expect(response.body.name).toBe(mockListing.name);
      })
      .then(() => done());
  });

  test('Sends 404 code if the listing is not found', (done) => {
    request(app)
      .get('/api/item/5165156')
      .expect(404)
      .then(() => done());
  });

  test('Sends 500 code if there is server error during listing call', (done) => {
    request(app)
      .get('/api/item/999-erroneous-id')
      .expect(500)
      .then(() => done());
  });

  test('Responds to GET calls for a category with correct listings', (done) => {
    request(app)
      .get('/api/listings/Bass')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body[0].category).toBe('Bass');
        expect(response.body[1].category).toBe('Bass');
      })
      .then(() => done());
  });

  test('Sends 404 code if the category is not found', (done) => {
    request(app)
      .get('/api/listings/Flute')
      .expect(404)
      .then(() => done());
  });

  test('Sends 500 code if there is server error for category call', (done) => {
    request(app)
      .get('/api/listings/erroneous-category')
      .expect(500)
      .then(() => done());
  });

  test('Responds to GET calls for random listings in a category', (done) => {
    request(app)
      .get('/api/listings/Bass/random')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body[0].category).toBe('Bass');
        expect(response.body[1].category).toBe('Bass');
      })
      .then(() => done());
  });

  test('Sends 500 code for server errors at random listings call', (done) => {
    request(app)
      .get('/api/listings/erroneous-category/random')
      .expect(500)
      .then(() => done());
  });

  test('Sends 404 if the category for random listings not found', (done) => {
    request(app)
      .get('/api/listings/Flute/random')
      .expect(404)
      .then(() => done());
  });

  test('Responds to GET calls for news articles with given tags', (done) => {
    request(app)
      .get('/api/news/Bass')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body[0].tags[0]).toBe('Bass');
        expect(response.body[1].tags[0]).toBe('Bass');
      })
      .then(() => done());
  });

  test('Sends 404 if no news articles are not found with the tag', (done) => {
    request(app)
      .get('/api/news/Politics')
      .expect(404)
      .then(() => done());
  });

  test('Sends 500 code for server errors when requesting articles', (done) => {
    request(app)
      .get('/api/news/erroneous-tag')
      .expect(500)
      .then(() => done());
  });

  test('Responds to GET calls for random articles with given tags', (done) => {
    request(app)
      .get('/api/news/Bass/Random')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body[0].tags[0]).toBe('Bass');
        expect(response.body[1].tags[0]).toBe('Bass');
      })
      .then(() => done());
  });

  test('Sends 404 if no random articles are not found with the tag', (done) => {
    request(app)
      .get('/api/news/Politics/Random')
      .expect(404)
      .then(() => done());
  });

  test('Sends 500 code for server errors at random articles request', (done) => {
    request(app)
      .get('/api/news/erroneous-tag/random')
      .expect(500)
      .then(() => done());
  });

  test('Accepts more than one tag when requesting news articles', (done) => {
    request(app)
      .get('/api/news/Bass,Vuvuzela/Random')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body[0].tags[0]).toBe('Bass');
        expect(response.body[1].tags[0]).toBe('Bass');
      })
      .then(() => done());
  });
});

describe ('Cloud-hosted JS Bundle', () => {
  test('Redirects bundled JS requests to the cloud URL', (done) => {
    request(app)
      .get('/similar-listings-news.bundle.js')
      .expect(302)
      .then(response => {
        expect(response.header.location).toBe(
          'http://mockcloudurl/js/similar-listings-news.bundle.js'
        );
      })
      .then(() => done());
  });
});
