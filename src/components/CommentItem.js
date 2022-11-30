import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import { postedAt } from '../utils';
import VoteComponent from './VoteComponent';

function CommentItem({
  id, owner, createdAt, content, upVotesBy, downVotesBy, like, dislike,
}) {
  return (
    <div className="card my-3">
      <div className="card-header border-bottom border-200 d-flex flex-column flex-md-row justify-content-between text-muted align-items-center">
        <div className="d-flex align-items-center position-relative">
          <div className="avatar">
            <img className="rounded-circle" src={owner.avatar} alt={owner.name} width="30" />
          </div>
          <div className="flex-1 ms-2">
            <h2 className="h6 mb-0 fw-semi-bold text-900">{owner.name}</h2>
          </div>
        </div>
        <time className="text-500 fs-6 mb-0" dateTime={createdAt}>{postedAt(createdAt)}</time>
      </div>
      <div className="card-body">
        <div className="border-bottom border-200 fs-6 py-1 text-muted">
          <p className="text-truncate">{parser(content)}</p>
        </div>
        <div className="d-flex g-0 fw-semi-bold text-center py-2 fs-6 justify-content-between">
          <VoteComponent
            id={id}
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
            like={like}
            dislike={dislike}
          />
        </div>
      </div>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
};

export { ownerShape };

export default CommentItem;
