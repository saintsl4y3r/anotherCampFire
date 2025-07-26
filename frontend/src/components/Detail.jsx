import PropTypes from "prop-types";

function Detail({ detailID, quantity, price, product, order }) {
  return (
    <div>
      Detail #{detailID}: {quantity}× <em>{product.productName}</em> @ ${price.toFixed(2)} (Order #{order.orderID})
    </div>
  );
}

Detail.propTypes = {
  detailID: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  product: PropTypes.shape({
    productID: PropTypes.number,
    productName: PropTypes.string.isRequired,
  }).isRequired,
  order: PropTypes.shape({
    orderID: PropTypes.number.isRequired,
  }).isRequired,
};

export default Detail;
