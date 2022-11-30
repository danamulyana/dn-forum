import React, { useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import ThreadList from '../components/ThreadList';
import CategoriesList from '../components/CategoriesList';
import { toggleCategoryActionCreator } from '../states/categories/action';
import { asyncToggleLikeThread, asyncToggleUnLikeThread } from '../states/thread/action';

function HomePage() {
  const {
    threads = [],
    users = [],
    categories = [],
    authUser = null,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onLike = (id) => {
    dispatch(asyncToggleLikeThread(id));
  };

  const onDisLike = (id) => {
    dispatch(asyncToggleUnLikeThread(id));
  };

  const threadsFilter = categories.selectedCategory === null ? threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  })) : threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  })).filter((thread) => thread.category.includes(categories.selectedCategory));

  const FilterByCategory = (e) => {
    document.querySelectorAll('.btn-category').forEach((allbtn) => {
      allbtn.classList.remove('btn-primary');
      allbtn.classList.add('btn-outline-primary');
    });

    if (categories.selectedCategory !== e.target.value) {
      e.target.classList.remove('btn-outline-primary');
      e.target.classList.add('btn-primary');
    }

    dispatch(toggleCategoryActionCreator(e.target.value));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-4 my-2">
          <div className="card">
            <div className="card-body">
              <h2 className="h5">Categories</h2>
              <hr className="divider" />
              <CategoriesList categories={categories} handleFilter={FilterByCategory} />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-8 my-2">
          <div className="d-flex justify-content-between mb-3">
            <h2 className="h4">All Threads</h2>
            {
              authUser !== null
                ? (
                  <Link to="/threads/new" className="btn btn-primary">
                    <FiPlus />
                    {' '}
                    Add Thread
                  </Link>
                ) : null
            }
          </div>
          <hr className="divider" />
          <ThreadList threads={threadsFilter} like={onLike} dislike={onDisLike} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
