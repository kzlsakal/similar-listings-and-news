import styled, {css, createGlobalStyle} from 'styled-components';

import LatoWoff from './fonts/Lato-Regular.woff';
import LatoWoff2 from './fonts/Lato-Regular.woff2';
import LatoItalicWoff from './fonts/Lato-Italic.woff';
import LatoItalicWoff2 from './fonts/Lato-Italic.woff2';
import LatoBoldWoff from './fonts/Lato-Bold.woff';
import LatoBoldWoff2 from './fonts/Lato-Bold.woff2';

const Styles = {
  Global: createGlobalStyle`
    @font-face {
      font-family: 'Lato';
      src: local('Lato'), local('Lato'),
        url(${LatoWoff2}) format('woff2'),
        url(${LatoWoff}) format('woff');
      font-weight: 400;
      font-style: normal;
    }
    @font-face {
      font-family: 'Lato';
      src: local('Lato-Italic'), local('LatoItalic'),
        url(${LatoItalicWoff2}) format('woff2'),
        url(${LatoItalicWoff}) format('woff');
      font-weight: 400;
      font-style: italic;
    }
    @font-face {
      font-family: 'Lato';
      src: local('Lato-Bold'), local('LatoBold'),
        url(${LatoBoldWoff2}) format('woff2'),
        url(${LatoBoldWoff}) format('woff');
      font-weight: 700;
      font-style: bold;
    }
    #sln {
    box-sizing: border-box;
    max-width: 1300px;
    margin-left: auto;
    margin-right: auto;
    font-family: Lato, system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    color: #414141;
    font-size: 1em;
    line-height: 1.4;
    }
    #sln h2 {
    font-size: 1.4em;
    font-family: Lato, system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    font-weight: 400;
    margin: 0 2em;
    }
    #sln a {
      text-decoration: none;
      color: #414141;
    }
  `,
  ListingsRow: styled.div`
    display: flex;
    flex-wrap: nowrap;
    min-width: 50em;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0.3em 2.9em;
  `,
  BoxWrapper: styled.div`
    border: .01em solid #e4e4e4;
    color: #414141;
    cursor: pointer;
    display: grid;
    font-weight: 700;
    grid-template-rows: 2fr 1fr;
    margin-right: 1.8em;
    margin-bottom: .4em;
    &:hover {
      box-shadow: 0 .1em .8em 0 rgba(33,33,33,.15);
      transition: box-shadow .1s ease-in-out;
    }
  `,
  ListingInfo: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 35px 45px 25px;
  `,
  ListingHeader: styled.div`
    grid-column: 1/3;
    padding: .2em .3em;
  `,
  ListingDiscountedPrice: styled.div`
    align-self: flex-end;
    display: block;
    font-size: .8em;
    font-weight: 400;
    grid-column: 1/3;
    opacity: .6;
    padding: 0 .5em;
    text-decoration: line-through;
  `,
  ListingActualPrice: styled.div`
    align-self: flex-end;
    font-size: 1.15em;
    padding: 0 .3em;
  `,
  ListingCondition: styled.div`
    align-self: flex-end;
    font-size: .7em;
    line-height: .7em;
    margin-right: .7em;
    margin-bottom: .7em;
    text-align: right;
    color: ${props => {
    switch (props.barCount) {
    case 8:
      return '#30c966';
    case 7:
      return '#30c966';
    case 6:
      return '#2ec9bc';
    case 5:
      return '#32b7ec';
    case 4:
      return '#e6c62c';
    case 3:
      return '#f8ae37';
    case 2:
      return '#bf4f18';
    case 1:
      return '#bf4f18';
    }
  }};
  `,
  ListingConditionBar: styled.div`
    display: inline-block;
    margin-left: 2px;
    width: 4px;
    height: 3px;
    background-color: ${props => {
    switch (props.barCount) {
    case 8:
      return '#30c966';
    case 7:
      return '#30c966';
    case 6:
      return '#2ec9bc';
    case 5:
      return '#32b7ec';
    case 4:
      return '#e6c62c';
    case 3:
      return '#f8ae37';
    case 2:
      return '#bf4f18';
    case 1:
      return '#bf4f18';
    }
  }};
  `,
  ListingConditionFiller: styled.div`
    display: inline-block;
    background-color: #ececec;
    margin-left: 2px;
    width: 4px;
    height: 3px;
  `
};

export default Styles;
