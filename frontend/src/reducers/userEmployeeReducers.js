import { GET_USEREMPLOYEE } from "../actions/types"; //CREATE_USER, DELETE_USER

const initialState = {
  useremployee: [], //nilai awal masih kosong (array kosong) bebas variabel
  statusGET: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USEREMPLOYEE:
      return {
        ...state,
        useremployee: action.payload,
        statusGET: action.status
      };

    default:
      return state;
  }
}
