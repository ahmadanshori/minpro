import { GET_EMPLOYEE, UPDATE_EMPLOYEE, CREATE_EMPLOYEE, DELETE_EMPLOYEE, GET_ID_EMPLOYEE } from "../actions/types";

const initialState = {
  myEmployee: [],
  myEmployeeId: [],
  idCreated : [],
  idUpdated : [],
  messageDeleted : [],
  statusDeleted : null,
  statusCreated : null,
  statusUpdated : null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEE:
      return {
        ...state,
        myEmployee: action.payload
      };
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        statusUpdated: action.status,
        idUpdated: action.idUpdated,
      };
    case CREATE_EMPLOYEE:
      return {
        ...state,
        idCreated: action.idCreated,
        statusCreated: action.status 
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        statusDeleted: action.status,
      };
    case GET_ID_EMPLOYEE:
      return {
        ...state,
        myEmployeeId: action.payload,
      };
    default:
      return state;
  }
}