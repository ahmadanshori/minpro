import React from "react";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import apiconfig from "../config/api.config.json";
import Home from "./content/home/home";
import listUser from "./content/user/listUser";
import listPromotion from "./content/promotion/listPromotion";
import listMenu from "./content/menu/listMenu";
import listCompany from "./content/company/listCompany";
import listEmployee from "./content/employee/ListEmployee";
import listUnit from "./content/unit/UnitList";
import listRole from "./content/role/listRole";
import listAccessMenu from "./content/accessMenu/listAccess";
// import listSouvenir from "./content/souvenir/SouvenirList";
// import listTransactionItem from "./content/tsouverniritem/listTsouverniritem";
import addPromotionD from "./content/promotion/addPromotionD";
import ApprovePromotion from "./content/promotion/ApprovePromotion/viewApprove";
import ClosePromotion from "./content/promotion/ClosePromotion/viewClose";
import ViewPromotion from "./content/promotion/viewPromotion/viewPromotion";

const DashboardSwitcher = () => {
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt3 px-4">
      <Switch>
        <PrivateRoute path="/dashboard" component={Home} />
        <PrivateRoute path="/promotion" component={listPromotion} />
        <PrivateRoute path="/addpromot-d" component={addPromotionD} />
        <PrivateRoute path="/menu" component={listMenu} />
        <PrivateRoute path="/company" component={listCompany} />
        <PrivateRoute path="/employee" component={listEmployee} />
        <PrivateRoute path="/unit" component={listUnit} />
        <PrivateRoute path="/role" component={listRole} />
        <PrivateRoute path="/accessmenu" component={listAccessMenu} /> */}
        {/* <PrivateRoute path="/menu" component={listSouvenir} />
        {/* <PrivateRoute path="/tsouveniritem" component={listTransactionItem} /> */}
        <PrivateRoute
          path="/viewpromotion/:flag/:code/:design"
          component={ViewPromotion}
        />
        <PrivateRouteStaff
          path="/closepromotion/:flag/:code/:design"
          component={ClosePromotion}
        />

        <PrivateRouteAdmin path="/user" component={listUser} />
        <PrivateRouteAdmin
          path="/approvepromotion/:flag/:code/:design"
          component={ApprovePromotion}
        />
      </Switch>
    </main>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem(apiconfig.LS.TOKEN) != null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem(apiconfig.LS.TOKEN) != null &&
      JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA)).role_id ===
        "RO0001" ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const PrivateRouteStaff = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem(apiconfig.LS.TOKEN) != null &&
      JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA)).role_id ===
        "RO0002" ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default DashboardSwitcher;
