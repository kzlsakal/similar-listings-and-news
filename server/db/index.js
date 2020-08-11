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

module.exports = mongoose;