/**
 * skenario testing
 *
 * -LoginInput component
 *    - should show feedback when login click but email or password is empty
 *    - should show feedback when email is invalid
 *    - should show feedback when password is less than 6
 *    - should handle email typing correctly
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
  it('should show feedback when login click but email or password is empty', async () => {
    render(<LoginInput login={() => {}} />);
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    await userEvent.dblClick(loginButton);

    const feedbackEmail = await screen.getByText('email wajib di isi');
    const feedbackPassword = await screen.getByText('password wajib di isi');

    expect(feedbackEmail).toBeInTheDocument();
    expect(feedbackPassword).toBeInTheDocument();
  });

  it('should show feedback when email is invalid', async () => {
    render(<LoginInput login={() => {}} />);
    const loginButton = await screen.getByRole('button', { name: 'Login' });
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'email.mail');
    await userEvent.dblClick(loginButton);

    const feedbackEmail = await screen.getByText('email tidak valid');

    expect(feedbackEmail).toBeInTheDocument();
  });

  it('should show feedback when password is less than 6', async () => {
    render(<LoginInput login={() => {}} />);
    const loginButton = await screen.getByRole('button', { name: 'Login' });
    const passwordInput = await screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, '1234');

    await userEvent.dblClick(loginButton);

    const feedbackPassword = await screen.getByText('password harus lebih dari 6 huruf');

    expect(feedbackPassword).toBeInTheDocument();
  });

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
