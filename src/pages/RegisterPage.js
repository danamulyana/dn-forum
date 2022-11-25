import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password })).then(navigate('/login'));
  };

  return (
    <section className="container">
      <div className="row justify-content-center align-items-center py-6 h-login">
        <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
          <div className="card">
            <div className="card-body p-4 p-sm-5">
              <div className="row justify-content-between mb-2">
                <div className="col-auto">
                  <h2 className="h5">Register</h2>
                </div>
                <div className="col-auto fs--1 text-600">
                  <span className="mb-0 pe-1">Have an account?</span>
                  <span>
                    <Link to="/login">Login</Link>
                  </span>
                </div>
              </div>
              <RegisterInput registerSubmit={onRegister} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
