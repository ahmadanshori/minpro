import axios from "axios";
import {
  GET_USER,
  DEL_USER,
  ADD_USER,
  PUT_USER,
  GET_USEREMPLOYEE,
  GET_USERSTAFF
} from "./types"; //, CREATE_USER, DELETE_USER
import ApiConfig from "../config/api.config.json";

let token = localStorage.getItem(ApiConfig.LS.TOKEN);

export const getAllUser = () => dispatch => {
  let options = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.USER.USER,
    method: "get",
    headers: {
      Authorization: token
    }
  };
  axios(options)
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data.message,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: GET_USER,
        payload: null
      });
    });
};

export const delUser = param => dispatch => {
  let options = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.USER.USER + "/" + param,
    method: "delete",
    headers: {
      Authorization: token
    }
  };
  axios(options)
    .then(res => {
      dispatch({
        type: DEL_USER,
        payload: param,
        status: res.data.code
      });
    })
    .catch(error =>
      dispatch({
        type: DEL_USER,
        payload: null
        // type: GET_ERRORS,
        // payload: err.response.data
      })
    );
};

export const createUser = body => dispatch => {
  let token = localStorage.getItem(ApiConfig.LS.TOKEN);
  let option = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.USER.USER,
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
        type: ADD_USER,
        payload: body,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: ADD_USER,
        payload: null
      });
    });
};

export const putUser = body => dispatch => {
  let token = localStorage.getItem(ApiConfig.LS.TOKEN);
  let option = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.USER.USER + "/" + body._id,
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
        type: PUT_USER,
        payload: body,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: PUT_USER,
        payload: null
      });
    });
};
export const getUserEmployee = () => dispatch => {
  let options = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.USER.EMPLOYEE,
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

export const getStaff = () => dispatch => {
  let options = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.USER.STAFF,
    method: "get",
    headers: {
      Authorization: token
    }
  };
  axios(options)
    .then(res => {
      dispatch({
        type: GET_USERSTAFF,
        payload: res.data.message,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: GET_USERSTAFF,
        payload: null
      });
    });
};
