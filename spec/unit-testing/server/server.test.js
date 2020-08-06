const index = require('./../../../server/index.js');

test('Has a test case', () => {
  expect(index.testPort('test')).toBe('3005');
});
