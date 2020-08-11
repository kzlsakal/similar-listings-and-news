import React from 'react';
import { shallow, mount, render } from 'enzyme';

import ConditionIndicator from './../../client/components/ConditionIndicator.jsx';

describe ('Condition Indicator', () => {
  const component = mount(<ConditionIndicator condition={5}/>);
  const componentRendered = component.render().toString();

  test('Renders the name of the condition correctly', (done) => {
    expect(componentRendered.indexOf('Very Good')).toBeGreaterThan(-1);
    expect(componentRendered.indexOf('Mint')).toBe(-1);
    expect(componentRendered.indexOf('Brand New')).toBe(-1);
    done();
  });

  test('Renders the correct amount of total boxes', (done) => {
    // Exclude itself by deducting 1
    expect(component.find('div').length - 1).toBe(8);
    done();
  });

  test('Renders the correct amount of indicator boxes', (done) => {
    const indicatorCount = [...componentRendered.matchAll('ConditionBar')];
    expect(indicatorCount.length).toBe(5);
    done();
  });

  test('Renders the correct amount of filler boxes', (done) => {
    const fillerCount = [...componentRendered.matchAll('Filler')];
    expect(fillerCount.length).toBe(3);
    done();
  });
});
