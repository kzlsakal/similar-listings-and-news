import React from 'react';
import { shallow, mount, render } from 'enzyme';
import listingMock from './../__mocks__/listingMock.js';
const ORIGIN = document.location.origin;

import ListingBox from './../../client/components/ListingBox.jsx';

describe ('Listing Box', () => {
  const component = mount(<ListingBox listing={listingMock.json()}/>);
  const componentRendered = component.render().children().toString();

  test('Is a functional component', (done) => {
    expect(ListingBox.__proto__).not.toBe(React.Component);
    done();
  });

  test('Renders a link to the listing\'s page', (done) => {
    const itemId = component.prop('listing').itemId;
    const link = `${ORIGIN}/item/${component.prop('listing').itemId}`;
    const hasTheLink = componentRendered.indexOf(link) > - 1;
    expect(hasTheLink).toBe(true);
    done();
  });

  test('Renders the correct price', (done) => {
    const price = '$' + component.prop('listing').priceOriginal;
    const hasThePrice = componentRendered.indexOf(price) > - 1;
    expect(hasThePrice).toBe(true);
    done();
  });

  test('Renders the correct name for the listing', (done) => {
    const name = component.prop('listing').name;
    const hasTheName = componentRendered.indexOf(name) > - 1;
    done();
  });
});
