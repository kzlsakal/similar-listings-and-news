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
      url(./sln-assets/Lato-Regular.woff2) format('woff2'),
      url(./sln-assets/Lato-Regular.woff) format('woff');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Lato';
    src: local('Lato-Italic'), local('LatoItalic'),
      url(./sln-assets/Lato-Italic.woff2) format('woff2'),
      url(./sln-assets/Lato-Italic.woff) format('woff');
    font-weight: 400;
    font-style: italic;
  }
  @font-face {
    font-family: 'Lato';
    src: local('Lato-Bold'), local('LatoBold'),
      url(./sln-assets/Lato-Bold.woff2) format('woff2'),
      url(./sln-assets/Lato-Bold.woff) format('woff');
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
    @media (max-width: 768px) {
      margin: 0 5%;
    }
    }
    #sln a {
      text-decoration: none;
      color: #414141;
    }
  `
};

export default Styles;
