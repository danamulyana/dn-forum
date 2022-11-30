import React from 'react';
import PropTypes from 'prop-types';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { useSelector } from 'react-redux';

function VoteComponent({
  id, upVotesBy, downVotesBy, like, dislike,
}) {
  const AuthUser = useSelector((states) => states.authUser);

  const AuthId = AuthUser === null ? '' : AuthUser.id;

  const isLike = upVotesBy.includes(AuthId);
  const isDisLike = downVotesBy.includes(AuthId);
  const onLikeClick = (event) => {
    event.stopPropagation();
    like(id);
  };

  const onDislikeClick = (event) => {
    event.stopPropagation();
    dislike(id);
  };

  return (
    <div className="d-flex">
      <button type="button" onClick={onLikeClick} className="rounded-2 d-flex align-items-center text-muted btn">
        { isLike ? <AiFillLike style={{ color: '#27BCFD' }} /> : <AiFillLike />}
        <span className="ms-1">{upVotesBy.length}</span>
      </button>
      <button type="button" onClick={onDislikeClick} className="rounded-2 d-flex align-items-center text-muted btn">
        { isDisLike ? <AiFillDislike style={{ color: '#27BCFD' }} /> : <AiFillDislike />}
        <span className="ms-1">{downVotesBy.length}</span>
      </button>
    </div>
  );
}

VoteComponent.propTypes = {
  id: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
};

export default VoteComponent;
