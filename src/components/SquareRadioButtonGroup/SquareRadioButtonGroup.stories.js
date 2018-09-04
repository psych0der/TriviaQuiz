import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import SquareRadioButtonGroup from './index.js';

storiesOf('SquareRadioButtonGroup', module)
  .add('default', () => (
    <SquareRadioButtonGroup
      labels={['Apple', 'Ball', 'Cat']}
      values={['1', '2', '3']}
    />
  ))
  .add('with default checked', () => (
    <SquareRadioButtonGroup
      labels={['Choice 1', 'choice 2']}
      values={['1', '2']}
      defaultChecked="1"
    />
  ))
  .add('with custom handler checked', () => (
    <SquareRadioButtonGroup
      labels={['OSX', 'Windows']}
      values={['1', '2']}
      defaultChecked="1"
      onChange={action('change handler')}
    />
  ));
