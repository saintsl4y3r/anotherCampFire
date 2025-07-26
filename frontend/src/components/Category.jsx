import PropTypes from "prop-types";

function Category({ _id, name }) {
  return <div key={_id}> {name}</div>;
}

Category.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string,
};

export default Category;