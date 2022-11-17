import React from 'react';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';
import LoginInput from '../components/LoginInput';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="d-flex h-100">
      <article className="d-none d-md-flex ">
        <div className="row mh-100-vh align-items-center justify-content-center">
          <div className="col-md-12">
            <img src="/logo.png" alt="selamat datang" />
          </div>
        </div>
      </article>
      <div className="container">
        <div className="row align-items-center justify-content-center mh-100-vh">
          <div className="col-md-8">
            <h2 className="h3">
              Login to
              {' '}
              <strong>DNForum</strong>
            </h2>
            <LoginInput login={onLogin()} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
