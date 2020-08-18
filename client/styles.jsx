import styled, {css, createGlobalStyle} from 'styled-components';

const Styles = {
  Global: createGlobalStyle`
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
