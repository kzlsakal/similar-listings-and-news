import React from 'react';
import { shallow, mount, render } from 'enzyme';
import articlesMock from './../__mocks__/articlesMock.js';
const ORIGIN = document.location.origin;

const mockArticles = articlesMock.json();
const article = mockArticles[0];
const nextArticle = mockArticles[1];

import ArticleView from './../../client/components/ArticleView.jsx';

describe ('Listing Box', () => {
  let clicked = false;

  const handleClick = () => {
    clicked = true;
  };

  const component = mount(
    <ArticleView
      article={article}
      nextArticle={nextArticle}
      nextId={1}
      onToggleRead={handleClick}
    />
  );
  const componentRendered = component.render().children().toString();

  test('Is a functional component', (done) => {
    expect(ArticleView.__proto__).not.toBe(React.Component);
    done();
  });

  test('Can switch between articles', (done) => {
    component.find('#sln-modal-next-content').at(0).simulate('click');
    expect(clicked).toBe(true);
    clicked = false;
    component.find('#sln-modal-excerpt').at(0).simulate('click');
    expect(clicked).toBe(true);
    clicked = false;
    component.find('#sln-modal-next-image').at(0).simulate('click');
    expect(clicked).toBe(true);
    clicked = false;
    done();
  });

  test('Can close the modal popup', (done) => {
    component.find('#sln-modal-bg').at(0).simulate('click');
    expect(clicked).toBe(true);
    clicked = false;
    component.find('#sln-modal-close').at(0).simulate('click');
    expect(clicked).toBe(true);
    clicked = false;
    done();
  });
});
