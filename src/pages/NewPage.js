import React from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { FaPlusCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/thread/action';

function NewPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm();

  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }))
      .then(navigate('/'));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <div className="card">
            <div className="card-body">
              <h1 className="h3">Create a New Discussion</h1>
              <Form
                noValidate
                validated={isDirty}
                onSubmit={handleSubmit((data) => onAddThread(data))}
              >
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Judul</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Judul"
                    required
                    {...register('title', {
                      required: { value: true, message: 'judul wajib di isi' },
                    })}
                  />
                  {errors.title && (
                  <Form.Control.Feedback type="invalid">
                    {errors.title.message}
                  </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control type="text" placeholder="category" {...register('category')} />
                  {errors.category && (
                  <Form.Control.Feedback type="invalid">
                    {errors.category.message}
                  </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="body">
                  <Form.Label>Body</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    required
                    {...register('body', {
                      required: { value: true, message: 'body wajib di isi' },
                    })}
                  />
                  {errors.body && (
                  <Form.Control.Feedback type="invalid">
                    {errors.body.message}
                  </Form.Control.Feedback>
                  )}
                </Form.Group>
                <button type="submit" className="btn btn-block w-100 mt-3 btn-primary text-center">
                  <FaPlusCircle />
                  {' '}
                  New
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPage;
