import React from 'react';
import { shallow, mount, render } from 'enzyme';
import listingMock from './../__mocks__/listingMock.js';
import createMockElement from './../__mocks__/elementMock.js';

import SmallCarousel from './../../client/components/SmallCarousel.jsx';

describe ('Listing Box', () => {
  const component = mount(
    <SmallCarousel
      images={listingMock.json().photosSmall}
      preKey='30'
    />
  );
  const componentRendered = component.render().children().toString();
  const element = component.getDOMNode();
  const images = component.prop('images');

  test('Renders the first image correctly', (done) => {
    const imageUrl = component.prop('images')[0];
    const imageTag = `<img src="${imageUrl}"`;
    const hasTheImage = componentRendered.indexOf(imageTag) > - 1;
    expect(hasTheImage).toBe(true);
    done();
  });

  test('Renders all images', (done) => {
    const imageCount = images.length;
    expect(imageCount).toBe(element.children.length);
    expect(component.find('img').length).toBe(imageCount);
    done();
  });

  test('Has a previous method that brings the last image to front', (done) => {
    const mockElement = Object.create(element);
    mockElement.listIds = Array.from({length: 3}, (x, i) => i);
    mockElement.ulId = `${component.prop('preKey')}`;

    const ulElement = createMockElement('ul');
    ulElement.setAttribute('id', mockElement.ulId);
    document.body.append(ulElement);

    mockElement.listIds.forEach((image, idx) => {
      const newElement = createMockElement('li');
      newElement.setAttribute('id', mockElement.listIds[idx]);
      ulElement.append(newElement);
    });

    const handlePrev = SmallCarousel.prototype.handlePrev.bind(mockElement);
    handlePrev();
    expect(mockElement.listIds[0]).not.toBe(0);
    done();
  });

  test('Has a next method that brings the first image to end', (done) => {
    const mockElement = Object.create(element);
    mockElement.listIds = Array.from({length: 3}, (x, i) => i);
    mockElement.ulId = `${component.prop('preKey')}`;

    const ulElement = createMockElement('ul');
    ulElement.setAttribute('id', mockElement.ulId);
    document.body.append(ulElement);

    mockElement.listIds.forEach((image, idx) => {
      const newElement = createMockElement('li');
      newElement.setAttribute('id', mockElement.listIds[idx]);
      ulElement.append(newElement);
    });

    const handleNext = SmallCarousel.prototype.handleNext.bind(mockElement);
    handleNext();
    expect(mockElement.listIds[mockElement.listIds.length - 1]).toBe(0);
    done();
  });
});
