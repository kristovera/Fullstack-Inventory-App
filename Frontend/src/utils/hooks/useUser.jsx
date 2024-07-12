import { useContext } from "react";

import { UtilStateContextBase } from "../states/contexts.jsx";
import useCreate from "./useCreate.jsx";
import useAPI from "./useAPI.jsx";

const useUser = (
  endpoints,
  stateDataInit = {},
  guideFields = [],
  validationFields = []
) => {
  const context = useContext(UtilStateContextBase);
  const api = useAPI();
  const userSignIn = useCreate(
    endpoints,
    stateDataInit,
    guideFields,
    validationFields
  );

  const onSignIn = (payload = null) => {
    return new Promise((resolve, reject) => {
      userSignIn.validation.reset();
      api.http
        .post(
          api.buildURL(endpoints),
          payload || userSignIn.state,
          api.buildConfig()
        )
        .then((response) => {
          context.auth.signIn(response.data.token);
          resolve(response.data);
        })
        .catch((error) => {
          userSignIn.validation.validate(error);
          reject(error);
        });
    });
  };

  return {
    ...userSignIn,
    onSignIn,
  };
};

export default useUser;
