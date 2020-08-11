import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Sln from './../../client/index.jsx';

describe ('Main Wrapper', () => {
  const component = mount(<Sln />);

  test('Has a main wrapper class component', (done) => {
    expect(Sln.__proto__).toBe(React.Component);
    done();
  });

  test('Has a state for the current listing', (done) => {
    expect(component.state().listing).toBeTruthy();
    done();
  });

  test('Has a state for similar listings', (done) => {
    expect(component.state().similarListings).toBeTruthy();
    done();
  });
});
