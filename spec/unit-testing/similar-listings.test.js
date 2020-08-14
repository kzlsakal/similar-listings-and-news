import React from 'react';
import { shallow, mount, render } from 'enzyme';
import categoryMock from './../__mocks__/categoryMock.js';

import SimilarListings from './../../client/components/SimilarListings.jsx';

describe ('Similar Listings', () => {
  // Setup elements with ID id the DOM
  const listingRow = document.createElement('div');
  listingRow.setAttribute('id', 'sln-listings-row');
  Object.defineProperty(listingRow, 'clientWidth', {value: 1000});
  Object.defineProperty(listingRow, 'scrollWidth', {value: 1200});
  const scrollLeft = document.createElement('div');
  scrollLeft.setAttribute('id', 'sln-listings-scroll-left');
  const scrollRight = document.createElement('div');
  scrollRight.setAttribute('id', 'sln-listings-scroll-right');
  document.body.appendChild(listingRow);
  document.body.appendChild(scrollLeft);
  document.body.appendChild(scrollRight);

  const component = mount(<SimilarListings listings={categoryMock.json()}/>);
  const componentRendered = component.render().children().toString();

  test('Is a React Component', (done) => {
    expect(SimilarListings.__proto__).toBe(React.Component);
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

  test('Hides the scroll left button when the component mounts', (done) => {
    expect(scrollLeft.style.visibility).toBe('hidden');
    done();
  });

  test('Shows the scroll left button if there is room to scroll left', (done) => {
    listingRow.scrollLeft = 200;
    component.instance().handleScroll();
    expect(scrollLeft.style.visibility).toBe('visible');
    listingRow.scrollLeft = 0;
    done();
  });

  test('Scrolls right when the user clicks the scroll right button', (done) => {
    expect(listingRow.scrollLeft).toBe(0);
    const event = {target: {}};
    event.target.id = 'sln-listings-scroll-right';
    component.instance().handleScrollButton(event);
    expect(listingRow.scrollLeft).toBeGreaterThan(150);
    listingRow.scrollLeft = 0;
    done();
  });

  test('Hides the scroll right button when there is no room to scroll', (done) => {
    listingRow.scrollLeft = 1200;
    component.instance().handleScroll();
    expect(scrollRight.style.visibility).toBe('hidden');
    listingRow.scrollLeft = 0;
    component.instance().handleScroll();
    done();
  });

  test('Scrolls left when the user clicks the scroll left button', (done) => {
    listingRow.scrollLeft = 150;
    const event = {target: {}};
    event.target.id = 'sln-listings-scroll-left';
    component.instance().handleScrollButton(event);
    expect(listingRow.scrollLeft).toBe(0);
    done();
  });
});
