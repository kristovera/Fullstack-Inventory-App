import { useRef, useState } from "react";
import {
  UTIL_DATA_INIT_FILTER,
  UTIL_DATA_INIT_PAGINATION,
} from "../states/constants";
import useAPI from "./useAPI.jsx";

const useList = (endpoints) => {
  const api = useAPI();

  const [states, setStates] = useState([]);
  const [pagination, setPagination] = useState(UTIL_DATA_INIT_PAGINATION);
  const filter = useRef(UTIL_DATA_INIT_FILTER);

  const onAll = () => {
    return new Promise((resolve, reject) => {
      api.http
        .get(api.buildURL(endpoints), api.buildConfig(filter.current))
        .then((response) => {
          const { results, ...pagination } = response.data;
          setStates(results);
          setPagination(pagination);
          resolve({ results, pagination });
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return {
    states,
    setStates,
    pagination,
    setPagination,
    filter,
    onAll,
  };
};

export default useList;