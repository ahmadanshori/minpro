import axios from "axios"
import { GET_COMPANIES, CREATE_COMPANY, EDIT_COMPANY, DELETE_COMPANY } from "./types"
import Apiconfig from "../config/api.config.json"

let token = localStorage.getItem(Apiconfig.LS.TOKEN)

export const getCompanies = () => dispatch => {
    let options = {
        url: Apiconfig.BASE_URL + Apiconfig.ENDPOINTS.COMPANY,
        method: "get",
        headers: {
            Authorization: token
        }
    }
    axios(options)
        .then(res => {
            dispatch({
                type: GET_COMPANIES,
                payload: res.data.message
            })
        })
        .catch(error => {
            dispatch({
                type: GET_COMPANIES,
                payload: null
            })
        })
}

export const createCompany = body => dispatch => {
    let token = localStorage.getItem(Apiconfig.LS.TOKEN);
    let option = {
        url: Apiconfig.BASE_URL + Apiconfig.ENDPOINTS.COMPANY,
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
                type: CREATE_COMPANY,
                payload: body,
                status: res.data.code
            });
        })
        .catch(error => {
            dispatch({
                type: CREATE_COMPANY,
                payload: null
            });
        });
};

export const deleteCompany = body => dispatch => {
    //alert(JSON.stringify(body))
    let token = localStorage.getItem(Apiconfig.LS.TOKEN);
    let options = {
        url: Apiconfig.BASE_URL + Apiconfig.ENDPOINTS.COMPANY + "/" + body.code,
        method: "delete",
        headers: {
            Authorization: token
        },
        data: body
    }
    axios(options)
        .then(res => {
            dispatch({
                type: DELETE_COMPANY,
                payload: body,
                status: res.data.code
            })
            //alert(res.data.code)
        })
        .catch(error => {
            dispatch({
                type: DELETE_COMPANY,
                payload: null,
                status: 400,
            })
        })
}

export const editCompany = body => dispatch => {
    let token = localStorage.getItem(Apiconfig.LS.TOKEN);
    let options = {
        url: Apiconfig.BASE_URL + Apiconfig.ENDPOINTS.COMPANY + "/" + body.formdata.code,
        method: "put",
        headers: {
            Authorization: token
        },
        data: body.formdata
    }
    axios(options)
        .then(res => {
            dispatch({
                type: EDIT_COMPANY,
                payload: body.formdata,
                status: res.data.code,
                company_id: body.formdata.code
            })
        })
        .catch(error => {
            dispatch({
                type: EDIT_COMPANY,
                payload: null
            })
        })
}

