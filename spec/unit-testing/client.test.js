import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Sln from './../../client/index.jsx';

test('Has a main wrapper class component', (done) => {
  expect(Sln.__proto__).toBe(React.Component);
  done();
});

test('Renders on DOM with at least one header', (done) => {
  expect(mount(<Sln />).find('h2').length).toBeGreaterThan(0);
  done();
});
