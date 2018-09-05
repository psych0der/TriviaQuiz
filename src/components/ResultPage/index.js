// @flow
import React, { Component } from 'react';
import styles from './index.css';
import { FaCheckCircle, FaMinusCircle } from 'react-icons/fa';
import { fixString } from '../../commons/helpers';
import { Button } from '../../components';
type Props = {
  restart: () => *,
  questions: Array<Object>,
  submittedAnswers: Array<Object>,
};
type State = {
  calculating: ?boolean,
  score: ?number,
  resultObject: ?Array<Object>,
};
class ResultPage extends Component<Props, State> {
  state = {
    calculating: null, // we use this variable to display loader while result is being calculated
    score: null,
    resultObject: null,
  };

  calculateResult = async () => {
    let score = 0;
    this.setState({ calculating: true });
    const resultObject = this.props.questions.map((question, index) => {
      const correct =
        this.props.submittedAnswers[index].answer.toLowerCase() ===
        question.correct_answer.toLowerCase();
      if (correct) {
        score += 1;
      }
      return {
        question: question.question,
        correct,
      };
    });
    window.setTimeout(
      () =>
        this.setState({
          score,
          resultObject,
          calculating: false,
        }),
      10
    );
    // set result
  };
  componentDidMount() {
    this.calculateResult();
  }
  render() {
    return (
      <div className={styles.ResultPage}>
        {this.state.calculating && (
          <div style={{ textAlign: 'center' }}>
            <Button isLoading={true} loadingText="calculating" />
          </div>
        )}
        {this.state.calculating === false && (
          <div>
            <div className={styles.heading}>
              <center>You scored</center>
              <center>
                {this.state.score} / {this.props.questions.length}
              </center>
            </div>
            <div className={styles.resultAnalysis}>
              {this.state.resultObject.map(obj => {
                return (
                  <div className={styles.section}>
                    <span>
                      {obj.correct && (
                        <span>
                          <FaCheckCircle color="#29CF66" size="1.5em" />
                        </span>
                      )}
                      {!obj.correct && (
                        <span>
                          <FaMinusCircle color="#D41602" size="1.5em" />
                        </span>
                      )}
                    </span>
                    <span className={styles.questionText}>
                      {fixString(obj.question)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className={styles.restartContainer}>
              <Button
                backgroundColor="#51B6E5"
                text="Play again?"
                onClick={this.props.restart}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default ResultPage;
