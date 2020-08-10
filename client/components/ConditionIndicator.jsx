import React from 'react';
import Styles from './../styles.jsx';

const barMax = 8;

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
