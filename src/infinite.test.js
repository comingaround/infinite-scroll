import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { mockIntersectionObserver } from 'jsdom-testing-mocks';
import React from 'react';
import Infinite from "./components/infinite/infinite"
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { convert } from "./currency_test/currency";

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


// third attempt
beforeEach(() => {
  fetch.resetMocks();
});

it("finds exchange", async () => {
  fetch.mockResponseOnce(JSON.stringify({ rates: { CAD: 1.42 } }));

  const rate = await convert("USD", "CAD");

  expect(rate).toEqual(1.42);
  expect(fetch).toHaveBeenCalledTimes(1);
});


