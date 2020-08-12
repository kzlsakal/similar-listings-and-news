import React from 'react';
import { shallow, mount, render } from 'enzyme';
import articlesMock from './../__mocks__/articlesMock.js';

import NewsBox from './../../client/components/NewsBox.jsx';

describe ('News Box', () => {
  const mockArticles = articlesMock.json();
  const article = mockArticles[2];
  let currentArticle = null;
  const handleReadArticle = (idx) => {
    currentArticle = idx;
  };
  const component = mount(
    <NewsBox article={article} idx={2} onReadArticle={handleReadArticle}/>
  );

  test('Renders the article image', (done) => {
    expect(component.find('img').length).toBe(1);
    done();
  });

  test('Should toggle the article when clicked on the box', (done) => {
    component.find('div').simulate('click');
    expect(currentArticle).toBe(2);
    currentArticle = null;
    done();
  });
});
