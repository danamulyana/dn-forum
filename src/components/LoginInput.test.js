/**
 * skenario testing
 *
 * -LoginInput component
 *    - should handle password typing correctly
 *    - should handle password typing correctly
 *    - should call login function when login button is clicked
 *
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LoginInput from './LoginInput';

describe('LoginInput component', () => {
  it('should handle email typing correctly', async () => {
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    await userEvent.type(emailInput, 'emailtest@mail.com');

    expect(emailInput).toHaveValue('emailtest@mail.com');
  });

  it('should handle password typing correctly', async () => {
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, '123456');

    expect(passwordInput).toHaveValue('123456');
  });

  it('should call login function when login button is clicked', async () => {
    const mockLogin = jest.fn();

    render(<LoginInput login={mockLogin} />);

    const emailInput = await screen.getByPlaceholderText('Email');

    await userEvent.type(emailInput, 'emailtest@mail.com');

    const passowrdInput = await screen.getByPlaceholderText('Password');

    await userEvent.type(passowrdInput, '12345678');

    const loginButton = await screen.getByRole('button', { name: 'Login' });

    await userEvent.click(loginButton);

    expect(mockLogin).toBeCalledWith({
      email: 'emailtest@mail.com',
      password: '12345678',
    });
  });
});
