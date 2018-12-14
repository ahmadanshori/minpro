import {
  GET_USER,
  DEL_USER,
  ADD_USER,
  PUT_USER,
  GET_USEREMPLOYEE,
  GET_USERSTAFF
} from "../actions/types"; //CREATE_USER, DELETE_USER

const initialState = {
  useran: [], //nilai awal masih kosong (array kosong) bebas variabel
  useremployee: [],
  staff: [],
  statusGET: "",
  statusDEL: "",
  statusADD: "",
  statusPUT: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        useran: action.payload,
        statusGET: action.status
      };

    case DEL_USER:
      return {
        ...state,
        useran: state.useran.filter(useran => useran._id !== action.payload),
        statusDEL: action.status
      };

    case ADD_USER:
      return {
        ...state,
        useran: state.useran.concat(action.payload),
        statusADD: action.status
      };

    case PUT_USER:
      return {
        ...state,
        useran: state.useran.filter(useran => useran._id !== action.payload.id),
        statusPUT: action.status
      };

    case GET_USEREMPLOYEE:
      return {
        ...state,
        useremployee: action.payload,
        statusGET: action.status
      };

    case GET_USERSTAFF:
      return {
        ...state,
        staff: action.payload
      };

    default:
      return state;
  }
}
