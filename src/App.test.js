import { render, screen } from '@testing-library/react';
import Infinite from './components/infinite';

test('loads images in all sizes correctly', async () => {
  render(<Infinite />);
  const images = await screen.findAllByRole('img');
  images.forEach((img) => {
    expect(img.src).toMatch(/(_s|_m|_l)/);
  });
});



