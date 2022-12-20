import leaderboadReducer from './reducer';

/**
 * skenario testing
 *
 * - leaderboardReducer function
 *    - should return the initial state when given by unknown action
 *    - should return thread when given by RECEIVE_LEADERBOARD action
 *    - should return thread when given by CLEAR_LEADERBOARD action
 *
 */

describe('leaderboardReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = leaderboadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return thread when given by RECEIVE_LEADERBOARD action', () => {
    const initialState = [];
    const action = {
      type: 'RECEIVE_LEADERBOARD',
      payload: {
        leaderboard: [
          {
            user: {
              id: 'user-ry7WkBEJl2WHUpEy',
              name: 'A MAN',
              email: 'coba18@mail.com',
              avatar: 'https://ui-avatars.com/api/?name=A MAN&background=random',
            },
            score: 1050,
          },
          {
            user: {
              id: 'user-kmWorgWfhvE-F-G2',
              name: 'roby',
              email: 'roby@gmail.com',
              avatar: 'https://ui-avatars.com/api/?name=roby&background=random',
            },
            score: 460,
          },
        ],
      },
    };

    const nextState = leaderboadReducer(initialState, action);

    expect(nextState).toEqual(action.payload.leaderboard);
  });

  it('should return thread when given by CLEAR_LEADERBOARD action', () => {
    const initialState = [
      {
        user: {
          id: 'user-ry7WkBEJl2WHUpEy',
          name: 'A MAN',
          email: 'coba18@mail.com',
          avatar: 'https://ui-avatars.com/api/?name=A MAN&background=random',
        },
        score: 1050,
      },
      {
        user: {
          id: 'user-kmWorgWfhvE-F-G2',
          name: 'roby',
          email: 'roby@gmail.com',
          avatar: 'https://ui-avatars.com/api/?name=roby&background=random',
        },
        score: 460,
      },
    ];

    const action = {
      type: 'CLEAR_LEADERBOARD',
    };

    const nextState = leaderboadReducer(initialState, action);

    expect(nextState).toBeNull();
  });
});
