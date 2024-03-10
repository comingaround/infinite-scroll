import { render, screen } from '@testing-library/react';
import Infinite from './components/infinite';

beforeEach(() => {
  global.IntersectionObserver = class {
    constructor(callback) { this.callback = callback; }
    observe() { return null; }
    unobserve() { return null; }
    disconnect() { return null; }
  };
});

afterEach(() => {
  global.IntersectionObserver = undefined;
});

test('loads images in all sizes correctly', async () => {
  render(<Infinite />);
  const images = await screen.findAllByTestId('image-item');
  images.forEach((imgElement) => {
    const img = imgElement.querySelector('img');
    expect(img.src).toMatch(/(_s|_m|_l)\.jpg$/);
  });
});
