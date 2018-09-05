// @flow
import React from 'react';
import styles from './index.css';
import { SquareRadioButton, RoundRadioButton } from '../index';
type Props = {
  values: Array<string>,
  labels: Array<string>,
  defaultChecked: ?string,
  name: ?string,
  type: 'round' | 'square',
  onChange: () => *,
};
const RadioButtonGroup = (props: Props) => {
  return (
    <div className={styles.SquareRadioButtonGroup}>
      {props.values.map((value, index) => {
        if (props.type === 'square') {
          return (
            <SquareRadioButton
              value={value}
              id={index}
              name={props.name}
              label={props.labels[index]}
              checked={props.defaultChecked === value}
              onChange={props.onChange}
            />
          );
        } else {
          return (
            <RoundRadioButton
              value={value}
              id={index}
              name={props.name}
              label={props.labels[index]}
              checked={props.defaultChecked === value}
              onChange={props.onChange}
            />
          );
        }
      })}
    </div>
  );
};

/* Add default props */
RadioButtonGroup.defaultProps = {
  values: [],
  labels: [],
  defaultChecked: null,
  name: 'standard-name',
  type: 'square',
  onChange: () => {},
};

export default RadioButtonGroup;
