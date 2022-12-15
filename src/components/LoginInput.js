import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

function LoginInput({ login }) {
  const {
    register, handleSubmit, watch, formState: { errors, isDirty },
  } = useForm();

  return (
    <Form noValidate validated={isDirty} onSubmit={handleSubmit((data) => login(data))}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          value={watch('email') || ''}
          required
          {...register('email', {
            required: { value: true, message: 'email wajib di isi' },
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        {errors.email && (
        <Form.Control.Feedback type="invalid">
          {errors.email.message}
        </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          minLength="6"
          value={watch('password') || ''}
          required
          {...register('password', { minLength: { value: 6, message: 'password harus lebih dari 6 huruf' }, required: { value: true, message: 'password wajib di isi' } })}
        />
        {errors.password && (
        <Form.Control.Feedback type="invalid">
          {errors.password.message}
        </Form.Control.Feedback>
        )}
      </Form.Group>
      <button type="submit" className="btn btn-block w-100 mt-3 btn-primary">Login</button>
    </Form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
