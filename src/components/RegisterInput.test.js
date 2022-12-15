import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import '@testing-library/jest-dom';
import RegisterInput from './RegisterInput';

describe('RegisterInput component', () => {
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
