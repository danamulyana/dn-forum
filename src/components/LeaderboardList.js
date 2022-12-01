import React from 'react';
import PropTypes from 'prop-types';
import { TbCrown } from 'react-icons/tb';

function LeaderboardList({
  index, user, score,
}) {
  let place = '';

  if (index === 0) {
    place = 'order-1 order-md-2';
  } else if (index === 1) {
    place = 'order-2 order-md-1 mt-3';
  } else {
    place = 'order-3 order-md-3 mt-4';
  }

  return (
    <div
      className={`col-12 col-md-4 position-relative ${place}`}
    >
      <div className="d-flex flex-column justify-content-center align-items-center">
        <TbCrown className="crown" size={50} />
        <div className="leaderboard avatar">
          <img className="rounded-circle" src={user.avatar} alt={user.name} width="100" />
        </div>
        <p className="mt-3 h5">{user.name}</p>
        <p className="h5">{score}</p>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

LeaderboardList.propTypes = {
  index: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

export {
  userShape,
};

export default LeaderboardList;
