import axios from "axios";
import {
  GET_P_FILE,
  DEL_P_FILE,
  ADD_P_FILE,
  PUT_P_FILE,
  GET_F_ONE
} from "./types"; //, CREATE_P_FILE, DELETE_P_FILE

import ApiConfig from "../config/api.config.json";

let token = localStorage.getItem(ApiConfig.LS.TOKEN);

export const getAllPromotionFile = () => dispatch => {
  let options = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.PROMOTION.FILE,
    method: "get",
    headers: {
      Authorization: token
    }
  };
  axios(options)
    .then(res => {
      dispatch({
        type: GET_P_FILE,
        payload: res.data.message,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: GET_P_FILE,
        payload: null
      });
    });
};

export const delPromotionFile = param => dispatch => {
  let options = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.PROMOTION.FILE + "/" + param,
    method: "delete",
    headers: {
      Authorization: token
    }
  };
  axios(options)
    .then(res => {
      dispatch({
        type: DEL_P_FILE,
        payload: param,
        status: res.data.code
      });
    })
    .catch(error =>
      dispatch({
        type: DEL_P_FILE,
        status: error.response.data.code,
        message: error.response.data.message
      })
    );
};

export const createPromotionFile = body => dispatch => {
  let token = localStorage.getItem(ApiConfig.LS.TOKEN);
  let option = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.PROMOTION.FILE,
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
        type: ADD_P_FILE,
        payload: body,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: ADD_P_FILE,
        payload: null
      });
    });
};

export const putPromotionFile = body => dispatch => {
  let token = localStorage.getItem(ApiConfig.LS.TOKEN);
  let option = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.PROMOTION.FILECLOSE,
    method: "put",
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    },
    data: body
  };
  axios(option)
    .then(res => {
      dispatch({
        type: PUT_P_FILE,
        payload: body,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: PUT_P_FILE,
        payload: null
      });
    });
};

export const getFile = code => dispatch => {
  let options = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.PROMOTION.FILE + "/" + code,
    method: "get",
    headers: {
      Authorization: token
    }
  };
  axios(options)
    .then(res => {
      dispatch({
        type: GET_F_ONE,
        payload: res.data.message,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: GET_F_ONE,
        payload: null
      });
    });
};
