import { screen, render, waitFor } from '@testing-library/react';
import { mockIntersectionObserver } from 'jsdom-testing-mocks';
import React from 'react';
import Infinite from "./components/infinite/infinite"
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';


mockIntersectionObserver()
describe('Test Intersection Observer', () => {
  it('renders observer element', async () => {
    render(<Infinite />);
    const observerElement = await screen.findByTestId('observer');
    expect(observerElement).toBeInTheDocument();
  });
});