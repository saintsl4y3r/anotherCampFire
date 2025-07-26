import PropTypes from "prop-types";

function Order({ orderID, orderDate, totalAmount }) {
  const date = new Date(orderDate).toLocaleDateString();
  return (
    <div>
      Order #{orderID} — {date} — Total: ${totalAmount.toFixed(2)}
    </div>
  );
}

Order.propTypes = {
  orderID: PropTypes.number.isRequired,
  orderDate: PropTypes.string.isRequired,
  totalAmount: PropTypes.number.isRequired,
};

export default Order;
