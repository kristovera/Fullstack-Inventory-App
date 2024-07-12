import { useState } from "react";
import useAPI from "./useAPI.jsx";
import useGuide from "./useGuide.jsx";
import useValidation from "./useValidation.jsx";
import useInput from "./useInput.jsx";

const useCreate = (
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

  const onCreate = (payload = null) => {
    return new Promise((resolve, reject) => {
      validation.reset();
      api.http
        .post(api.buildURL(endpoints), payload || state, api.buildConfig())
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

  return {
    state,
    setState,
    guide,
    validation,
    input,
    onCreate,
  };
};

export default useCreate;
