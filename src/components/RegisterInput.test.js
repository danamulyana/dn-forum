/**
 * skenario testing
 *
 * - RegisterInput component
 *    - should show feedback when register click but name, email or password is empty
 *    - should show feedback when email is invalid
 *    - should show feedback when password is less than 6
 *    - should handle Name typing correctly
 *    - should handle email typing correctly
 *    - should handle password typing correctly
 *    - should call register function when register button is clicked
 *
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import '@testing-library/jest-dom';
import RegisterInput from './RegisterInput';

describe('RegisterInput component', () => {
  it('should show feedback when Register click but email or password is empty', async () => {
    render(<RegisterInput registerSubmit={() => {}} />);
    const RegisterButton = await screen.getByRole('button', { name: 'Register' });

    await userEvent.dblClick(RegisterButton);

    const feedbackEmail = await screen.getByText('email wajib di isi');
    const feedbackPassword = await screen.getByText('password wajib di isi');

    expect(feedbackEmail).toBeInTheDocument();
    expect(feedbackPassword).toBeInTheDocument();
  });

  it('should show feedback when email is invalid', async () => {
    render(<RegisterInput registerSubmit={() => {}} />);
    const RegisterButton = await screen.getByRole('button', { name: 'Register' });
    const emailInput = await screen.getByLabelText('Email');
    await userEvent.type(emailInput, 'email.mail');
    await userEvent.dblClick(RegisterButton);

    const feedbackEmail = await screen.getByText('email tidak valid');

    expect(feedbackEmail).toBeInTheDocument();
  });

  it('should show feedback when password is less than 6', async () => {
    render(<RegisterInput registerSubmit={() => {}} />);
    const RegisButton = await screen.getByRole('button', { name: 'Register' });
    const passwordInput = await screen.getByLabelText('Password');

    await userEvent.type(passwordInput, '1234');

    await userEvent.dblClick(RegisButton);

    const feedbackPassword = await screen.getByText('password harus lebih dari 6 huruf');

    expect(feedbackPassword).toBeInTheDocument();
  });

  it('should handle Name typing correctly', async () => {
    render(<RegisterInput registerSubmit={() => {}} />);
    const nameInput = await screen.getByLabelText('Name');

    await userEvent.type(nameInput, 'testName');

    expect(nameInput).toHaveValue('testName');
  });

  it('should handle email typing correctly', async () => {
    render(<RegisterInput registerSubmit={() => {}} />);
    const emailInput = await screen.getByLabelText('Email');

    await userEvent.type(emailInput, 'emailtest@mail.com');

    expect(emailInput).toHaveValue('emailtest@mail.com');
  });

  it('should handle password typing correctly', async () => {
    render(<RegisterInput registerSubmit={() => {}} />);
    const passwordInput = await screen.getByLabelText('Password');

    await userEvent.type(passwordInput, 'testpassword');

    expect(passwordInput).toHaveValue('testpassword');
  });

  it('should call register function when register button is clicked', async () => {
    const mockRegister = jest.fn();

    render(<RegisterInput registerSubmit={mockRegister} />);

    const nameInput = await screen.getByLabelText('Name');

    await userEvent.type(nameInput, 'nametest');

    const emailInput = await screen.getByLabelText('Email');

    await userEvent.type(emailInput, 'emailtest@mail.com');

    const passowrdInput = await screen.getByLabelText('Password');

    await userEvent.type(passowrdInput, '12345678');

    const RegisterButton = await screen.getByRole('button', { name: 'Register' });

    await userEvent.click(RegisterButton);

    expect(mockRegister).toBeCalledWith({
      email: 'emailtest@mail.com',
      name: 'nametest',
      password: '12345678',
    });
  });
});
