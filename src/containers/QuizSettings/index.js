// @flow
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { SquareRadioButton, Button } from '../../components';
import * as constants from '../../commons/constants';
import styles from './index.css';
type difficulty = constants.EASY | constants.MEDIUM | constants.HARD;
type duration = constants.SHORT | constants.RESPECTABLE | constants.LENGTHY;

type Props = {
  startQuiz: () => *,
};

type State = {
  difficulty: ?difficulty,
  duration: ?duration,
};
class QuizSettings extends Component<Props, State> {
  state = {
    difficulty: null,
    duration: null,
  };
  handleDifficultyChange = (e: Event) => {
    const difficulty = e.currentTarget.value;
    this.setState({ difficulty });
  };
  handleDurationChange = (e: Event) => {
    const duration = e.currentTarget.value;
    this.setState({ duration });
  };

  startQuiz = () => {
    this.props.startQuiz(this.state.duration, this.state.difficulty);
  };
  render() {
    return (
      <div>
        <h3>
          <center>Welcome!</center>
        </h3>
        <div className={styles.section}>
          <div className={styles.sectionHeading}>
            How competitive you are feeling right now?
          </div>
          <div className={styles.optionSection}>
            <Grid fluid>
              <Row>
                <Col xs={12} md={4}>
                  <SquareRadioButton
                    name="difficulty"
                    id="diff-1"
                    label="Be easy on me"
                    value={constants.EASY}
                    onChange={this.handleDifficultyChange}
                  />
                </Col>
                <Col xs={12} md={4}>
                  <SquareRadioButton
                    name="difficulty"
                    id="diff-2"
                    label="I may win"
                    value={constants.MEDIUM}
                    onChange={this.handleDifficultyChange}
                  />
                </Col>
                <Col xs={12} md={4}>
                  <SquareRadioButton
                    name="difficulty"
                    id="diff-3"
                    label="Ask me anything"
                    value={constants.HARD}
                    onChange={this.handleDifficultyChange}
                  />
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionHeading}>
            How much time you can spare?
          </div>
          <div className={styles.optionSection}>
            <Grid fluid>
              <Row>
                <Col xs={12} md={4}>
                  <SquareRadioButton
                    name="time"
                    id="time-1"
                    label="Be quick"
                    value={constants.SHORT}
                    onChange={this.handleDurationChange}
                  />
                </Col>
                <Col xs={12} md={4}>
                  <SquareRadioButton
                    name="time"
                    id="time-2"
                    label="Till I finish my coffee"
                    value={constants.RESPECTABLE}
                    onChange={this.handleDurationChange}
                  />
                </Col>
                <Col xs={12} md={4}>
                  <SquareRadioButton
                    name="time"
                    id="time-3"
                    label="I am all here for you"
                    value={constants.LENGTHY}
                    onChange={this.handleDurationChange}
                  />
                </Col>
              </Row>
            </Grid>
          </div>
          <div className={styles.submitSection}>
            <Button
              text="Start"
              backgroundColor="#29CF66"
              onClick={this.startQuiz}
              disabled={
                this.state.duration && this.state.difficulty ? false : true
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
export default QuizSettings;
