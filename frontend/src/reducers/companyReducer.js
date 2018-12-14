import { GET_COMPANIES, CREATE_COMPANY, EDIT_COMPANY, DELETE_COMPANY } from "../actions/types";

const initialState = {
    companies: [],
    statusGET: "",
    statusDEL: "",
    statusADD: "",
    statusPUT: ""
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_COMPANIES:
            return {
                ...state,
                companies: action.payload,
                statusGET: action.status
            }
        case DELETE_COMPANY:
            //alert(action.status)
            return {
                ...state,
                //companies: state.companies.filter(companies => companies._id !== action.payload),
                statusDEL: action.status
            }
        case CREATE_COMPANY:
            return {
                ...state,
                //companies: state.companies.concat(action.payload),
                statusADD: action.status
            }
        case EDIT_COMPANY:
            return {
                ...state,
                statusPUT: action.status
                // const updatedCompany = state.companies.map(company => {
                //     if (company.code === action.company_id) {
                //         return { ...company, ...action.payload }
                //     }
                //     return company;
                // })
                // return {
                //     ...state,
                //     companies: updatedCompany,
                //     statusPUT: action.status
            };
        default:
            return state
    }
}