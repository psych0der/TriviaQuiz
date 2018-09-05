// @flow
/** Reducer to manage quiz question fetch state
 * Quiz questions can have following difficulty levels:
 *  - easy
 *  - medium
 *  - hard
 * and quiz can contain 10, 15, 20 questions
 * depending on the format of quiz:
 *  - short
 *  - respectable
 *  - Lengthy
 *
 */

import * as constants from '../../commons/constants';
import { networkErrorHandler } from '../../commons/helpers';
import axios from 'axios';

export const QUESTION_FETCH_IN_PROGRESS =
  'TriviaQuiz/QUESTION_FETCH_IN_PROGRESS';
export const QUESTION_FETCH_SUCCESS = 'TriviaQuiz/QUESTION_FETCH_SUCCESS';
export const RESET_FETCH_STATE = 'TriviaQuiz/RESET_FETCH_STATE';
export const QUESTION_FETCH_FAILED = 'TriviaQuiz/QUESTION_FETCH_FAILED';
export const SET_QUIZ_PREFERENCES = 'TriviaQuiz/SET_QUIZ_PREFERENCES';
export const RESET_QUESTIONS_STATE = 'TriviaQuiz/RESET_QUESTIONS_STATE';

type difficulty = constants.EASY | constants.MEDIUM | constants.HARD;
type duration = constants.SHORT | constants.RESPECTABLE | constants.LENGTHY;

/**
 * Returns API param for difficulty
 * @param {string} difficulty
 */
const difficultyParamMapper = (difficulty: difficulty) => {
  switch (difficulty) {
    case constants.EASY:
      return 'easy';
    case constants.MEDIUM:
      return 'medium';
    case constants.HARD:
      return 'hard';
    default:
      return 'easy';
  }
};

/**
 * Returns API param for short
 * @param {string} duration
 */
const durationParamMapper = (duration: duration) => {
  switch (duration) {
    case constants.SHORT:
      return 5;
    case constants.RESPECTABLE:
      return 10;
    case constants.LENGTHY:
      return 15;
    default:
      return 5;
  }
};

type State = {
  difficulty: difficulty,
  duration: duration,
  fetchState: string,
  fetchError: null | string,
  questionsFetched: boolean,
  questions: Array<{
    type: string,
    difficulty: string,
    category: string,
    question: string,
    correct_answer: string,
    incorrect_answers: Array<string>,
  }>,
};

export const initialState = {
  difficulty: constants.EASY,
  duration: constants.SHORT,
  fetchState: constants.IDLE,
  fetchError: null,
  questionsFetched: false,
  questions: [],
};

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case QUESTION_FETCH_IN_PROGRESS:
      return {
        ...state,
        fetchState: constants.IN_PROGRESS,
      };

    case QUESTION_FETCH_SUCCESS:
      return {
        ...state,
        fetchState: constants.SUCCESS,
        questionsFetched: true,
        questions: action.result.questions,
      };

    case QUESTION_FETCH_FAILED:
      return {
        ...state,
        fetchState: constants.FAILED,
        questions: [],
        fetchError: action.error.toString(),
      };

    case SET_QUIZ_PREFERENCES:
      return {
        ...state,
        ...action.preferences,
      };
    case RESET_FETCH_STATE:
      return {
        ...state,
        fetchState: constants.IDLE,
      };
    case RESET_QUESTIONS_STATE:
      return initialState;

    default:
      return state;
  }
};

/**
 * Reset fetch state to idle
 */
export const resetFetchState = () => (dispatch: Dispatch) => {
  return {
    type: RESET_FETCH_STATE,
  };
};

export const reset = () => (dispatch: Dispatch) => {
  return dispatch({
    type: RESET_QUESTIONS_STATE,
  });
};

/**
 * Fetch new quiz questions by setting quantity and difficulty of questions
 * @param {string} duration
 * @param {string} difficulty
 */
export const fetchNewQuiz = (duration: duration, difficulty: difficulty) => (
  dispatch: Dispatch
) => {
  // normalize quantity and difficulty values
  const difficultyLevel =
    [constants.EASY, constants.MEDIUM, constants.HARD].indexOf(difficulty) > -1
      ? difficulty
      : constants.EASY;
  const quizDuration =
    [constants.SHORT, constants.RESPECTABLE, constants.LENGTHY].indexOf(
      duration
    ) > -1
      ? duration
      : constants.SHORT;

  dispatch({
    type: SET_QUIZ_PREFERENCES,
    preferences: {
      duration,
      difficulty,
    },
  });
  dispatch({
    types: [
      QUESTION_FETCH_IN_PROGRESS,
      QUESTION_FETCH_SUCCESS,
      QUESTION_FETCH_FAILED,
    ],
    promise: () =>
      axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_HOST}:${
          process.env.REACT_APP_API_PORT
        }/api.php`,
        headers: {
          'content-type': 'application/json',
        },
        params: {
          amount: durationParamMapper(quizDuration),
          difficulty: difficultyParamMapper(difficultyLevel),
          type: 'boolean',
        },
      })
        .then(res => {
          return { questions: res.data.results };
        })
        .catch(e => {
          console.log(e);
          return e;
        }),
  });
};
