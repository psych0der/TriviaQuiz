// @flow
import React, { Component } from 'react';
import { RoundRadioButton, Button } from '../../components';
import styles from './index.css';
type Props = {
  question: Object,
  answer: ?Object,
  viewOnly: ?boolean,
  submitAnswer: () => *,
};
type State = {
  answer: ?boolean,
};
class QuestionBox extends Component<Props, State> {
  static defaultProps = {
    answer: null,
    viewOnly: false,
  };
  state = {
    answer: null,
  };

  /**
   * Sets solutions of the current question
   */
  setSolution = (e: Event) => {
    this.setState({ answer: e.currentTarget.value });
  };

  /**
   * Calls prop method to submit answer
   */
  submitAnswer = () => {
    this.props.submitAnswer(this.state.answer);
  };

  render() {
    return (
      <div className={styles.QuestionBoxContainer}>
        <div className={styles.questionCategory}>
          {this.props.question.category}
        </div>
        <div className={styles.QuestionBox}>
          <div className={styles.question}>
            {/* this is done to convert quoted chars back to normal char. Particularly for quotes */}
            {this.props.question.question.replace(/&quot;/g, '"')}
          </div>
          <div className={styles.optionContainer}>
            <div>
              <RoundRadioButton
                name="question-sol"
                id="question-sol-true"
                value={true}
                label="True"
                onChange={this.setSolution}
                checked={
                  this.props.answer && this.props.answer.answer === 'true'
                }
              />
            </div>
            <div>
              <RoundRadioButton
                name="question-sol"
                id="question-sol-false"
                value={false}
                label="False"
                onChange={this.setSolution}
                checked={
                  this.props.answer && this.props.answer.answer === 'false'
                }
              />
            </div>
            <div className={styles.submitContainer}>
              <Button
                text="Submit"
                backgroundColor="#29CF66"
                small={true}
                disabled={this.state.answer === null || this.props.viewOnly}
                onClick={
                  this.state.answer === null || this.props.viewOnly
                    ? () => {}
                    : this.submitAnswer
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionBox;
