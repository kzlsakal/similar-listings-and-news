import React from 'react';
import styled from 'styled-components';
import NewsBox from './NewsBox.jsx';

const Styles = {
  NewsWrapper: styled.div`
    margin-top: 1.5em;
  `,
  NewsRow: styled.div`
    color: #414141;
    cursor: pointer;
    display: grid;
    gap: 1.8em;
    font-weight: 400;
    grid-template-columns: 1fr 1fr 1fr;
    margin: .3em 2.8em;
    overflow-x: auto;
  `
};

const RelatedNews = (props) => {
  return (
    <Styles.NewsWrapper>
      <h2>ReBurke News</h2>
      <Styles.NewsRow>
        {props.articles.map((article, idx) => (
          <NewsBox
            article={article}
            key={`article-${idx}`}
            idx={idx}
            onReadArticle={props.onReadArticle}
          />
        ))}
      </Styles.NewsRow>
    </Styles.NewsWrapper>
  );
};

export default RelatedNews;
