import React from 'react';
import renderer from 'react-test-renderer';
import SquareRadioButton from './index.js';

it('renders Squareradiobutton correctly', () => {
  const component = renderer.create(<SquareRadioButton />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
