import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

function LoginInput({ login }) {
  const {
    control, handleSubmit, watch, formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form noValidate onSubmit={handleSubmit((data) => login(data))}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: { value: true, message: 'email wajib di isi' },
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'email tidak valid',
            },
          }}
          render={({ field }) => (
            <Form.Control
              {...field}
              type="email"
              placeholder="Email"
              value={watch('email') || ''}
              isInvalid={errors.email}
            />
          )}
        />
        {errors.email && (
          <Form.Control.Feedback type="invalid">
            {errors.email.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Controller
          name="password"
          control={control}
          rules={{
            minLength: { value: 6, message: 'password harus lebih dari 6 huruf' },
            required: { value: true, message: 'password wajib di isi' },
          }}
          render={({ field }) => (
            <Form.Control
              {...field}
              type="password"
              placeholder="Password"
              value={watch('password') || ''}
              isInvalid={errors.password}
            />
          )}
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
