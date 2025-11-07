// Mock your local API wrapper so Jest never imports axios (ESM) during tests
jest.mock('./api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

import { render } from '@testing-library/react';
import App from './App';

test('renders App without crashing', () => {
  const { container } = render(<App />); // ⬅️ no MemoryRouter here
  expect(container.firstChild).toBeInTheDocument();
});
