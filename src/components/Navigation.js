import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navigator({ signOut }) {
  return (
    <>
      <img src="/logo-dnf.png" alt="Logo" height="40" />
      <nav className="nav">
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

Navigator.propTypes = {
  signOut: propTypes.func.isRequired,
};

export default Navigator;
