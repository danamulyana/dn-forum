/**
 * skenario testing
 *
 * - asyncReceiveLeaderboard thunk
 *    -should dispatch action correctly when data fetching success
 *    -should dispatch action and call alert correctly when data fetching failed
 *
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { asyncReceiveLeaderboard, clearLeaderboardActionCreator, receiveLeaderboardActionCreator } from './action';
import api from '../../utils/api';

const fakeLeaderboadResponse = [
  {
    user: {
      id: 'user-5PqX6Ldhnk_ifroq',
      name: 'Dimas Saputra',
      email: 'dimas@dicoding.com',
      avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
    },
    score: 55,
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncReceiveLeaderboard thunk', () => {
  beforeEach(() => {
    api._leaderboard = api.leaderboard;
  });

  afterEach(() => {
    api.leaderboard = api._leaderboard;

    delete api._leaderboard;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.leaderboard = () => Promise.resolve(fakeLeaderboadResponse);

    const dispatch = jest.fn();

    await asyncReceiveLeaderboard()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(clearLeaderboardActionCreator());
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboardActionCreator(fakeLeaderboadResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    api.leaderboard = () => Promise.reject(fakeErrorResponse);

    const dispatch = jest.fn();

    window.alert = jest.fn();

    await asyncReceiveLeaderboard()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(clearLeaderboardActionCreator());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
