import {
  GET_P_FILE,
  DEL_P_FILE,
  ADD_P_FILE,
  PUT_P_FILE,
  GET_F_ONE
} from "../actions/types"; //CREATE_P_FILE, DELETE_P_FILE

const initialState = {
  promotFile: [], //nilai awal masih kosong (array kosong) bebas variabel
  file: [],
  statusGET: "",
  statusDEL: "",
  statusADD: "",
  statusPUT: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_P_FILE:
      return {
        ...state,
        promotFile: action.payload,
        statusGET: action.status
      };

    case DEL_P_FILE:
      return {
        ...state,
        promotFile: state.promotFile.filter(
          promotFile => promotFile._id !== action.payload
        ),
        statusDEL: action.status
      };

    case ADD_P_FILE:
      return {
        ...state,
        promotFile: state.promotFile.concat(action.payload),
        statusADD: action.status
      };

    case PUT_P_FILE:
      return {
        ...state,
        promotFile: state.promotFile.filter(
          promotFile => promotFile._id !== action.payload.id
        ),
        statusPUT: action.status
      };

    case GET_F_ONE:
      return {
        ...state,
        file: action.payload
      };

    default:
      return state;
  }
}
