import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import SquareRadioButton from './index.js';

storiesOf('SquareRadioButton', module)
  .add('default', () => <SquareRadioButton />)
  .add('with custom label', () => <SquareRadioButton label="Milk" />)
  .add('with default checked state', () => (
    <SquareRadioButton label="I am already checked" checked={true} />
  ))
  .add('with custom change handler', () => (
    <SquareRadioButton label="Click me" onChange={action('change handler')} />
  ));
