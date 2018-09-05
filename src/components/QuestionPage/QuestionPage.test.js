import React from 'react';
import renderer from 'react-test-renderer';
import Questionpage from '.';

it('Questionpage: default', () => {
  const component = renderer.create(<Questionpage questions={[]} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
