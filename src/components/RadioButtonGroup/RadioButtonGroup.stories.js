import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import RadioButtonGroup from './index.js';
import 'font-awesome/css/font-awesome.min.css';

storiesOf('RadioButtonGroup', module)
  .add('default', () => (
    <RadioButtonGroup
      labels={['Apple', 'Ball', 'Cat']}
      values={['1', '2', '3']}
    />
  ))
  .add('Round radio', () => (
    <RadioButtonGroup
      labels={['Choice 1', 'choice 2']}
      values={['1', '2']}
      type="round"
    />
  ))
  .add('Round radio with default checked', () => (
    <RadioButtonGroup
      labels={['Choice 1', 'choice 2']}
      values={['1', '2']}
      type="round"
      defaultChecked="2"
    />
  ))
  .add('Square with default checked', () => (
    <RadioButtonGroup
      labels={['Choice 1', 'choice 2']}
      values={['1', '2']}
      defaultChecked="1"
    />
  ))
  .add('with custom handler checked', () => (
    <RadioButtonGroup
      labels={['OSX', 'Windows']}
      values={['1', '2']}
      defaultChecked="1"
      onChange={action('change handler')}
    />
  ));
