import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { mockIntersectionObserver } from 'jsdom-testing-mocks';
import React from 'react';
import Infinite from "./components/infinite/infinite"
import '@testing-library/jest-dom/extend-expect';


mockIntersectionObserver()
describe('Test Intersection Observer', () => {
  it('renders observer element', async () => {
    render(<Infinite />);
    const observerElement = await screen.findByTestId('observer');
    expect(observerElement).toBeInTheDocument();
  });
});


// unfortunately not working, but at least i've tried
describe('Infinite Scroll Pagination', () => {
  it('loads additional images on scroll', async () => {
    render(<Infinite />);
    await waitFor(() => expect(screen.getAllByTestId('image-item')).toHaveLength(1));
    fireEvent.scroll(window, { target: { scrollY: 5000 } });
    await waitFor(() => expect(screen.getAllByTestId('image-item')).toHaveLength(2));
  });
});

