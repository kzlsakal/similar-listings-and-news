import React from 'react';
import { shallow, mount, render } from 'enzyme';
import categoryMock from './../__mocks__/categoryMock.js';

import SimilarListings from './../../client/components/SimilarListings.jsx';

describe ('Similar Listings', () => {
  const component = mount(<SimilarListings listings={categoryMock.json()}/>);
  const componentRendered = component.render().children().toString();

  test('Is a functional component', (done) => {
    expect(SimilarListings.__proto__).not.toBe(React.Component);
    done();
  });

  test('Renders on DOM with a header', (done) => {
    expect(component.find('h2').length).toBeGreaterThan(0);
    done();
  });

  test('Renders all similar category items given in the props', (done) => {
    const itemCount = categoryMock.json().length;
    expect([...componentRendered.matchAll('Guitar')].length).toBe(itemCount);
    done();
  });
});
