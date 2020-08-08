const startOfProcess = new Date();
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const faker = require('faker');
const DEFAULT_DB_URL = 'mongodb://localhost/reburke-sln';
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URL || DEFAULT_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const Schema = mongoose.Schema;

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

// Predefine the select guitar categories for mocked data
const guitarCategories = ['Acoustic', 'Bass', 'Electric'];

// Helper function to generate a single random listing
const generateRandomListing = () => {
  // Create a listing object with faked name, brand, style and price.
  const randomListing = {
    name: faker.fake('{{commerce.productName}}') + ' Guitar',
    brand: faker.fake('{{company.companyName}}'),
    style: faker.fake('{{commerce.productAdjective}}'),
    priceOriginal: Number(faker.fake('{{commerce.price}}')).toFixed(2)
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
  // Generate file names for 2 to 7 small photos for the listing
  const randomNumberOfhotos = Math.floor((Math.random() * 6) + 2);
  const fileNames = Array(randomNumberOfhotos).fill(0).map(
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

// Get the desired amount of generated listings argument from the node command
let generateAmount = 101;
if (process.argv.slice(2)[0]) {
  // If the amount argument is provided via npm set the desired amount
  generateAmount = Number(process.argv.slice(2)[0].split('=')[1]);
}

// Create a bulk of new listings for the desired amount
const newListings = generateBulkListings(generateAmount);

// Activate auto-incrementing for the itemId property
// eslint-disable-next-line camelcase
listingSchema.plugin(AutoIncrement, {inc_field: 'itemId', start_seq: 0});

// Define the model based on the listing schema
const Listing = mongoose.model('Listing', listingSchema);

// Reset the unique itemId counter for the listing
Listing.counterReset('itemId', (err) => {
  if (err) {
    throw err;
  }
  console.log('1) itemId counter is successfully reset.');
});

// Truncate the existing listings collection
Listing.deleteMany({})
  .then((result) => {
    console.log(`2) Deleted ${result.deletedCount} items from the collection.`);
    // Add the randomly generated listings to the database
    return Listing.create(...newListings);
  })
  .then((results) => {
    console.log(`3) Added ${results.length} randomly generated items.`);
    const lengthOfProcess = new Date() - startOfProcess;
    console.log(`Process completed in ${lengthOfProcess} ms.`);
    mongoose.disconnect((err) => {
      if (err) {
        throw err;
      }
      process.exit();
    });
  })
  .catch((err) => {
    throw err;
    mongoose.disconnect((err) => {
      if (err) {
        throw err;
      }
      process.exit();
    });
  });
