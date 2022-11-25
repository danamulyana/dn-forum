import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }))
      .then(() => {
        navigate('/');
      });
  };

  return (
    <section className="container">
      <div className="row justify-content-center align-items-center py-6 h-login">
        <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
          {/* <Link to="/" className="d-flex justify-content-center mb-4">
            <img className="me-2" src="/logo-dnf.png" alt="logo" height="58" />
          </Link> */}
          <div className="card">
            <div className="card-body p-4 p-sm-5">
              <div className="row justify-content-between mb-2">
                <div className="col-auto">
                  <h2 className="h5">Log in</h2>
                </div>
                <div className="col-auto fs--1 text-600">
                  <span className="mb-0 pe-1">or</span>
                  <span>
                    <Link to="/register">Create an account</Link>
                  </span>
                </div>
              </div>
              <LoginInput login={onLogin} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
