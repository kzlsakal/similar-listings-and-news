import React from 'react';
import styled from 'styled-components';

const barMax = 8;

const Styles = {
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

const ConditionIndicator = (props) => {
  let conditionText;
  let barCount;

  switch (props.condition) {
  case 9:
    barCount = 8;
    conditionText = 'Brand New';
    break;
  case 8:
    barCount = 8;
    conditionText = 'B-Stock';
    break;
  case 7:
    barCount = 7;
    conditionText = 'Mint';
    break;
  case 6:
    barCount = 6;
    conditionText = 'Excellent';
    break;
  case 5:
    barCount = 5;
    conditionText = 'Very Good';
    break;
  case 4:
    barCount = 4;
    conditionText = 'Good';
    break;
  case 3:
    barCount = 3;
    conditionText = 'Fair';
    break;
  case 2:
    barCount = 2;
    conditionText = 'Poor';
    break;
  case 1:
    barCount = 1;
    conditionText = 'Non-Functioning';
    break;
  }

  let condKey = `bar-cond-${props.preKey}-`;
  let fillKey = `bar-fill-${props.preKey}-`;

  return (
    <Styles.ListingCondition barCount={barCount}>
      {conditionText} <br />
      {Array(barMax - barCount).fill(0).map((item, idx) => (
        <Styles.ListingConditionFiller barCount={barCount} key={fillKey + idx}/>
      ))}
      {Array(barCount).fill(0).map((item, idx) => (
        <Styles.ListingConditionBar barCount={barCount} key={condKey + idx}/>
      ))}
    </Styles.ListingCondition>
  );
};

export default ConditionIndicator;
