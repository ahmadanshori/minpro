import axios from "axios";
import {
  CURRENT_USER,
  FORGOT_USER,
  REPASS_USER,
  NOTIF_ADMIN,
  NOTIF_STAFF
} from "./types";
import ApiConfig from "../config/api.config.json";

let token = localStorage.getItem(ApiConfig.LS.TOKEN);

// Login User Action
export const UserLogin = userData => dispatch => {
  (async () => {
    let option = {
      url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.LOGIN.LOGIN,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: userData
    };

    try {
      let res = await axios(option);
      // filter what to send with payload
      const userdata = {
        username: res.data.message.userdata.username,
        role_id: res.data.message.userdata.m_role_id,
        employee_id: res.data.message.userdata.m_employee_id
      };

      // Set userData and Token to localStorage
      localStorage.setItem(ApiConfig.LS.USERDATA, JSON.stringify(userdata));
      localStorage.setItem(ApiConfig.LS.TOKEN, res.data.message.token);

      dispatch({
        type: CURRENT_USER,
        payload: userdata,
        status: res.data.code,
        message: res.data.message
      });
      // redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      dispatch({
        type: CURRENT_USER,
        status: err.response.data.code,
        message: err.response.data.message
      });
    }
  })();
};

export const ForgotPassword = body => dispatch => {
  let token = localStorage.getItem(ApiConfig.LS.TOKEN);
  let option = {
    url:
      ApiConfig.BASE_URL +
      ApiConfig.ENDPOINTS.LOGIN.FORGOT +
      "/" +
      body.username,
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
        type: FORGOT_USER,
        payload: body,
        status: res.data.code
      });
      window.location.href = "/dashboard";
    })
    .catch(err => {
      dispatch({
        type: FORGOT_USER,
        status: err.response.data.code,
        message: err.response.data.message
      });
    });
};

export const RePassword = body => dispatch => {
  let token = localStorage.getItem(ApiConfig.LS.TOKEN);
  let option = {
    url:
      ApiConfig.BASE_URL +
      ApiConfig.ENDPOINTS.LOGIN.REPASS +
      "/" +
      body.username,
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
        type: REPASS_USER,
        payload: body,
        status: res.data.code
      });
      localStorage.clear();
      window.location.href = "/dashboard";
    })
    .catch(err => {
      dispatch({
        type: REPASS_USER,
        status: err.response.data.code,
        message: err.response.data.message
      });
    });
};

export const getNotifAdmin = () => dispatch => {
  let options = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.LOGIN.NOTIFADMIN,
    method: "get",
    headers: {
      Authorization: token
    }
  };
  axios(options)
    .then(res => {
      dispatch({
        type: NOTIF_ADMIN,
        payload: res.data.message,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: NOTIF_ADMIN,
        payload: error
      });
    });
};

export const getNotifStaff = code => dispatch => {
  let options = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.LOGIN.NOTIFSTAFF + "/" + code,
    method: "get",
    headers: {
      Authorization: token
    }
  };
  axios(options)
    .then(res => {
      dispatch({
        type: NOTIF_STAFF,
        payload: res.data.message,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: NOTIF_STAFF,
        payload: error
      });
    });
};
