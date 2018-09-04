// @flow
import React from 'react';
import styles from './index.css';
import { SquareRadioButton } from '../index';
type Props = {
  values: Array<string>,
  labels: Array<string>,
  defaultChecked: ?string,
  name: ?string,
  onChange: () => *,
};
const SquareRadioButtonGroup = (props: Props) => {
  return (
    <div className={styles.SquareRadioButtonGroup}>
      {props.values.map((value, index) => (
        <SquareRadioButton
          value={value}
          id={index}
          name={props.name}
          label={props.labels[index]}
          checked={props.defaultChecked === value}
          onChange={props.onChange}
        />
      ))}
    </div>
  );
};

/* Add default props */
SquareRadioButtonGroup.defaultProps = {
  values: [],
  labels: [],
  defaultChecked: null,
  name: 'standard-name',
  onChange: () => {},
};

export default SquareRadioButtonGroup;
