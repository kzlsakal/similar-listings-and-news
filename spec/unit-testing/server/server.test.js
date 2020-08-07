const index = require('./../../../server/index.js');

test('Has a test case', (done) => {
  expect(index.testPort('test')).toBe('3005');
  done();
});
