import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function NavigationAuthItem({ authUser, signOut }) {
  if (authUser.name !== null && authUser.avatar !== null) {
    return (
      <li className="nav-item dropdown">
        <Link className="nav-link pe-0" id="navbarDropdownUser" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <div className="avatar avatar-xl">
            <img className="rounded-circle h-100" src={authUser.avatar} alt={authUser.name} />
          </div>
        </Link>
        <div className="dropdown-menu dropdown-menu-end py-0" aria-labelledby="navbarDropdownUser">
          <div className="bg-white dark__bg-1000 rounded-2 py-2">
            <p className="dropdown-item">{authUser.name}</p>
            <div className="dropdown-divider" />
            <button className="dropdown-item" type="button" onClick={signOut}>Logout</button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className="nav-item">
      <Link to="/login" className="nav-link">Login</Link>
    </li>
  );
}

NavigationAuthItem.propTypes = {
  authUser: PropTypes.objectOf(PropTypes.string).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default NavigationAuthItem;
