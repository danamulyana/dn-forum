import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function CommentInput({ submit }) {
  const {
    authUser = null,
  } = useSelector((states) => states);

  const { register, handleSubmit, reset } = useForm();

  if (authUser === null) {
    return (
      <div className="card">
        <div className="card-body">
          <p className="mb-0">
            Please
            {' '}
            <Link to="/login">Login</Link>
            {' '}
            first so you can comment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <Form onSubmit={handleSubmit(submit)}>
          <div className="d-flex gap-3">
            <div className="avatar">
              <img className="rounded-circle" src={authUser.avatar} alt={authUser.name} width="30" />
            </div>
            <Form.Control as="textarea" placeholder="Write a comment..." {...register('content')} />
          </div>
          <div className="d-flex mt-2 flex-row-reverse">
            <button type="submit" className="btn btn-primary btn-sm">Publish</button>
            <button type="button" onClick={() => reset()} className="btn btn-link">reset</button>
          </div>
        </Form>
      </div>
    </div>
  );
}

CommentInput.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default CommentInput;
