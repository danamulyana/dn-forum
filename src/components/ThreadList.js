import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem';

function threadList({ threads }) {
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
          <ThreadItem key={thread.id} {...thread} />
        ))
      }
    </div>
  );
}

threadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
};

export default threadList;
