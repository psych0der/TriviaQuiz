import React from 'react';
import renderer from 'react-test-renderer';
import QuizSettings from './index';

it('Quizsettings: default', () => {
  const component = renderer.create(<QuizSettings />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
