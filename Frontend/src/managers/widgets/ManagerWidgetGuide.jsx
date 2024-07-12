import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { PiShieldWarningDuotone } from "react-icons/pi";

const ManagerWidgetGuide = ({ guide, field }) => {
  return (
    <>
      {guide.data[field]?.message && (
        <Form.Text className="text-muted">
          <PiShieldWarningDuotone className="text-success" />
          {" Tips: "}
          {guide.data[field]?.message}
        </Form.Text>
      )}
    </>
  );
};

ManagerWidgetGuide.propTypes = {
  guide: PropTypes.object,
  field: PropTypes.string,
};

export default ManagerWidgetGuide;
