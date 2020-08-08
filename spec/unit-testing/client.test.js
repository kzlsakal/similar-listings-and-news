import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Sln from './../../client/index.jsx';

test('Has a main wrapper class component', (done) => {
  expect(Sln.__proto__).toBe(React.Component);
  done();
});

test('Attaches the wrapper class to global scope for proxy usage', (done) => {
  expect(window.hasOwnProperty('Sln')).toBe(true);
  done();
});
