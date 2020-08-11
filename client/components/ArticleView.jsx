import React from 'react';
import styled from 'styled-components';

const Styles = {
  Modal: styled.div`
    border: .01em solid #e4e4e4;
    position: fixed;
    z-index: 9001;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    overflow: auto;
    background-color: rgba(33,33,33,.45);
  `,
  ViewPort: styled.div`
    background-color: #fff;
    border: .01em solid #e4e4e4;
    position: relative;
    z-index: 9001;
    width: 80%;
    height: 80%;
    top: 9%;
    min-width: 50em;
    min-height: 30em;
    overflow: auto;
    margin: auto;
    z-index: 9002;
    padding: 2em;
  `,
  CloseButton: styled.div`
    color: #e4e4e4;
    cursor: pointer;
    float: right;
    font-size: 28px;
    font-weight: 700;
    &:hover {
      color: #f6870f;
      transition: box-shadow .1s ease-in-out;
    }
  `,
};

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

  return (
    <Styles.Modal onClick={handleToggleRead} id="sln-modal-bg">
      <Styles.ViewPort>
        <Styles.CloseButton id="sln-modal-close">&times;</Styles.CloseButton>
        HEBEBLE
      </Styles.ViewPort>
    </Styles.Modal>
  );
};

export default ArticleView;
