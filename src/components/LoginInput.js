import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={onEmailChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="******" value={password} onChange={onPasswordChange} />
      </Form.Group>
      <input type="button" value="Log In" className="btn btn-block btn-primary" onClick={() => login({ email, password })} />
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
