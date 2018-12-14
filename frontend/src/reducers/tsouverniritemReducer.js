import { GET_TSOUVENIR_ITEM, GET_TSOUVENIR_ITEM_VIEW, CREATE_TSOUVENIR_ITEM, PUT_TSOUVENIR_ITEM, PUT_APPROVE, PUT_RECEIVED_TSOUVENIR, PUT_APPROVE_SETTLEMENT } from "../actions/types"; 

const initialState = {
  ts: [], //nilai awal masih kosong (array kosong) bebas variabel
  tsv: [],
  statusGET: "",
  statusDEL: "",
  statusADD: "",
  statusPUT: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TSOUVENIR_ITEM:
      return {
        ...state,
        ts: action.payload,
        //statusGET: action.status
      };

    case GET_TSOUVENIR_ITEM_VIEW:
      return {
        ...state,
        tsv: action.payload,
        //statusGET: action.status
      };

    case CREATE_TSOUVENIR_ITEM:
      return {
        ...state,
        // menuan: action.payload,
        statusADD: action.status
      };

    case PUT_TSOUVENIR_ITEM:
      return {
        ...state,
        ts: state.ts.filter(ts => ts._id !== action.payload.id),
        statusPUT: action.status
      };

    case PUT_APPROVE:
      return {
        ...state,
        statusPUT: action.status
    };

    case PUT_RECEIVED_TSOUVENIR:
      return {
        ...state,
        statusPUT: action.status
    };

    case PUT_APPROVE_SETTLEMENT:
      return {
        ...state,
        statusPUT: action.status
    };

    default:
      return state;
  }

}

