import { useRef } from "react";

const useFilter = () => {
  const data = useRef({ page: 1, field: "", value: "" });

  const search = ({ field, value }) => {
    return new Promise(() => {
      data.current = { ...data.current, page: 1, field, value };
    });
  };

  return { data, search };
};

export default useFilter;
