import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaComments } from 'react-icons/fa';
import parser from 'html-react-parser';
import { postedAt } from '../utils';
import VoteComponent from './VoteComponent';

function ThreadItem({
  id, title, body, createdAt, totalComments, upVotesBy, downVotesBy, user, like, dislike,
}) {
  return (
    <article className="card mb-2">
      <div className="card-header border-bottom border-200 d-flex flex-column flex-md-row justify-content-between text-muted">
        <div className="d-flex align-items-center position-relative">
          <div className="avatar">
            <img className="rounded-circle" src={user.avatar} alt={user.name} width="30" />
          </div>
          <div className="flex-1 ms-2">
            <h2 className="h6 mb-0 fw-semi-bold text-900">{user.name}</h2>
          </div>
        </div>
        <time className="text-500 fs-6 mb-0" dateTime={createdAt}>{postedAt(createdAt)}</time>
      </div>
      <div className="card-body">
        <Link to={`/threads/${id}`} key={id}>
          <div className="border-bottom border-200 fs-6 py-3 text-muted">
            <h1 className="h4 text-truncate">{title}</h1>
            <div className="text-truncate">{parser(body)}</div>
          </div>
        </Link>
        <div className="d-flex g-0 fw-semi-bold text-center py-2 fs-6 justify-content-between">
          <VoteComponent
            id={id}
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
            like={like}
            dislike={dislike}
          />
          <div className="d-flex align-items-center text-muted">
            <FaComments />
            <span className="ms-1">{totalComments}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
};

export { threadItemShape };
export default ThreadItem;
