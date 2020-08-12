import React from 'react';
import styled from 'styled-components';

const Styles = {
  Modal: styled.div`
    background-color: rgba(33,33,33,.45);
    border: .01em solid #e4e4e4;
    height: 100%;
    left: 0;
    overflow-y: auto;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9001;
  `,
  ViewPort: styled.div`
    display: grid;
    grid-template-rows: 10em 4em 1fr;
    background-color: #fff;
    border: .01em solid rgba(33,33,33,.45);
    height: 80%;
    margin: auto;
    min-width: 50em;
    min-height: 30em;
    overflow: auto;
    position: relative;
    top: 9%;
    width: 80%;
    z-index: 9002;
  `,
  CloseButton: styled.div`
    color: #e4e4e4;
    cursor: pointer;
    float: right;
    font-size: 2em;
    font-weight: 700;
    margin-right: .4em;
    text-shadow: .02em .02em rgba(33,33,33,.4);
    &:hover {
      color: #f6870f;
      transition: color .1s ease-in-out;
    }
  `,
  Banner: styled.div`
    background-image: url("${props => props.image}");
    background-size: cover;
    background-position: 50% 50%;
    display: block;
    height: 100%;
    width: 100%;
  `,
  Title: styled.span`
    color: #fff;
    display: block;
    font-size: 3em;
    padding: 2em 0 0 .2em;
    text-shadow: .02em .02em rgba(33,33,33,.4);
    user-select: none;
  `,
  Social: styled.div`
    padding: 2em 1em;
    text-align: right;
  `,
  SocialImage: styled.span`
    background-image: url("${props => props.image}");
    background-size: contain;
    cursor: pointer;
    display: inline-block;
    margin-left: .8em;
    opacity: .5;
    height: 16px;
    width: 16px;
  `,
  Info: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: #f1f1f1;
    font-size: .75em;
    font-style: italic;
    `,
  PostInfo: styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    padding: 1em 0 0 1em;
  `,
  AuthorName: styled.span`
    cursor: pointer;
    display: contents;
    color: #f6870f;
  `,
  TypeInfo: styled.span`
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
    font-style: normal;
  `,
  Content: styled.div`
    padding: 3em;
    text-align: justify;
    white-space: pre-line;
  `
};

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

const ArticleView = (props) => {
  if (!props.article) {
    return null;
  }

  const handleToggleRead = (event) => {
    const targetId = event.target.id;
    if (targetId === 'sln-modal-bg' || targetId === 'sln-modal-close') {
      props.onToggleRead(-1);
    }
  };
  const date = new Date(props.article.published);
  const formattedDate = months[date.getMonth()]
    + ' '
    + date.getDate()
    + ', '
    + date.getFullYear();
  return (
    <Styles.Modal onClick={handleToggleRead} id="sln-modal-bg">

      <Styles.ViewPort>
        <Styles.Banner image={props.article.imageFull}>
          <Styles.CloseButton id="sln-modal-close">&times;</Styles.CloseButton>
          <Styles.Title>
            {props.article.title}
          </Styles.Title>
        </Styles.Banner>
        <Styles.Info>
          <Styles.PostInfo>
            Published {formattedDate} by
            <Styles.AuthorName>{' ' + props.article.author}</Styles.AuthorName>
            <Styles.TypeInfo>
              {props.article.type}
            </Styles.TypeInfo>
          </Styles.PostInfo>
          <Styles.Social>
            <Styles.SocialImage image="https://rb.gy/o6tqti" />
            <Styles.SocialImage image="https://rb.gy/f9pt8n" />
            <Styles.SocialImage image="https://rb.gy/tmvrne" />
            <Styles.SocialImage image="https://rb.gy/70ubdh" />
          </Styles.Social>
        </Styles.Info>
        <Styles.Content>
          {props.article.content}
        </Styles.Content>
      </Styles.ViewPort>
    </Styles.Modal>
  );
};

export default ArticleView;
