import PropTypes from "prop-types";
import { useRef } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const ManagerWidgetFilter = ({ callback, fields = [] }) => {
  const fieldRef = useRef({ value: "" });
  const valueRef = useRef({ value: "" });

  const onSearch = () => {
    callback({
      field: fieldRef.current.value,
      value: valueRef.current.value,
    });
  };

  return (
    <>
      <InputGroup className="w-75">
        <Form.Select ref={fieldRef} aria-label="Default select example">
          {fields.map((field, index) => (
            <option key={index} value={field.value}>
              {field.text}
            </option>
          ))}
        </Form.Select>
        <Form.Control placeholder="Query search ..." ref={valueRef} />
        <Button onClick={onSearch} variant="secondary">
          <FaSearch />
        </Button>
      </InputGroup>
    </>
  );
};

ManagerWidgetFilter.propTypes = {
  callback: PropTypes.func,
  fields: PropTypes.array,
};

export default ManagerWidgetFilter;
