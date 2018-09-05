import React from 'react';
import renderer from 'react-test-renderer';
import Button from './index.js';
import { mount } from 'enzyme';

it('renders default button state', () => {
  const component = renderer.create(<Button />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders disabled button correctly', () => {
  const wrapper = mount(<Button disabled={true} />);
  const button = wrapper.find('button');
  console.log(button.props()['disabled']);
  expect(button.props()['disabled']).toEqual(true);
});
