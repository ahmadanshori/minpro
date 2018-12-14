import axios from "axios";
import { GET_MENU, DEL_MENU, ADD_MENU, PUT_MENU } from "./types"; //, CREATE_MENU, DELETE_MENU
import ApiConfig from "../config/api.config.json";

let token = localStorage.getItem(ApiConfig.LS.TOKEN);

export const getAllMenu = () => dispatch => {
  let options = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.MENU,
    method: "get",
    headers: {
      Authorization: token
    }
  };
  axios(options)
    .then(res => {
      dispatch({
        type: GET_MENU,
        payload: res.data.message,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: GET_MENU,
        payload: null
      });
    });
};

export const delMenu = param => dispatch => {
  let options = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.MENU + "/" + param,
    method: "delete",
    headers: {
      Authorization: token
    }
  };
  axios(options)
    .then(res => {
      dispatch({
        type: DEL_MENU,
        payload: param,
        status: res.data.code
      });
    })
    .catch(error =>
      dispatch({
        type: DEL_MENU,
        payload: null
        // type: GET_ERRORS,
        // payload: err.response.data
      })
    );
};

export const createMenu = body => dispatch => {
  let token = localStorage.getItem(ApiConfig.LS.TOKEN);
  let option = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.MENU,
    method: "post",
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    },
    data: body
  };
  axios(option)
    .then(res => {
      dispatch({
        type: ADD_MENU,
        payload: body,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: ADD_MENU,
        payload: null
      });
    });
};

export const putMenu = body => dispatch => {
  alert(JSON.stringify(body));
  let token = localStorage.getItem(ApiConfig.LS.TOKEN);
  let option = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.MENU + "/" + body.code,
    method: "put",
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    },
    data: body
  };
  alert(body);
  axios(option)
    .then(res => {
      dispatch({
        type: PUT_MENU,
        payload: body,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: PUT_MENU,
        payload: null
      });
    });
};
