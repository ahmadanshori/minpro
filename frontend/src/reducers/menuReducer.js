import { GET_MENU, DEL_MENU, ADD_MENU, PUT_MENU } from "../actions/types"; //CREATE_MENU, DELETE_MENU

const initialState = {
  menuArr: [], //nilai awal masih kosong (array kosong) bebas variabel
  statusGET: "",
  statusDEL: "",
  statusADD: "",
  statusPUT: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MENU:
      return {
        ...state,
        menuArr: action.payload,
        statusGET: action.status
      };

    case DEL_MENU:
      return {
        ...state,
        menuArr: state.menuArr.filter(menuArr => menuArr._id !== action.payload.id),
        statusDEL: action.status
      };

    case ADD_MENU:
      return {
        ...state,
        // menuArr: action.payload,
        statusADD: action.status
      };

    case PUT_MENU:
      return {
        ...state,
        menuArr: state.menuArr.filter(menuArr => menuArr._id !== action.payload.id),
        statusPUT: action.status
      };

    default:
      return state;
  }
}
