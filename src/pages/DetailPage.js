import React, { useEffect } from 'react';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import parser from 'html-react-parser';
import { asyncReceiveThreadDetail } from '../states/threadDetail/action';
import { postedAt } from '../utils';

function DetailPage() {
  const { id } = useParams();
  const {
    threadDetail = null,
    authUser,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

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
            <span className="badge rounded text-bg-primary">{threadDetail.category}</span>
          </div>
          <div className="d-flex g-0 fw-semi-bold text-center py-2 fs-6 justify-content-between">
            <div className="d-flex">
              <button type="button" className="rounded-2 d-flex align-items-center text-muted btn">
                <AiFillLike />
                <span className="ms-1">{threadDetail.upVotesBy.length}</span>
              </button>
              <button type="button" className="rounded-2 d-flex align-items-center text-muted btn">
                <AiFillDislike />
                <span className="ms-1">{threadDetail.downVotesBy.length}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between my-3">
        <h2 className="h4">
          Comments
          {' '}
          (
          {threadDetail.comments.length}
          )
        </h2>
      </div>
      {
        threadDetail.comments.map((comment) => (
          <div className="card my-3">
            <div className="card-header border-bottom border-200 d-flex flex-column flex-md-row justify-content-between text-muted align-items-center">
              <div className="d-flex align-items-center position-relative">
                <div className="avatar">
                  <img className="rounded-circle" src={comment.owner.avatar} alt={comment.owner.name} width="30" />
                </div>
                <div className="flex-1 ms-2">
                  <h2 className="h6 mb-0 fw-semi-bold text-900">{comment.owner.name}</h2>
                </div>
              </div>
              <time className="text-500 fs-6 mb-0" dateTime={comment.createdAt}>{postedAt(comment.createdAt)}</time>
            </div>
            <div className="card-body">
              <div className="border-bottom border-200 fs-6 py-1 text-muted">
                <p className="text-truncate">{comment.content}</p>
              </div>
              <div className="d-flex g-0 fw-semi-bold text-center py-2 fs-6 justify-content-between">
                <div className="d-flex">
                  <button type="button" className="rounded-2 d-flex align-items-center text-muted btn">
                    <AiFillLike />
                    <span className="ms-1">{comment.upVotesBy.length}</span>
                  </button>
                  <button type="button" className="rounded-2 d-flex align-items-center text-muted btn">
                    <AiFillDislike />
                    <span className="ms-1">{comment.downVotesBy.length}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </section>
  );
}

export default DetailPage;
