import React from 'react';
import PropTypes from 'prop-types';

function CategoriesList({ categories, handleFilter }) {
  return (
    <div className="d-flex flex-md-column overflow-auto gap-3 py-2">
      {
        Array.isArray(categories.values)
          ? categories.values.map((category) => (
            <div key={category} className="d-grid">
              <button type="button" className="btn-category btn btn-outline-primary text-nowrap" value={category} onClick={handleFilter}>{category}</button>
            </div>
          )) : null
      }
    </div>
  );
}

const categoryShape = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string,
};

CategoriesList.propTypes = {
  categories: PropTypes.objectOf(PropTypes.shape(categoryShape)).isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default CategoriesList;
