// @flow
import React from 'react';

import { QuizSettings } from '../index';
import { Button, QuestionPage, ResultPage } from '../../components';
import * as constants from '../../commons/constants';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNewQuiz, reset } from '../../redux/reducers/questions';
import { saveAnswer, resetQuiz } from '../../redux/reducers/quiz';

import styles from './index.css';

type Props = {
  reset: () => *,
  resetQuiz: () => *,
  fetchNewQuiz: () => *,
  saveAnswer: () => *,
  quiz: Object,
  questions: Object,
};

type State = {
  duration: ?string,
  difficulty: ?string,
};

export class Home extends React.Component<Props, State> {
  state = {
    duration: null,
    difficulty: null,
  };
  startQuiz = (duration: string, difficulty: string) => {
    this.setState({ duration, difficulty }, () => {
      this.fetchQuiz();
    });
  };

  /* Reset form */
  reset = () => {
    this.props.resetQuiz();
    this.props.reset();
  };

  /* Fetch quiz */
  fetchQuiz = () => {
    this.props.fetchNewQuiz(this.state.duration, this.state.difficulty);
  };
  render() {
    return (
      <div className={styles.container}>
        <h3>
          <center>Trivia quiz challenge</center>
        </h3>
        {this.props.questions.fetchState === constants.IDLE &&
          this.props.questions.questionsFetched === false && (
            <QuizSettings startQuiz={this.startQuiz} />
          )}

        {this.props.questions.fetchState === constants.IN_PROGRESS && (
          <div className={styles.buttonContainer}>
            <Button isLoading={true} />
          </div>
        )}
        {/* Question fetch error state */}
        {this.props.questions.fetchState === constants.FAILED && (
          <div className={styles.buttonContainer}>
            <div className={styles.errorMessage}>
              {this.props.questions.fetchError}
            </div>
            <span>
              <Button
                backgroundColor="#F6D142"
                text="Go back"
                onClick={this.reset}
              />
            </span>
            <span style={{ marginLeft: '15px' }}>
              <Button
                backgroundColor="#6DB4F6"
                text="Retry"
                onClick={this.fetchQuiz}
              />
            </span>
          </div>
        )}
        {/* Display QuizPage */}
        {this.props.questions.questionsFetched &&
          this.props.quiz.currentQuestion <=
            this.props.questions.questions.length && (
            <QuestionPage
              questions={this.props.questions.questions}
              submittedAnswers={this.props.quiz.answers}
              currentQuestion={this.props.quiz.currentQuestion}
              submitAnswer={this.props.saveAnswer}
              abortQuiz={this.reset}
            />
          )}
        {/* display result page */}
        {this.props.questions.questionsFetched &&
          this.props.quiz.currentQuestion >
            this.props.questions.questions.length && (
            <ResultPage
              questions={this.props.questions.questions}
              submittedAnswers={this.props.quiz.answers}
              restart={this.reset}
            />
          )}
      </div>
    );
  }
}

const mapStateToProps = ({ quiz, questions }) => ({
  quiz,
  questions,
});

// connect redux to the container
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchNewQuiz,
      reset,
      saveAnswer,
      resetQuiz,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
