import { ActionType } from './action';

const INITIAL_STATE = {
  values: [],
  selectedCategory: null,
};

function CategoriesReducer(categories = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_CATEGORIES:
      return action.payload;
    case ActionType.TOGGLE_CATEGORY:
      return {
        ...categories,
        selectedCategory: categories.selectedCategory === action.payload.selectedCategory
          ? null
          : action.payload.selectedCategory,
      };
    default:
      return categories;
  }
}

export default CategoriesReducer;
