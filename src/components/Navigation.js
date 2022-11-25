import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavigationAuthItem from './NavigationAuthItem';

function Navigator({ authUser, signOut }) {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/logo-dnf.png" alt="DNForum" height="50" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navardropdown" aria-controls="navardropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse flex-row-reverse" id="navardropdown">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link to="/" className="nav-link py-2 px-0 px-lg-2">Threads</Link>
            </li>
            <li className="nav-item">
              <Link to="/leaderboard" className="nav-link py-2 px-0 px-lg-2">Leaderboard</Link>
            </li>
            <NavigationAuthItem authUser={authUser} signOut={signOut} />
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navigator.defaultProps = {
  authUser: {
    avatar: null,
    name: null,
  },
};

Navigator.propTypes = {
  signOut: PropTypes.func.isRequired,
  authUser: PropTypes.objectOf(PropTypes.string),
};

export default Navigator;
