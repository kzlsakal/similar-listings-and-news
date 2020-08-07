import React from 'react';
import { shallow, mount, render } from 'enzyme';

import client from './../../../client/index.jsx';

test('Has a test case', (done) => {
  expect(client('test')).toBe('test');
  done();
});
