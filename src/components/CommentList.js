import React from 'react';
import PropTypes from 'prop-types';
import CommentItem, { ownerShape } from './CommentItem';
import CommentInput from './CommentInput';

function CommentList({
  comments, like, dislike, submit,
}) {
  return (
    <>
      <div className="d-flex justify-content-between my-3">
        <h2 className="h4">
          Comments
          {' '}
          (
          {comments.length}
          )
        </h2>
      </div>
      <CommentInput submit={submit} />
      {
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            {...comment}
            like={like}
            dislike={dislike}
          />
        ))
      }
    </>
  );
}

const commentShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

export default CommentList;
