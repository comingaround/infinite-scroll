import { screen, render } from '@testing-library/react';
import { mockIntersectionObserver } from 'jsdom-testing-mocks';
import React from 'react';
import Infinite from "./components/infinite/infinite"
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

// Intersection observer
mockIntersectionObserver()
describe('Test Intersection Observer', () => {
  it('renders observer element', async () => {
    render(<Infinite />);
    const observerElement = await screen.findByTestId('observer');
    expect(observerElement).toBeInTheDocument();
  });
});

// Find image array div
describe('Infinite Component', () => {
  test('find image-array', async () => {
    render(<Infinite />);
    const imageArray = await screen.findByTestId('image-array');
    expect(imageArray).toBeInTheDocument();
  });
});