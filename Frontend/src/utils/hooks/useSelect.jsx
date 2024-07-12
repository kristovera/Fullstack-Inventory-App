import useAPI from "./useAPI"

const useSelect = (endpoints) => {
    const api = useAPI();
    
    const getData = () => {
        return new Promise((resolve, reject) => {
            api.http
            .get(api.buildURL([...endpoints]), api.buildConfig())
            .then((response) => {
              resolve(response.data);
            })
            .catch((error) => {
              reject(error);
            });
        })
    };

    return  { getData }
}


export default useSelect;