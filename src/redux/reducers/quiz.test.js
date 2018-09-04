import QuizReducer, {
  saveAnswer,
  initialState,
  SAVE_ANSWER,
} from './questions.js';

describe('Quiz reducer reducer', () => {
  it('should return initial state', () => {
    expect(QuizReducer(initialState, {})).toEqual(initialState);
  });

  it('should save answer successfully', () => {
    const answerObject = {
      answer: false,
      answerTime: new Date(),
    };
    expect(
      QuizReducer(initialState, {
        type: SAVE_ANSWER,
        answerObject,
      })
    ).toEqual(Object.assign(initialState, { answers: [answerObject] }));
  });
});
