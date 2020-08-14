import React from 'react';
import styled from 'styled-components';

const Styles = {
  ArticleBox: styled.div`
    border: .01em solid #e4e4e4;
    display: grid;
    grid-template-rows: 10em 3.8em 1.5em;
    min-width: 12rem;
    &:hover {
      box-shadow: 0 .1em .2em 0 rgba(33,33,33,.15);
      color: #f6870f;
      transition: box-shadow .1s ease-in-out;
    }
  `,
  Image: styled.img`
    display: block;
    height: 100%;
    object-fit: cover;
    width: 100%;
  `,
  Title: styled.span`
    display: block;
    margin: .4em .5em;
  `,
  Type: styled.span`
    text-align: right;
    display: block;
    color: #f6870f;
    font-weight: 700;
    font-size: .7em;
    letter-spacing: .08em;
    margin-bottom: .5em;
    margin-right: .7em;
    text-transform: uppercase;
  `
};

const NewsBox = (props) => {
  const handleClick = () => {
    props.onReadArticle(props.idx);
  };

  return (
    <Styles.ArticleBox onClick={handleClick}>
      <Styles.Image src={props.article.imageSmall} />
      <Styles.Title> {props.article.title} </Styles.Title>
      <Styles.Type> {props.article.type} </Styles.Type>
    </Styles.ArticleBox>
  );
};

export default NewsBox;
