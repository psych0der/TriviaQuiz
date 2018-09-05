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
const RoundRadioButton = (props: Props) => (
  <div className={styles.RoundRadioButtonContainer}>
    <input
      type="radio"
      id={props.id}
      name={props.name}
      value={props.value}
      defaultChecked={props.checked}
      className={styles.RoundRadioButton}
      onChange={props.onChange}
    />
    <label className={styles.RoundRadioButtonLabel} for={props.id}>
      {props.label}
    </label>
  </div>
);
/* Add default props */
RoundRadioButton.defaultProps = {
  checked: false,
  id: 'id-0',
  name: 'name-round-0',
  label: 'Yes',
  value: 'some-val',
  onChange: () => {},
};

export default RoundRadioButton;
