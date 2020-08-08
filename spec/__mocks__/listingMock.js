const response = {};

response.data = {
  'photosSmall': [
    '/fec-sln/30/small (1).jpg',
    '/fec-sln/30/small (2).jpg',
    '/fec-sln/30/small (3).jpg'
  ],
  '_id': '5f2e186c423f373565ec1dc1',
  'name': 'Intelligent Wooden Soap Guitar',
  'brand': 'Corwin, Cassin and Blanda',
  'style': 'Refined',
  'priceOriginal': 959,
  'priceDiscounted': 776.79,
  'category': 'Acoustic',
  'condition': 5,
  'itemId': 30,
  '__v': 0
};

response.json = () => response.data;

module.exports = response;
