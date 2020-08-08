const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const DEFAULT_DB_URL = 'mongodb://localhost/reburke-sln';
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URL || DEFAULT_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  itemId: Number,
  name: String,
  brand: String,
  style: String,
  priceOriginal: Number,
  priceDiscounted: Number,
  category: String,
  // Non-Functioning, Poor, Fair, Good, Very Good, Excellent, Mint
  // B-Stock == Brand New
  condition: {type: Number, min: 1, max: 9},
  photosSmall: [String],
});

// eslint-disable-next-line camelcase
listingSchema.plugin(AutoIncrement, {inc_field: 'itemId', start_seq: 0});

const Listing = mongoose.model('Listing', listingSchema);

const addListings = (...listings) => {
  return Listing.create(...listings).exec();
};

const getListings = (options = {}, limit = 25) => {
  return Listing.find(options).limit(limit).exec();
};

const getListingById = (itemId) => {
  return Listing.find({itemId}).exec();
};

module.exports = {
  addListings,
  getListings,
  getListingById
};
