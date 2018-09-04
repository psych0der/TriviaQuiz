import React from 'react';
import renderer from 'react-test-renderer';
import SquareRadioButtonGroup from './index.js';
import { SquareRadioButton } from '../index';
import { shallow, mount } from 'enzyme';

const commonProps = {
  values: ['1', '2', '3'],
  labels: ['yes', 'no', 'maybe'],
};

it('Renders SquareRadioButtonGroup successfully', () => {
  const component = renderer.create(
    <SquareRadioButtonGroup {...commonProps} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('Renders correct number of SquareRadio buttons', () => {
  const props = Object.assign(commonProps, { defaultChecked: '2' });
  const wrapper = shallow(<SquareRadioButtonGroup {...props} />);
  expect(wrapper.find(SquareRadioButton)).toHaveLength(3);
});

it('Renders radio buttons with checked state based on defaultChecked prop', () => {
  const props = Object.assign(commonProps, { defaultChecked: '2' });
  const wrapper = mount(<SquareRadioButtonGroup {...props} />);
  const radioBoxes = wrapper.find('input[type="radio"]');
  const checkedRadioButton = radioBoxes.at(1);
  expect(checkedRadioButton.props()['value']).toEqual('2');
});
