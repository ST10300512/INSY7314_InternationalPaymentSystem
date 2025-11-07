import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RoleSelect from '../RoleSelect';

test('renders RoleSelect landing choices', () => {
  render(
    <MemoryRouter>
      <RoleSelect />
    </MemoryRouter>
  );

  expect(screen.getByText(/welcome to the portal/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login as customer/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login as employee/i })).toBeInTheDocument();
});
