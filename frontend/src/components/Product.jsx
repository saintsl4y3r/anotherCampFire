import PropTypes from "prop-types";

function Product({ productID, productName, price }) {
  return (
    <div>
      <strong>{productName}</strong> (ID: {productID}) — ${price.toFixed(2)}
    </div>
  );
}

Product.propTypes = {
  productID: PropTypes.number.isRequired,
  productName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Product;
