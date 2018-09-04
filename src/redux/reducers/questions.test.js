import QuestionReducer, {
  fetchNewQuiz,
  initialState,
  QUESTION_FETCH_SUCCESS,
} from './questions.js';

describe('Questions reducer', () => {
  it('should return initial state', () => {
    expect(QuestionReducer(initialState, {})).toEqual(initialState);
  });

  it('should fetch new set of questions on invoking fetchNewQuiz', async () => {
    const mockedDispatch = jest.fn();
    fetchNewQuiz('short', 'easy')(mockedDispatch);
    expect(mockedDispatch.mock.calls[1][0]).toHaveProperty('promise');
    const requestPromise = mockedDispatch.mock.calls[1][0].promise;
    const questionResponse = await requestPromise();
    expect(questionResponse.questions).toHaveLength(5);
  });
  it('should set questions data correctly', () => {
    const questions = [
      {
        type: 'boolean',
        difficulty: 'easy',
        category: 'Entertainment: Japanese Anime & Manga',
        question: 'XXXXXX',
        correct_answer: 'True',
        incorrect_answers: ['False'],
      },
    ];
    expect(
      QuestionReducer(initialState, {
        type: QUESTION_FETCH_SUCCESS,
        result: { questions },
      })
    ).toEqual(
      Object.assign(initialState, { questions, fetchState: 'SUCCESS' })
    );
  });
});
