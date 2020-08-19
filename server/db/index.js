const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const DEFAULT_DB_URL = 'mongodb://localhost/reburke-sln';
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URL || DEFAULT_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  connectTimeoutMS: 10000
})
  .catch(err => { throw new Error(err); });

const Schema = mongoose.Schema;

module.exports = mongoose;