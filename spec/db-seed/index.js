const startOfProcess = new Date();
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const faker = require('faker');
const DEFAULT_DB_URL = 'mongodb://localhost/reburke-sln';
mongoose.Promise = Promise;

// Get the desired amount of generated listings argument from the node command
let generateAmount = 101;
if (process.argv.slice(2)[0]) {
  // If the amount argument is provided via npm set the desired amount
  generateAmount = Number(process.argv.slice(2)[0].split('=')[1]);
}

// Generate articles in the amount of 1/5 of listings, minimum 10.
generateArticleAmount = Math.floor(Math.max(generateAmount / 5, 10));

mongoose.connect(process.env.MONGODB_URL || DEFAULT_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const Schema = mongoose.Schema;

/**********************
 * Listing Schema
 */

// Define the schema for a listing
const listingSchema = new Schema({
  itemId: Number,
  name: String,
  brand: String,
  style: String,
  priceOriginal: Number,
  priceDiscounted: Number,
  category: String,
  condition: {type: Number, min: 1, max: 9},
  photosSmall: [String],
});

// Activate auto-incrementing for the itemId property
// eslint-disable-next-line camelcase
listingSchema.plugin(AutoIncrement, {inc_field: 'itemId', start_seq: 0});

// Define the model based on the listing schema
const Listing = mongoose.model('Listing', listingSchema);

/**********************
 * Listing Generation
 */

// Predefine the select guitar categories for mocked data
const guitarCategories = ['Acoustic', 'Bass', 'Electric'];

// Helper function to generate a single random listing
const generateRandomListing = () => {
  // Create a listing object with faked name, brand, style and price.
  const randomListing = {
    name: faker.fake('{{commerce.productName}}') + ' Guitar',
    brand: faker.fake('{{company.companyName}}'),
    style: faker.fake('{{commerce.productAdjective}}'),
    // Get 9 times of the Faker prices since guitars are expensive
    priceOriginal: Number(faker.fake('{{commerce.price}}') * 9).toFixed(2)
  };
  // Add a discounted price for the guitar
  const isDiscounted = Math.random() < 0.5 ? true : false;
  if (isDiscounted) {
    // A minimum of 5% a maximum of 34% discount
    const discount = Math.floor((Math.random() * 30) + 5) / 100;
    const price = randomListing.priceOriginal;
    randomListing.priceDiscounted = (price - (price * discount)).toFixed(2);
  }
  // Add the guitar's category
  randomListing.category = guitarCategories[
    Math.floor(Math.random() * guitarCategories.length)
  ];
  // Add the guitar's condition
  randomListing.condition = Math.floor(Math.random() * 9) + 1;
  // Generate file names for 3 to 7 small photos for the listing
  const randomNumberOfPhotos = Math.floor((Math.random() * 5) + 3);
  const fileNames = Array(randomNumberOfPhotos).fill(0).map(
    (file, i) => `small (${i + 1}).jpg`
  );
  randomListing.photosSmall = fileNames;
  return randomListing;
};

// Helper function to generate random listins for the desired amount
const generateBulkListings = (amount) => {
  const generatedListings = Array(amount).fill(0);
  return generatedListings.map(() => generateRandomListing());
};

// Create a bulk of new listings for the desired amount
const newListings = generateBulkListings(generateAmount);

/**********************
 * Article Schema
 */

const articleSchema = new Schema({
  author: String,
  title: String,
  tags: [String],
  type: String,
  imageSmall: String,
  imageFull: String,
  content: String,
  published: Date
});

const Article = mongoose.model('Article', articleSchema);

/**********************
 * Article Generation
 */

// Predefine the select article tags for mocked data
const articleTags = ['Acoustic', 'Bass', 'Electric'];
// Predefine the select article types for mocked data
const articleTypes = [
  'interviews',
  'news and reviews',
  'tone report',
  'gear history',
  'demos'
];
// Keep the sequence to correctly mock the image URLs
let articleSequence = 1;

// Helper function to generate a single random article
const generateRandomArticle = () => {
  const randomTag = articleTags[Math.floor(Math.random() * articleTags.length)];
  const randomType = articleTypes[Math.floor(Math.random() * articleTags.length)];
  let randomNoun = faker.fake('{{company.catchPhraseNoun}}');
  const randomNounWords = randomNoun.split(' ').map(
    word => word[0].toUpperCase() + word.slice(1)
  );
  randomNoun = randomNounWords.join(' ');
  const randomArticle = {
    author: faker.fake('{{name.firstName}} {{name.firstName}}'),
    title: faker.fake(
      `{{company.catchPhraseAdjective}} ${randomTag} ${randomNoun}`
    ),
    tags: [randomTag],
    type: randomType,
    imageSmall: `small (${articleSequence}).jpg`,
    imageFull: `full (${articleSequence}).jpg`,
    content: faker.fake('{{lorem.paragraphs}}'),
    // Get a random published date between now and 5 years ago
    published: new Date() - Math.floor(Math.random() * 157680000000)
  };
  articleSequence++;
  // Limit article sequence to generate max 30 image URLs
  if (articleSequence > 30) {
    articleSequence = 1;
  }
  return randomArticle;
};

// Helper function to generate random articles for the desired amount
const generateBulkArticles = (amount) => {
  const generatedArticles = Array(amount).fill(0);
  return generatedArticles.map(() => generateRandomArticle());
};

// Create a bulk of new listings for the desired amount
const newArticles = generateBulkArticles(generateArticleAmount);

/**********************
 * Database seeding
 */

// Reset the unique itemId counter for the listing
Listing.counterReset('itemId', (err) => {
  if (err) {
    throw err;
  }
  console.log('1) itemId counter is successfully reset.');
});

// Truncate the existing listings collection
Listing.deleteMany({})
  .then(result => {
    console.log(`2) Deleted ${result.deletedCount} listings from the collection.`);
    // Truncate the existing articles collection
    return Article.deleteMany({});
  })
  .then(result => {
    console.log(`3) Deleted ${result.deletedCount} articles from the collection.`);
    // Add the randomly generated listings to the database
    return Listing.create(...newListings);
  })
  .then(results => {
    console.log(`4) Added ${results.length} randomly generated listings.`);
    // Add the randomly generated articles to the database
    return Article.create(...newArticles);
  })
  .then(results => {
    console.log(`5) Added ${results.length} randomly generated listings.`);
    const lengthOfProcess = new Date() - startOfProcess;
    console.log(`Process completed in ${lengthOfProcess} ms.`);
    mongoose.disconnect((err) => {
      if (err) {
        throw err;
      }
      process.exit();
    });
  })
  .catch(err => {
    throw err;
    mongoose.disconnect((err) => {
      if (err) {
        throw err;
      }
      process.exit();
    });
  });
