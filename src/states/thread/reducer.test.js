/**
 * skenario testing
 *
 * - threadReducers function
 *    - should return the initial state when given by unknown action
 *    - should return thread when given by RECEIVE_THREADS action
 *    - should return thread with the new thread when given by ADD_THREAD action
 *    - should return thread with the toggled like thread when given by TOGGLE_LIKE_THREAD action
 *    - should return thread with the toggled unlike thread when given by TOGGLE_UNLIKE_THREAD
 * action
 *
 */
import threadReducer from './reducer';

describe('threadReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return thread when given by RECEIVE_THREADS action', () => {
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Test Thread',
            body: 'thrad testing',
            category: 'test',
            createdAt: '2022-12-05T02:16:22.575Z',
            ownerId: 'user-mkn3CMvRnFUhLyNk',
            totalComments: 0,
            upVotesBy: [],
            downVotesBy: [],
          },
          {
            id: 'thread-2',
            title: 'Test Thread 2',
            body: 'thrad testing 2',
            category: 'test',
            createdAt: '2022-12-05T02:16:22.575Z',
            ownerId: 'user-mkn3CMvRnFUhLyNk',
            totalComments: 0,
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      },
    };

    const nextState = threadReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return thread with the new thread when given by ADD_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Test Thread',
        body: 'thrad testing',
        category: 'test',
        createdAt: '2022-12-05T02:16:22.575Z',
        ownerId: 'user-mkn3CMvRnFUhLyNk',
        totalComments: 0,
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Test Thread 2',
          body: 'thrad add testing',
          category: 'test',
          createdAt: '2022-12-05T02:16:22.575Z',
          ownerId: 'user-mkn3CMvRnFUhLyNk',
          totalComments: 0,
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    const nextState = threadReducer(initialState, action);

    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should return thread with the toggled like thread when given by TOGGLE_LIKE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Test Thread',
        body: 'thrad testing',
        category: 'test',
        createdAt: '2022-12-05T02:16:22.575Z',
        ownerId: 'user-mkn3CMvRnFUhLyNk',
        totalComments: 0,
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const action = {
      type: 'TOGGLE_LIKE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'user-mkn3CMvRnFUhLyNk',
      },
    };

    const nextState = threadReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
      },
    ]);

    const nextState2 = threadReducer(nextState, action);

    expect(nextState2).toEqual(initialState);
  });

  it('should return thread with the toggled unlike thread when given by TOGGLE_UNLIKE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Test Thread',
        body: 'thrad testing',
        category: 'test',
        createdAt: '2022-12-05T02:16:22.575Z',
        ownerId: 'user-mkn3CMvRnFUhLyNk',
        totalComments: 0,
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const action = {
      type: 'TOGGLE_UNLIKE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'user-mkn3CMvRnFUhLyNk',
      },
    };

    const nextState = threadReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [action.payload.userId],
      },
    ]);

    const nextState2 = threadReducer(nextState, action);

    expect(nextState2).toEqual(initialState);
  });
});
