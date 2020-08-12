import React from 'react';
import { shallow, mount, render } from 'enzyme';
import articlesMock from './../__mocks__/articlesMock.js';

import Sln from './../../client/index.jsx';

describe ('Main Wrapper', () => {
  const mockArticles = articlesMock.json();
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

  test('Toggles a modal pop-up with the correct article', (done) => {
    component.setState({relatedNews: mockArticles}, () => {
      component.instance().toggleArticle(1);
    });
    expect(component.state('readingArticle')).toBe(mockArticles[1]);
    done();
  });

  test('Enables link-between articles', (done) => {
    component.setState({relatedNews: mockArticles}, () => {
      component.instance().toggleArticle(0);
    });
    expect(component.state('nextId')).toBe(1);
    expect(component.state('nextArticle')).toBe(mockArticles[1]);
    done();
  });

  test('Links the first related article whenr reached end of list', (done) => {
    component.setState({relatedNews: mockArticles}, () => {
      component.instance().toggleArticle(2);
    });
    expect(component.state('nextId')).toBe(0);
    expect(component.state('nextArticle')).toBe(mockArticles[0]);
    done();
  });

  test('Can toggle off the modal popup', (done) => {
    component.setState({relatedNews: mockArticles}, () => {
      component.instance().toggleArticle(-1);
    });
    expect(component.state('readingArticle')).toBe(null);
    expect(component.state('nextId')).toBe(null);
    expect(component.state('nextArticle')).toBe(null);
    done();
  });
});
