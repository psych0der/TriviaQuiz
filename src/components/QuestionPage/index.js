// @flow
import React, { Component } from 'react';
import styles from './index.css';
import { Button } from '../index';
import SweetAlert from 'react-bootstrap-sweetalert';
import { IconContext } from 'react-icons';
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from 'react-icons/io';
type Props = {
  questions: Array<{}>,
  currentQuestion: number,
  abortQuiz: () => *,
};
type State = {
  questionPointer: number, // this is to keep track of question being displayed
  showConfirm: boolean,
};
class QuestionPage extends Component<Props, State> {
  state = {
    questionPointer: 1,
    showConfirm: false,
  };

  // render confirm dialog
  confirmAbort = () => {
    this.setState({ showConfirm: true });
  };

  cancelAbort = () => {
    this.setState({ showConfirm: false });
  };

  render() {
    return (
      <div className={styles.questionPage}>
        edit me: at src/components/QuestionPage/index.js
        <div className={styles.NavigationContainer}>
          <div
            className={
              this.state.questionPointer > 1 ? styles.left : styles.disabledNav
            }
            onClick={
              this.state.questionPointer > 1 ? this.prevQuestion : () => {}
            }
          >
            <span className={styles.iconContainer}>
              <IoMdArrowRoundBack size="1.5em" />
            </span>
          </div>
          <div
            className={
              this.state.questionPointer <= this.props.questions.length
                ? styles.right
                : styles.disabledNav
            }
            onClick={
              this.state.questionPointer <= this.props.questions.length
                ? this.nextQuestion
                : () => {}
            }
          >
            <span className={styles.iconContainer}>
              <IoMdArrowRoundForward size="1.5em" />
            </span>
          </div>
        </div>
        <div className={styles.abortButtonContainer}>
          <Button
            backgroundColor="#D41602"
            text="Abort"
            onClick={this.confirmAbort}
          />
        </div>
        <SweetAlert
          type="danger"
          show={this.state.showConfirm}
          showCancel
          confirmBtnText="Yes, abort it!"
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          title="Are you sure you want to abort?"
          onConfirm={this.props.abortQuiz}
          onCancel={this.cancelAbort}
        >
          You will not be able to recover this imaginary file!
        </SweetAlert>
      </div>
    );
  }
}
export default QuestionPage;
