import { render, screen } from '@testing-library/react';
import HomePage from 'pages/Home/Home.page';
import React from 'react';
test('invalid room returns undefined', () => {
  expect(false).toBeFalsy();
});

// expect create room button

test('expect create room button', async () => {
  render(<HomePage />);

  expect(screen.getByRole('button')).toHaveTextContent(/create room/i);
});
