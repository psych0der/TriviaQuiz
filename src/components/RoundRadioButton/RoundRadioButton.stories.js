import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import RoundRadioButton from './index.js';
import 'font-awesome/css/font-awesome.min.css';

storiesOf('RoundRadioButton', module)
  .add('default', () => <RoundRadioButton />)
  .add('with custom label', () => <RoundRadioButton label="Milk" />)
  .add('with default checked state', () => (
    <RoundRadioButton label="I am already checked" checked={true} />
  ))
  .add('with custom change handler', () => (
    <RoundRadioButton label="Click me" onChange={action('change handler')} />
  ));
