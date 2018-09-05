// @flow
/* Reducer to manage user's quiz state */

import * as constants from '../../commons/constants';

export const RESET_QUIZ = 'TriviaQuiz/RESET_QUIZ';
export const SAVE_ANSWER = 'TriviaQuiz/SAVE_ANSWER';

export const PROCEED_TO_NEXT_QUESTION = 'TriviaQuiz/PROCEED_TO_NEXT_QUESTION';
type State = {
  currentQuestion: number,
  answers: Array<{
    answer: boolean,
    answerTime: Date,
  }>,
};

export const initialState = {
  currentQuestion: 1,
  answers: [],
};

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case RESET_QUIZ:
      return initialState;

    case SAVE_ANSWER:
      return {
        ...state,
        answers: [...state.answers, action.answerObject],
      };

    case PROCEED_TO_NEXT_QUESTION:
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
      };

    default:
      return state;
  }
};

/**
 * Action creator to save answer for the current question and increment current question index
 * @param {boolean} answer
 */
export const saveAnswer = (answer: boolean) => (dispatch: Dispatch) => {
  /* save answer for the current question */
  dispatch({
    type: SAVE_ANSWER,
    answerObject: {
      answer,
      answerTime: new Date(),
    },
  });

  /* increment current question marker */
  dispatch({
    type: PROCEED_TO_NEXT_QUESTION,
  });
};
