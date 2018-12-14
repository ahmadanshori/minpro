import React from "react";
import { Link } from "react-router-dom";
import apiconfig from "../config/api.config.json";

class Header extends React.Component {
  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    // super(props);
    if (userdata == null) {
      this.state = {
        login: ""
      };
    } else {
      this.state = {
        login: userdata.username
      };
    }
  }
  onSignOut() {
    localStorage.clear();
    this.props.history.push("/");
  }
  render() {
    return (
      <nav className="navbar navbar-dark sticky-top bg-dark filex-md-nowrap p-0">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0 bg-dark text-white"
          href="/dashboard"
        >
          Batch 176 - Mini Project
        </a>

        <ul className="navbar-nav px-3">
          <li className="nav-item">
            <h6 className="bg-dark text-white">
              You Logged as {this.state.login}
            </h6>
          </li>
        </ul>
        <ul className="navbar-nav px-3">
          <li className="nav-item">
            <Link className="nav-Link" to="" onClick={this.onSignOut}>
              Sign Out>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
