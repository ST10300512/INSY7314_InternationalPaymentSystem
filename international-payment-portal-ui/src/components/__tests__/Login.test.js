// Mock local API wrapper so Jest never touches axios ESM
jest.mock('../../api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Login';

test('renders Login form', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  // Adjust selector to something that exists in your Login UI
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});
