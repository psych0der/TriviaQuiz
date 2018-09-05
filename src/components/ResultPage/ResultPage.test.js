import React from 'react';
import renderer from 'react-test-renderer';
import Resultpage from '.';

it('Resultpage: default', () => {
  const component = renderer.create(
    <Resultpage questions={[]} submittedAnswers={[]} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
