import axios from "axios";
import { GET_USEREMPLOYEE } from "./types"; //USEREMPLOYEE
import ApiConfig from "../config/api.config.json";

let token = localStorage.getItem(ApiConfig.LS.TOKEN);

export const getUserEmployee = () => dispatch => {
  let options = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.USEREMPLOYEE,
    method: "get",
    headers: {
      Authorization: token
    }
  };
  axios(options)
    .then(res => {
      dispatch({
        type: GET_USEREMPLOYEE,
        payload: res.data.message,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: GET_USEREMPLOYEE,
        payload: null
      });
    });
};
