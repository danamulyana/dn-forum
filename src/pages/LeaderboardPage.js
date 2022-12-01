import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardList from '../components/LeaderboardList';
import { asyncReceiveLeaderboard } from '../states/leaderboard/action';

function LeaderboardPage() {
  const {
    authUser = null,
    leaderboard = [],
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboard());
  }, [dispatch]);

  if (!leaderboard) {
    return null;
  }

  const leaderFilter = leaderboard.map((leader) => {
    if (authUser !== null) {
      if (leader.user.id === authUser.id) {
        return {
          ...leader,
          user: {
            ...leader.user,
            name: `${leader.user.name} (Me)`,
          },
        };
      }
    }
    return leader;
  });

  return (
    <section className="container">
      <div className="row">
        {
          leaderFilter.map((leader, index) => {
            if (index < 3) {
              return (
                <LeaderboardList
                  {...leader}
                  index={index}
                  key={leader.user.id}
                />
              );
            }
            return null;
          })
        }
      </div>
      <div className="row my-3">
        <div className="col-12 card">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">User</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {
                  leaderFilter.map((leader, index) => {
                    if (index >= 3) {
                      return (
                        <tr key={leader.user.id}>
                          <td>{index + 1}</td>
                          <td>
                            <img className="rounded-circle" src={leader.user.avatar} alt={leader.user.name} height={30} />
                            {' '}
                            {leader.user.name}
                          </td>
                          <td>{leader.score}</td>
                        </tr>
                      );
                    }
                    return null;
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LeaderboardPage;
