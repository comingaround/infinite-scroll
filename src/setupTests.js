// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { configMocks } from 'jsdom-testing-mocks';
import { act } from '@testing-library/react';

configMocks({ act });
