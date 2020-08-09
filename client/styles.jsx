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
    max-width: 1320px;
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
  `,
  ListingsRow: styled.div`
  display: flex;
    flex-wrap: nowrap;
    min-width: 60em;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0.3em 0;
    div:first-of-type {
      margin-left: 2.9em;
    }
  `,
  BoxWrapper: styled.div`
    border: .01em solid #e4e4e4;
    cursor: pointer;
    margin: 0 .9em;
  `
};

export default Styles;
