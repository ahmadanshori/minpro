import { GET_ROLE, DEL_ROLE, ADD_ROLE, PUT_ROLE } from "../actions/types"; //CREATE_ROLE, DELETE_ROLE

const initialState = {
  rolan: [], //nilai awal masih kosong (array kosong) bebas variabel
  statusGET: "",
  statusDEL: "",
  statusADD: "",
  statusPUT: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ROLE:
      return {
        ...state,
        rolan: action.payload,
        statusGET: action.status
      };

    case DEL_ROLE:
      return {
        ...state,
        rolan: state.rolan.filter(rolan => rolan.code !== action.payload),
        statusDEL: action.status
      };

    case ADD_ROLE:
      return {
        ...state,
        rolan: state.rolan.concat(action.payload), //alert(state.rolan[state.rolan.length - 1].code), //
        statusADD: action.status
      };

    case PUT_ROLE:
      return {
        ...state,
        // rolan: state.rolan.filter(rolan => rolan._id !== action.payload._id),
        statusPUT: action.status
      };

    default:
      return state;
  }
}
