import { combineReducers } from "redux";

import companyReducer from "./companyReducer";
import employeeReducers from "./employee_reducers";
import userReducers from "./userReducers";
import menuReducers from "./menuReducer";
import roleReducers from "./roleReducers";
import unitReducers from "./unitReducer";
import souvenirReducer from "./souvenirReducer";
import loginReducers from "./loginReducers";
import promotionReducers from "./promotionReducers";
import tsouverniritemReducer from "./tsouverniritemReducer";

export default combineReducers({
  companyIndexReducer : companyReducer,
  useray: userReducers,
  employee: employeeReducers,
  menu : menuReducers,
  rolay: roleReducers,
  souvenir: souvenirReducer,
  promot: promotionReducers,
  tsouveniritem : tsouverniritemReducer,
  login: loginReducers,
  units: unitReducers,
});
