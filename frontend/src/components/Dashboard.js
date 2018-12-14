import React from "react";
//import { Switch, Router} from 'react-router-dom'

import Header from "../components/Headers";
import Sidebar from "../components/Sidebar";
//import Login from './Login'
import DashboardSwitcher from "./DashboardSwitcher";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <DashboardSwitcher />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
