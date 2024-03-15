import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { mockIntersectionObserver } from 'jsdom-testing-mocks';
import React from 'react';
import Infinite from "./components/infinite/infinite"
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import fetch from 'jest-mock-fetch';

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


// test uppercase proxy
// afterEach(() => {
//     fetch.reset();
// });
// it('UppercaseProxy should get data from the server and convert it to UPPERCASE', () => {
//     let catchFn = jest.fn(),
//         thenFn = jest.fn();
//     let clientMessage = 'client is saying hello!';

//     Infinite(clientMessage)
//         .then(thenFn)
//         .catch(catchFn);
//     expect(fetch).toHaveBeenCalledWith("/web-service-url/", {
//         body: clientMessage,
//     });
//     fetch.mockResponse({
//         text: () => 'server says hello!'
//     });
//     expect(thenFn).toHaveBeenCalledWith('SERVER SAYS HELLO!');
//     expect(catchFn).not.toHaveBeenCalled();
// });




// describe('Infinite Scroll Pagination', () => {
//   it('loads additional images on scroll', async () => {
//     render(<Infinite />);
//     await waitFor(() => expect(screen.getAllByTestId('image-array')).toHaveLength(1));
//     fireEvent.scroll(window, { target: { scrollY: 5000 } });
//     await waitFor(() => expect(screen.getAllByTestId('image-array')).toHaveLength(2));
//   });
// });

