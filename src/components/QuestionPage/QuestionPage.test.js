import React from 'react';
import renderer from 'react-test-renderer';
import QuestionPage from './index';

it('QuestionPage: default', () => {
  const component = renderer.create(
    <QuestionPage
      questions={[{ category: 's', question: 'a' }]}
      currentQuestion={1}
      abortQuiz={() => {}}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
