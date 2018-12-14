import axios from "axios";
import {
  GET_EMPLOYEE,
  GET_ID_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  CREATE_EMPLOYEE
} from "./types";
import apiconfig from "../config/api.config.json";

let token = localStorage.getItem(apiconfig.LS.TOKEN);

// dispatch = mengiri,
export const createEmployee = body => dispatch => {
  let options = {
    url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.EMPLOYEE,
    method: "post",
    headers: {
      Authorization: token
    },
    data: body
  };
  axios(options)
    .then(res => {
      dispatch({
        type: CREATE_EMPLOYEE,
        idCreated: res.data.message,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: CREATE_EMPLOYEE,
        status: "Over Capasity, Try Again Next Day Ok!"
      });
    });
};

export const getEmployeeId = param => dispatch => {
  let token = localStorage.getItem(apiconfig.LS.TOKEN);
  let options = {
    url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.EMPLOYEE + "/" + param,
    method: "get",
    headers: {
      Authorization: token
    }
  };
  axios(options)
    .then(res => {
      dispatch({
        type: GET_ID_EMPLOYEE,
        payload: res.data.message
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ID_EMPLOYEE,
        payload: null
      });
    });
};

export const updateEmployee = (param, body) => dispatch => {
  let options = {
    url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.EMPLOYEE + "/" + param,
    method: "put",
    headers: {
      Authorization: token
    },
    data: body
  };
  axios(options)
    .then(res => {
      dispatch({
        type: UPDATE_EMPLOYEE,
        status: res.data.code,
        idUpdated: res.data.message
      });
    })
    .catch(error => {
      dispatch({
        type: UPDATE_EMPLOYEE,
        status: error
      });
    });
};

export const getEmployee = () => dispatch => {
  let options = {
    url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.EMPLOYEE,
    method: "get",
    headers: {
      Authorization: token
    }
  };
  axios(options)
    .then(res => {
      // dikirim ke store dan akan diolah oleh reducer
      // dispatch property kedua (payload), dia yang menampung data
      dispatch({
        type: GET_EMPLOYEE,
        payload: res.data.message
      });
    })
    .catch(error => {
      dispatch({
        type: GET_EMPLOYEE,
        payload: null
      });
    });
};

export const deleteEmployee = param => dispatch => {
  let token = localStorage.getItem(apiconfig.LS.TOKEN);
  let options = {
    url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.EMPLOYEE + "/" + param,
    method: "delete",
    headers: {
      Authorization: token
    }
  };
  axios(options)
    .then(res => {
      dispatch({
        type: DELETE_EMPLOYEE,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: DELETE_EMPLOYEE,
        status: 403
      });
    });
};
