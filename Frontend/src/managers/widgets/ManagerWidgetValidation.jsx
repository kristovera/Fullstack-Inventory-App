import PropTypes from "prop-types";
import { TiWarningOutline } from "react-icons/ti";

const ManagerWidgetValidation = ({ messages }) => {
  return (
    <>
      {messages && (
        <ul className="list-unstyled">
          {messages.map((value, index) => (
            <li key={index}>
              <small className="text-danger">
                <TiWarningOutline /> Error: {value}
              </small>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

ManagerWidgetValidation.propTypes = {
  messages: PropTypes.array,
};

export default ManagerWidgetValidation;
