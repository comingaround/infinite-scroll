import { screen, render } from '@testing-library/react';
import { mockIntersectionObserver } from 'jsdom-testing-mocks';
import React from 'react';

import Infinite from "./components/infinite/infinite"

mockIntersectionObserver()

describe('Test Infinite component', () => {
  it('renders observer element', async () => {
    render(<Infinite />);
    const observerElement = await screen.findByTestId('observer');
    expect(observerElement).toBeInTheDocument();
  });
});
