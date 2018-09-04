// @flow
import React from 'react';
import styles from './index.css';
type Props = {
  checked: boolean,
  name: ?string,
  id: ?string,
  label: ?string,
  value: ?string,
  onChange: () => *,
};
const SquareRadioButton = (props: Props) => {
  return (
    <div className={styles.SquareRadioButtonContainer}>
      <input
        type="radio"
        id={props.id}
        name={props.name}
        value={props.value}
        defaultChecked={props.checked}
        className={styles.squareRadioButton}
        onChange={props.onChange}
      />
      <label for={props.id}>{props.label}</label>
    </div>
  );
};

/* Add default props */
SquareRadioButton.defaultProps = {
  checked: false,
  id: 'id-0',
  name: 'name-0',
  label: 'Yes',
  value: 'some-val',
  onChange: () => {},
};

export default SquareRadioButton;
