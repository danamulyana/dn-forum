import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_LIKE_THREAD_DETAIL: 'TOGGLE_LIKE_THREAD_DETAIL',
  TOGGLE_UNLIKE_THREAD_DETAIL: 'TOGGLE_UNLIKE_THREAD_DETAIL',
  TOGGLE_LIKE_THREAD_DETAIL_COMMENT: 'TOGGLE_LIKE_THREAD_DETAIL_COMMENT',
  TOGGLE_UNLIKE_THREAD_DETAIL_COMMENT: 'TOGGLE_UNLIKE_THREAD_DETAIL_COMMENT',
  ADD_COMMENT_THREAD_DETAIL: 'ADD_COMMENT_THREAD_DETAIL',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleLikeThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleUnLikeThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_UNLIKE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleLikeThreadDetailCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD_DETAIL_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleUnLikeThreadDetailCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UNLIKE_THREAD_DETAIL_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function setCommentThreadDetailActionCreator({ comment }) {
  return {
    type: ActionType.ADD_COMMENT_THREAD_DETAIL,
    payload: {
      comment,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());

    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      throw error.message;
    }
    dispatch(hideLoading());
  };
}

function asyncToggleLikeThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    try {
      if (authUser === null) throw new Error('Harap Login terlebih dahulu.');
      dispatch(toggleLikeThreadDetailActionCreator(authUser.id));

      const cek = threadDetail.upVotesBy.filter((ids) => ids === authUser.id).length;

      if (cek) {
        await api.neutralVoteThread(threadDetail.id);
      } else {
        await api.voteThread(threadDetail.id);
      }
    } catch (error) {
      alert(error.message);
      throw error.message;
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUnLikeThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    try {
      if (authUser === null) throw new Error('Harap Login terlebih dahulu.');
      dispatch(toggleUnLikeThreadDetailActionCreator(authUser.id));

      const cek = threadDetail.downVotesBy.filter((ids) => ids === authUser.id).length;

      if (cek) {
        await api.neutralVoteThread(threadDetail.id);
      } else {
        await api.unVoteThread(threadDetail.id);
      }
    } catch (error) {
      alert(error.message);
      throw error.message;
    }
    dispatch(hideLoading());
  };
}

function asyncToggleLikeThreadDetailComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    try {
      if (authUser === null) throw new Error('Harap Login terlebih dahulu.');
      dispatch(toggleLikeThreadDetailCommentActionCreator({ commentId, userId: authUser.id }));

      const cek = threadDetail.comments.find((com) => com.id === commentId)
        .upVotesBy.filter((ids) => ids === authUser.id).length;

      if (cek) {
        await api.neutralVoteComment({ threadId: threadDetail.id, commentId });
      } else {
        await api.voteComment({ threadId: threadDetail.id, commentId });
      }
    } catch (error) {
      alert(error.message);
      throw error.message;
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUnLikeThreadDetailComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    try {
      if (authUser === null) throw new Error('Harap Login terlebih dahulu.');
      dispatch(toggleUnLikeThreadDetailCommentActionCreator({ commentId, userId: authUser.id }));

      const cek = threadDetail.comments.find((com) => com.id === commentId)
        .upVotesBy.filter((ids) => ids === authUser.id).length;

      if (cek) {
        await api.neutralVoteComment({ threadId: threadDetail.id, commentId });
      } else {
        await api.unVoteComment({ threadId: threadDetail.id, commentId });
      }
    } catch (error) {
      alert(error.message);
      throw error.message;
    }
    dispatch(hideLoading());
  };
}

function asyncAddCommentThreadDetail({ content }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    try {
      if (authUser === null) throw new Error('Harap Login terlebih dahulu.');

      const comment = await api.createComment({ threadId: threadDetail.id, content });
      dispatch(setCommentThreadDetailActionCreator({ comment }));
    } catch (error) {
      throw error.message;
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncToggleLikeThreadDetail,
  asyncToggleUnLikeThreadDetail,
  asyncToggleLikeThreadDetailComment,
  asyncToggleUnLikeThreadDetailComment,
  asyncAddCommentThreadDetail,
};
