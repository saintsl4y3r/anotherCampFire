import PropTypes from "prop-types";

function Manufacturer({ manuID, manuName }) {
  return (
    <div>
      {manuName} (ID: {manuID})
    </div>
  );
}

Manufacturer.propTypes = {
  manuID: PropTypes.number.isRequired,
  manuName: PropTypes.string.isRequired,
};

export default Manufacturer;
