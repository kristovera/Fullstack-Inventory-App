import { useState } from "react";

const useGuide = (fields) => {
  const [data, setData] = useState(() => {
    const obj = {};
    for (let field of fields) {
      obj[field] = { message: "", isValid: true };
    }

    return obj;
  });

  return {
    data,
    setData,
  };
};

export default useGuide;
