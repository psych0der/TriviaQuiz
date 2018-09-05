import React from 'react';
import renderer from 'react-test-renderer';
import Questionbox from '.';

it('QuestionBox: default', () => {
  const component = renderer.create(
    <Questionbox question={{ category: 's', question: 'a' }} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
