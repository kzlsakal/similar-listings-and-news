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
    grid-template-rows: 10rem min-content 1fr;
    background-color: #fff;
    border: .01em solid rgba(33,33,33,.45);
    height: 80%;
    margin: auto;
    max-width: 80rem;
    min-width: 20rem;
    min-height: 30rem;
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
    align-items: flex-end;
    color: #fff;
    display: flex;
    font-size: 2rem;
    font-size: 3vmax;
    height: 100%;
    line-height: 110%;
    padding-left: .2em;
    text-shadow: .02em .02em rgba(33,33,33,.4);
    user-select: none;
    overflow: hidden;
  `,
  Social: styled.div`
    padding: 4% 10%;
    padding: 1vmax 10%;
    text-align: right;
  `,
  SocialImage: styled.span`
    background-image: url("${props => props.image}");
    background-size: contain;
    cursor: pointer;
    display: inline-block;
    margin-left: .8em;
    opacity: .5;
    height: 1rem;
    width: 1rem;
  `,
  Info: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: #f1f1f1;
    font-size: .75em;
    font-style: italic;
    `,
  PostInfo: styled.div`
    display: block;
    margin: 2% 0 0 10%;
  `,
  AuthorName: styled.span`
    cursor: pointer;
    display: contents;
    color: #f6870f;
  `,
  TypeInfo: styled.span`
    cursor: pointer;
    display: block;
    font-weight: 700;
    letter-spacing: .08em;
    margin: 2% 0;
    font-style: normal;
    text-transform: uppercase;
    &:hover {
      color: #f6870f;
      transition: color .1s ease-in-out;
    }
  `,
  Content: styled.div`
    padding: 3%;
    text-align: justify;
    white-space: pre-line;
  `,
  Line: styled.hr`
    border: none;
    margin: 1.5em 3em;
    border-bottom: 1px solid #ececec;
  `,
  RelatedArticleHeader: styled.div`
    font-size: .8em;
    margin-top: 2em;
  `,
  NextArticle: styled.div`
    cursor: pointer;
    display: grid;
    grid-template-columns: 1fr 2fr;
    &:hover {
      color: #f6870f;
      transition: color .1s ease-in-out;
    }
    user-select: none;
  `,
  NextArticleImage: styled.img`
    display: block;
    height: 7.5em;
    object-fit: cover;
    width: 100%;
    &:hover {
      opacity: .8;
      transition: opacity .1s ease-in-out;
    }
  `,
  NextArticleContent: styled.div`
    margin: 1% 2% 0 2%;
    padding-right: 10%;
    text-align: left;
    `,
  NextArticleExcerpt: styled.div`
    font-size: .8em;
    margin-bottom: 1.2em;
    white-space: initial;
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
    if (
      targetId === 'sln-modal-next-content'
      || targetId === 'sln-modal-excerpt'
      || targetId === 'sln-modal-next-image'
    ) {
      props.onToggleRead(props.nextId);
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
          <Styles.RelatedArticleHeader>
            RELATED ARTICLE
          </Styles.RelatedArticleHeader>
          <Styles.Line />
          <Styles.NextArticle onClick={handleToggleRead}>
            <Styles.NextArticleImage
              src={props.nextArticle.imageSmall}
              id="sln-modal-next-image"
            />
            <Styles.NextArticleContent id="sln-modal-next-content">
              {props.nextArticle.title} <br/>
              <Styles.NextArticleExcerpt id="sln-modal-excerpt">
                {props.nextArticle.content.slice(0, 140) + ' ...'} <br/>
              </Styles.NextArticleExcerpt>
              Read more &gt;&gt;
            </Styles.NextArticleContent>
          </Styles.NextArticle>
          <Styles.Line />
        </Styles.Content>
      </Styles.ViewPort>
    </Styles.Modal>
  );
};

export default ArticleView;
