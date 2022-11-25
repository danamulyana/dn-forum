import api from '../../utils/api';

const ActionType = {
  RECEIVE_CATEGORIES: 'RECEIVE_CATEGORIES',
  SET_CATEGORIES: 'SET_CATEGORIES',
  TOGGLE_CATEGORY: 'TOGGLE_CATEGORY',
};

function receiveCategoriesActionCreator(categories) {
  return {
    type: ActionType.RECEIVE_CATEGORIES,
    payload: {
      values: categories,
      selectedCategory: null,
    },
  };
}

function toggleCategoryActionCreator(selectedCategory) {
  return {
    type: ActionType.TOGGLE_CATEGORY,
    payload: {
      selectedCategory,
    },
  };
}

export {
  ActionType,
  receiveCategoriesActionCreator,
  toggleCategoryActionCreator,
};
