const db = require('./../db');

const Schema = db.Schema;

const articleSchema = new Schema({
  title: String,
  tags: [String],
  type: String,
  imageSmall: String,
  imageFull: String,
  content: String,
  published: Date
});

const Article = db.model('Article', articleSchema);

const add = (...listings) => {
  return Article.create(...listings);
};

const get = (options = {}, limit = 25) => {
  return Article.find(options).limit(limit).exec();
};

const getByTag = (tags, limit = 3) => {
  return Article.find({tags: {$in: tags}}).limit(limit).exec();
};

module.exports = {
  add,
  get,
  getByTag
};
