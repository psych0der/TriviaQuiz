import React from 'react';
import renderer from 'react-test-renderer';
import RoundRadioButton from './index.js';

it('RoundRadioButton: default', () => {
  const component = renderer.create(<RoundRadioButton />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
