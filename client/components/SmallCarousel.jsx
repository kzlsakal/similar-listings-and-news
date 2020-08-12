import React, {Component} from 'react';
import styled, {css, createGlobalStyle} from 'styled-components';

const Carousel = {
  Wrapper: styled.div`
    position: relative;
    overflow: hidden;
    margin: 0;
    width: 210px;
    height: 210px;

    &:hover > div {
      opacity: 1;
      transition: all .2s ease;
    }
  `,
  Ul: styled.ul`
    position: relative;
    margin: 0;
    padding: 0;
    height: 200px;
    list-style: none;
    margin-left: -210px;
    width: ${props => props.imageCount * 210}px;
`,
  Li: styled.li`
    position: relative;
    display: block;
    float: left;
    margin: 0;
    padding: 0;
    width: 210px;
    height: 210px;
    background: #ccc;
    text-align: center;
    line-height: 210px;
  `,
  Image: styled.img`
    object-fit: cover;
    width: 210px;
    height: 210px;
  `,
  Prev: styled.div`
    align-items: center;
    background: linear-gradient(90deg, rgba(0,0,0,.4) 0%, rgba(0,0,0,.01) 100%);
    color: #fff;
    display: flex;
    font-family: serif;
    font-size: 36px;
    font-weight: 400;
    height: 100%;
    justify-content: flex-start;
    padding: 4% 3%;
    width: 30px;
    opacity: 0;
    position: absolute;
    text-decoration: none;
    user-select: none;
    z-index: 999;
  `,
  Next: styled.div`
    align-items: center;
    background: linear-gradient(90deg, rgba(0,0,0,.01) 0%, rgba(0,0,0,.4) 100%);
    color: #fff;
    display: flex;
    font-family: serif;
    font-size: 36px;
    font-weight: 400;
    height: 100%;
    justify-content: flex-end;
    width: 30px;
    opacity: 0;
    position: absolute;
    padding: 4% 3%;
    right: 0;
    text-decoration: none;
    user-select: none;
    z-index: 999;
  `
};

class SmallCarousel extends Component {
  constructor(props) {
    super(props);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.ulId = `sln-img-ul-${this.props.preKey}`;
    this.listIds = Array(this.props.images.length).fill(0).map((image, idx) => {
      return `sln-img-li-${this.props.preKey}-${idx}`;
    });
  }

  handlePrev () {
    const lastListId = this.listIds.pop();
    this.listIds.unshift(lastListId);
    const lastElement = document.getElementById(lastListId);
    const newFirstElement = lastElement.cloneNode(true);
    const ul = document.getElementById(this.ulId);
    ul.prepend(newFirstElement);
    newFirstElement.animate([
      {width: '0'},
      {width: '210px'}
    ], {
      duration: 500,
    });
    lastElement.animate([
      {width: '210px'},
      {width: '0'}
    ], {
      duration: 500,
    });
    setTimeout(() => {
      ul.removeChild(lastElement);
      // 15ms grace period for possible UI lagging
    }, 515);
  }

  handleNext () {
    const firstListId = this.listIds.shift();
    this.listIds.push(firstListId);
    const firstElement = document.getElementById(firstListId);
    const newLastElement = firstElement.cloneNode(true);
    const ul = document.getElementById(this.ulId);
    ul.append(newLastElement);
    newLastElement.animate([
      {width: '0'},
      {width: '210px'}
    ], {
      duration: 500,
    });
    firstElement.animate([
      {width: '210px'},
      {width: '0'}
    ], {
      duration: 500,
    });
    setTimeout(() => {
      ul.removeChild(firstElement);
      // 15ms grace period for possible UI lagging
    }, 485);
  }

  render () {
    return (
      <Carousel.Wrapper>
        <Carousel.Prev onClick={this.handlePrev}>&lt;</Carousel.Prev>
        <Carousel.Next onClick={this.handleNext}>&gt;</Carousel.Next>
        <a href={this.props.link}>
          <Carousel.Ul
            imageCount={this.props.images.length}
            id={`sln-img-ul-${this.props.preKey}`}
          >
            {Array(this.props.images.length).fill(0).map((image, idx) => {
              return (
                <Carousel.Li
                  key={`sln-img-li-${this.props.preKey}-${idx}`}
                  id={`sln-img-li-${this.props.preKey}-${idx}`}
                >
                  <Carousel.Image src={this.props.images[idx]} />
                </Carousel.Li>);
            })}
          </Carousel.Ul>
        </a>
      </Carousel.Wrapper>
    );
  }
}

export default SmallCarousel;
