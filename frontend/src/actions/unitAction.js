import axios from "axios";
import apiconfig from "../config/api.config.json"
import {
  GET_UNIT,
  CREATE_UNIT,
  GET_UNITS,
  EDIT_UNIT,
  DELETE_UNIT,
  } from "./types"

  let token = localStorage.getItem(apiconfig.LS.TOKEN);

  //<< ---------- VIEW  ------------ >>>
export const getUnits = () => dispatch => {
  let options = {
    url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.UNIT,
    method: "get",
    headers: {
      Authorization: token
    }
  };
  axios(options)
  .then(res => {
      dispatch({
        type: GET_UNITS,
        payload: res.data.message
      })
    }
      
      )
    .catch(err =>
      dispatch({
        type: GET_UNITS,
        payload: null
      })
    );
};



export const getUnit = (param) => dispatch => {
  let options = {
    url: `${apiconfig.BASE_URL}${apiconfig.ENDPOINTS.UNIT}/${param}`,
    method: "get",
    headers: {
      Authorization: token
    }
  };
  axios(options)
    .then(res => {
      dispatch({
        type: GET_UNIT,
        payload: res.data.message

      });
    })
    .catch(error => {
      dispatch({
        type: GET_UNIT,
        payload: null
      });
    });
};

//<< ---------- DELETE ------------ >>>
export const delUnit = param => dispatch => {
  let options = {
    url: `${apiconfig.BASE_URL}${apiconfig.ENDPOINTS.UNIT}${param}`,
    method: "delete",
    headers: {
      Authorization: token
    }
  };
  axios(options)
    .then(res => {
      dispatch({
        type: DELETE_UNIT,
        payload: param,
        status: 1
      });
    })
    .catch(error =>
      dispatch({
        type: DELETE_UNIT,
        payload: error.response.data
        // type: GET_ERRORS,
        // payload: err.response.data
      })
    );
};

//<< ---------- UPDATE ------------ >>>
export const upUnit = param => dispatch => {
  const code = param.code
  console.log(code)
  let option = {
    url: `${apiconfig.BASE_URL}${apiconfig.ENDPOINTS.UNIT}${code}`,
    method: "put",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    data: param
  }
  axios(option)
    .then(res => {
      dispatch({
        type: EDIT_UNIT,
        payload: code,
        data:res.data.message,
        status: 1
      });
    })
    .catch(error =>
      dispatch({
        type: EDIT_UNIT,
        payload: error

      })
    );
};

//<< ---------- CREATE ------------ >>>
export const createUnit = param => dispatch => {
  let option = {
    url: `${apiconfig.BASE_URL}${apiconfig.ENDPOINTS.UNIT}`,
    method: "post",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    data: param,
  }
  axios(option)
    .then(res => {
      dispatch({
        type: CREATE_UNIT,
        payload: res.data.message,
        id: res.data.message.code,
        status: 1
      });
    })
    .catch(error =>
      dispatch({
        type: CREATE_UNIT,
        payload: error.response.data
        // type: GET_ERRORS,
        // payload: 
      })
    );
};
