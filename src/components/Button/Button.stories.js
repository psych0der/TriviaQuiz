import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import Button from './index.js';

storiesOf('Button', module)
  .add('default', () => <Button />)
  .add('custom text', () => <Button text="custom text" />)
  .add('small ', () => <Button text="small button" small={true} />)
  .add('loading', () => <Button isLoading={true} />)
  .add('disabled', () => <Button disabled={true} />)
  .add('custom color', () => <Button backgroundColor="green" />)
  .add('custom text color', () => <Button color="green" />);
