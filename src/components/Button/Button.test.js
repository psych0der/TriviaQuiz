import React from 'react';
import renderer from 'react-test-renderer';
import Button from './index.js';
import { mount, shallow } from 'enzyme';

it('renders default button state', () => {
  const component = renderer.create(<Button />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders disabled button correctly', () => {
  const wrapper = mount(<Button disabled={true} />);
  const button = wrapper.find('button');
  expect(button.props()['disabled']).toEqual(true);
});

it('renders small button correctly', () => {
  const wrapper = shallow(<Button small={true} />);
  const button = wrapper.find('button');
  expect(button.props()['className'].split(' ').length).toEqual(2);
});
