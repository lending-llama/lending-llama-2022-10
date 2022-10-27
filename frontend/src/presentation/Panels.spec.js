import React from 'react';
import renderer from 'react-test-renderer';
import {Card} from "./Panels";

describe('Card', () => {
  it('has skeleton as specified by Tailwind UI', () => {
    expect(renderer.create(<Card/>).toJSON()).toMatchSnapshot();
  })
})

describe('CardWithHeader', () => {
  it('has skeleton as specified by Tailwind UI', () => {
    expect(renderer.create(
      <Card header="header">
        main content
      </Card>
    ).toJSON()).toMatchSnapshot();
  })
})
