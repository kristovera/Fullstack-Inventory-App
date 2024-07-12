import useAPI from "./useAPI.jsx";
import { useState } from "react";
import useGuide from "./useGuide.jsx";
import useValidation from "./useValidation.jsx";
import useInput from "./useInput.jsx";

const useDetail = (
  endpoints,
  stateDataInit = {},
  guideFields = [],
  validationFields = []
) => {
  const api = useAPI();
  const [state, setState] = useState(stateDataInit);
  const guide = useGuide(guideFields);
  const validation = useValidation(validationFields);
  const input = useInput(setState, guide);

  const onGet = (id) => {
    return new Promise((resolve, reject) => {
      api.http
        .get(api.buildURL([...endpoints, id]), api.buildConfig())
        .then((response) => {
          setState(response.data);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const onUpdate = (id, payload = null) => {
    return new Promise((resolve, reject) => {
      validation.reset();
      api.http
        .put(
          api.buildURL([...endpoints, id]),
          payload || state,
          api.buildConfig()
        )
        .then((response) => {
          setState(response.data);
          resolve(response.data);
        })
        .catch((error) => {
          validation.validate(error);
          reject(error);
        });
    });
  };

  const onDelete = (id) => {
    return new Promise((resolve, reject) => {
      api.http
        .delete(api.buildURL([...endpoints, id]), api.buildConfig())
        .then(() => {
          resolve(null);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return {
    state,
    setState,
    guide,
    validation,
    input,
    onGet,
    onUpdate,
    onDelete,
  };
};

export default useDetail;
