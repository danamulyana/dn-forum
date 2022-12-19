import threadDetailReducer from './reducer';

describe('threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return threadDetail when given by RECEIVE_THREAD_DETAIL action', () => {
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        threadDetail: {
          id: 'thread-B3N9KGa87vfMHyBQ',
          title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu!',
          body: '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. Sekali lagi saya ucapkan selamat datang semuanya!</div><div><br></div><div>Seperti yang sudah disampaikan sebelumnya, pada diskusi ini kamu bisa memperkenalkan diri kamu dan juga berkenalan dengan teman sekelas lainnya.</div><div><br></div><div>Berhubungan baik dengan teman sekelas dan instruktur merupakan bagian penting dari pembelajaran di kelas ini, karena mereka dapat membantu jika kamu mengalami kendala dalam mempelajari dan memahami materi.&nbsp;&nbsp;</div><div><br></div><div>Oleh karena itu, luangkanlah waktumu untuk saling mengenal dan mencairkan suasana. Membangun interaksi dengan siswa lain akan membuat pengalaman belajar kamu jauh lebih menyenangkan dan menarik.&nbsp;</div><div><br></div><div>Beberapa hal yang dapat kamu tulis pada perkenalan diri:</div><div><br></div><div>1. Siapa kamu dan dari mana kamu berasal?</div><div>2. Apa pekerjaan atau pendidikan kamu saat ini?</div><div>3. Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?</div>',
          createdAt: '2022-11-13T09:55:55.353Z',
          owner: {
            id: 'user-6oWew2w2Wx5xLUTU',
            name: 'Dicoding',
            avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
          },
          category: 'introduction',
          comments: [],
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return null when given by CLEAR_THREAD_DETAIL action', () => {
    const initialState = {
      id: 'thread-B3N9KGa87vfMHyBQ',
      title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu!',
      body: '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. Sekali lagi saya ucapkan selamat datang semuanya!</div><div><br></div><div>Seperti yang sudah disampaikan sebelumnya, pada diskusi ini kamu bisa memperkenalkan diri kamu dan juga berkenalan dengan teman sekelas lainnya.</div><div><br></div><div>Berhubungan baik dengan teman sekelas dan instruktur merupakan bagian penting dari pembelajaran di kelas ini, karena mereka dapat membantu jika kamu mengalami kendala dalam mempelajari dan memahami materi.&nbsp;&nbsp;</div><div><br></div><div>Oleh karena itu, luangkanlah waktumu untuk saling mengenal dan mencairkan suasana. Membangun interaksi dengan siswa lain akan membuat pengalaman belajar kamu jauh lebih menyenangkan dan menarik.&nbsp;</div><div><br></div><div>Beberapa hal yang dapat kamu tulis pada perkenalan diri:</div><div><br></div><div>1. Siapa kamu dan dari mana kamu berasal?</div><div>2. Apa pekerjaan atau pendidikan kamu saat ini?</div><div>3. Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?</div>',
      createdAt: '2022-11-13T09:55:55.353Z',
      owner: {
        id: 'user-6oWew2w2Wx5xLUTU',
        name: 'Dicoding',
        avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
      },
      category: 'introduction',
      comments: [],
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = { type: 'CLEAR_THREAD_DETAIL' };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toBeNull();
  });

  it('should return the threadDetail with the toggled like threadDetail when given by TOGGLE_LIKE_THREAD action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu!',
      body: '<div>Bagaimana kabarmu? Semoga baik-baik saja ya</div>',
      createdAt: '2022-11-13T09:55:55.353Z',
      owner: {
        id: 'user-6oWew2w2Wx5xLUTU',
        name: 'Dicoding',
        avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
      },
      category: 'introduction',
      comments: [],
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: 'TOGGLE_LIKE_THREAD_DETAIL',
      payload: {
        threadId: 'thread-1',
        userId: 'user-6oWew2w2Wx5xLUTU',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(
      {
        ...initialState,
        upVotesBy: [action.payload.userId],
      },
    );

    const nextState2 = threadDetailReducer(nextState, action);

    expect(nextState2).toEqual(initialState);
  });

  it('should return the threadDetail with the toggled unlike threadDetail when given by TOGGLE_UNLIKE_THREAD action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu!',
      body: '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. </div>',
      createdAt: '2022-11-13T09:55:55.353Z',
      owner: {
        id: 'user-6oWew2w2Wx5xLUTU',
        name: 'Dicoding',
        avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
      },
      category: 'introduction',
      comments: [],
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: 'TOGGLE_UNLIKE_THREAD_DETAIL',
      payload: {
        threadId: 'thread-1',
        userId: 'user-6oWew2w2Wx5xLUTU',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(
      {
        ...initialState,
        downVotesBy: [action.payload.userId],
      },
    );

    const nextState2 = threadDetailReducer(nextState, action);

    expect(nextState2).toEqual(initialState);
  });

  it('should return the threadDetail with the toggled like commentThreadDetail when given by TOGGLE_LIKE_THREAD_DETAIL_COMMENT action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu!',
      body: '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. </div>',
      createdAt: '2022-11-13T09:55:55.353Z',
      owner: {
        id: 'user-6oWew2w2Wx5xLUTU',
        name: 'Dicoding',
        avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
      },
      category: 'introduction',
      comments: [
        {
          id: 'comment-1',
          content: 'Halo! Saya Dimas, dari Bandung.',
          createdAt: '2022-11-13T09:57:52.762Z',
          owner: {
            id: 'user-1',
            name: 'Dimas Saputra',
            avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: 'TOGGLE_LIKE_THREAD_DETAIL_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(
      {
        ...initialState,
        comments: [
          {
            ...initialState.comments[0],
            upVotesBy: [action.payload.userId],
          },
        ],
      },
    );

    const nextState2 = threadDetailReducer(nextState, action);

    expect(nextState2).toEqual(initialState);
  });

  it('should return the threadDetail with the toggled like commentThreadDetail when given by TOGGLE_UNLIKE_THREAD_DETAIL_COMMENT action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu!',
      body: '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. </div>',
      createdAt: '2022-11-13T09:55:55.353Z',
      owner: {
        id: 'user-6oWew2w2Wx5xLUTU',
        name: 'Dicoding',
        avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
      },
      category: 'introduction',
      comments: [
        {
          id: 'comment-1',
          content: 'Halo! Saya Dimas, dari Bandung.',
          createdAt: '2022-11-13T09:57:52.762Z',
          owner: {
            id: 'user-1',
            name: 'Dimas Saputra',
            avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: 'TOGGLE_UNLIKE_THREAD_DETAIL_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(
      {
        ...initialState,
        comments: [
          {
            ...initialState.comments[0],
            downVotesBy: [action.payload.userId],
          },
        ],
      },
    );

    const nextState2 = threadDetailReducer(nextState, action);

    expect(nextState2).toEqual(initialState);
  });

  it('should return the threadDetail with the add Comment when gicen by ADD_COMMENT_THREAD_DETAIL action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu!',
      body: '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. </div>',
      createdAt: '2022-11-13T09:55:55.353Z',
      owner: {
        id: 'user-6oWew2w2Wx5xLUTU',
        name: 'Dicoding',
        avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
      },
      category: 'introduction',
      comments: [
        {
          id: 'comment-1',
          content: 'Halo! ini comment testing',
          createdAt: '2022-11-13T09:57:52.762Z',
          owner: {
            id: 'user-1',
            name: 'Testing',
            avatar: 'https://ui-avatars.com/api/?name=Testing&background=random',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: 'ADD_COMMENT_THREAD_DETAIL',
      payload: {
        comment: {
          id: 'comment-2',
          content: 'Halo! ini comment testing',
          createdAt: '2022-11-13T09:57:52.762Z',
          owner: {
            id: 'user-2',
            name: 'Testing',
            avatar: 'https://ui-avatars.com/api/?name=Testing&background=random',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload.comment, ...initialState.comments],
    });
  });
});
