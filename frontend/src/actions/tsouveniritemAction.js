import axios from "axios";
import { GET_TSOUVENIR_ITEM, GET_TSOUVENIR_ITEM_VIEW, CREATE_TSOUVENIR_ITEM, PUT_TSOUVENIR_ITEM, PUT_APPROVE, PUT_RECEIVED_TSOUVENIR, PUT_APPROVE_SETTLEMENT, PUT_CLOSE_ORDER } from "./types"; 
import ApiConfig from "../configs/api.config.json";

let token = localStorage.getItem(ApiConfig.LS.TOKEN);

export const getAllTsouveniritem = () => dispatch => {
  //alert(ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.TSOUVENIRITEM)
  let options = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.TSOUVENIRITEM,
    method: "get",
    headers: {
      Authorization: token
    }
  };
  axios(options)
    .then(res => {
      dispatch({
        type: GET_TSOUVENIR_ITEM,
        payload: res.data.message,
        //status: res.data.code
      });
      //alert(JSON.stringify(res.data.message))
    })
    .catch(error => {
      dispatch({
        type: GET_TSOUVENIR_ITEM,
        payload: null
      });
    });
};

export const getAllTsouveniritemview = () => dispatch => {
  //alert(ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.TSOUVENIRITEMVIEW)
  let options = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.TSOUVENIRITEMVIEW,
    method: "get",
    headers: {
      Authorization: token
    }
  };
  axios(options)
    .then(res => {
      dispatch({
        type: GET_TSOUVENIR_ITEM_VIEW,
        payload: res.data.message,
        //status: res.data.code
      });
      //alert(JSON.stringify(res.data.message))
    })
    .catch(error => {
      dispatch({
        type: GET_TSOUVENIR_ITEM_VIEW,
        payload: null
      });
    });
};

export const createTsouveniritem = body => dispatch => {
  //alert(ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.TSOUVENIRITEM)
  let token = localStorage.getItem(ApiConfig.LS.TOKEN);
  let option = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.TSOUVENIRITEM,
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
        type: CREATE_TSOUVENIR_ITEM,
        payload: body,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: CREATE_TSOUVENIR_ITEM,
        payload: null
      });
    });
};

export const putTsouveniritem = body => dispatch => {
  // alert(JSON.stringify(body));
  let token = localStorage.getItem(ApiConfig.LS.TOKEN);
  let option = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.TSOUVENIR + "/" + body.code,
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
        type: PUT_TSOUVENIR_ITEM,
        payload: body,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: PUT_TSOUVENIR_ITEM,
        payload: null
      });
    });
};

export const putApprove = body => dispatch => {
  // alert(JSON.stringify(body.code));
  let token = localStorage.getItem(ApiConfig.LS.TOKEN);
  let option = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.TSOUVENIRITEMAPPROVE + '/' + body.code,
    method: "put",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    data: body
  }
  axios(option)
    .then(res => {
      dispatch({
        type: PUT_APPROVE,
        payload: body,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: PUT_APPROVE,
        payload: null
      });
    });
};


export const putReceivedSouvenir = body => dispatch => {
  // alert(JSON.stringify(body.code));
  let token = localStorage.getItem(ApiConfig.LS.TOKEN);
  let option = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.TSOUVENIRITEMRECEIVED + '/' + body.code,
    method: "put",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    data: body
  }
  axios(option)
    .then(res => {
      dispatch({
        type: PUT_RECEIVED_TSOUVENIR,
        payload: body,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: PUT_RECEIVED_TSOUVENIR,
        payload: null
      });
    });
};

export const putApproveSettlement = body => dispatch => {
  let token = localStorage.getItem(ApiConfig.LS.TOKEN);
  let option = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.TSOUVENIRITEMAPPROVESETTLEMENT + '/' + body.code,
    method: "put",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    data: body
  }
  axios(option)
    .then(res => {
      dispatch({
        type: PUT_APPROVE_SETTLEMENT,
        payload: body,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: PUT_APPROVE_SETTLEMENT,
        payload: null
      });
    });
}; 

export const putCloseOrder = body => dispatch => {
  let token = localStorage.getItem(ApiConfig.LS.TOKEN);
  let option = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.TSOUVENIRITEMCLOSEORDER + '/' + body.code,
    method: "put",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    data: body
  }
  axios(option)
    .then(res => {
      dispatch({
        type: PUT_CLOSE_ORDER,
        payload: body,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: PUT_CLOSE_ORDER,
        payload: null
      });
    });
}; 
