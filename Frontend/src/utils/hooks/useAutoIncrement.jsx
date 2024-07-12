import useAPI from "./useAPI"

const useAutoIncrement = (endpoints) => {
    const api = useAPI();
    
    const getKode = () => {
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

    return  { getKode }
}


export default useAutoIncrement;