// @flow
import React from 'react';
import styles from './index.css';
import { ClipLoader } from 'react-spinners';
type Props = {
  text: ?React.Node,
  loadingText: ?React.Node,
  loaderColor: ?string,
  isLoading: ?boolean,
  onClick: () => *,
  disabled: ?boolean,
  color: ?string,
  backgroundColor: string,
};
const Button = (props: Props) => (
  <button
    style={{
      backgroundColor: props.disabled ? 'grey' : props.backgroundColor,
      color: props.color,
      cursor: props.disabled ? 'not-allowed' : 'pointer',
    }}
    className={styles.Button}
    disabled={props.disabled || props.isLoading}
  >
    {props.isLoading && (
      <ClipLoader
        color={props.loaderColor}
        loading={true}
        sizeUnit={'px'}
        size={20}
        className={styles.slightlyRight}
      />
    )}

    {!props.isLoading ? (
      props.text
    ) : (
      <span
        style={{
          marginLeft: '5px',
          top: '-5px',
          position: 'relative',
        }}
      >
        {props.loadingText}
      </span>
    )}
  </button>
);

Button.defaultProps = {
  text: 'Sample button',
  loadingText: 'loading',
  backgroundColor: 'tomato',
  loaderColor: '#fff',
  color: '#fff',
  isLoading: false,
  disabled: false,
};

export default Button;
