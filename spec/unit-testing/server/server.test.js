const index = require('./../../../server/index.js');

test('Has a test case', () => {
  expect(index.testCase('test')).toBe('test');
});
