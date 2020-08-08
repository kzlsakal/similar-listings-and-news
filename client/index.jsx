import React, {Component} from 'react';
import styled, {css} from 'styled-components';

const testCase = val => val;

class Sln extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        Hello world
      </div>
    );
  }
}

window.Sln = Sln;
export default Sln;
