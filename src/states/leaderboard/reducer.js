import { ActionType } from './action';

function leaderboardReducer(leaderboard = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_LEADERBOARD:
      return action.payload.leaderboard;
    case ActionType.CLEAR_LEADERBOARD:
      return null;
    default:
      return leaderboard;
  }
}

export default leaderboardReducer;
