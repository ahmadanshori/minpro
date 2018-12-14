import {
  CURRENT_USER,
  FORGOT_USER,
  REPASS_USER,
  NOTIF_ADMIN,
  NOTIF_STAFF
} from "../actions/types";

const initialState = {
  user: {},
  Notif_Admin: [],
  Notif_Staff: [],
  status: "",
  message: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        status: action.status,
        message: action.message
      };
    case FORGOT_USER:
      return {
        ...state,
        status: action.status,
        message: action.message
      };
    case REPASS_USER:
      return {
        ...state,
        status: action.status,
        message: action.message
      };
    case NOTIF_ADMIN:
      return {
        ...state,
        Notif_Admin: action.payload
      };

    case NOTIF_STAFF:
      return {
        ...state,
        Notif_Staff: action.payload
      };
    default:
      return state;
  }
}
