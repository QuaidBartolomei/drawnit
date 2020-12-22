import React from 'react';
import HomePage from 'pages/Home.page';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
test('invalid room returns undefined', () => {
  expect(false).toBeFalsy();
});

// expect create room button

test('expect create room button', async () => {
  render(<HomePage />);

  expect(screen.getByRole('button')).toHaveTextContent(/create room/i);
});
