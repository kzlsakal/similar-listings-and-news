const path = require('path');
const models = require('./models');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3005;
const URL = process.env.URL || 'http://localhost';
const CLOUD_IMG_URL = process.env.CLOUD_IMG_URL || '';
const PRODUCTION_MODE = process.env.SERVICE_MODE === 'production';

app.use('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json());
app.use(express.static(path.resolve(__dirname, './../public')));
app.use('/item/:id', express.static(path.resolve(__dirname, './../public')));

// Handle GET Requests for a single listing item
app.get('/api/item/:id', (req, res) => {
  // Get the item id from the URL
  let itemId = req.params.id;
  // If URL includes a human-friendly name after id, find where it starts.
  const idEndIndex = itemId.search(/[^0-9]/);
  if (idEndIndex > - 1) {
    // Modify the id to only include the number part in the URL
    itemId = req.params.id.slice(0, idEndIndex);
  }

  models.Listing.getById(Number(itemId))
    .then(results => {
      if (!results.length) {
        res.status(404).end('404 - Listing was not found');
        return;
      }
      const listing = results[0];
      // DEV: Return id calls with a max-limit of 101 while using mock images
      let itemId = listing.itemId;
      if (!PRODUCTION_MODE) {
        itemId = itemId % 101;
      }
      // Add the Cloud Provider URL in front of each file name
      listing.photosSmall = listing.photosSmall.map(fileName => {
        return `${CLOUD_IMG_URL}/${itemId}/${fileName}`;
      });
      res.json(listing).end();
    })
    .catch(err => res.status(500).end('There was an error'));
});

// Handle GET requests for listings under a category
app.get('/api/listings/:category', (req, res) => {
  const category = req.params.category;
  models.Listing.get({category})
    .then(results => {
      if (!results.length) {
        res.status(404).end('404 - Category was not found');
        return;
      }
      results.forEach(listing => {
        // DEV: Return id calls with a max-limit of 101 while using mock images
        let itemId = listing.itemId;
        if (!PRODUCTION_MODE) {
          itemId = itemId % 101;
        }
        // Add the Cloud Provider URL in front of each file name
        listing.photosSmall = listing.photosSmall.map(fileName => {
          return `${CLOUD_IMG_URL}/${itemId}/${fileName}`;
        });
      });
      res.json(results).end();
    })
    .catch(err => res.status(500).end('There was an error'));
});

// Handle GET requests for random listings under a category
app.get('/api/listings/:category/random', (req, res) => {
  const category = req.params.category;
  models.Listing.getRandom({category})
    .then(results => {
      if (!results.length) {
        res.status(404).end('404 - Category was not found');
        return;
      }
      results.forEach(listing => {
        // DEV: Return id calls with a max-limit of 101 while using mock images
        let itemId = listing.itemId;
        if (!PRODUCTION_MODE) {
          itemId = itemId % 101;
        }
        // Add the Cloud Provider URL in front of each file name
        listing.photosSmall = listing.photosSmall.map(fileName => {
          return `${CLOUD_IMG_URL}/${itemId}/${fileName}`;
        });
      });
      res.json(results).end();
    })
    .catch(err => res.status(500).end('There was an error'));
});

// Handle GET requests for news articles with tags
app.get('/api/news/:tags', (req, res) => {
  const tags = req.params.tags.split(',');
  models.Article.getByTag(tags)
    .then(results => {
      if (!results.length) {
        res.status(404).end('404 - No articles found');
        return;
      }
      results.forEach(article => {
        // Add the Cloud Provider URL in front of each file name
        article.imageSmall = `${CLOUD_IMG_URL}/articles/${article.imageSmall}`;
        article.imageFull = `${CLOUD_IMG_URL}/articles/${article.imageFull}`;
      });
      res.json(results).end();
    })
    .catch(err => res.status(500).end('There was an error'));
});

// Handle GET requests for random news articles with tags
app.get('/api/news/:tags/random', (req, res) => {
  const tags = req.params.tags.split(',');
  models.Article.getByTagRandom(tags)
    .then(results => {
      if (!results.length) {
        res.status(404).end('404 - No articles found');
        return;
      }
      results.forEach(article => {
        // Add the Cloud Provider URL in front of each file name
        article.imageSmall = `${CLOUD_IMG_URL}/articles/${article.imageSmall}`;
        article.imageFull = `${CLOUD_IMG_URL}/articles/${article.imageFull}`;
      });
      res.json(results).end();
    })
    .catch(err => res.status(500).end('There was an error'));
});

app.listen(PORT, () => console.log(
  `Sln listening at ${URL}:${PORT}`
  + ` on ${PRODUCTION_MODE ? 'production' : 'development'} mode`
));
