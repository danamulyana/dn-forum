import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_LIKE_THREAD: 'TOGGLE_LIKE_THREAD',
  TOGGLE_UNLIKE_THREAD: 'TOGGLE_UNLIKE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleLikeThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleUnLikeThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UNLIKE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
      throw error.message;
    }
    dispatch(hideLoading());
  };
}

function asyncToggleLikeThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    try {
      if (authUser === null) throw new Error('Harap Login terlebih dahulu.');
      dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id }));

      const thread = await api.getThreadDetail(threadId);
      const cek = thread.upVotesBy.filter((ids) => ids === authUser.id).length;

      if (cek) {
        await api.neutralVoteThread(threadId);
      } else {
        await api.voteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
      throw error.message;
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUnLikeThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    try {
      if (authUser === null) throw new Error('Harap Login terlebih dahulu.');
      dispatch(toggleUnLikeThreadActionCreator({ threadId, userId: authUser.id }));

      const thread = await api.getThreadDetail(threadId);
      const cek = thread.downVotesBy.filter((ids) => ids === authUser.id).length;

      if (cek) {
        await api.neutralVoteThread(threadId);
      } else {
        await api.unVoteThread(threadId);
      }
    } catch (error) {
      throw error.message;
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncAddThread,
  asyncToggleLikeThread,
  asyncToggleUnLikeThread,
};
