import PropTypes from "prop-types";

function Review({ reviewID, rating, comment, createdAt, customer, product }) {
  const date = new Date(createdAt).toLocaleDateString();
  return (
    <div>
      Review #{reviewID}: {rating}★ — "{comment}"<br/>
      by <strong>{customer.userName}</strong> on {date} for <em>{product.productName}</em>
    </div>
  );
}

Review.propTypes = {
  reviewID: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  customer: PropTypes.shape({
    userID: PropTypes.number,
    userName: PropTypes.string.isRequired,
  }).isRequired,
  product: PropTypes.shape({
    productID: PropTypes.number,
    productName: PropTypes.string.isRequired,
  }).isRequired,
};

export default Review;
