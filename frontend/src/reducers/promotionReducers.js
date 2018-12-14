import {
  GET_PROMOTION,
  DEL_PROMOTION,
  ADD_PROMOTION,
  PUT_PROMOTION,
  GET_EVENT,
  GET_DESIGN,
  ADD_DATA_P,
  GET_ONE,
  GET_I_ONE,
  GET_F_ONE,
  GET_D_ONE
} from "../actions/types"; //CREATE_PROMOTION, DELETE_PROMOTION

const initialState = {
  promotion: [], //nilai awal masih kosong (array kosong) bebas variabel
  event: [],
  design: [],
  dataP: [],
  one: [],
  item: [],
  file: [],
  designOne: [],
  statusGET: "",
  statusDEL: "",
  statusADD: "",
  statusPUT: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROMOTION:
      return {
        ...state,
        promotion: action.payload,
        statusGET: action.status
      };

    case DEL_PROMOTION:
      return {
        ...state,
        promotion: state.promotion.filter(
          promotion => promotion._id !== action.payload
        ),
        statusDEL: action.status
      };

    case ADD_PROMOTION:
      return {
        ...state,
        promotion: state.promotion.concat(action.payload),
        statusADD: action.status
      };

    case PUT_PROMOTION:
      return {
        ...state,
        promotion: state.promotion.filter(
          promotion => promotion._id !== action.payload.id
        ),
        statusPUT: action.status
      };

    case GET_EVENT:
      return {
        ...state,
        event: action.payload
      };

    case GET_DESIGN:
      return {
        ...state,
        design: action.payload
      };

    case ADD_DATA_P:
      return {
        ...state,
        dataP: action.payload,
        test: alert(JSON.stringify(action.payload))
      };

    case GET_ONE:
      return {
        ...state,
        one: action.payload
      };

    case GET_I_ONE:
      return {
        ...state,
        item: action.payload
      };
    case GET_F_ONE:
      return {
        ...state,
        file: action.payload
      };

    case GET_D_ONE:
      return {
        ...state,
        designOne: action.payload
      };

    default:
      return state;
  }
}
