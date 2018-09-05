// @flow
import React, { Component } from 'react';
import styles from './index.css';
import { Button, QuestionBox } from '../index';
import SweetAlert from 'react-bootstrap-sweetalert';
import { IconContext } from 'react-icons';
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from 'react-icons/io';
type Props = {
  questions: Array<{}>,
  currentQuestion: number,
  abortQuiz: () => *,
  submittedAnswers: Array<Object>,
  submitAnswer: () => *,
};
type State = {
  questionPointer: number, // this is to keep track of question being displayed
  showConfirm: boolean,
};
class QuestionPage extends Component<Props, State> {
  state = {
    questionPointer: this.props.currentQuestion,
    showConfirm: false,
  };

  // render confirm dialog
  confirmAbort = () => {
    this.setState({ showConfirm: true });
  };

  cancelAbort = () => {
    this.setState({ showConfirm: false });
  };

  /* sets current pointer to previous question if allowed */
  prevQuestion = () => {
    const questionPointer = this.state.questionPointer;
    if (questionPointer > 1) {
      this.setState({ questionPointer: questionPointer - 1 });
    }
  };

  /* sets current pointer to next question if allowed */
  nextQuestion = () => {
    const questionPointer = this.state.questionPointer;
    if (
      questionPointer < this.props.currentQuestion &&
      questionPointer <= this.props.questions.length
    ) {
      this.setState({ questionPointer: questionPointer + 1 });
    }
  };

  /**
   * Submits answer and iterates current question marker.
   */
  submitAnswer = (answer: boolean) => {
    this.props.submitAnswer(answer);
    const questionPointer = this.state.questionPointer;
    if (questionPointer < this.props.questions.length) {
      this.setState({ questionPointer: questionPointer + 1 });
    }
  };

  render() {
    return (
      <div className={styles.questionPage}>
        <div>
          <QuestionBox
            question={this.props.questions[this.state.questionPointer - 1]}
            answer={
              this.state.questionPointer < this.props.currentQuestion
                ? this.props.submittedAnswers[this.state.questionPointer - 1]
                : null
            }
            viewOnly={this.state.questionPointer !== this.props.currentQuestion}
            submitAnswer={this.submitAnswer}
            key={`question-box-key-${this.state.questionPointer}`}
          />
          <div className={styles.questionNumberIdentifier}>
            {this.state.questionPointer} of {this.props.questions.length}
          </div>
          <div className={styles.previousQuestionWarning}>
            {this.state.questionPointer !== this.props.currentQuestion && (
              <span>
                You can only view the questions you have already answered
              </span>
            )}
          </div>
        </div>
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
              this.state.questionPointer < this.props.currentQuestion &&
              this.state.questionPointer <= this.props.questions.length
                ? styles.right
                : styles.disabledNav
            }
            onClick={
              this.state.questionPointer < this.props.currentQuestion &&
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
            small={true}
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
