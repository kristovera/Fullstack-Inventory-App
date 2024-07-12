import { useState } from "react";

const useValidation = (fields) => {
  const [data, setData] = useState(fields.map((field) => ({ [field]: [] })));

  const validate = (error) => {
    const result = error?.response?.data;
    if (result) {
      setData(result);
    }
  };

  const get = (field) => {
    if (data && data[field]) {
      return data[field].map((value) => value.msg);
    }
  };

  const reset = () => {
    setData(null);
  };

  return { validate, get, reset };
};

export default useValidation;
