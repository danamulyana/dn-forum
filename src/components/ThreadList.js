import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem';

function threadList({ threads, like, dislike }) {
  return (
    <div className="container-fluid">
      <div className="mb-3">
        <span className="mb-0 text-600">
          { threads.length }
          {' '}
          threads.
        </span>
      </div>
      {
        threads.map((thread) => (
          <ThreadItem key={thread.id} {...thread} like={like} dislike={dislike} />
        ))
      }
    </div>
  );
}

threadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
};

export default threadList;
