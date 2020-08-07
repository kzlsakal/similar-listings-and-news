const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const DEFAULT_DB_URL = 'mongodb://localhost/reburke-sln';
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URL || DEFAULT_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  name: String,
  brand: String,
  category: String,
  style: String,
  // Non-Functioning, Poor, Fair, Good, Very Good, Excellent, Mint, B-Stock == Brand New
  condition: {type: Number, min: 1, max: 9},
  photosSmall: [String],
  priceOriginal: Number,
  priceActual: Number,
});

const Listing = mongoose.model('Listing', listingSchema);

// eslint-disable-next-line camelcase
Listing.plugin(AutoIncrement, {inc_field: 'itemId'});

const addListings = (...listings) => {
  return Listing.create(...listings);
};

const getListings = (options = {}) => {
  return Listing.find(options);
};

const getListingById = (itemId) => {
  return Listing.find({itemId});
};

module.exports = {
  addListings,
  getListings,
  getListingById
};
