import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_LEADERBOARD: 'RECEIVE_LEADERBOARD',
  CLEAR_LEADERBOARD: 'CLEAR_LEADERBOARD',
};

function receiveLeaderboardActionCreator(leaderboard) {
  return {
    type: ActionType.RECEIVE_LEADERBOARD,
    payload: {
      leaderboard,
    },
  };
}

function clearLeaderboardActionCreator() {
  return {
    type: ActionType.CLEAR_LEADERBOARD,
  };
}

function asyncReceiveLeaderboard() {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearLeaderboardActionCreator());

    try {
      const leaderboard = await api.leaderboard();
      dispatch(receiveLeaderboardActionCreator(leaderboard));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveLeaderboardActionCreator,
  clearLeaderboardActionCreator,
  asyncReceiveLeaderboard,
};
