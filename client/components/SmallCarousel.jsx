import React, {Component} from 'react';
import styled, {css, createGlobalStyle} from 'styled-components';

const Carousel = {
  Wrapper: styled.div`
    position: relative;
    overflow: hidden;
    margin: 0;
    width: 210px;
    height: 210px;
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
    color: #fff;
    display: flex;
    font-family: auto;
    font-size: 36px;
    font-weight: 400;
    height: 100%;
    justify-content: flex-start;
    padding: 4% 3%;
    width: 30px;
    background: linear-gradient(90deg, rgba(0,0,0,.4) 0%, rgba(0,0,0,.01) 100%);
    opacity: 0;
    position: absolute;
    text-decoration: none;
    user-select: none;
    z-index: 999;
    &:hover {
      opacity: 1;
      transition: all .2s ease;
    }
  `,
  Next: styled.div`
    align-items: center;
    background: linear-gradient(90deg, rgba(0,0,0,.01) 0%, rgba(0,0,0,.4) 100%);
    color: #fff;
    display: flex;
    font-family: auto;
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
    &:hover {
      opacity: 1;
      transition: all .2s ease;
    }
  `
};

class SmallCarousel extends Component {
  constructor(props) {
    super(props);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.state = {
      slideDeck: this.props.images
    };
  }

  handlePrev () {
    const newSlideDeck = this.state.slideDeck;
    newSlideDeck.unshift(newSlideDeck.pop());
    this.setState({slideDeck: newSlideDeck});
  }

  handleNext () {
    const newSlideDeck = this.state.slideDeck;
    newSlideDeck.push(newSlideDeck.shift());
    this.setState({slideDeck: newSlideDeck});
  }

  render () {
    return (
      <Carousel.Wrapper>
        <Carousel.Prev onClick={this.handlePrev}>&lt;</Carousel.Prev>
        <Carousel.Next onClick={this.handleNext}>&gt;</Carousel.Next>
        <Carousel.Ul imageCount={this.props.images.length}>
          {Array(this.props.images.length).fill(0).map((image, idx) => {
            return (
              <Carousel.Li key={`img-li-${this.props.preKey}-${idx}`}>
                <Carousel.Image src={this.props.images[idx]} />
              </Carousel.Li>);
          })}

        </Carousel.Ul>
      </Carousel.Wrapper>
    );
  }
}

export default SmallCarousel;
