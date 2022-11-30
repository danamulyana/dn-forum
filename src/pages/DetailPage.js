import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import parser from 'html-react-parser';
import {
  asyncAddCommentThreadDetail,
  asyncReceiveThreadDetail,
  asyncToggleLikeThreadDetail,
  asyncToggleLikeThreadDetailComment,
  asyncToggleUnLikeThreadDetail,
  asyncToggleUnLikeThreadDetailComment,
} from '../states/threadDetail/action';
import { postedAt } from '../utils';
import VoteComponent from '../components/VoteComponent';
import CommentList from '../components/CommentList';

function DetailPage() {
  const { id } = useParams();
  const {
    threadDetail = null,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onLike = (ids) => {
    dispatch(asyncToggleLikeThreadDetail(ids));
  };

  const onDisLike = (ids) => {
    dispatch(asyncToggleUnLikeThreadDetail(ids));
  };

  const onLikeComment = (commentId) => {
    dispatch(asyncToggleLikeThreadDetailComment(commentId));
  };

  const onDisLikeComment = (commentId) => {
    dispatch(asyncToggleUnLikeThreadDetailComment(commentId));
  };

  const onSubmitComment = (content, e) => {
    dispatch(asyncAddCommentThreadDetail(content))
      .then(e.target.reset());
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <section className="container">
      <div className="card">
        <div className="card-header border-bottom border-200 d-flex flex-column flex-md-row justify-content-between text-muted align-items-center">
          <div className="d-flex align-items-center position-relative">
            <div className="avatar">
              <img className="rounded-circle" src={threadDetail.owner.avatar} alt={threadDetail.owner.name} width="40" />
            </div>
            <div className="flex-1 ms-2">
              <h2 className="h6 mb-0 fw-semi-bold text-900">{threadDetail.owner.name}</h2>
            </div>
          </div>
          <time className="text-500 fs-6 mb-0" dateTime={threadDetail.createdAt}>{postedAt(threadDetail.createdAt)}</time>
        </div>
        <div className="card-body">
          <div className="border-bottom border-200 fs-6 py-3 text-muted">
            <h1 className="h4 mb-2">{threadDetail.title}</h1>
            <div>{ parser(threadDetail.body)}</div>
            <span className="badge rounded text-bg-primary mt-4">{threadDetail.category}</span>
          </div>
          <div className="d-flex g-0 fw-semi-bold text-center py-2 fs-6 justify-content-between">
            <VoteComponent {...threadDetail} like={onLike} dislike={onDisLike} />
          </div>
        </div>
      </div>
      <CommentList
        comments={threadDetail.comments}
        like={onLikeComment}
        dislike={onDisLikeComment}
        submit={onSubmitComment}
      />
    </section>
  );
}

export default DetailPage;
